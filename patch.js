const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ═════════════════════════════════════════════════════════════════════════════
// 1. RIMUOVO la pagina dedicata routine dal PDF (ora va accanto ai titoli pasto)
// ═════════════════════════════════════════════════════════════════════════════
const PDF_PAGINA_DEDICATA_START = `  // ---------- ROUTINE GIORNALIERA — pagina verde menta ----------`;
const PDF_PAGINA_DEDICATA_END = `  // ---------- Concetti educativi (in coda, opzionali) ----------
  var concetti = paziente.concetti || [];`;

const startIdx = html.indexOf(PDF_PAGINA_DEDICATA_START);
const endIdx = html.indexOf(PDF_PAGINA_DEDICATA_END);
if (startIdx === -1 || endIdx === -1) {
  console.error('❌ Non trovo la pagina dedicata routine PDF da rimuovere');
  process.exit(1);
}
html = html.substring(0, startIdx) + PDF_PAGINA_DEDICATA_END + html.substring(endIdx + PDF_PAGINA_DEDICATA_END.length);
console.log('✅ Pagina dedicata routine PDF rimossa');

// ═════════════════════════════════════════════════════════════════════════════
// 2. RISCRIVO IL BLOCCO renderPdRoutine() E FUNZIONI CORRELATE
// ═════════════════════════════════════════════════════════════════════════════
const OLD_BLOCK_START = `function renderPdRoutine(p) {`;
const OLD_BLOCK_END_MARKER = `function saveNote(v){const p=db.pazienti.find(x=>x.id===currentPazId);if(!p)return;p.note=v;save();}`;

const oldStartIdx = html.indexOf(OLD_BLOCK_START);
const oldEndIdx = html.indexOf(OLD_BLOCK_END_MARKER);
if (oldStartIdx === -1 || oldEndIdx === -1) {
  console.error('❌ Non trovo il blocco renderPdRoutine da sostituire');
  process.exit(1);
}

