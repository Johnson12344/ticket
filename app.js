/* ═══════════════════════════════════════════
   TICKETMASTER CLONE – APP.JS
   ═══════════════════════════════════════════ */

/* ── IMAGE PLACEHOLDERS (SVG-based) ── */
function makeConcertSVG(type){
  const d={
    eagles:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><radialGradient id="rg" cx="50%" cy="80%" r="70%"><stop offset="0%" stop-color="#1a3a6b"/><stop offset="100%" stop-color="#050c1a"/></radialGradient></defs><rect fill="url(#rg)" width="600" height="240"/>${Array.from({length:14},(_,i)=>`<rect x="${20+i*42}" y="${50+Math.sin(i*1.1)*15}" width="${6+i%3*2}" height="${100+Math.cos(i*.7)*35}" fill="#1e6dbf" opacity="${.15+i*.025}" rx="3"/>`).join('')}<text x="300" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="54" font-weight="900" fill="#fff" opacity=".92" letter-spacing="-2">EAGLES</text><text x="300" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#4a90d9" letter-spacing="8">LIVE AT SPHERE</text></svg>`,
    jayz:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#080808" width="600" height="240"/><line x1="300" y1="0" x2="300" y2="240" stroke="#c8900a" stroke-width="2.5" opacity=".5"/><text x="148" y="138" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="900" fill="#fff" opacity=".94">JAY</text><text x="450" y="138" text-anchor="middle" font-family="Georgia,serif" font-size="42" font-weight="900" fill="#c8900a">Z</text><text x="300" y="170" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#666" letter-spacing="8">30TH ANNIVERSARY</text></svg>`,
    metallica:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><radialGradient id="mg" cx="50%" cy="100%" r="75%"><stop offset="0%" stop-color="#3a0000"/><stop offset="100%" stop-color="#050505"/></radialGradient></defs><rect fill="url(#mg)" width="600" height="240"/>${Array.from({length:18},(_,i)=>`<line x1="${i*34}" y1="240" x2="${300+Math.sin(i)*90}" y2="${55+Math.cos(i)*45}" stroke="#ff3300" stroke-width="${.5+i%4*.3}" opacity="${.06+i%5*.025}"/>`).join('')}<text x="300" y="106" text-anchor="middle" font-family="Arial,sans-serif" font-size="44" font-weight="900" fill="#ff3300" opacity=".92" letter-spacing="-1">METALLICA</text><text x="300" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#777" letter-spacing="8">SPHERE · LAS VEGAS</text></svg>`,
    hornets:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><radialGradient id="hg" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="#007a8c"/><stop offset="100%" stop-color="#091525"/></radialGradient></defs><rect fill="url(#hg)" width="600" height="240"/><text x="300" y="100" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="900" fill="#00bcd4" letter-spacing="5">CHARLOTTE</text><text x="300" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="55" font-weight="900" fill="#fff" opacity=".95" letter-spacing="-2">HORNETS</text><text x="300" y="180" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#007a8c" letter-spacing="5">VS PHOENIX SUNS</text></svg>`,
    obada:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><linearGradient id="og" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0c0c0c"/><stop offset="100%" stop-color="#1c1c1c"/></linearGradient></defs><rect fill="url(#og)" width="600" height="240"/><text x="300" y="118" text-anchor="middle" font-family="Georgia,serif" font-size="64" font-weight="900" fill="#fff" opacity=".94" letter-spacing="-2">OBADA</text><text x="300" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#999" letter-spacing="8">OLA DC TOUR 2026</text></svg>`,
    kevin:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#1a0a2e" width="600" height="240"/>${Array.from({length:6},(_,i)=>`<circle cx="${100+i*85}" cy="120" r="${30+i*5}" fill="none" stroke="#E50914" stroke-width="1" opacity=".15"/>`).join('')}<text x="300" y="100" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="#E50914" letter-spacing="6">NETFLIX PRESENTS</text><text x="300" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="36" font-weight="900" fill="#fff">KEVIN HART</text><text x="300" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888" letter-spacing="4">THE ROAST · KIA FORUM</text></svg>`,
    pink:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2d0040"/><stop offset="100%" stop-color="#0a001a"/></linearGradient></defs><rect fill="url(#pg)" width="600" height="240"/><text x="300" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="58" font-weight="900" fill="#FF69B4" opacity=".9">P!NK</text><text x="300" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#999" letter-spacing="6">SUMMER CARNIVAL</text></svg>`,
    hamilton:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#0a0a0a" width="600" height="240"/><rect x="40" y="30" width="520" height="180" fill="none" stroke="#C8932A" stroke-width="2" opacity=".4" rx="4"/><text x="300" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="48" font-weight="900" fill="#C8932A">HAMILTON</text><text x="300" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#888" letter-spacing="5">AN AMERICAN MUSICAL</text></svg>`,
    worldcup:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1B5E20"/><stop offset="100%" stop-color="#0a1a0a"/></linearGradient></defs><rect fill="url(#wg)" width="600" height="240"/><text x="300" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="800" fill="#FFD700" letter-spacing="6">FIFA</text><text x="300" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="42" font-weight="900" fill="#fff">WORLD CUP</text><text x="300" y="175" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="900" fill="#FFD700">2026</text></svg>`,
    suns:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#1D1160" width="600" height="240"/><circle cx="300" cy="120" r="50" fill="none" stroke="#E56020" stroke-width="3" opacity=".5"/><text x="300" y="128" text-anchor="middle" font-family="Georgia,serif" font-size="44" font-weight="900" fill="#E56020">SUNS</text><text x="300" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#fff" letter-spacing="4" opacity=".6">PHOENIX · NBA</text></svg>`,
    brunomars:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#0d0d0d" width="600" height="240"/><rect x="100" y="60" width="400" height="120" fill="none" stroke="#FFD700" stroke-width="1.5" opacity=".3" rx="60"/><text x="300" y="132" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="900" fill="#fff">BRUNO MARS</text><text x="300" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#FFD700" letter-spacing="5">LAS VEGAS RESIDENCY</text></svg>`,
    morganwallen:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><defs><linearGradient id="mwg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2a1a00"/><stop offset="100%" stop-color="#0a0500"/></linearGradient></defs><rect fill="url(#mwg)" width="600" height="240"/><text x="300" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="900" fill="#fff">MORGAN</text><text x="300" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="900" fill="#C8932A">WALLEN</text></svg>`,
    generic:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect fill="#0a0a14" width="600" height="240"/><text x="300" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="46" font-weight="900" fill="#fff" opacity=".75">LIVE EVENT</text></svg>`
  };
  const svg = d[type]||d.generic;
  return 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
}

const IMG_EAGLES=makeConcertSVG('eagles');
const IMG_JAYZ=makeConcertSVG('jayz');
const IMG_MET=makeConcertSVG('metallica');
const IMG_HORNETS=makeConcertSVG('hornets');
const IMG_OBA=makeConcertSVG('obada');
const IMG_HART=makeConcertSVG('kevin');
const IMG_PINK=makeConcertSVG('pink');
const IMG_HAMILTON=makeConcertSVG('hamilton');
const IMG_WORLDCUP=makeConcertSVG('worldcup');
const IMG_SUNS=makeConcertSVG('suns');
const IMG_BRUNO=makeConcertSVG('brunomars');
const IMG_MORGAN=makeConcertSVG('morganwallen');
const P_AUTH=makeConcertSVG('generic');
const P_OBADA=IMG_OBA;
const P_MYEVENTS=IMG_MET;
const IMG_EAGLE=IMG_EAGLES;
const IMG_EAGLE2=IMG_EAGLES;
const IMG_MET3=IMG_MET;

