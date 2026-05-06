const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 1. AGGIUNGI CSS per la sezione routine
// ─────────────────────────────────────────────────────────────────────────────
const CSS_TARGET = `.ric-tab.ric-tab-active{color:var(--teal2);border-bottom-color:var(--teal)}`;
const CSS_NEW = `${CSS_TARGET}
/* ── ROUTINE GIORNALIERA TERAPEUTICA ── */
.routine-card{background:#f0faf6;border:1px solid #a8ddc7;border-radius:10px;padding:.75rem 1rem;margin-bottom:.6rem;display:flex;align-items:flex-start;gap:.7rem;}
.routine-card .rc-icon{font-size:1.3rem;flex-shrink:0;margin-top:1px;}
.routine-card .rc-body{flex:1;}
.routine-card .rc-nome{font-weight:600;font-size:.83rem;color:#1a5c42;}
.routine-card .rc-quando{font-size:.74rem;color:#2d7a5a;margin-top:1px;}
.routine-card .rc-razionale{font-size:.72rem;color:var(--text2);margin-top:3px;line-height:1.45;}
.routine-card .rc-actions{display:flex;flex-direction:column;gap:.3rem;flex-shrink:0;}
.routine-tipo-badge{display:inline-block;font-size:.62rem;font-weight:600;text-transform:uppercase;letter-spacing:.5px;padding:1px 6px;border-radius:4px;margin-right:4px;}
.routine-tipo-integratore{background:#e0f2fe;color:#0369a1;}
.routine-tipo-spezia{background:#fef9c3;color:#713f12;}
.routine-tipo-superfood{background:#f0fdf4;color:#166534;}
.routine-lib-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.5rem;margin-top:.7rem;}
.routine-lib-item{background:var(--s1);border:1px solid var(--border);border-radius:8px;padding:.5rem .75rem;cursor:pointer;transition:all .15s;font-size:.78rem;}
.routine-lib-item:hover{border-color:var(--teal);background:var(--teal-bg);}
.routine-lib-item.selected{border-color:var(--teal);background:var(--teal-bg);font-weight:500;}`;

html = html.replace(CSS_TARGET, CSS_NEW);

// ─────────────────────────────────────────────────────────────────────────────
// 2. AGGIUNGI tab "Routine" nella scheda paziente (pd-tabs)
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  `    <button class="pd-tab" onclick="pdTab('ragionamento',this)">💭 Ragionamento</button>
  </div>
  <div class="pd-panel active" id="pd-anamnesi"></div>
  <div class="pd-panel" id="pd-alimenti"></div>
  <div class="pd-panel" id="pd-analisi"></div>
  <div class="pd-panel" id="pd-inbody"></div>
  <div class="pd-panel" id="pd-macros"></div>
  <div class="pd-panel" id="pd-note"></div>
  <div class="pd-panel" id="pd-ragionamento"></div>`,
  `    <button class="pd-tab" onclick="pdTab('ragionamento',this)">💭 Ragionamento</button>
    <button class="pd-tab" onclick="pdTab('routine',this)">🌿 Routine</button>
  </div>
  <div class="pd-panel active" id="pd-anamnesi"></div>
  <div class="pd-panel" id="pd-alimenti"></div>
  <div class="pd-panel" id="pd-analisi"></div>
  <div class="pd-panel" id="pd-inbody"></div>
  <div class="pd-panel" id="pd-macros"></div>
  <div class="pd-panel" id="pd-note"></div>
  <div class="pd-panel" id="pd-ragionamento"></div>
  <div class="pd-panel" id="pd-routine"></div>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. AGGIUNGI renderPdRoutine() e la chiamata in openPaz
// ─────────────────────────────────────────────────────────────────────────────
// 3a. Aggiungi chiamata renderPdRoutine in openPaz
html = html.replace(
  `renderPdMacros(p);renderPdRagionamento(p);`,
  `renderPdMacros(p);renderPdRagionamento(p);renderPdRoutine(p);`
);

// 3b. Aggiungi la funzione renderPdRoutine e la libreria PRIMA di "function saveNote"
const SAVE_NOTE_FN = `function saveNote(v){const p=db.pazienti.find(x=>x.id===currentPazId);if(!p)return;p.note=v;save();}`;

const ROUTINE_CODE = `
// ══════════════════════════════════════════════════════════════════════════════
// ROUTINE GIORNALIERA TERAPEUTICA
// ══════════════════════════════════════════════════════════════════════════════