const NEW_ROUTINE_BLOCK = `function renderPdRoutine(p) {
  const el = document.getElementById('pd-routine');
  if (!el) return;
  const routine = p.routineGiornaliera || [];

  const tipoLabel = { integratore:'INTEGR.', spezia:'SPEZIA', superfood:'SUPERFOOD' };
  const slotLabelUI = { 
    colazione:'Colazione', 
    spuntino_mattina:'Sp. mattina', 
    pranzo:'Pranzo', 
    spuntino_pomeriggio:'Sp. pomeriggio', 
    cena:'Cena', 
    pre_nanna:'Pre-nanna' 
  };

  function cardHTML(voce, idx) {
    const tipoClass = 'routine-tipo-' + voce.tipo;
    const tipoTxt = tipoLabel[voce.tipo] || voce.tipo;
    return \`<div class="routine-card">
      <div class="rc-body" style="flex:1">
        <div class="rc-nome"><span class="routine-tipo-badge \${tipoClass}">\${tipoTxt}</span>\${voce.nome} · <span style="font-weight:400;color:var(--text2)">\${voce.dose||''}</span></div>
        <div style="display:flex;gap:.5rem;margin-top:6px;flex-wrap:wrap;align-items:center">
          <select onchange="updateRoutineCampo(\${idx},'quandoRif',this.value)" style="padding:.2rem .4rem;border:1px solid #a8ddc7;border-radius:5px;font-size:.7rem;background:#f0faf6">
            <option value="prima"\${voce.quandoRif==='prima'?' selected':''}>Prima di</option>
            <option value="durante"\${voce.quandoRif==='durante'?' selected':''}>Durante</option>
            <option value="dopo"\${voce.quandoRif==='dopo'?' selected':''}>Dopo</option>
          </select>
          <select onchange="updateRoutineCampo(\${idx},'pastoRif',this.value)" style="padding:.2rem .4rem;border:1px solid #a8ddc7;border-radius:5px;font-size:.7rem;background:#f0faf6">
            <option value="">— Scegli pasto —</option>
            <option value="colazione"\${voce.pastoRif==='colazione'?' selected':''}>Colazione</option>
            <option value="spuntino_mattina"\${voce.pastoRif==='spuntino_mattina'?' selected':''}>Spuntino mattina</option>
            <option value="pranzo"\${voce.pastoRif==='pranzo'?' selected':''}>Pranzo</option>
            <option value="spuntino_pomeriggio"\${voce.pastoRif==='spuntino_pomeriggio'?' selected':''}>Spuntino pomeriggio</option>
            <option value="cena"\${voce.pastoRif==='cena'?' selected':''}>Cena</option>
            <option value="pre_nanna"\${voce.pastoRif==='pre_nanna'?' selected':''}>Pre-nanna</option>
          </select>
          \${!voce.pastoRif?'<span style="font-size:.68rem;color:#c2410c">⚠ Non apparirà nel PDF</span>':'<span style="font-size:.68rem;color:#15803d">✓ Apparirà nel PDF</span>'}
        </div>
        \${voce.razionale?\`<div class="rc-razionale" style="margin-top:5px">\${voce.razionale}</div>\`:''}
        <div style="font-size:.66rem;color:var(--text3);margin-top:3px;font-style:italic">\${voce.quando||''}</div>
      </div>
      <div class="rc-actions">
        <button class="btn btn-g btn-sm" title="Rimuovi" onclick="removeRoutineVoce(\${idx})">✕</button>
      </div>
    </div>\`;
  }

  const tipiIcone = { integratore:'Integratori', spezia:'Spezie terapeutiche', superfood:'Superfood' };
  const perTipo = { integratore:[], spezia:[], superfood:[] };
  routine.forEach((v,i) => { if(perTipo[v.tipo]) perTipo[v.tipo].push({v,i}); });

  let riepilogoHTML = '';
  Object.keys(perTipo).forEach(tipo => {
    if (!perTipo[tipo].length) return;
    riepilogoHTML += \`<div style="margin-bottom:1rem"><div style="font-size:.75rem;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.4rem">\${tipiIcone[tipo]}</div>\`;
    perTipo[tipo].forEach(({v,i}) => { riepilogoHTML += cardHTML(v, i); });
    riepilogoHTML += '</div>';
  });

  el.innerHTML = \`
  <div style="margin-bottom:1rem">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:.8rem">
      <div>
        <div style="font-family:'DM Serif Display',serif;font-size:1rem;margin-bottom:2px">Routine giornaliera terapeutica</div>
        <div style="font-size:.74rem;color:var(--text2)">Le voci appariranno nel PDF accanto al titolo del pasto associato</div>
      </div>
      <button class="btn btn-p btn-sm" onclick="openModalRoutine()">+ Aggiungi voce</button>
    </div>
    \${routine.length ? riepilogoHTML : \`<div class="empty" style="padding:1.5rem;text-align:center;color:var(--text2);font-size:.82rem;background:#f0faf6;border-radius:10px;border:1px dashed #a8ddc7">
      Nessuna voce aggiunta.<br><span style="font-size:.75rem">Clicca "+ Aggiungi voce" per personalizzare la routine di \${p.nome}</span>
    </div>\`}
  </div>

  <!-- MODALE AGGIUNTA VOCE inline -->
  <div id="routine-modal" style="display:none;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:1.1rem;margin-bottom:1rem">
    <div style="font-weight:600;font-size:.88rem;margin-bottom:.8rem">+ Aggiungi voce alla routine</div>
    
    <div style="margin-bottom:.7rem">
      <div style="font-size:.75rem;font-weight:600;color:var(--text2);text-transform:uppercase;margin-bottom:.4rem">Dalla libreria predefinita</div>
      <div style="margin-bottom:.4rem;display:flex;gap:.4rem;flex-wrap:wrap">
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('tutti')" id="flt-tutti" style="border-color:var(--teal);color:var(--teal)">Tutti</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('integratore')" id="flt-integratore">Integratori</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('spezia')" id="flt-spezia">Spezie</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('superfood')" id="flt-superfood">Superfood</button>
      </div>
      <div id="routine-lib-grid" class="routine-lib-grid"></div>
    </div>

    <div style="border-top:1px solid var(--border);padding-top:.7rem;margin-top:.4rem">
      <div style="font-size:.75rem;font-weight:600;color:var(--text2);text-transform:uppercase;margin-bottom:.5rem">Oppure aggiungi manuale</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem">
        <div><label style="font-size:.73rem;color:var(--text2)">Nome *</label><input id="rt-nome" class="fg-inp" placeholder="es. Ashwagandha" style="width:100%"></div>
        <div><label style="font-size:.73rem;color:var(--text2)">Dose</label><input id="rt-dose" class="fg-inp" placeholder="es. 300 mg" style="width:100%"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem">
        <div><label style="font-size:.73rem;color:var(--text2)">Tipo</label>
          <select id="rt-tipo" style="width:100%;padding:.3rem .5rem;border:1px solid var(--border);border-radius:6px;font-size:.8rem">
            <option value="integratore">Integratore</option>
            <option value="spezia">Spezia</option>
            <option value="superfood">Superfood</option>
          </select>
        </div>
        <div><label style="font-size:.73rem;color:var(--text2)">Quando assumerlo (testo libero)</label><input id="rt-quando" class="fg-inp" placeholder="es. A colazione" style="width:100%"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem">
        <div><label style="font-size:.73rem;color:var(--text2)">Quando rispetto al pasto</label>
          <select id="rt-quandoRif" style="width:100%;padding:.3rem .5rem;border:1px solid var(--border);border-radius:6px;font-size:.8rem">
            <option value="prima">Prima di</option>
            <option value="durante">Durante</option>
            <option value="dopo">Dopo</option>
          </select>
        </div>
        <div><label style="font-size:.73rem;color:var(--text2)">Pasto di riferimento</label>
          <select id="rt-pastoRif" style="width:100%;padding:.3rem .5rem;border:1px solid var(--border);border-radius:6px;font-size:.8rem">
            <option value="">— Scegli pasto —</option>
            <option value="colazione">Colazione</option>
            <option value="spuntino_mattina">Spuntino mattina</option>
            <option value="pranzo">Pranzo</option>
            <option value="spuntino_pomeriggio">Spuntino pomeriggio</option>
            <option value="cena">Cena</option>
            <option value="pre_nanna">Pre-nanna</option>
          </select>
        </div>
      </div>
      <div style="margin-bottom:.5rem"><label style="font-size:.73rem;color:var(--text2)">Razionale clinico</label>
        <input id="rt-razionale" class="fg-inp" placeholder="es. Migliora sensibilità insulinica" style="width:100%">
      </div>
      <div style="display:flex;gap:.5rem;justify-content:flex-end">
        <button class="btn btn-g btn-sm" onclick="document.getElementById('routine-modal').style.display='none'">Annulla</button>
        <button class="btn btn-p btn-sm" onclick="salvaRoutineVoce()">Aggiungi</button>
      </div>
    </div>
  </div>
  \`;

  renderLibreriaGrid('tutti');
}

function updateRoutineCampo(idx, campo, valore) {
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p || !p.routineGiornaliera || !p.routineGiornaliera[idx]) return;
  p.routineGiornaliera[idx][campo] = valore;
  save();
  renderPdRoutine(p);
}

function suggerisciPastoEQuando(testoQuando) {
  const t = (testoQuando || '').toLowerCase();
  if (/sera|prima di dormire|pre[ -]?nanna|notte|notturn/.test(t)) return { quandoRif:'prima', pastoRif:'pre_nanna' };
  if (/mattin|appena svegli|risveglio|stomaco vuoto.*mattin/.test(t)) return { quandoRif:'prima', pastoRif:'colazione' };
  if (/colazione/.test(t)) {
    if (/prima/.test(t)) return { quandoRif:'prima', pastoRif:'colazione' };
    if (/dopo/.test(t)) return { quandoRif:'dopo', pastoRif:'colazione' };
    return { quandoRif:'durante', pastoRif:'colazione' };
  }
  if (/met[aà] mattin|mid[ -]morning|spuntino.*mattin/.test(t)) return { quandoRif:'durante', pastoRif:'spuntino_mattina' };
  if (/pranzo/.test(t)) {
    if (/prima/.test(t)) return { quandoRif:'prima', pastoRif:'pranzo' };
    if (/dopo/.test(t)) return { quandoRif:'dopo', pastoRif:'pranzo' };
    return { quandoRif:'durante', pastoRif:'pranzo' };
  }
  if (/pomerigg|met[aà] pomer/.test(t)) return { quandoRif:'durante', pastoRif:'spuntino_pomeriggio' };
  if (/cena|pasto serale/.test(t)) {
    if (/prima/.test(t)) return { quandoRif:'prima', pastoRif:'cena' };
    if (/dopo/.test(t)) return { quandoRif:'dopo', pastoRif:'cena' };
    return { quandoRif:'durante', pastoRif:'cena' };
  }
  if (/prima.*pasti principali/.test(t)) return { quandoRif:'prima', pastoRif:'pranzo' };
  if (/pasto principale/.test(t)) return { quandoRif:'durante', pastoRif:'pranzo' };
  return { quandoRif:'durante', pastoRif:'' };
}

let _fltLibreria = 'tutti';
function filtroLibreria(tipo) {
  _fltLibreria = tipo;
  ['tutti','integratore','spezia','superfood'].forEach(t => {
    const b = document.getElementById('flt-' + t);
    if (b) { b.style.borderColor = t===tipo ? 'var(--teal)' : ''; b.style.color = t===tipo ? 'var(--teal)' : ''; }
  });
  renderLibreriaGrid(tipo);
}

function renderLibreriaGrid(tipo) {
  const p = db.pazienti.find(x => x.id === currentPazId);
  const routine = p ? (p.routineGiornaliera || []) : [];
  const nomiGiaPresenti = new Set(routine.map(v => v.nome.toLowerCase()));
  const grid = document.getElementById('routine-lib-grid');
  if (!grid) return;
  const filtrati = LIBRERIA_ROUTINE.filter(v => tipo === 'tutti' || v.tipo === tipo);
  grid.innerHTML = filtrati.map(v => {
    const presente = nomiGiaPresenti.has(v.nome.toLowerCase());
    const realIdx = LIBRERIA_ROUTINE.indexOf(v);
    return \`<div class="routine-lib-item\${presente?' selected':''}" 
      \${presente?'':\`onclick="aggiungiDaLibreriaIdx(\${realIdx})"\`}
      title="\${(v.razionale||'').replace(/"/g,'&quot;')}" 
      style="\${presente?'opacity:.55;cursor:default':''}">
      <strong>\${v.nome}</strong><br>
      <span style="font-size:.7rem;color:var(--text2)">\${v.dose} · \${v.quando.substring(0,35)}\${v.quando.length>35?'...':''}</span>
      \${presente?'<br><span style="font-size:.67rem;color:var(--teal)">✓ già aggiunta</span>':''}
    </div>\`;
  }).join('');
}

function aggiungiDaLibreriaIdx(idx) {
  const voceLib = LIBRERIA_ROUTINE[idx];
  if (!voceLib) { notif('⚠ Voce non trovata'); return; }
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p) return;
  if (!p.routineGiornaliera) p.routineGiornaliera = [];
  if (p.routineGiornaliera.find(v => v.nome.toLowerCase() === voceLib.nome.toLowerCase())) {
    notif('⚠ ' + voceLib.nome + ' è già nella routine');
    return;
  }
  const sugg = suggerisciPastoEQuando(voceLib.quando);
  const voce = Object.assign({}, voceLib, { 
    attivo: true, 
    quandoRif: sugg.quandoRif, 
    pastoRif: sugg.pastoRif 
  });
  p.routineGiornaliera.push(voce);
  save();
  renderPdRoutine(p);
  const m = document.getElementById('routine-modal');
  if (m) m.style.display = 'block';
  notif('✓ ' + voce.nome + ' aggiunto!');
}

function openModalRoutine() {
  const m = document.getElementById('routine-modal');
  if (!m) return;
  m.style.display = m.style.display === 'none' ? 'block' : 'none';
  if (m.style.display === 'block') renderLibreriaGrid(_fltLibreria);
}

function salvaRoutineVoce() {
  const nome = (document.getElementById('rt-nome').value || '').trim();
  if (!nome) { notif('⚠ Inserisci almeno il nome'); return; }
  const voce = {
    nome,
    dose: document.getElementById('rt-dose').value.trim(),
    tipo: document.getElementById('rt-tipo').value,
    quando: document.getElementById('rt-quando').value.trim(),
    quandoRif: document.getElementById('rt-quandoRif').value,
    pastoRif: document.getElementById('rt-pastoRif').value,
    razionale: document.getElementById('rt-razionale').value.trim(),
    attivo: true
  };
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p) return;
  if (!p.routineGiornaliera) p.routineGiornaliera = [];
  p.routineGiornaliera.push(voce);
  save();
  renderPdRoutine(p);
  ['rt-nome','rt-dose','rt-quando','rt-razionale'].forEach(id => {
    const e = document.getElementById(id); if (e) e.value = '';
  });
  notif('✓ ' + nome + ' aggiunto!');
}

function removeRoutineVoce(idx) {
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p || !p.routineGiornaliera) return;
  const nome = p.routineGiornaliera[idx]?.nome || '';
  p.routineGiornaliera.splice(idx, 1);
  save();
  renderPdRoutine(p);
  notif('✓ ' + nome + ' rimosso');
}

`;