/* ── EVENTS DATA ── */
const EVENTS=[
  {id:'eagles',   cat:'concert', title:'Eagles Live at Sphere',        artist:'Eagles',          venue:'Sphere',           city:'Las Vegas, NV',  addr:'The Sphere, Las Vegas, NV 89109',             date:'Apr 12, 2026',time:'8:00 PM',img:IMG_EAGLES, price:'From $89', tag:'Rock'},
  {id:'jayz',     cat:'concert', title:'JAY-Z 30th Anniversary',       artist:'JAY-Z',           venue:'Yankee Stadium',   city:'New York, NY',   addr:'1 E 161st St, Bronx, NY 10451',               date:'Jul 4, 2026', time:'7:30 PM',img:IMG_JAYZ,   price:'From $120',tag:'Hip-Hop'},
  {id:'metallica',cat:'concert', title:'Metallica – Suite Reservation', artist:'Metallica',       venue:'Sphere',           city:'Las Vegas, NV',  addr:'The Sphere, Las Vegas, NV 89109',             date:'Jun 3, 2026', time:'9:00 PM',img:IMG_MET,    price:'From $150',tag:'Rock'},
  {id:'hornets',  cat:'sports',  title:'Charlotte Hornets vs Suns',     artist:'Charlotte Hornets',venue:'Spectrum Center', city:'Charlotte, NC',  addr:'333 E Trade St, Charlotte, NC 28202',         date:'Apr 5, 2026', time:'7:00 PM',img:IMG_HORNETS,price:'From $35', tag:'NBA'},
  {id:'obada',    cat:'concert', title:'OBADA – OLA DC',                artist:'OBADA',           venue:'State Farm Arena', city:'Atlanta, GA',    addr:'1 State Farm Dr, Atlanta, GA 30303',          date:'May 26, 2026',time:'8:00 PM',img:IMG_OBA,    price:'From $45', tag:'R&B'},
  {id:'kevin',    cat:'comedy',  title:'The Roast of Kevin Hart',       artist:'Netflix Comedy',  venue:'Kia Forum',        city:'Los Angeles, CA',addr:'3900 W Manchester Blvd, Inglewood, CA 90305', date:'May 8, 2026', time:'8:00 PM',img:IMG_HART,   price:'From $55', tag:'Comedy'},
  {id:'pink',     cat:'concert', title:'P!NK Summer Carnival 2026',     artist:'P!NK',            venue:'SoFi Stadium',     city:'Los Angeles, CA',addr:'1001 Stadium Dr, Inglewood, CA 90301',        date:'Jun 15, 2026',time:'7:00 PM',img:IMG_PINK,   price:'From $75', tag:'Pop'},
  {id:'hamilton', cat:'comedy',  title:'Hamilton',                      artist:'Hamilton',        venue:'Richard Rodgers',  city:'New York, NY',   addr:'226 W 46th St, New York, NY 10036',           date:'Ongoing',     time:'8:00 PM',img:IMG_HAMILTON,price:'From $99',tag:'Musical'},
  {id:'worldcup', cat:'sports',  title:'2026 FIFA World Cup',           artist:'FIFA',            venue:'MetLife Stadium',  city:'East Rutherford, NJ',addr:'1 MetLife Stadium Dr, NJ 07073',          date:'Jun 11, 2026',time:'Various',img:IMG_WORLDCUP,price:'From $60',tag:'Soccer'},
  {id:'suns',     cat:'sports',  title:'Phoenix Suns vs Lakers',        artist:'Phoenix Suns',    venue:'Footprint Center', city:'Phoenix, AZ',    addr:'201 E Jefferson St, Phoenix, AZ 85004',       date:'Apr 20, 2026',time:'7:30 PM',img:IMG_SUNS,   price:'From $40', tag:'NBA'},
  {id:'bruno',    cat:'concert', title:'Bruno Mars Las Vegas Residency',artist:'Bruno Mars',      venue:'Park MGM',         city:'Las Vegas, NV',  addr:'3770 S Las Vegas Blvd, Las Vegas, NV 89109',  date:'May 10, 2026',time:'9:00 PM',img:IMG_BRUNO,  price:'From $95', tag:'Pop'},
  {id:'morgan',   cat:'concert', title:'Morgan Wallen – One Night at a Time',artist:'Morgan Wallen',venue:'Nissan Stadium', city:'Nashville, TN',  addr:'1 Titans Way, Nashville, TN 37213',           date:'Jul 18, 2026',time:'7:00 PM',img:IMG_MORGAN, price:'From $65', tag:'Country'},
];

/* ── STATE ── */
const NO_NAV=new Set(['s-detail','s-viewer','s-info','s-xfr-select','s-xfr-to','s-recipient','s-auth']);
const TAB_SCREENS={disc:'s-disc',foryou:'s-foryou',tickets:'s-tickets',sell:'s-tickets',account:'s-account'};
let stack=['s-disc'], tickets=[], curIdx=0, curSlide=0, pickedSeats=new Set(), manageIdx=-1, genStanding=true, pressTimer=null, genIsEdit=false, editIdx=-1;
let curAddr='Atlanta, GA';

/* ── AUTH CONSTANTS ── */
const AUTH_KEY='tapp_session';
const USERS_KEY='tapp_users_v2';
const MAP_KEY='tapp_global_map';
const ADMIN_EMAIL='adminaccess@ticketapp.com';

function ticketKey(email){return 'tapp_tickets_'+btoa(email.toLowerCase()).replace(/=/g,'');}
function deviceKey(email){return 'tapp_device_'+btoa(email.toLowerCase()).replace(/=/g,'');}
const DEVICE_ID=(()=>{let id=localStorage.getItem('tapp_device_id');if(!id){id='D'+Date.now().toString(36).toUpperCase();localStorage.setItem('tapp_device_id',id);}return id;})();

function getAuth(){try{return JSON.parse(sessionStorage.getItem(AUTH_KEY)||'null');}catch(e){return null;}}
function setAuth(d){sessionStorage.setItem(AUTH_KEY,JSON.stringify(d));}
function clearAuth(){sessionStorage.removeItem(AUTH_KEY);}
function getUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||'[]');}catch(e){return[];}}
function saveUsers(u){localStorage.setItem(USERS_KEY,JSON.stringify(u));}
function saveTicketsForUser(email,tix){try{localStorage.setItem(ticketKey(email),JSON.stringify(tix));}catch(e){}}
function loadTicketsForUser(email){try{const s=localStorage.getItem(ticketKey(email));return s?JSON.parse(s):[];}catch(e){return[];}}
function isAdminEmail(email){return email&&email.toLowerCase()===ADMIN_EMAIL.toLowerCase();}

function registerDevice(email){
  try{const key=deviceKey(email);let devices=JSON.parse(localStorage.getItem(key)||'[]');const now=Date.now();devices=devices.filter(d=>now-d.lastSeen<30*24*60*60*1000);const existing=devices.find(d=>d.id===DEVICE_ID);if(existing){existing.lastSeen=now;existing.ua=navigator.userAgent.slice(0,60);}else{devices.push({id:DEVICE_ID,lastSeen:now,ua:navigator.userAgent.slice(0,60)});}localStorage.setItem(key,JSON.stringify(devices));}catch(e){}
}
function getDeviceCount(email){try{const key=deviceKey(email);const devices=JSON.parse(localStorage.getItem(key)||'[]');const now=Date.now();return devices.filter(d=>now-d.lastSeen<30*24*60*60*1000).length;}catch(e){return 0;}}

/* ── INIT ── */
window.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('auth-bg').src=P_AUTH;
  document.getElementById('acct-img').src=IMG_MET;
  EVENTS.forEach(ev=>{if(!ev.img)ev.img=makeConcertSVG('generic');});
  buildDiscover('all');
  setNav('disc');
  initSwipe();
  checkAuth();
});

/* ── NAV ── */
function goto(id){hide(stack[stack.length-1]);show(id);stack.push(id);updNavVis();}
function goBack(){if(stack.length<=1)return;hide(stack.pop());show(stack[stack.length-1]);updNavVis();}
function switchTab(t){
  hide(stack[stack.length-1]);
  const target=TAB_SCREENS[t]||'s-disc';
  show(target);stack=[target];setNav(t);updNavVis();
  if(t==='account')document.getElementById('acct-tc').textContent=tickets.length;
}
function show(id){const e=document.getElementById(id);if(e)e.classList.add('on');}
function hide(id){const e=document.getElementById(id);if(e)e.classList.remove('on');}
function setNav(t){
  document.querySelectorAll('.nv').forEach(el=>{el.classList.remove('on');el.querySelector('svg').style.stroke='#8E8EA0';el.querySelector('span').style.color='';});
  const el=document.getElementById('nv-'+t);if(!el)return;
  el.classList.add('on');el.querySelector('svg').style.stroke='var(--tm-blue)';el.querySelector('span').style.color='var(--tm-blue)';
}
function updNavVis(){const c=stack[stack.length-1];document.getElementById('nav').style.display=NO_NAV.has(c)?'none':'flex';}

