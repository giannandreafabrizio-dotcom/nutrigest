const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const SUPABASE_URL = 'https://zrhmspylnlklppvhgplp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaG1zcHlsbmxrbHBwdmhncGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDA0NDQsImV4cCI6MjA5MzY3NjQ0NH0.imawIV00emURjzLAWyrHdQ0VsRC_3pey4-D-6z8Y5Jg';

// 1. UI IMPOSTAZIONI
const OLD_SETTINGS = `  <div class="card">
    <div class="card-hd"><h3>🔗 Google Sheets</h3></div>
    <div class="card-bd">
      <div class="fg"><label>URL Apps Script</label><input id="cfg-url" placeholder="https://script.google.com/macros/s/..."></div>
      <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
        <button class="btn btn-p" onclick="salvaCfg()">Salva</button>
        <button class="btn btn-g" onclick="testConn()">🔌 Testa</button>
        <button class="btn btn-g" onclick="syncNow()">↺ Sincronizza</button>
        <span id="cfg-res" style="font-size:.75rem;color:var(--text3)"></span>
      </div>
    </div>
  </div>
  <div class="card" style="background:var(--bg2,rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);margin-top:.75rem">
    <div class="card-hd"><h3>☁️ Stato sincronizzazione</h3></div>
    <div class="card-bd" style="padding:12px;display:flex;flex-direction:column;gap:6px;font-size:.8rem">
      <div>URL Script: <span id="ss-url" style="font-weight:600"></span></div>
      <div>Stato: <span id="ss-stato" style="font-weight:600"></span></div>
      <div>Ultima sincronizzazione: <span id="ss-ts" style="font-weight:600"></span></div>
      <div>Record in memoria: <span id="ss-rec" style="font-weight:600;color:var(--text3)"></span></div>
    </div>
  </div>`;

const NEW_SETTINGS = `  <div class="card">
    <div class="card-hd"><h3>☁️ Supabase</h3></div>
    <div class="card-bd" style="display:flex;flex-direction:column;gap:6px;font-size:.8rem">
      <div>Progetto: <span style="font-weight:600;color:var(--teal)">nutrigest</span></div>
      <div>Stato: <span id="ss-stato" style="font-weight:600"></span></div>
      <div>Ultima sincronizzazione: <span id="ss-ts" style="font-weight:600"></span></div>
      <div>Pazienti in DB: <span id="ss-rec" style="font-weight:600;color:var(--teal)"></span></div>
      <div style="margin-top:.4rem;display:flex;gap:.4rem;flex-wrap:wrap">
        <button class="btn btn-g btn-sm" onclick="syncNow()">↺ Sincronizza ora</button>
        <button class="btn btn-g btn-sm" onclick="testConnSupabase()">🔌 Testa connessione</button>
        <span id="cfg-res" style="font-size:.75rem;color:var(--text3);margin-left:.3rem"></span>
      </div>
    </div>
  </div>`;

if (html.includes(OLD_SETTINGS)) {
  html = html.replace(OLD_SETTINGS, NEW_SETTINGS);
  console.log('OK: UI impostazioni aggiornata');
} else {
  console.error('FAIL: UI impostazioni non trovata');
  process.exit(1);
}

// 2. SOSTITUISCI BLOCCO SYNC
const SYNC_START = 'function _hashDb(str){';
const SYNC_END   = 'async function save(){saveLocal();await pushToSheets();}';

const si = html.indexOf(SYNC_START);
const se = html.indexOf(SYNC_END);
if (si === -1 || se === -1) {
  console.error('FAIL: blocco sync non trovato si=' + si + ' se=' + se);
  process.exit(1);
}