const LIBRERIA_ROUTINE = [
  // ── INTEGRATORI ──────────────────────────────────────────────────────────
  { nome:'Berberina', dose:'500 mg', quante_volte:2, quando:'30 min prima dei pasti principali', razionale:'Migliora sensibilità insulinica e glicemia post-prandiale', tipo:'integratore' },
  { nome:'Vitamina D3', dose:'2000 UI', quante_volte:1, quando:'Con il pasto principale (meglio con grassi)', razionale:'Supporta immunità, tono muscolare, metabolismo del calcio', tipo:'integratore' },
  { nome:'Omega-3 (EPA/DHA)', dose:'1 g', quante_volte:2, quando:'Durante i pasti', razionale:'Azione antinfiammatoria, supporto cardiovascolare e trigliceridi', tipo:'integratore' },
  { nome:'Magnesio glicinato', dose:'300 mg', quante_volte:1, quando:'La sera prima di dormire', razionale:'Rilassamento muscolare, qualità del sonno, riduzione crampi', tipo:'integratore' },
  { nome:'Probiotico (multistrain)', dose:'10 miliardi UFC', quante_volte:1, quando:'A stomaco vuoto al mattino', razionale:'Ripristino flora intestinale, riduzione gonfiore, immunità', tipo:'integratore' },
  { nome:'Vitamina C', dose:'500 mg', quante_volte:2, quando:'Con i pasti', razionale:'Antiossidante, potenzia assorbimento del ferro, supporto immunitario', tipo:'integratore' },
  { nome:'Zinco', dose:'15 mg', quante_volte:1, quando:'Con il pasto serale', razionale:'Funzione immunitaria, guarigione tessuti, metabolismo proteico', tipo:'integratore' },
  { nome:'Coenzima Q10', dose:'100 mg', quante_volte:1, quando:'Con il pasto principale (con grassi)', razionale:'Energia mitocondriale, antiossidante, cardioprotettivo', tipo:'integratore' },
  { nome:'Vitamina B12 (metilcobalamina)', dose:'1000 mcg', quante_volte:1, quando:'Al mattino a stomaco vuoto', razionale:'Essenziale per vegetariani/vegani, energia neuronale, omocisteina', tipo:'integratore' },
  { nome:'Ferro (bisgliccinato)', dose:'25 mg', quante_volte:1, quando:'A stomaco vuoto con vitamina C', razionale:'Anemia sideropenica, fatica, capacità aerobica', tipo:'integratore' },
  { nome:'Collagene idrolizzato', dose:'10 g', quante_volte:1, quando:'Al mattino a stomaco vuoto', razionale:'Articolazioni, pelle, tendini, recupero post-allenamento', tipo:'integratore' },
  { nome:'Melatonina', dose:'0.5-1 mg', quante_volte:1, quando:'30 min prima di dormire', razionale:'Disturbi del sonno, regolazione ritmo circadiano', tipo:'integratore' },
  // ── SPEZIE TERAPEUTICHE ───────────────────────────────────────────────────
  { nome:'Curcuma + pepe nero', dose:'1 cucchiaino', quante_volte:1, quando:'Con il pasto principale', razionale:'Potente antinfiammatorio (curcumina), il pepe ne aumenta biodisponibilità del 2000%', tipo:'spezia' },
  { nome:'Cannella Ceylon', dose:'½ cucchiaino', quante_volte:1, quando:'Con colazione o nel caffè', razionale:'Regola glicemia post-prandiale, insulinosensibilità', tipo:'spezia' },
  { nome:'Zenzero fresco', dose:'1-2 cm (grattugiato)', quante_volte:1, quando:'Tè mattutino o nelle pietanze', razionale:'Antinausea, digestione, antinfiammatorio, termogenico', tipo:'spezia' },
  { nome:'Aglio crudo', dose:'1 spicchio', quante_volte:1, quando:'A crudo prima del pasto', razionale:'Allicina: antibatterica, cardioprotettiva, abbassa LDL', tipo:'spezia' },
  { nome:'Peperoncino (capsaicina)', dose:'q.b.', quante_volte:1, quando:'Nei pasti', razionale:'Termogenico, migliora circolazione, riduce dolore cronico', tipo:'spezia' },
  { nome:'Fieno greco (semi)', dose:'1 cucchiaino', quante_volte:1, quando:'Ammollo la sera, consumo al mattino', razionale:'Controllo glicemia, colesterolo, aumenta senso di sazietà', tipo:'spezia' },
  // ── SUPERFOOD ────────────────────────────────────────────────────────────
  { nome:'Curcuma liquida (Golden Milk)', dose:'200 ml', quante_volte:1, quando:'La sera come rituale pre-nanna', razionale:'Antinfiammatorio serale, rilassante, sonno di qualità', tipo:'superfood' },
  { nome:'Spirulina', dose:'5 g (1 cucchiaino)', quante_volte:1, quando:'Al mattino con acqua o smoothie', razionale:'Proteine complete, ferro, antiossidanti, detox', tipo:'superfood' },
  { nome:'Semi di chia (ammollo)', dose:'20 g', quante_volte:1, quando:'Notte precedente, consumo a colazione', razionale:'Omega-3, fibra solubile, sazietà prolungata, idratazione', tipo:'superfood' },
  { nome:'Succo di aloe vera', dose:'50 ml', quante_volte:1, quando:'Al mattino a stomaco vuoto', razionale:'Lenitivo intestinale, reflusso, colon irritabile', tipo:'superfood' },
  { nome:'Aceto di mele (madre)', dose:'1 cucchiaio in acqua', quante_volte:1, quando:'15 min prima del pasto principale', razionale:'Abbassa glicemia post-prandiale, digestione, flora intestinale', tipo:'superfood' },
  { nome:'Tè verde matcha', dose:'1-2 g', quante_volte:1, quando:'Metà mattina (non a stomaco vuoto)', razionale:'Catechine antiossidanti, focus mentale, metabolismo lipidico', tipo:'superfood' },
  { nome:'Bacche di goji', dose:'30 g', quante_volte:1, quando:'Come spuntino o nello yogurt', razionale:'Antiossidanti, vitamina C, betacarotene, immunità', tipo:'superfood' },
  { nome:'Cacao amaro 100%', dose:'10 g (1 cucchiaio)', quante_volte:1, quando:'Con colazione o pomeriggio', razionale:'Flavonoidi cardiaci, magnesio, umore, pressione sanguigna', tipo:'superfood' },
  { nome:'Kombucha artigianale', dose:'150-200 ml', quante_volte:1, quando:'Fuori pasto (tra pranzo e cena)', razionale:'Probiotico naturale, detox epatico, digestione', tipo:'superfood' },
  { nome:'Acqua con limone', dose:'200 ml + ½ limone', quante_volte:1, quando:'Al mattino appena svegli', razionale:'Alcalinizzante, vitamina C, digestione epatica mattutina', tipo:'superfood' },
  { nome:'Radice di maca (polvere)', dose:'5 g', quante_volte:1, quando:'Al mattino con colazione', razionale:'Energia, equilibrio ormonale, fertilità, adattogeno', tipo:'superfood' },
  { nome:'Ashwagandha', dose:'300-500 mg estratto', quante_volte:1, quando:'La sera con il pasto', razionale:'Adattogeno: riduce cortisolo, ansia, fatica surrenale', tipo:'superfood' },
  { nome:'Brodo di ossa', dose:'200-300 ml', quante_volte:1, quando:'Al mattino o come base pasti', razionale:'Collagene naturale, glutammina intestinale, mineralizzante', tipo:'superfood' },
  { nome:'Lievito di birra (fiocchi)', dose:'2 cucchiai', quante_volte:1, quando:'Sulle pietanze a crudo', razionale:'Vitamina B complex, cromo, proteine, appetito', tipo:'superfood' },
  { nome:'Kefir', dose:'150 ml', quante_volte:1, quando:'A colazione o spuntino', razionale:'Probiotico potente, calcio, proteine, flora intestinale', tipo:'superfood' },
  { nome:'Semi di lino macinati', dose:'1 cucchiaio', quante_volte:1, quando:'In yogurt o sul pasto', razionale:'Omega-3 ALA, lignani estrogenici, fibra, intestino', tipo:'superfood' },
  { nome:'Aloe vera gel puro', dose:'2 cucchiai', quante_volte:1, quando:'Al mattino a stomaco vuoto', razionale:'Mucosa gastrica, reflusso, IBS, antiinfiammatorio intestinale', tipo:'superfood' },
];