/* ── TOAST ── */
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);}

/* ═══════════════════════════════════════════
   DISCOVER / HOME – TICKETMASTER-STYLE BUILDER
   ═══════════════════════════════════════════ */
function buildDiscover(cat){
  document.getElementById('search-results').style.display='none';
  document.getElementById('disc-content').style.display='';

  const hero=EVENTS[0];
  const filtered=cat==='all'?EVENTS:EVENTS.filter(e=>e.cat===cat);
  const concerts=EVENTS.filter(e=>e.cat==='concert');
  const sports=EVENTS.filter(e=>e.cat==='sports');
  const comedy=EVENTS.filter(e=>e.cat==='comedy');

  let html='';

  // Hero Banner
  html+=`<div class="tm-hero" onclick="openEvent('${hero.id}')">
    <img src="${hero.img}" alt="${hero.title}">
    <div class="tm-hero-grad"></div>
    <div class="tm-hero-body">
      <div class="tm-hero-tag">${hero.tag}</div>
      <div class="tm-hero-title">${hero.title}</div>
      <div class="tm-hero-meta">📍 ${hero.venue}, ${hero.city}  ·  ${hero.date}</div>
      <div class="tm-hero-cta">Find Tickets</div>
    </div>
    <div class="tm-hero-dots"><div class="tm-hero-dot on"></div><div class="tm-hero-dot"></div><div class="tm-hero-dot"></div></div>
  </div>`;

  if(cat==='all'){
    // Trending Searches
    html+=buildHSection('Trending Searches', EVENTS.slice(0,6));
    // Concerts
    html+=buildHSection('Concerts', concerts, 'concert');
    // Sports
    html+=buildHSection('Sports', sports, 'sports');
    // Arts, Theater & Comedy
    html+=buildHSection('Arts, Theater & Comedy', comedy, 'comedy');
    // Entertainment Guides
    html+=buildGuidesSection();
    // Popular Cities
    html+=buildCitiesSection();
    // Footer
    html+=buildFooter();
  } else {
    html+=buildHSection(cat.charAt(0).toUpperCase()+cat.slice(1), filtered);
    // also show vertical list
    html+=buildVList(filtered);
    html+=buildFooter();
  }

  html+='<div style="height:16px;"></div>';
  document.getElementById('disc-content').innerHTML=html;
}

function buildHSection(title, evs, catFilter){
  if(!evs.length)return '';
  let html=`<div class="tm-section">
    <div class="tm-section-hdr">
      <h3>${title}</h3>
      <div class="tm-section-nav">
        <span class="tm-see-all" onclick="${catFilter?`filterCat('${catFilter}',document.querySelector('.cat[data-cat=${catFilter}]'))`:`showToast('Showing all ${title}')`}">See All</span>
        <div class="tm-arrow" onclick="scrollHSection(this,-1)"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></div>
        <div class="tm-arrow" onclick="scrollHSection(this,1)"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></div>
      </div>
    </div>
    <div class="tm-hscroll">`;
  evs.forEach(ev=>{
    html+=`<div class="tm-card" onclick="openEvent('${ev.id}')">
      <img src="${ev.img}" alt="${ev.artist}">
      <div class="tm-card-body">
        <div class="tm-card-cat">${ev.tag}</div>
        <div class="tm-card-name">${ev.artist}</div>
        <div class="tm-card-meta">${ev.venue} · ${ev.date}</div>
      </div>
    </div>`;
  });
  html+=`</div></div>`;
  return html;
}

function buildVList(evs){
  if(!evs.length)return '';
  let html='';
  evs.forEach(ev=>{
    html+=`<div class="vcard" onclick="openEvent('${ev.id}')"><img class="vc-art" src="${ev.img}" alt="${ev.title}"><div class="vc-info"><div class="vc-cat">${ev.tag}</div><div class="vc-name">${ev.title}</div><div class="vc-sub">${ev.venue} · ${ev.date}</div><div class="vc-price">${ev.price}</div></div><div style="color:var(--text3);font-size:18px;">›</div></div>`;
  });
  return html;
}

function buildGuidesSection(){
  const guides=[
    {icon:'🏀',name:'NBA Basketball',sub:'Official Ticket Marketplace',bg:'#FFF3E0'},
    {icon:'🏒',name:'NHL Hockey',sub:'Official Ticket Source',bg:'#E3F2FD'},
    {icon:'⚽',name:'MLS Soccer',sub:'Get your soccer fix',bg:'#E8F5E9'},
    {icon:'⚾',name:'MLB Baseball',sub:'Official Tickets',bg:'#FFF8E1'},
    {icon:'🏈',name:'NFL Football',sub:'Every game, every team',bg:'#FFEBEE'},
    {icon:'🎭',name:'Broadway Shows',sub:'NYC & Touring',bg:'#F3E5F5'},
  ];
  let html=`<div class="tm-guides">
    <div class="tm-section-hdr" style="padding:0 0 4px;"><h3>Entertainment Guides</h3></div>
    <div class="tm-guides-grid">`;
  guides.forEach(g=>{
    html+=`<div class="tm-guide" onclick="showToast('${g.name} guide')"><div class="tm-guide-icon" style="background:${g.bg};">${g.icon}</div><div class="tm-guide-name">${g.name}</div><div class="tm-guide-sub">${g.sub}</div></div>`;
  });
  html+=`</div></div>`;
  return html;
}

function buildCitiesSection(){
  const cities=['New York City','Los Angeles','Las Vegas','Chicago','Atlanta','Nashville','Miami','Boston','Houston','Dallas'];
  let html=`<div class="tm-cities">
    <div class="tm-section-hdr" style="padding:0 0 4px;"><h3>Popular Cities</h3><span class="tm-see-all" onclick="showToast('All cities')">See All</span></div>
    <div class="tm-cities-wrap">`;
  cities.forEach(c=>{
    html+=`<div class="tm-city-pill" onclick="showToast('Events in ${c}')">${c}</div>`;
  });
  html+=`</div></div>`;
  return html;
}

function buildFooter(){
  return `<div class="tm-footer">
    <div class="tm-footer-logo">ticketmaster</div>
    <div class="tm-footer-links">
      <a onclick="showToast('Help/FAQ')">Help/FAQ</a>
      <a onclick="showToast('My Account')">My Account</a>
      <a onclick="showToast('Gift Cards')">Gift Cards</a>
      <a onclick="showToast('About Us')">About Us</a>
    </div>
    <div class="tm-footer-copy">© 1999-2026 Ticketmaster. All rights reserved.</div>
  </div>`;
}

function scrollHSection(btn,dir){
  const section=btn.closest('.tm-section');
  const scroll=section.querySelector('.tm-hscroll');
  scroll.scrollBy({left:dir*180,behavior:'smooth'});
}

function filterCat(cat,btn){
  document.querySelectorAll('.cat').forEach(c=>c.classList.remove('on'));
  if(btn)btn.classList.add('on');
  // Also update nav tabs
  document.querySelectorAll('.tm-nav-tab').forEach(t=>t.classList.remove('on'));
  const tabMap={all:0,concert:1,sports:2,comedy:3,family:4};
  const tabs=document.querySelectorAll('.tm-nav-tab');
  if(tabs[tabMap[cat]])tabs[tabMap[cat]].classList.add('on');
  buildDiscover(cat);
}

