const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const PDFDocument = require('pdfkit');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '12mb' }));
app.use(express.static(__dirname));

function maskEmail(value) {
  const raw = String(value || '').trim();
  const parts = raw.split('@');
  if (parts.length !== 2) return raw || '<empty>';
  const local = parts[0];
  const domain = parts[1];
  if (local.length <= 2) return `${local[0] || '*'}*@${domain}`;
  return `${local[0]}${'*'.repeat(Math.max(1, local.length - 2))}${local[local.length - 1]}@${domain}`;
}

function buildPdfFromTicketData(ticketData) {
  return new Promise((resolve, reject) => {
    try {
      const t = ticketData || {};
      const qty = Number(t.qty || 1);
      const allowBarcode = t.allowBarcode !== false;
      const doc = new PDFDocument({ size: 'A4', margin: 48 });
      const chunks = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
      doc.on('error', reject);

      const pageW = doc.page.width;
      const margin = 36;
      const cardW = pageW - margin * 2;
      const cardH = 170;
      const headerH = 26;
      const gap = 18;

      function drawPseudoQr(x, y, size, seed) {
        const cells = 21;
        const cell = size / cells;
        const src = String(seed || 'code');
        doc.save();
        doc.rect(x, y, size, size).fill('#ffffff');
        for (let r = 0; r < cells; r++) {
          for (let c = 0; c < cells; c++) {
            const code = src.charCodeAt((r * cells + c) % src.length);
            const on = ((r * 13 + c * 7 + code) % 5) < 2;
            if (on) {
              doc.rect(x + c * cell, y + r * cell, cell, cell).fill('#111111');
            }
          }
        }
        doc.restore();
      }

      function drawBarcodeLines(x, y, w, h, seed) {
        const src = String(seed || 'barcode');
        let cx = x;
        let i = 0;
        while (cx < x + w - 2) {
          const code = src.charCodeAt(i % src.length);
          const bw = 1 + (code % 3);
          const gapW = 1 + ((code >> 2) % 2);
          doc.rect(cx, y, bw, h).fill('#111111');
          cx += bw + gapW;
          i += 1;
        }
      }

      function drawTicketCard(top, idx) {
        const leftW = 58;
        const rightW = 132;
        const midX = margin + leftW;
        const rightX = margin + cardW - rightW;
        const bodyTop = top + headerH;
        const seatLabel = t.isStanding ? `GA ${idx + 1}` : `${String(t.seat || '-')}${qty > 1 ? String.fromCharCode(65 + idx) : ''}`;

        doc.save();
        doc.rect(margin, top, cardW, cardH).fill('#ffffff').strokeColor('#222').lineWidth(1).stroke();
        doc.rect(margin, top, cardW, headerH).fill('#272a30');

        doc.font('Helvetica-Bold').fontSize(7).fillColor('#d1d5db').text('ORDER #', margin + 8, top + 7);
        doc.font('Helvetica').fontSize(7).fillColor('#f9fafb').text(String(t.orderId || '-'), margin + 8, top + 14);
        doc.font('Helvetica').fontSize(10).fillColor('#f9fafb').text(String(t.recipientName || 'Ticket Holder'), margin + cardW - 150, top + 9, { width: 140, align: 'right' });

        doc.rect(midX, bodyTop, 1, cardH - headerH).fill('#d1d5db');
        doc.rect(rightX, bodyTop, 1, cardH - headerH).fill('#d1d5db');

        drawBarcodeLines(margin + 18, bodyTop + 16, leftW - 24, cardH - headerH - 32, `${t.barcode || '-'}-${idx}`);

        doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827').text(String(t.artist || 'Artist').toUpperCase(), midX + 12, bodyTop + 20, { width: rightX - midX - 24 });
        doc.font('Helvetica').fontSize(10).fillColor('#1f2937').text(`${String(t.date || '-')}  ${String(t.time || '-')}`, midX + 12, bodyTop + 43, { width: rightX - midX - 24 });
        doc.font('Helvetica').fontSize(8.5).fillColor('#4b5563').text(String(t.address || '-'), midX + 12, bodyTop + 58, { width: rightX - midX - 24 });
        doc.font('Helvetica-Bold').fontSize(9).fillColor('#111827').text(`SECTION ${String(t.section || 'GA')}   ROW ${String(t.row || '-')}   SEAT ${seatLabel}`, midX + 12, bodyTop + 98, { width: rightX - midX - 24 });

        if (allowBarcode) {
          drawPseudoQr(rightX + 22, bodyTop + 16, 64, `${t.barcode || '-'}-${idx}`);
        } else {
          doc.rect(rightX + 22, bodyTop + 16, 64, 64).fill('#f3f4f6').strokeColor('#9ca3af').stroke();
          doc.font('Helvetica-Bold').fontSize(8).fillColor('#6b7280').text('LOCKED', rightX + 22, bodyTop + 44, { width: 64, align: 'center' });
        }
        doc.font('Helvetica').fontSize(8.5).fillColor('#111827').text(String(t.recipientName || 'Ticket Holder'), rightX + 10, bodyTop + 88, { width: rightW - 20 });
        doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#111827').text(String(t.isStanding ? 'GENERAL ADMISSION' : t.type || 'STANDARD TICKET'), rightX + 10, bodyTop + 104, { width: rightW - 20 });
        doc.font('Helvetica').fontSize(8.5).fillColor('#111827').text(String(t.price || '$0.00'), rightX + 10, bodyTop + 120, { width: rightW - 20 });
        doc.restore();
      }

      doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Ticket Attachment', margin, 20);
      doc.font('Helvetica').fontSize(9).fillColor('#6b7280').text('Use the TicketApp live barcode at venue entry. Screenshots are not accepted.', margin, 40);

      let y = 62;
      for (let i = 0; i < qty; i++) {
        if (y + cardH > doc.page.height - 40) {
          doc.addPage();
          y = 36;
        }
        drawTicketCard(y, i);
        y += cardH + gap;
      }

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

function getSmtpTransporter() {
  const from = process.env.FROM_EMAIL;
  const defaults = from ? { from } : undefined;
  const smtpUrl = process.env.SMTP_URL;
  if (smtpUrl) return nodemailer.createTransport(smtpUrl, defaults);
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } }, defaults);
}

app.post('/api/send-transfer', async (req, res) => {
  const reqId = `xfr-${Date.now().toString(36)}`;
  try {
    const { toEmail, subject, text, html, pdfName, pdfBase64, ticketData } = req.body || {};

    console.log(`[${reqId}] /api/send-transfer received`, {
      to: maskEmail(toEmail),
      orderId: ticketData && ticketData.orderId ? ticketData.orderId : undefined,
      hasHtml: Boolean(html),
      hasPdfBase64: Boolean(pdfBase64),
      hasTicketData: Boolean(ticketData),
    });

    if (!toEmail || !subject || !text) {
      console.warn(`[${reqId}] Missing required fields.`);
      return res.json({ ok: false, error: 'Missing required fields.' });
    }

    let finalPdfBase64 = pdfBase64 || null;
    if (!finalPdfBase64 && ticketData) {
      console.log(`[${reqId}] Generating PDF from ticket data...`);
      finalPdfBase64 = await buildPdfFromTicketData(ticketData);
      console.log(`[${reqId}] PDF generation complete.`);
    }

    const transporter = getSmtpTransporter();
    if (!transporter) {
      console.warn(`[${reqId}] SMTP transporter not configured.`);
      return res.json({ ok: false, error: 'Email not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS (or SMTP_URL).' });
    }
    console.log(`[${reqId}] SMTP send starting`, {
      host: process.env.SMTP_HOST || '<smtp_url>',
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
      from: maskEmail(process.env.FROM_EMAIL || process.env.SMTP_USER),
      to: maskEmail(toEmail),
      hasAttachment: Boolean(finalPdfBase64),
    });
    const mail = {
      to: toEmail, subject, text, html: html || undefined,
      attachments: finalPdfBase64
        ? [{ filename: pdfName || 'ticket.pdf', content: finalPdfBase64, encoding: 'base64', contentType: 'application/pdf' }]
        : [],
    };
    await transporter.sendMail(mail);
    console.log(`[${reqId}] SMTP send successful.`);
    return res.json({ ok: true });
  } catch (err) {
    const detail = err.message || 'Send failed';
    console.error(`[${reqId}] SMTP send failed: ${detail}`);
    return res.json({ ok: false, error: detail });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ticketmaster server running on http://localhost:${PORT}`);
});