const NEW_SYNC = `// ════ SYNC SUPABASE ════════════════════════════════════════════════════════
const SUPA_URL = '${SUPABASE_URL}';
const SUPA_KEY = '${SUPABASE_KEY}';
const META_KEY = 'meta_collections';

function supaHeaders(){
  return {'Content-Type':'application/json','apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Prefer':'resolution=merge-duplicates'};
}

async function pushToSheets(){
  try{
    for(const p of db.pazienti){
      const r=await fetch(SUPA_URL+'/rest/v1/pazienti',{method:'POST',headers:supaHeaders(),body:JSON.stringify({id:p.id,data:p,updated_at:new Date().toISOString()})});
      if(!r.ok&&r.status!==200&&r.status!==201) throw new Error('err paz '+p.id+' status '+r.status);
    }
    const meta={ricette:db.ricette||[],eventi:db.eventi||[],entrate:db.entrate||[],disponibilita:db.disponibilita||{},piani:db.piani||[]};
    const rm=await fetch(SUPA_URL+'/rest/v1/pazienti',{method:'POST',headers:supaHeaders(),body:JSON.stringify({id:META_KEY,data:meta,updated_at:new Date().toISOString()})});
    if(!rm.ok&&rm.status!==200&&rm.status!==201) throw new Error('err meta status '+rm.status);
    localStorage.setItem('lastSync',Date.now());setSyncStatus(true);
    console.log('[Supabase] push OK — '+db.pazienti.length+' pazienti');
    return true;
  }catch(e){
    console.error('[Supabase] push ERRORE:',e);setSyncStatus(false);
    notif('⚠ Sync fallito — dati salvati solo in locale',3500);return false;
  }
}

async function pullFromSheets(){
  try{
    const r=await fetch(SUPA_URL+'/rest/v1/pazienti?select=id,data',{method:'GET',headers:supaHeaders()});
    if(!r.ok) throw new Error('status '+r.status);
    const rows=await r.json();
    if(!rows||!rows.length) return false;
    const pr=rows.filter(row=>row.id!==META_KEY);
    const mr=rows.find(row=>row.id===META_KEY);
    if(!pr.length) return false;
    db.pazienti=pr.map(row=>row.data);
    if(mr&&mr.data){db.ricette=mr.data.ricette||[];db.eventi=mr.data.eventi||[];db.entrate=mr.data.entrate||[];db.disponibilita=mr.data.disponibilita||{};db.piani=mr.data.piani||[];}
    ['pazienti','ricette','eventi','entrate','piani'].forEach(k=>{if(!db[k])db[k]=[];});
    if(!db.disponibilita)db.disponibilita={};
    saveLocal();localStorage.setItem('lastSync',Date.now());setSyncStatus(true);
    console.log('[Supabase] pull OK — '+db.pazienti.length+' pazienti');
    return true;
  }catch(e){
    console.error('[Supabase] pull ERRORE:',e);setSyncStatus(false);return false;
  }
}

async function syncNow(){
  const d=document.getElementById('sync-dot');if(d)d.className='sync-dot loading';
  const bar=document.getElementById('sync-bar');
  if(bar){bar.style.width='0%';bar.style.background='#facc15';}
  var barPct=0;var barIv=setInterval(function(){barPct+=8;if(bar&&barPct<90)bar.style.width=barPct+'%';},100);
  const p=await pullFromSheets();
  if(p){renderPaz();renderRic();renderCal();renderEntrate();}
  await pushToSheets();
  clearInterval(barIv);
  if(bar){bar.style.width='100%';bar.style.background=_syncOk?'#4ade80':'#f87171';}
}

async function sincronizzaTutto(){
  var wrap=document.getElementById('btn-sync-wrap');var btn=document.getElementById('btn-sync-tutto');
  if(wrap){wrap.classList.remove('is-ok','is-err');wrap.classList.add('is-loading');}
  if(btn){btn.disabled=true;btn.textContent='Sincronizzazione...';}
  var pullOk=false,pushOk=false;
  try{pullOk=await pullFromSheets();if(pullOk){renderPaz();renderRic();renderCal();renderEntrate();}}catch(e){}
  try{pushOk=await pushToSheets();}catch(e){}
  const tsEl=document.getElementById('ss-ts');
  if(tsEl){const now=new Date();tsEl.textContent=now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})+' — '+now.toLocaleDateString('it-IT');}
  const recEl=document.getElementById('ss-rec');if(recEl)recEl.textContent=db.pazienti.length+' pazienti';
  if(wrap)wrap.classList.remove('is-loading');if(btn)btn.disabled=false;
  if(pullOk&&pushOk){if(wrap)wrap.classList.add('is-ok');if(btn)btn.textContent='✅ Sincronizzato';notif('✅ Sincronizzazione completata',2500);}
  else if(pullOk||pushOk){if(wrap)wrap.classList.add('is-err');if(btn)btn.textContent='⚠️ Parziale';notif('⚠️ Sincronizzazione parziale',3500);}
  else{if(wrap)wrap.classList.add('is-err');if(btn)btn.textContent='❌ Errore';notif('❌ Sincronizzazione fallita',3500);}
  setTimeout(function(){if(btn)btn.textContent='🔄 Sincronizza';if(wrap){wrap.classList.remove('is-ok','is-err');}},3000);
}

async function testConnSupabase(){
  const res=document.getElementById('cfg-res');if(res)res.textContent='⏳ Test...';
  try{
    const r=await fetch(SUPA_URL+'/rest/v1/pazienti?select=id&limit=1',{headers:supaHeaders()});
    if(r.ok){if(res){res.style.color='var(--teal)';res.textContent='✓ Supabase connesso!';}}
    else throw new Error('status '+r.status);
  }catch(e){if(res){res.style.color='var(--red)';res.textContent='✗ Errore connessione';}}
}

async function save(){saveLocal();await pushToSheets();}
`;

html = html.substring(0, si) + NEW_SYNC + html.substring(se + SYNC_END.length);
console.log('OK: blocco sync sostituito');

// 3. AGGIORNA setSyncStatus testo
html = html.replace(
  "statoEl.textContent=_syncOk?'✓ Connesso a Google Sheets':'✗ Non connesso';",
  "statoEl.textContent=_syncOk?'✓ Connesso a Supabase':'✗ Non connesso';"
);
console.log('OK: setSyncStatus aggiornato');

// 4. Rimuovi cfg-url dalla inizializzazione impostazioni
html = html.replace(
  "const el=document.getElementById('cfg-url');if(el)el.value=getUrl();initAntCard();",
  "initAntCard();"
);

// 5. Aggiorna salvaCfg e testConn
html = html.replace(
  "function salvaCfg(){const u=document.getElementById('cfg-url').value.trim();if(!u){alert('Inserisci URL');return;}const c=getCfg();c.scriptUrl=u;saveCfgL(c);notif('✓ Configurazione salvata!');}",
  "function salvaCfg(){ notif('NutriGest usa Supabase — nessuna configurazione necessaria'); }"
);
console.log('OK: salvaCfg aggiornato');

// 6. Scrivi
fs.writeFileSync('index.html', html, 'utf8');
console.log('');
console.log('MIGRAZIONE SUPABASE COMPLETATA');
console.log('  push/pull riscritta con API Supabase diretta');
console.log('  Niente piu chunking hash retry timeout');
console.log('  UI impostazioni aggiornata');