function filterFromTab(cat,el){
  document.querySelectorAll('.tm-nav-tab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  document.querySelectorAll('.cat').forEach(c=>{c.classList.remove('on');if(c.dataset.cat===cat)c.classList.add('on');});
  buildDiscover(cat);
}

function doSearch(q){
  q=q.trim();
  if(!q){buildDiscover('all');return;}
  document.getElementById('disc-content').style.display='none';
  document.getElementById('search-results').style.display='';
  const matches=EVENTS.filter(e=>e.title.toLowerCase().includes(q.toLowerCase())||e.artist.toLowerCase().includes(q.toLowerCase())||e.venue.toLowerCase().includes(q.toLowerCase())||e.city.toLowerCase().includes(q.toLowerCase()));
  let html='';
  if(!matches.length){
    html=`<div style="padding:40px;text-align:center;color:var(--text3);"><div style="font-size:40px;margin-bottom:12px;">🔍</div><div style="font-size:16px;font-weight:700;">No results for "${q}"</div><div style="font-size:13px;color:var(--text3);margin-top:8px;">Try searching for another artist, event, or venue</div></div>`;
  } else {
    matches.forEach(ev=>{
      html+=`<div class="vcard" onclick="openEvent('${ev.id}')"><img class="vc-art" src="${ev.img}" alt=""><div class="vc-info"><div class="vc-cat">${ev.tag}</div><div class="vc-name">${ev.title}</div><div class="vc-sub">${ev.venue} · ${ev.date}</div><div class="vc-price">${ev.price}</div></div><div style="color:var(--text3);font-size:18px;">›</div></div>`;
    });
  }
  document.getElementById('search-list').innerHTML=html;
}

/* ── OPEN EVENT FROM DISCOVER ── */
function openEvent(id){
  const ev=EVENTS.find(e=>e.id===id);if(!ev)return;
  document.getElementById('ed-img').src=ev.img;
  document.getElementById('ed-dateline').textContent=`${ev.date} · ${ev.time}`;
  document.getElementById('ed-titleline').textContent=ev.title;
  document.getElementById('ed-addrline').textContent=ev.addr;
  document.getElementById('ed-onum').textContent='No ticket — browse event';
  document.getElementById('ed-ocnt').textContent='Tap below to purchase';
  document.getElementById('ed-rows').innerHTML=`<div style="padding:16px;text-align:center;"><div style="font-size:13px;color:var(--text3);margin-bottom:14px;">No tickets purchased yet for this event</div><div style="background:var(--tm-blue);color:#fff;border-radius:10px;padding:14px 24px;font-size:15px;font-weight:800;cursor:pointer;display:inline-block;" onclick="showToast('Redirecting to ticket purchase…')">Buy Tickets — ${ev.price}</div></div>`;
  document.getElementById('ygt-img').src=ev.img;
  document.getElementById('ygt-date').textContent=`${ev.date} · ${ev.time}`;
  document.getElementById('ygt-name').textContent=ev.title;
  document.getElementById('ygt-addr').textContent=ev.addr;
  curAddr=ev.addr;
  setLiveMap(ev.addr);
  goto('s-detail');
}
function setEdTab(t){
  document.getElementById('ed-tab-tix').classList.toggle('on',t==='tix');
  document.getElementById('ed-tab-ext').classList.toggle('on',t==='ext');
  document.getElementById('ed-tix-content').style.display=t==='tix'?'':'none';
  document.getElementById('ed-ext-content').style.display=t==='ext'?'':'none';
}

/* ── LIVE MAP ── */
function setLiveMap(addr){
  const enc=encodeURIComponent(addr);
  const src=`https://www.openstreetmap.org/export/embed.html?layer=mapnik&query=${enc}`;
  const iframe=document.getElementById('live-map-iframe');
  if(iframe)iframe.src=src;
  const iframe2=document.getElementById('xfr-map-iframe');
  if(iframe2)iframe2.src=src;
}

/* ── MY TICKETS ── */
function setTicketTab(w){document.getElementById('tt-up').classList.toggle('on',w==='up');document.getElementById('tt-past').classList.toggle('on',w==='past');}

function openDetail(idx){
  curIdx=(idx!==undefined)?idx:curIdx;
  const t=tickets[curIdx];if(!t)return;
  const fn=`${t.artist} — ${t.event}`;
  document.getElementById('ed-img').src=t.imgUrl||P_OBADA;
  document.getElementById('ed-dateline').textContent=`${t.date} · ${t.time}`;
  document.getElementById('ed-titleline').textContent=fn;
  document.getElementById('ed-addrline').textContent=t.address;
  document.getElementById('ed-onum').textContent=`Order #${t.orderId}`;
  document.getElementById('ed-ocnt').textContent=`x${t.qty} Ticket${t.qty>1?'s':''}`;
  document.getElementById('ygt-img').src=t.imgUrl||P_MYEVENTS;
  document.getElementById('ygt-date').textContent=`${t.date} · ${t.time}`;
  document.getElementById('ygt-name').textContent=fn;
  document.getElementById('ygt-addr').textContent=t.address;
  document.getElementById('xfr-ev-name').textContent=fn;
  document.getElementById('xfr-ev-addr').textContent=t.address;
  curAddr=t.address;
  setLiveMap(t.address);
  const rows=document.getElementById('ed-rows');rows.innerHTML='';
  for(let i=0;i<t.qty;i++){
    const sd=t.isStanding
      ?`<div class="trow-r"><div class="ga-lbl">GENERAL ADMISSION</div><div class="seat-n" style="color:var(--text3);">0</div><div class="standing-lbl">Standing</div></div>`
      :`<div class="trow-r"><div class="ga-lbl">SEAT</div><div class="seat-n">${t.seat}</div></div>`;
    rows.innerHTML+=`<div class="trow"><div class="trow-l"><div class="ttype">${t.type}</div><div class="slbl">SECTION / ROW</div><div class="sval">${t.section} / ${t.row}</div></div>${sd}</div>`;
  }
  buildSeatCards(t);
  goto('s-detail');
}

function renderTickets(){
  const list=document.getElementById('t-list');
  document.getElementById('up-cnt').textContent=tickets.length;
  list.querySelectorAll('.tkcard').forEach(c=>c.remove());
  document.getElementById('t-empty').style.display=tickets.length?'none':'flex';
  document.getElementById('t-hint').style.display=tickets.length?'block':'none';
  tickets.forEach((t,i)=>{
    const card=document.createElement('div');card.className='tkcard';
    card.innerHTML=`<img class="tk-img" src="${t.imgUrl||P_OBADA}" alt="" onerror="this.src='${P_OBADA}'"><div class="tk-grad"></div><div class="tk-body"><div class="tk-date">${t.date} · ${t.time}</div><div class="tk-name">${t.artist}</div><div class="tk-line"></div><div style="font-size:12px;color:rgba(255,255,255,.45);">${t.address}</div></div><div class="tk-acts"><button class="tk-act" onclick="event.stopPropagation();openGenForEdit(${i})">✏ Edit</button><button class="tk-act del" onclick="event.stopPropagation();showManageModal(${i})">🗑</button></div>`;
    card.addEventListener('click',()=>openDetail(i));
    let last=0;
    card.addEventListener('touchend',e=>{const n=Date.now();if(n-last<370){e.preventDefault();showManageModal(i);}last=n;});
    card.addEventListener('touchstart',()=>{pressTimer=setTimeout(()=>showManageModal(i),650);});
    card.addEventListener('touchend',()=>clearTimeout(pressTimer));
    card.addEventListener('touchmove',()=>clearTimeout(pressTimer));
    card.addEventListener('contextmenu',e=>{e.preventDefault();showManageModal(i);});
    list.appendChild(card);
  });
}

/* ── VIEWER ── */
function openViewer(){
  const t=tickets[curIdx];if(!t){showToast('View tickets from My Tickets');return;}
  document.getElementById('tv-n').textContent=t.artist;
  document.getElementById('tv-t').textContent=`${t.time} · ${t.location}`;
  buildBarcode();buildSlides(t);populateInfo(t);
  goto('s-viewer');
}

function buildBarcode(){
  const area=document.getElementById('bc-area');area.innerHTML='';
  const t=tickets[curIdx];
  const barcodeData=t?t.barcode:('TM'+Date.now().toString(36).toUpperCase());
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('id','barcode-svg-main');
  svg.style.cssText='width:100%;height:100%;display:block;';
  area.appendChild(svg);
  if(typeof JsBarcode!=='undefined'){
    try{JsBarcode('#barcode-svg-main',barcodeData,{format:'CODE128',width:2.4,height:62,displayValue:false,margin:0,background:'#ffffff',lineColor:'#000000'});svg.setAttribute('preserveAspectRatio','none');svg.style.cssText='width:100%;height:100%;display:block;';}catch(e){fallbackBars(area);}
  }else{fallbackBars(area);}
  const sw=document.createElement('div');sw.className='sweep';area.appendChild(sw);
}

function fallbackBars(area){
  const lines=document.createElement('div');
  lines.style.cssText='display:flex;align-items:stretch;width:100%;height:100%;position:absolute;top:0;left:0;';
  [3,1,4,1,5,1,2,1,3,2,4,1,3,1,5,2,2,1,4,1,3,1,5,1,2,2,3,1,4,1,2,1,5,1,3,2,4,1,2,1,3,1,5,2].forEach((w,i)=>{
    const b=document.createElement('div');b.style.cssText=`flex:${w};height:100%;background:${i%2===0?'#000':'#fff'};min-width:1px;`;lines.appendChild(b);
  });
  area.appendChild(lines);
}

function buildSlides(t){
  const wrap=document.getElementById('slides-inner');wrap.innerHTML='';curSlide=0;
  for(let i=0;i<t.qty;i++){
    const s=document.createElement('div');s.className='slide';
    const bg=t.imgUrl||P_OBADA;
    const sb=t.isStanding
      ?`<div class="tv-badge"><div class="b-l">Seat</div><div class="b-v ga">0</div></div><div class="tv-badge"><div class="b-l">Type</div><div class="b-v" style="font-size:12px;">Standing</div></div>`
      :`<div class="tv-badge"><div class="b-l">Seat</div><div class="b-v">${t.seat}</div></div><div class="tv-badge"><div class="b-l">Row</div><div class="b-v">${t.row}</div></div>`;
    s.innerHTML=`<div class="ticket-v"><img class="tv-art" src="${bg}" onerror="this.src='${P_OBADA}'" alt=""><div class="tv-info"><div class="tv-type">${t.type}</div><div class="tv-sub">${t.artist} · ${t.event}</div><div class="tv-badges"><div class="tv-badge"><div class="b-l">Section</div><div class="b-v">${t.section}</div></div>${sb}</div><div class="entry-btn">${t.type.toUpperCase()}</div></div></div><div class="qr-card"><div class="qr-lbl" style="margin-bottom:8px;">Ticket Barcode</div><div id="bc-slide-${i}" style="width:100%;height:60px;margin-bottom:10px;"></div><div class="qr-lbl" style="margin-top:4px;margin-bottom:8px;">QR Code — Scan at Venue</div><div class="qr-center" id="qr-${i}"></div><div class="qr-code-id" style="margin-top:6px;">${t.barcode}-${i+1}</div></div>`;
    wrap.appendChild(s);
    setTimeout(()=>{
      const el=document.getElementById(`qr-${i}`);
      if(el&&!el.hasChildNodes()){try{new QRCode(el,{text:`TICKETAPP|${t.artist}|${t.event}|SEC:${t.section}|ROW:${t.row}|SEAT:${t.isStanding?'0':t.seat}|DATE:${t.date}|${t.barcode}-${i+1}`,width:150,height:150,colorDark:'#000',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.H});}catch(e){}}
      const bcEl=document.getElementById(`bc-slide-${i}`);
      if(bcEl&&typeof JsBarcode!=='undefined'){const svgEl=document.createElementNS('http://www.w3.org/2000/svg','svg');svgEl.style.cssText='width:100%;height:60px;display:block;';bcEl.appendChild(svgEl);try{JsBarcode(svgEl,`${t.barcode}-${i+1}`,{format:'CODE128',width:2,height:55,displayValue:true,fontSize:9,margin:2,background:'#fff',lineColor:'#000',font:'Outfit,sans-serif'});}catch(e){}}
    },100);
  }
  updViewer(t.qty);
}

function updViewer(total){
  document.getElementById('slide-counter').textContent=`${curSlide+1} of ${total}`;
  const dd=document.getElementById('tv-dots');dd.innerHTML='';
  for(let i=0;i<total;i++){const d=document.createElement('div');d.className='dot'+(i===curSlide?' on':'');d.onclick=()=>toSlide(i);dd.appendChild(d);}
}
function toSlide(idx){const t=tickets[curIdx];if(!t)return;curSlide=idx;document.getElementById('slides-inner').style.transform=`translateX(-${idx*100}%)`;document.getElementById('slide-counter').textContent=`${idx+1} of ${t.qty}`;document.querySelectorAll('#tv-dots .dot').forEach((d,i)=>d.classList.toggle('on',i===idx));}
function initSwipe(){let sx=0;const c=document.getElementById('slides-outer');c.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});c.addEventListener('touchend',e=>{const diff=sx-e.changedTouches[0].clientX,t=tickets[curIdx];if(!t||Math.abs(diff)<45)return;if(diff>0&&curSlide<t.qty-1)toSlide(curSlide+1);else if(diff<0&&curSlide>0)toSlide(curSlide-1);},{passive:true});}
function doAddWallet(){const t=tickets[curIdx];if(!t)return;showToast(`Adding "${t.artist}" to Apple Wallet…`);}