function renderPdRoutine(p) {
  const el = document.getElementById('pd-routine');
  if (!el) return;
  const routine = p.routineGiornaliera || [];

  const tipoLabel = { integratore:'Integratore', spezia:'Spezia', superfood:'Superfood' };

  function cardHTML(voce, idx) {
    const tipoClass = 'routine-tipo-' + voce.tipo;
    const tipoTxt = tipoLabel[voce.tipo] || voce.tipo;
    return \`<div class="routine-card">
      <div class="rc-icon">\${voce.tipo==='integratore'?'💊':voce.tipo==='spezia'?'🌶️':'🌿'}</div>
      <div class="rc-body">
        <div class="rc-nome"><span class="routine-tipo-badge \${tipoClass}">\${tipoTxt}</span>\${voce.nome} · <span style="font-weight:400;color:var(--text2)">\${voce.dose||''}</span></div>
        <div class="rc-quando">⏰ \${voce.quando||(voce.quante_volte>1?voce.quante_volte+'× al giorno':'1× al giorno')}</div>
        \${voce.razionale?\`<div class="rc-razionale">\${voce.razionale}</div>\`:''}
      </div>
      <div class="rc-actions">
        <button class="btn btn-g btn-sm" title="Rimuovi" onclick="removeRoutineVoce(\${idx})">✕</button>
      </div>
    </div>\`;
  }

  const tipiIcone = { integratore:'💊 Integratori', spezia:'🌶️ Spezie', superfood:'🌿 Superfood' };
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
        <div style="font-size:.74rem;color:var(--text2)">Spezie, superfood e integratori personalizzati con timing ottimale</div>
      </div>
      <button class="btn btn-p btn-sm" onclick="openModalRoutine()">＋ Aggiungi voce</button>
    </div>
    \${routine.length ? riepilogoHTML : \`<div class="empty" style="padding:1.5rem;text-align:center;color:var(--text2);font-size:.82rem;background:var(--teal-bg);border-radius:10px;border:1px dashed var(--teal-light)">
      🌿 Nessuna voce aggiunta.<br><span style="font-size:.75rem">Clicca "＋ Aggiungi voce" per personalizzare la routine di \${p.nome}</span>
    </div>\`}
  </div>

  <!-- MODALE AGGIUNTA VOCE inline -->
  <div id="routine-modal" style="display:none;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:1.1rem;margin-bottom:1rem">
    <div style="font-weight:600;font-size:.88rem;margin-bottom:.8rem">➕ Aggiungi voce alla routine</div>
    
    <div style="margin-bottom:.7rem">
      <div style="font-size:.75rem;font-weight:600;color:var(--text2);text-transform:uppercase;margin-bottom:.4rem">Dalla libreria predefinita</div>
      <div style="margin-bottom:.4rem;display:flex;gap:.4rem;flex-wrap:wrap">
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('tutti')" id="flt-tutti" style="border-color:var(--teal);color:var(--teal)">Tutti</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('integratore')" id="flt-integratore">💊 Integratori</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('spezia')" id="flt-spezia">🌶️ Spezie</button>
        <button class="btn btn-g btn-sm" onclick="filtroLibreria('superfood')" id="flt-superfood">🌿 Superfood</button>
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
            <option value="integratore">💊 Integratore</option>
            <option value="spezia">🌶️ Spezia</option>
            <option value="superfood">🌿 Superfood</option>
          </select>
        </div>
        <div><label style="font-size:.73rem;color:var(--text2)">Quando assumerlo</label><input id="rt-quando" class="fg-inp" placeholder="es. A colazione" style="width:100%"></div>
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

  // Renderizza la griglia libreria
  renderLibreriaGrid('tutti');
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
    return \`<div class="routine-lib-item\${presente?' selected':''}" onclick="\${presente?'':'aggiungiDaLibreria('+JSON.stringify(JSON.stringify(v))+')'}" 
      title="\${v.razionale}" style="\${presente?'opacity:.55;cursor:default':''}">
      \${v.tipo==='integratore'?'💊':v.tipo==='spezia'?'🌶️':'🌿'} <strong>\${v.nome}</strong><br>
      <span style="font-size:.7rem;color:var(--text2)">\${v.dose} · \${v.quando.substring(0,35)}\${v.quando.length>35?'...':''}</span>
      \${presente?'<br><span style="font-size:.67rem;color:var(--teal)">✓ già aggiunta</span>':''}
    </div>\`;
  }).join('');
}

function aggiungiDaLibreria(voceStr) {
  const voce = JSON.parse(voceStr);
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p) return;
  if (!p.routineGiornaliera) p.routineGiornaliera = [];
  // evita duplicati
  if (p.routineGiornaliera.find(v => v.nome.toLowerCase() === voce.nome.toLowerCase())) {
    notif('⚠ ' + voce.nome + ' è già nella routine');
    return;
  }
  voce.attivo = true;
  p.routineGiornaliera.push(voce);
  save();
  renderPdRoutine(p);
  openModalRoutine(); // tieni aperto il modal
  notif('✓ ' + voce.nome + ' aggiunto alla routine!');
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
    razionale: document.getElementById('rt-razionale').value.trim(),
    attivo: true
  };
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p) return;
  if (!p.routineGiornaliera) p.routineGiornaliera = [];
  p.routineGiornaliera.push(voce);
  save();
  renderPdRoutine(p);
  notif('✓ ' + nome + ' aggiunto!');
}

function removeRoutineVoce(idx) {
  const p = db.pazienti.find(x => x.id === currentPazId);
  if (!p || !p.routineGiornaliera) return;
  const nome = p.routineGiornaliera[idx]?.nome || '';
  p.routineGiornaliera.splice(idx, 1);
  save();
  renderPdRoutine(p);
  notif('✓ ' + nome + ' rimosso dalla routine');
}

${SAVE_NOTE_FN}`;

html = html.replace(SAVE_NOTE_FN, ROUTINE_CODE);

// ─────────────────────────────────────────────────────────────────────────────
// 4. AGGIORNA la struttura dati paziente in salvaPaz (preserva routineGiornaliera)
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  `pd.regolePiano=_old.regolePiano||{};pd.macrosTarget=_old.macrosTarget||null;pd.ragionamentoClinico=_old.ragionamentoClinico||null;pd.rifCalcolo=_old.rifCalcolo||'auto';pd.alimenti=_old.alimenti||{};pd.regolaAttive=_old.regolaAttive||[];db.pazienti[idx]=pd;`,
  `pd.regolePiano=_old.regolePiano||{};pd.macrosTarget=_old.macrosTarget||null;pd.ragionamentoClinico=_old.ragionamentoClinico||null;pd.rifCalcolo=_old.rifCalcolo||'auto';pd.alimenti=_old.alimenti||{};pd.regolaAttive=_old.regolaAttive||[];pd.routineGiornaliera=_old.routineGiornaliera||[];db.pazienti[idx]=pd;`
);

// Nuovo paziente: inizializza routineGiornaliera vuota
html = html.replace(
  `pd.id=uid();pd.inbody=[];pd.note='';pd.analisiSangue={};pd.creato=today();db.pazienti.push(pd);`,
  `pd.id=uid();pd.inbody=[];pd.note='';pd.analisiSangue={};pd.routineGiornaliera=[];pd.creato=today();db.pazienti.push(pd);`
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. PDF — mini-sezione verde menta dopo i pasti di ciascun giorno
// ─────────────────────────────────────────────────────────────────────────────
// Inserisci la sezione routine nel ciclo PDF, dopo il disegno dei pasti
const PDF_PASTI_END = `  // ---------- Concetti educativi (in coda, opzionali) ----------`;
const PDF_ROUTINE_SECTION = `  // ---------- ROUTINE GIORNALIERA — mini sezione verde menta (primo giorno only) ----------
  var routineVoci = (paziente.routineGiornaliera || []).filter(function(v){ return v.attivo !== false; });
  if (routineVoci.length) {
    // Mostra la routine solo nella prima pagina, dopo i pasti del giorno 1
    // (è uguale per tutti i giorni — non ha senso ripeterla)
    // La sezione è già stata disegnata nel primo giorno — skip per successivi
  }

  // ---------- Concetti educativi (in coda, opzionali) ----------`;

// Invece inseriamo la routine come pagina dedicata DOPO i giorni e PRIMA dei concetti
const PDF_AFTER_GIORNI = `  // ---------- Concetti educativi (in coda, opzionali) ----------
  var concetti = paziente.concetti || [];`;
const PDF_WITH_ROUTINE = `  // ---------- ROUTINE GIORNALIERA — pagina verde menta ----------
  var routineVoci = (paziente.routineGiornaliera || []).filter(function(v){ return v.attivo !== false; });
  if (routineVoci.length) {
    doc.addPage();
    // Sfondo intestazione verde menta
    doc.setFillColor(212, 245, 233);
    doc.rect(0, 0, W, 22, 'F');
    setFont('bold', 13, [20, 110, 80]);
    doc.text('🌿 Routine Giornaliera Terapeutica', W / 2, 13, { align: 'center' });
    setFont('normal', 8, [50, 130, 95]);
    doc.text('Spezie, superfood e integratori da integrare ogni giorno', W / 2, 18.5, { align: 'center' });

    var yr = 28;
    var tipiOrdine = ['integratore', 'spezia', 'superfood'];
    var tipiLabel = { integratore: '💊 Integratori', spezia: '🌶️ Spezie terapeutiche', superfood: '🌿 Superfood' };

    tipiOrdine.forEach(function(tipo) {
      var voci = routineVoci.filter(function(v){ return v.tipo === tipo; });
      if (!voci.length) return;

      if (yr > BOTTOM - 20) { doc.addPage(); yr = TOP_HEADER + 4; }

      // Header categoria
      setFont('bold', 9, [20, 110, 80]);
      doc.text(safe(tipiLabel[tipo] || tipo), M, yr);
      yr += 1.5;
      doc.setDrawColor(180, 230, 210);
      doc.setLineWidth(0.25);
      doc.line(M, yr, W - M, yr);
      yr += 4;

      voci.forEach(function(v) {
        if (yr > BOTTOM - 14) { doc.addPage(); yr = TOP_HEADER + 4; }

        // Box singola voce
        var boxH = v.razionale ? 14 : 10;
        doc.setFillColor(240, 250, 246);
        doc.setDrawColor(168, 221, 199);
        doc.roundedRect(M, yr - 4, W - M * 2, boxH, 2, 2, 'FD');

        // Nome + dose
        setFont('bold', 9.5, [15, 80, 55]);
        doc.text(safe(v.nome), M + 3, yr + 1);
        if (v.dose) {
          setFont('normal', 8, [80, 140, 110]);
          doc.text(safe('· ' + v.dose), M + 3 + doc.getTextWidth(safe(v.nome)) + 1, yr + 1);
        }

        // Quando
        if (v.quando) {
          setFont('normal', 7.5, [60, 120, 90]);
          doc.text(safe('⏰ ' + v.quando), M + 3, yr + 5.5);
        }

        // Razionale
        if (v.razionale) {
          setFont('normal', 7, [100, 100, 100]);
          var lines = doc.splitTextToSize(safe(v.razionale), W - M * 2 - 6);
          lines.slice(0, 1).forEach(function(l) {
            doc.text(l, M + 3, yr + 9.5);
          });
        }

        yr += boxH + 3;
      });
      yr += 3;
    });
  }

  // ---------- Concetti educativi (in coda, opzionali) ----------
  var concetti = paziente.concetti || [];`;

html = html.replace(PDF_AFTER_GIORNI, PDF_WITH_ROUTINE);

// ─────────────────────────────────────────────────────────────────────────────
// 6. Aggiungi .fg-inp se non c'è già (stile input riutilizzabile)
// ─────────────────────────────────────────────────────────────────────────────
if (!html.includes('.fg-inp{')) {
  html = html.replace(
    `.routine-lib-item.selected{border-color:var(--teal);background:var(--teal-bg);font-weight:500;}`,
    `.routine-lib-item.selected{border-color:var(--teal);background:var(--teal-bg);font-weight:500;}
.fg-inp{padding:.3rem .6rem;border:1px solid var(--border);border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.8rem;outline:none;background:var(--s1);color:var(--text);width:100%;}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCRITTURA
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Patch routine giornaliera applicata con successo!');
console.log('   → Tab "🌿 Routine" aggiunta nella scheda paziente');
console.log('   → Libreria 35 voci (integratori, spezie, superfood)');
console.log('   → Modello dati p.routineGiornaliera[] inizializzato');
console.log('   → Pagina PDF verde menta con layout per tipo');