html = html.substring(0, oldStartIdx) + NEW_ROUTINE_BLOCK + html.substring(oldEndIdx);
console.log('✅ Blocco renderPdRoutine + funzioni correlate sostituito');

// ═════════════════════════════════════════════════════════════════════════════
// 3. AGGIUNGO LE RIGHE ROUTINE NEL PDF accanto al titolo pasto
// ═════════════════════════════════════════════════════════════════════════════
const OLD_DRAWPASTO_TITLE = `    // Titolo pasto: barra teal verticale + label bold 11pt nero
    doc.setFillColor.apply(doc, TEAL);
    doc.rect(M, y - 3.2, 1.1, 4.2, 'F');
    setFont('bold', 11, NERO);
    doc.text(slotLabel[slotKey] || slotKey.toUpperCase(), M + 2.6, y);
    y += 5.6;`;

const NEW_DRAWPASTO_TITLE = `    // Titolo pasto: barra teal verticale + label bold 11pt nero
    doc.setFillColor.apply(doc, TEAL);
    doc.rect(M, y - 3.2, 1.1, 4.2, 'F');
    setFont('bold', 11, NERO);
    var titoloPasto = slotLabel[slotKey] || slotKey.toUpperCase();
    doc.text(titoloPasto, M + 2.6, y);

    // ── ROUTINE: voci associate a questo pasto, accanto al titolo a destra ──
    var routineDelPasto = ((paziente.routineGiornaliera || []).filter(function(v){
      return v.attivo !== false && v.pastoRif === slotKey;
    }));
    var hRoutineExtra = 0;
    if (routineDelPasto.length) {
      var quandoLbl = { prima:'Prima:', durante:'Durante:', dopo:'Dopo:' };
      var perQuando = { prima:[], durante:[], dopo:[] };
      routineDelPasto.forEach(function(v){
        var q = v.quandoRif || 'durante';
        if (perQuando[q]) perQuando[q].push(v);
      });
      var righeRoutine = [];
      ['prima','durante','dopo'].forEach(function(q){
        if (!perQuando[q].length) return;
        perQuando[q].forEach(function(v){
          var txt = '+ ' + quandoLbl[q] + ' ' + safe(v.nome);
          if (v.dose) txt += ' ' + safe(v.dose);
          righeRoutine.push(txt);
        });
      });
      var VERDE_MENTA_SCURO = [15, 92, 66];
      setFont('normal', 7.5, VERDE_MENTA_SCURO);
      var titoloW = doc.getTextWidth(titoloPasto);
      var xRoutineStart = M + 2.6 + titoloW + 6;
      var maxW = W - M - xRoutineStart;
      var rigaCorrente = '';
      var righeFinali = [];
      righeRoutine.forEach(function(r){
        var test = rigaCorrente ? (rigaCorrente + '   ' + r) : r;
        if (doc.getTextWidth(test) <= maxW) {
          rigaCorrente = test;
        } else {
          if (rigaCorrente) righeFinali.push(rigaCorrente);
          rigaCorrente = r;
        }
      });
      if (rigaCorrente) righeFinali.push(rigaCorrente);
      var righeStampate = righeFinali.slice(0, 2);
      righeStampate.forEach(function(r, i){
        doc.text(r, xRoutineStart, y + (i * 3.6));
      });
      hRoutineExtra = Math.max(0, righeStampate.length * 3.6 - 5.6);
    }
    y += 5.6 + hRoutineExtra;`;