/* ── INFO ── */
function openInfoScreen(){const t=tickets[curIdx];if(!t){showToast('No ticket selected');return;}populateInfo(t);goto('s-info');}
function populateInfo(t){
  if(!t)return;
  document.getElementById('i-onum').textContent=t.orderId;
  document.getElementById('i-bcode').textContent=t.barcode;
  document.getElementById('i-price').textContent=t.price||'$0.00';
  document.getElementById('i-total').textContent=t.price||'$0.00';
  document.getElementById('i-pdate').textContent=t.created;
  document.getElementById('i-artist').textContent=t.artist;
  document.getElementById('i-event').textContent=t.event;
  document.getElementById('i-dt').textContent=`${t.date} · ${t.time}`;
  document.getElementById('i-venue').textContent=t.address;
  document.getElementById('i-secrow').textContent=`${t.section} / ${t.row}`;
  document.getElementById('i-seat').textContent=t.isStanding?'0 (Standing / GA)':t.seat;
  document.getElementById('i-ttype').textContent=t.type;
}
function setITab(tab){
  const isE=(tab==='e');
  document.getElementById('itab-v').classList.toggle('on',!isE);
  document.getElementById('itab-e').classList.toggle('on',isE);
  document.getElementById('i-view').style.display=isE?'none':'flex';
  document.getElementById('i-edit').style.display=isE?'flex':'none';
  document.getElementById('i-done-bar').style.display=isE?'none':'block';
  if(isE){document.getElementById('s-info').classList.remove('on');stack.pop();openGenForEdit(curIdx);}
}
function toggleAcc(h){const b=h.nextElementSibling,ch=h.querySelector('.acc-ch'),open=b.classList.toggle('show');h.classList.toggle('op',open);if(ch)ch.style.transform=open?'rotate(180deg)':'';}

/* ── GENERATOR / EDIT SHEET ── */
function openGen(isEdit,idx){
  genIsEdit=!!isEdit;editIdx=isEdit?idx:-1;
  const t=(isEdit&&idx>=0)?tickets[idx]:null;
  document.getElementById('gen-sheet-title').textContent=isEdit?'Edit Ticket':'Ticket Generator';
  document.getElementById('gen-sheet-sub').textContent=isEdit?'Update the details below and save your changes.':'Fill in the details to create your personalised ticket.';
  document.getElementById('gen-sub-btn').textContent=isEdit?'✓ Save Changes':'✓ Generate Ticket';
  document.getElementById('g-ok').style.display='none';
  document.getElementById('g-ok').className='gen-ok';
  if(t){
    genStanding=t.isStanding;
    document.getElementById('gsw').style.display=t.isStanding?'none':'block';
    document.querySelectorAll('#gen-seg button').forEach((b,i)=>{const types=['standing','seated','vip'];b.classList.toggle('on',types[i]===(t.isStanding?'standing':'seated')||(i===2&&(t.type==='VIP Ticket'||t.type==='VIP')));});
    document.getElementById('ga').value=t.artist;document.getElementById('ge').value=t.event;document.getElementById('gs').value=t.section;document.getElementById('gr').value=t.row;document.getElementById('gseat').value=t.seat||'';document.getElementById('gd').value=t.date;document.getElementById('gven').value=t.location;document.getElementById('gtime').value=t.time;document.getElementById('gaddr').value=t.address;document.getElementById('gtype').value=t.type;document.getElementById('gprice').value=t.price&&t.price!=='$0.00'?t.price.replace('$',''):'';document.getElementById('gqty').value=t.qty;document.getElementById('gimg').value=t.imgUrl||'';
    if(t.imgUrl){document.getElementById('gpreview').src=t.imgUrl;document.getElementById('gprev').style.display='block';}else{document.getElementById('gprev').style.display='none';}
  } else {
    document.querySelectorAll('#gen-seg button').forEach((b,i)=>{b.classList.toggle('on',i===0);});
    genStanding=true;document.getElementById('gsw').style.display='none';
    ['ga','ge','gs','gr','gseat','gd','gven','gtime','gaddr','gimg','gprice'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
    document.getElementById('gtype').value='Standard Ticket';document.getElementById('gqty').value='1';document.getElementById('gprev').style.display='none';
  }
  document.getElementById('gen-ov').classList.add('show');
}
function openGenForEdit(idx){openGen(true,idx);}
function doEditFromModal(){document.getElementById('mgmt-modal').classList.remove('show');openGenForEdit(manageIdx);}
function setGenType(type,btn){
  document.querySelectorAll('#gen-seg button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');
  genStanding=(type==='standing');document.getElementById('gsw').style.display=genStanding?'none':'block';
  document.getElementById('gtype').value={standing:'Standard Ticket',seated:'Standard Ticket',vip:'VIP Ticket'}[type];
}
function prevImg(){
  const url=document.getElementById('gimg').value.trim();if(!url){showToast('Enter an image URL first');return;}
  const img=document.getElementById('gpreview');img.src=url;img.onerror=()=>{document.getElementById('gprev').style.display='none';showToast('Could not load image');};img.onload=()=>{document.getElementById('gprev').style.display='block';showToast('Image loaded ✓');};
}
function gval(id){const e=document.getElementById(id);return e?e.value.trim():'';}
function submitTicketForm(){
  const artist=gval('ga')||'Artist',event=gval('ge')||'Event',section=gval('gs')||'GA',row=gval('gr')||'—';
  const seat=genStanding?'0':(gval('gseat')||'1');
  const date=gval('gd')||'TBD',location=gval('gven')||'Venue',time=gval('gtime')||'—';
  const address=gval('gaddr')||location,type=gval('gtype')||'Standard Ticket';
  const rawPrice=gval('gprice');const price=rawPrice?(rawPrice.startsWith('$')?rawPrice:'$'+rawPrice):'$0.00';
  const qty=Math.min(10,Math.max(1,parseInt(gval('gqty'))||1));const imgUrl=gval('gimg');
  if(genIsEdit&&editIdx>=0){
    const t=tickets[editIdx];t.artist=artist;t.event=event;t.section=section;t.row=row;t.seat=seat;t.date=date;t.location=location;t.time=time;t.address=address;t.type=type;t.price=price;t.qty=qty;t.imgUrl=imgUrl;t.isStanding=genStanding;
    saveTickets();renderTickets();
    const ok=document.getElementById('g-ok');ok.textContent='✓ Ticket updated!';ok.className='gen-ok edited';ok.style.display='block';
    setTimeout(()=>{document.getElementById('gen-ov').classList.remove('show');},1800);showToast('Ticket updated ✓');
  } else {
    const orderId='ORD-'+Math.random().toString(36).substr(2,8).toUpperCase();
    const barcode=(artist+'-'+date+'-'+section).toLowerCase().replace(/\s+/g,'-')+'-'+Math.random().toString(36).substr(2,6);
    tickets.push({artist,event,section,row,seat,date,location,time,address,type,price,qty,imgUrl,orderId,barcode,isStanding:genStanding,created:new Date().toDateString()});
    saveTickets();renderTickets();
    const ok=document.getElementById('g-ok');ok.textContent='🎟 Ticket created! Go to My Tickets to view it.';ok.className='gen-ok success';ok.style.display='block';
    setTimeout(()=>{document.getElementById('gen-ov').classList.remove('show');},2000);
    ['ga','ge','gs','gr','gseat','gd','gven','gtime','gaddr','gimg','gprice'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
    document.getElementById('gtype').value='Standard Ticket';document.getElementById('gqty').value='1';document.getElementById('gprev').style.display='none';
  }
}
function closeSheetOv(e,id){if(e.target===document.getElementById(id))document.getElementById(id).classList.remove('show');}

/* ── TRANSFER ── */
function buildSeatCards(t){
  const wrap=document.getElementById('seat-cards-wrap');wrap.innerHTML='';pickedSeats.clear();
  document.getElementById('xfr-sel-cnt').textContent='0 Selected';
  document.getElementById('xfr-next-btn').classList.remove('rdy');
  document.getElementById('xfr-sec-label').textContent=`Sec ${t.section} · ${t.isStanding?'General Admission':'Seated'}`;
  document.getElementById('xfr-qty-label').textContent=`${t.qty} Ticket${t.qty>1?'s':''}`;
  for(let i=0;i<t.qty;i++){
    const card=document.createElement('div');card.className='seat-card';card.id=`seat-${i}`;
    const lbl=t.isStanding?`GA ${i+1}`:t.seat+(t.qty>1?String.fromCharCode(65+i):'');
    card.innerHTML=`<div class="seat-top">SEAT ${lbl}</div><div class="seat-body"><div class="seat-circle"></div></div>`;
    card.onclick=()=>selSeat(i);wrap.appendChild(card);
  }
}
function selSeat(idx){const c=document.getElementById(`seat-${idx}`);if(pickedSeats.has(idx)){pickedSeats.delete(idx);c.classList.remove('picked');}else{pickedSeats.add(idx);c.classList.add('picked');}document.getElementById('xfr-sel-cnt').textContent=pickedSeats.size+' Selected';document.getElementById('xfr-next-btn').classList.toggle('rdy',pickedSeats.size>0);}
function doXfrNext(){if(pickedSeats.size>0)goto('s-xfr-to');}
function toggleMobile(){const f=document.getElementById('mobile-field');f.style.display=f.style.display==='none'?'block':'none';}
function doTransfer(){if(!gval('rf-first')){showToast('Please enter first name');return;}if(!gval('rf-email')&&!gval('rf-mobile')){showToast('Please enter email or mobile');return;}goto('s-auth');}

async function sendTransferEmail(toEmail,toName){
  const t=tickets[curIdx];if(!t||!toEmail)return;
  const orderDate=new Date().toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const qty=[...pickedSeats].length||1;
  const subject=`Tickets confirmed: ${t.artist} - ${t.event} | Order #${t.orderId}`;
  const text=`Hi ${toName||'there'},\n\nYour order is confirmed.\n\nOrder #${t.orderId}\n${orderDate}\n\nEvent: ${t.artist} - ${t.event}\nDate and Time: ${t.date} at ${t.time}\nVenue: ${t.address}\n\nTickets and Pricing\n${qty} x ${t.isStanding?'GENERAL ADMISSION':t.type.toUpperCase()} ${t.price||'$0.00'}\n\nSeat Details\nSection: ${t.section||'GA'}\nRow: ${t.row||'-'}\nSeat: ${t.seat||'-'}\n\nBarcode: ${t.barcode}\n\nImportant:\n- Use the live barcode in the app at entry\n- Screenshots are not accepted\n- Arrive early for venue checks\n\nDelivered by TicketApp\n(c) ${new Date().getFullYear()} TicketApp. All rights reserved.`;
  const html=`
    <div style="margin:0;padding:0;background:#0f1219;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
      <div style="max-width:640px;margin:0 auto;background:#171b24;">
        <div style="padding:24px 24px 20px;background:linear-gradient(180deg,#12172b 0%,#101420 100%);border-bottom:1px solid #242b3a;">
          <div style="font-size:34px;line-height:1;font-weight:800;letter-spacing:-0.5px;color:#f8fafc;">ticketapp</div>
          <div style="margin-top:6px;color:#9aa4b2;font-size:14px;">Your live events, everywhere</div>
        </div>

        <div style="padding:24px;">
          <div style="font-size:36px;line-height:1;margin-bottom:12px;">Hi ${toName||'there'},</div>
          <div style="font-size:24px;line-height:1.45;color:#cbd5e1;margin-bottom:18px;">Sent you ${qty} ticket(s) for ${t.artist}. Your order is confirmed.</div>

          <div style="background:#1e2430;border-left:4px solid #3b82f6;border-radius:8px;padding:16px 18px;margin-bottom:16px;">
            <div style="color:#9ca3af;font-size:12px;letter-spacing:1.3px;font-weight:700;text-transform:uppercase;">Order Summary</div>
            <div style="font-size:28px;font-weight:800;color:#f8fafc;margin-top:8px;">Order #${t.orderId}</div>
            <div style="font-size:22px;color:#cbd5e1;margin-top:6px;">${orderDate}</div>
            <div style="display:inline-block;margin-top:10px;background:#16a34a;color:#03190d;font-weight:800;border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.9px;text-transform:uppercase;">Confirmed</div>
          </div>

          <div style="color:#9ca3af;font-size:12px;letter-spacing:1.3px;font-weight:700;text-transform:uppercase;margin:20px 0 10px;">Event Details</div>
          <div style="background:#1e2430;border-radius:8px;padding:16px 18px;">
            <div style="font-size:28px;color:#f8fafc;font-weight:700;line-height:1.25;">${t.artist} - ${t.event}</div>
            <div style="margin-top:10px;color:#cbd5e1;font-size:22px;line-height:1.45;"><strong>Date and Time:</strong> ${t.date} at ${t.time}</div>
            <div style="margin-top:7px;color:#cbd5e1;font-size:22px;line-height:1.45;"><strong>Venue:</strong> ${t.address}</div>
          </div>

          <div style="color:#9ca3af;font-size:12px;letter-spacing:1.3px;font-weight:700;text-transform:uppercase;margin:20px 0 10px;">Tickets and Pricing</div>
          <div style="background:#1e2430;border-radius:8px;padding:16px 18px;">
            <div style="font-size:28px;color:#f8fafc;font-weight:800;">${qty}x ${t.isStanding?'GENERAL ADMISSION':t.type.toUpperCase()}</div>
            <div style="margin-top:12px;border-top:1px solid #2f3a4b;padding-top:12px;color:#cbd5e1;font-size:22px;">
              <div>Section: ${t.section||'GA'}</div>
              <div>Row: ${t.row||'-'}</div>
              <div>Seat: ${t.seat||'-'}</div>
              <div style="margin-top:8px;"><strong>Price:</strong> ${t.price||'$0.00'}</div>
            </div>
          </div>

          <div style="background:#352f0f;border-left:4px solid #d4a100;border-radius:8px;padding:14px 16px;margin:18px 0 0;">
            <div style="color:#facc15;font-size:12px;letter-spacing:1.2px;font-weight:700;text-transform:uppercase;margin-bottom:8px;">Important Information</div>
            <div style="color:#fef9c3;font-size:20px;line-height:1.45;">
              <div>- Open TicketApp on your phone to view and scan your live barcode</div>
              <div>- Screenshots will not be accepted, only live barcodes</div>
              <div>- Arrive early, gates may open 1 hour before showtime</div>
              <div>- Keep screen brightness high for faster scanning</div>
              <div>- Ticket is valid for one entry only</div>
            </div>
          </div>

          <div style="margin-top:18px;background:#3b82f6;border-radius:8px;text-align:center;padding:16px 14px;">
            <div style="font-size:34px;color:#f8fafc;font-weight:800;line-height:1.1;">Get your tickets ready!</div>
            <div style="font-size:22px;color:#eaf2ff;margin-top:4px;line-height:1.35;">Open TicketApp to view your barcode and complete ticket details</div>
          </div>
        </div>

        <div style="background:#eef0f7;color:#4b5563;text-align:center;padding:16px 12px;">
          <div style="font-size:13px;">Delivered by <strong>ticketapp</strong> - Do not reply to this email</div>
          <div style="font-size:12px;margin-top:6px;">(c) ${new Date().getFullYear()} ticketapp. All rights reserved.</div>
        </div>
      </div>
    </div>
  `;

  const resp=await fetch('/api/send-transfer',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      toEmail,
      subject,
      text,
      html,
      pdfName:`ticket-${t.orderId||'transfer'}.pdf`,
      ticketData:{...t,qty}
    })
  });
  const data=await resp.json();
  if(!resp.ok||!data.ok)throw new Error((data&&data.error)||'Email send failed');
}