if (html.indexOf(OLD_DRAWPASTO_TITLE) === -1) {
  console.error('❌ Non trovo il blocco "Titolo pasto" in drawPasto');
  process.exit(1);
}
html = html.replace(OLD_DRAWPASTO_TITLE, NEW_DRAWPASTO_TITLE);
console.log('✅ drawPasto modificato per disegnare routine accanto al titolo');

// ═════════════════════════════════════════════════════════════════════════════
// 4. AGGIORNO measurePasto per tener conto dell'altezza extra delle righe routine
// ═════════════════════════════════════════════════════════════════════════════
const OLD_MEASURE_TITLE = `    var h = 0;
    // Titolo pasto (slot label)
    h += 5.2;`;

const NEW_MEASURE_TITLE = `    var h = 0;
    // Titolo pasto (slot label) + eventuale altezza extra per righe routine
    h += 5.2;
    var routineDelPastoMis = ((paziente.routineGiornaliera || []).filter(function(v){
      return v.attivo !== false && v.pastoRif === slotKey;
    }));
    if (routineDelPastoMis.length > 3) h += 3.6;`;

if (html.indexOf(OLD_MEASURE_TITLE) === -1) {
  console.error('❌ Non trovo il blocco titolo in measurePasto');
  process.exit(1);
}
html = html.replace(OLD_MEASURE_TITLE, NEW_MEASURE_TITLE);
console.log('✅ measurePasto aggiornato per tener conto altezza routine');

// ═════════════════════════════════════════════════════════════════════════════
// 5. SCRITTURA FINALE
// ═════════════════════════════════════════════════════════════════════════════
fs.writeFileSync('index.html', html, 'utf8');
console.log('');
console.log('🎉 PATCH v2 APPLICATA CON SUCCESSO');
console.log('   ✅ Click libreria fixato (uso indice invece di JSON)');
console.log('   ✅ Menu Quando/Pasto aggiunto a ogni voce routine');
console.log('   ✅ Suggerimento automatico pastoRif dal testo "quando"');
console.log('   ✅ Routine nel PDF accanto al titolo pasto (verde menta scuro)');
console.log('   ✅ Pagina dedicata routine PDF rimossa');
console.log('   ✅ Reset campi form dopo "Aggiungi manuale"');