/* ── OTP / AUTH ── */
function otpIn(inp,idx){inp.value=inp.value.toString().slice(-1);if(inp.value&&idx<3)document.getElementById(`otp${idx+1}`).focus();document.getElementById('cfm-btn').classList.toggle('rdy',[0,1,2,3].every(i=>document.getElementById(`otp${i}`).value!==''));}
async function doAuth(){
  if(![0,1,2,3].every(i=>document.getElementById(`otp${i}`).value!=='')){showToast('Enter the full 4-digit code');return;}
  [0,1,2,3].forEach(i=>document.getElementById(`otp${i}`).value='');document.getElementById('cfm-btn').classList.remove('rdy');
  const recipEmail=document.getElementById('rf-email').value.trim()||document.getElementById('rf-mobile').value.trim();
  const recipName=document.getElementById('rf-first').value.trim()+' '+document.getElementById('rf-last').value.trim();
  if(recipEmail&&recipEmail.includes('@')){
    try{
      await sendTransferEmail(recipEmail.trim(),recipName.trim());
    }catch(err){
      showToast('Transfer created, but email failed: '+(err.message||'send error'));
    }
  }
  stack=['s-disc','s-tickets'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));
  show('s-tickets');setNav('tickets');updNavVis();showToast('✓ Transfer successful!');
}

/* ── DELETE ── */
function showManageModal(idx){manageIdx=idx;document.getElementById('mgmt-modal').classList.add('show');}
function doDelete(){
  if(manageIdx<0||manageIdx>=tickets.length){document.getElementById('mgmt-modal').classList.remove('show');return;}
  tickets.splice(manageIdx,1);saveTickets();renderTickets();
  const cur=stack[stack.length-1];
  if(['s-detail','s-viewer','s-info'].includes(cur)){stack=['s-tickets'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));show('s-tickets');setNav('tickets');updNavVis();}
  showToast('Ticket deleted');document.getElementById('mgmt-modal').classList.remove('show');manageIdx=-1;
}

/* ── MAP ── */
function openMapSheet(){document.getElementById('msh-ov').classList.add('show');}
function openMap(p){
  const enc=encodeURIComponent(curAddr||'Atlanta, GA');
  const u={apple:`maps://maps.apple.com/?q=${enc}`,google:`https://www.google.com/maps/search/?api=1&query=${enc}`,waze:`https://waze.com/ul?q=${enc}`};
  document.getElementById('msh-ov').classList.remove('show');
  const a=document.createElement('a');a.href=u[p];a.target='_blank';document.body.appendChild(a);a.click();a.remove();
  showToast(`Opening ${p.charAt(0).toUpperCase()+p.slice(1)} Maps…`);
}

/* ── SHARE ── */
function doShare(){
  const t=tickets[curIdx];
  const text=t?`I just got tickets to ${t.artist} — ${t.event} on ${t.date}! 🎟`:'Check out this event on Ticketmaster! 🎟';
  if(navigator.share){navigator.share({title:'Ticketmaster',text,url:window.location.href}).catch(()=>{});}
  else if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard!'));}
  else showToast('Sharing…');
}

/* ── SELL ── */
function updSellTotal(v){const val=parseFloat(v)||0,fee=val*.15,rcv=val-fee;document.getElementById('sell-fee').textContent=`$${fee.toFixed(2)}`;document.getElementById('sell-receive').textContent=`$${rcv.toFixed(2)}`;}
function doListForSale(){const p=document.getElementById('sell-price').value;if(!p||parseFloat(p)<=0){showToast('Enter a valid price');return;}document.getElementById('sell-sheet').classList.remove('show');showToast(`Ticket listed for $${parseFloat(p).toFixed(2)} ✓`);}

/* ── ACCOUNT ── */
function editProfile(){document.getElementById('profile-modal').classList.add('show');}
function saveProfile(){
  const name=document.getElementById('pf-name').value.trim(),email=document.getElementById('pf-email').value.trim();
  if(!name||!email){showToast('Please fill all fields');return;}
  document.getElementById('acct-name-txt').textContent=name;document.getElementById('acct-email-txt').textContent=email;
  const ini=name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);document.getElementById('acct-initials').textContent=ini;
  document.getElementById('profile-modal').classList.remove('show');showToast('Profile updated ✓');
}
function doRating(){showToast('Opening App Store…');}
function doSignOut(){
  clearAuth();tickets=[];document.getElementById('admin-panel-row').style.display='none';
  const av=document.getElementById('acct-av');if(av)av.style.background='';
  document.getElementById('acct-initials').textContent='JD';document.getElementById('login-email').value='';document.getElementById('login-error').textContent='';
  stack=['s-login'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));showLoginScreen();showToast('Signed out');
}

/* ── STORAGE ── */
function saveTickets(){const auth=getAuth();if(!auth||!auth.email)return;try{saveTicketsForUser(auth.email,tickets);}catch(e){}}
function loadTickets(){const auth=getAuth();if(!auth||!auth.email){tickets=[];return;}tickets=loadTicketsForUser(auth.email);}

/* ── AUTH FLOW ── */
function checkAuth(){
  const auth=getAuth();
  if(!auth||!auth.email){showLoginScreen();return false;}
  const email=auth.email.toLowerCase();
  if(!isAdminEmail(email)){const u=getUsers().find(u=>u.email.toLowerCase()===email);if(!u||!u.access){clearAuth();showLoginScreen();return false;}}
  tickets=loadTicketsForUser(auth.email);registerDevice(auth.email);applyAuthUI(auth);hideLoginScreen();
  stack=['s-disc'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));show('s-disc');updNavVis();renderTickets();return true;
}

function applyAuthUI(auth){
  const email=auth.email.toLowerCase();
  if(isAdminEmail(email)){
    document.getElementById('admin-panel-row').style.display='flex';
    document.getElementById('acct-name-txt').textContent='Chairman';document.getElementById('acct-email-txt').textContent=auth.email;document.getElementById('acct-initials').textContent='🛡';document.getElementById('acct-av').style.background='#D97706';document.getElementById('login-greeting').textContent='Welcome back, Chairman.';
  } else {
    document.getElementById('admin-panel-row').style.display='none';document.getElementById('acct-av').style.background='';
    const u=getUsers().find(u=>u.email.toLowerCase()===email);const nm=u&&u.name&&u.name!=='No name'?u.name.split(' ')[0]:'there';
    document.getElementById('login-greeting').textContent=`Welcome back, ${nm}.`;
    if(u&&u.name&&u.name!=='No name'){document.getElementById('acct-name-txt').textContent=u.name;document.getElementById('acct-initials').textContent=u.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);}
    document.getElementById('acct-email-txt').textContent=auth.email;
  }
}

function showLoginScreen(){document.getElementById('s-login').classList.add('on');document.getElementById('nav').style.display='none';document.querySelectorAll('.scr:not(#s-login)').forEach(s=>s.classList.remove('on'));}
function hideLoginScreen(){document.getElementById('s-login').classList.remove('on');}

function doLogin(){
  const email=document.getElementById('login-email').value.trim().toLowerCase();
  const errEl=document.getElementById('login-error');errEl.textContent='';
  if(!email){errEl.textContent='Please enter your email address.';return;}
  if(!email.includes('@')||!email.includes('.')){errEl.textContent='Please enter a valid email address.';return;}
  if(isAdminEmail(email)){
    const authData={email,isAdmin:true};setAuth(authData);tickets=loadTicketsForUser(email);registerDevice(email);applyAuthUI(authData);hideLoginScreen();
    stack=['s-disc'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));show('s-disc');setNav('disc');updNavVis();renderTickets();showToast('Welcome, Chairman 👑');return;
  }
  const users=getUsers();const u=users.find(u2=>u2.email.toLowerCase()===email);
  if(!u){errEl.textContent='This email is not authorised. Contact your admin.';return;}
  if(!u.access){errEl.textContent='Your access has been disabled. Contact your admin.';return;}
  const authData={email,isAdmin:false};setAuth(authData);tickets=loadTicketsForUser(email);registerDevice(email);applyAuthUI(authData);hideLoginScreen();
  stack=['s-disc'];document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));show('s-disc');setNav('disc');updNavVis();renderTickets();showToast('Welcome back! 🎟');
}

document.getElementById('login-email').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});

/* ── ADMIN ── */
let editingUserId=null;
function openAdmin(){const auth=getAuth();if(!auth||!isAdminEmail(auth.email)){showToast('Admin access required');return;}renderAdminUsers('');const mapOn=localStorage.getItem(MAP_KEY)!=='false';document.getElementById('adm-global-map').classList.toggle('on',mapOn);goto('s-admin');}
function toggleGlobalMap(el){el.classList.toggle('on');localStorage.setItem(MAP_KEY,el.classList.contains('on')?'true':'false');}
function adminAddUser(){
  const name=document.getElementById('adm-name').value.trim();const email=document.getElementById('adm-email').value.trim().toLowerCase();
  if(!email||!email.includes('@')){showToast('Enter a valid email address');return;}
  if(isAdminEmail(email)){showToast('Admin email cannot be added as a user');return;}
  const users=getUsers();if(users.find(u=>u.email.toLowerCase()===email)){showToast('Email already added');return;}
  users.push({id:Date.now().toString(),name:name||'No name',email,access:true,mapAccess:false});saveUsers(users);
  document.getElementById('adm-name').value='';document.getElementById('adm-email').value='';
  renderAdminUsers(document.getElementById('adm-search').value);showToast('User added: '+email);
}
function adminSearch(q){renderAdminUsers(q.trim().toLowerCase());}
function renderAdminUsers(filter){
  const list=document.getElementById('admin-user-list');let users=getUsers();
  if(filter)users=users.filter(u=>u.email.toLowerCase().includes(filter)||u.name.toLowerCase().includes(filter));
  if(!users.length){list.innerHTML=`<div class="admin-empty">${filter?'No users match your search.':'No users yet. Add one above.'}</div>`;return;}
  list.innerHTML=users.map(u=>{
    const devCount=getDeviceCount(u.email);const devBadge=devCount>0?`<span style="background:${devCount>1?'#EF4444':'#16A34A'};color:#fff;border-radius:100px;padding:2px 9px;font-size:11px;font-weight:700;margin-left:6px;">${devCount} device${devCount!==1?'s':''}</span>`:'';
    return `<div class="user-card"><div class="uc-row"><span class="uc-label">Name:</span><span class="uc-value">${u.name||'No name'}</span>${devBadge}</div><div class="uc-row"><span class="uc-label">Email:</span><span class="uc-value">${u.email}</span></div><div class="uc-actions"><div style="flex:1;display:flex;align-items:center;gap:8px;"><span class="uc-label">Access:</span><div class="toggle${u.access?' on':''}" onclick="adminToggleAccess('${u.id}',this)"></div></div><button class="uc-edit-btn" onclick="adminOpenEdit('${u.id}')">✏ Edit</button><button class="uc-del-btn" onclick="adminDeleteUser('${u.id}')">🗑 Delete</button></div><div style="display:flex;align-items:center;gap:8px;margin-top:8px;"><span class="uc-label">Map:</span><div class="toggle${u.mapAccess?' on':''}" onclick="adminToggleMap('${u.id}',this)"></div></div></div>`;
  }).join('');
}
function adminToggleAccess(id,el){el.classList.toggle('on');const u=getUsers();const i=u.find(x=>x.id===id);if(i){i.access=el.classList.contains('on');saveUsers(u);}}
function adminToggleMap(id,el){el.classList.toggle('on');const u=getUsers();const i=u.find(x=>x.id===id);if(i){i.mapAccess=el.classList.contains('on');saveUsers(u);}}
function adminOpenEdit(id){const u=getUsers().find(u=>u.id===id);if(!u)return;editingUserId=id;document.getElementById('eum-name').value=u.name||'';document.getElementById('eum-email').value=u.email;document.getElementById('edit-user-modal').classList.add('show');}
function adminSaveEdit(){
  const name=document.getElementById('eum-name').value.trim();const email=document.getElementById('eum-email').value.trim().toLowerCase();
  if(!email||!email.includes('@')){showToast('Enter a valid email');return;}
  const users=getUsers();const u=users.find(u=>u.id===editingUserId);if(!u)return;
  u.name=name||'No name';u.email=email;saveUsers(users);
  document.getElementById('edit-user-modal').classList.remove('show');renderAdminUsers(document.getElementById('adm-search').value);showToast('User updated ✓');editingUserId=null;
}
function adminDeleteUser(id){if(!confirm('Delete this user?'))return;saveUsers(getUsers().filter(u=>u.id!==id));renderAdminUsers(document.getElementById('adm-search').value);showToast('User deleted');}
