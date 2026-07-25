// ── S2 — P122 Tappa 1: traguardo dalla composizione corporea ──
// Fissa il contratto su:
//  - _traguardoSoglie: soglie diverse per sesso, NIENTE ripiego se il sesso manca;
//  - _traguardoMisura: misurazione più recente (array ordinato per data, P120)
//    e ripieghi espliciti sulla massa magra (m → peso−grassa → peso×(1−%grassa));
//  - calcolaTraguardoComposizione: aritmetica dei due scenari (magra conservata /
//    quota di magra persa), direzione, fascia, avvisi e blocco sul grasso essenziale;
//  - _traguardoScrivi: UNICO punto di scrittura — storico che non si sovrascrive
//    mai e p.pesoTarget come specchio derivato;
//  - _pazPreservaCampi (F5): la modifica dell'anagrafica non cancella i campi
//    che il form non gestisce (percorso, referti, richieste analisi…).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
function inWin(obj){ return win.eval('(' + JSON.stringify(obj) + ')'); }

// Paziente di riferimento del ragionamento: 92 kg, massa magra 68, grasso 24 (26.1%).
const PAZ_M = {
  sesso: 'M', altezza: 178,
  inbody: [
    { id:'a', data:'2026-01-10', peso:98, m:69, g:29, pg:29.6, altezza:178 },
    { id:'b', data:'2026-05-12', peso:92, m:68, g:24, pg:26.1, altezza:178 }
  ]
};

test('TRAGUARDO — soglie diverse per sesso, nessun ripiego se il sesso manca', () => {
  assert.strictEqual(win._traguardoSoglie(''), null, 'sesso vuoto → niente calcolo');
  assert.strictEqual(win._traguardoSoglie(null), null);
  assert.strictEqual(win._traguardoSoglie('X'), null, 'valore non previsto → niente calcolo');
  const m = win._traguardoSoglie('M'), f = win._traguardoSoglie('f');
  assert.strictEqual(m.blocco, 6);
  assert.strictEqual(f.blocco, 14, 'la donna ha una soglia di grasso essenziale più alta');
  assert.ok(f.avviso > m.avviso, 'e anche la soglia di avviso');
});

test('TRAGUARDO — la misurazione di riferimento è l\'ultima dell\'array (ordinato per data, P120)', () => {
  const mis = win._traguardoMisura(inWin(PAZ_M));
  assert.strictEqual(mis.peso, 92);
  assert.strictEqual(mis.m, 68);
  assert.strictEqual(mis.data, '2026-05-12');
});

test('TRAGUARDO — massa magra: ripieghi su peso−grassa e su %grassa', () => {
  const soloG = win._traguardoMisura(inWin({ inbody:[{ peso:80, g:20 }] }));
  assert.strictEqual(soloG.m, 60, 'massa magra dedotta da peso − massa grassa');
  const soloPg = win._traguardoMisura(inWin({ inbody:[{ peso:80, pg:25 }] }));
  assert.strictEqual(soloPg.m, 60, 'massa magra dedotta dalla % di grasso');
  assert.strictEqual(win._traguardoMisura(inWin({ inbody:[{ peso:80 }] })), null, 'senza composizione non si calcola');
  assert.strictEqual(win._traguardoMisura(inWin({})), null);
});

test('TRAGUARDO — scenario ottimista: massa magra / (1 − %target)', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.ottimista.peso, 77.3, '68 / 0.88 = 77.27');
  assert.strictEqual(r.ottimista.m, 68, 'la massa magra resta quella di partenza');
  assert.ok(Math.abs(r.ottimista.g - 9.3) < 0.11, 'massa grassa obiettivo ~9.3 kg');
});

test('TRAGUARDO — scenario realistico: il 20% del calo è massa magra', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  assert.strictEqual(r.realeApplicabile, true);
  assert.strictEqual(r.realistico.peso, 72.9, 'X = (68 − 0.88×92)/(0.20 − 0.88) = 19.06 kg persi');
  assert.ok(Math.abs(r.realistico.m - 64.2) < 0.11, 'massa magra finale ~64.2 kg');
  // il vincolo deve tornare: la magra finale è l'88% del peso finale
  assert.ok(Math.abs(r.realistico.m / r.realistico.peso - 0.88) < 0.005, 'la % di grasso finale è davvero il 12%');
  assert.strictEqual(r.fascia[0], 72.9, 'il traguardo è una fascia, non un punto: bordo prudente');
  assert.strictEqual(r.fascia[1], 77.3, 'bordo ottimista');
});

test('TRAGUARDO — proteggere la massa magra alza il traguardo (quota più bassa)', () => {
  const q10 = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 10);
  const q30 = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 30);
  assert.ok(q10.realistico.peso > q30.realistico.peso, 'meno magra persa → peso finale più alto');
  const q0 = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 0);
  assert.strictEqual(q0.realistico.peso, q0.ottimista.peso, 'quota 0 → i due scenari coincidono');
});

test('TRAGUARDO — grasso essenziale: blocco sotto soglia, avviso appena sopra', () => {
  const bloc = win.calcolaTraguardoComposizione(inWin(PAZ_M), 4, 20);
  assert.strictEqual(bloc.ok, true, 'i numeri si mostrano comunque…');
  assert.strictEqual(bloc.bloccato, true, '…ma il traguardo non è impostabile');
  assert.ok(bloc.avvisi.some(a => a.liv === 'blocco'));
  const avv = win.calcolaTraguardoComposizione(inWin(PAZ_M), 8, 20);
  assert.strictEqual(avv.bloccato, false);
  assert.ok(avv.avvisi.some(a => a.liv === 'avviso'), '8% uomo → avviso, non blocco');
  const ok = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  assert.ok(!ok.avvisi.some(a => a.liv === 'blocco' || a.liv === 'avviso'), '12% uomo → nessun allarme');
});

test('TRAGUARDO — la soglia femminile è diversa: il 12% della donna è un blocco', () => {
  const paz = Object.assign({}, PAZ_M, { sesso:'F' });
  const f12 = win.calcolaTraguardoComposizione(inWin(paz), 12, 20);
  assert.strictEqual(f12.bloccato, true, '12% su una donna è grasso essenziale, non un obiettivo');
  const f15 = win.calcolaTraguardoComposizione(inWin(paz), 15, 20);
  assert.ok(f15.avvisi.some(a => a.liv === 'avviso'), '15% donna → avviso');
  const f22 = win.calcolaTraguardoComposizione(inWin(paz), 22, 20);
  assert.strictEqual(f22.bloccato, false);
  assert.ok(!f22.avvisi.some(a => a.liv === 'avviso'), '22% donna → equivalente del 12% maschile');
});

test('TRAGUARDO — senza sesso o senza InBody il motore si ferma e dice perché', () => {
  const senzaSesso = win.calcolaTraguardoComposizione(inWin({ inbody:PAZ_M.inbody }), 12, 20);
  assert.strictEqual(senzaSesso.ok, false);
  assert.match(senzaSesso.motivo, /sesso/);
  const senzaIb = win.calcolaTraguardoComposizione(inWin({ sesso:'M' }), 12, 20);
  assert.strictEqual(senzaIb.ok, false);
  assert.match(senzaIb.motivo, /misurazione/);
  const pctAssurda = win.calcolaTraguardoComposizione(inWin(PAZ_M), 0, 20);
  assert.strictEqual(pctAssurda.ok, false);
});

test('TRAGUARDO — direzione: target sopra la % attuale = aumento, non calo', () => {
  const su = win.calcolaTraguardoComposizione(inWin(PAZ_M), 30, 20);
  assert.strictEqual(su.direzione, 'aumentare');
  assert.strictEqual(su.realeApplicabile, false, 'lo scenario "quota magra persa" vale solo in dimagrimento');
  assert.ok(su.ottimista.peso > 92);
  const pari = win.calcolaTraguardoComposizione(inWin(PAZ_M), 26.1, 20);
  assert.strictEqual(pari.direzione, 'stabile');
});

test('TRAGUARDO — _traguardoScrivi: specchio derivato su pesoTarget + prima riga di storico', () => {
  const p = inWin(Object.assign({}, PAZ_M));
  const scritto = win._traguardoScrivi(p, { metodo:'pctGrasso', pctGrassoTarget:12, quotaMagraPersa:20,
    pesoTarget:72.9, pesoOttimista:77.3, pesoRealistico:72.9, massaGrassaTargetKg:8.7, massaMagraRif:68, decisoDa:'condiviso' });
  assert.strictEqual(scritto.pesoTarget, 72.9);
  assert.strictEqual(p.pesoTarget, 72.9, 'p.pesoTarget resta lo specchio derivato: proiezione e PDF non cambiano');
  const st = p.obiettivoPercorso.storico;
  assert.strictEqual(st.length, 2, 'prima impostazione: una riga per il peso, una per la %');
  assert.strictEqual(st[0].da, null, 'la prima volta non c\'è un valore precedente');
  assert.strictEqual(st[0].a, 72.9);
  assert.strictEqual(st[0].decisoDa, 'condiviso', 'chi ha deciso viene registrato');
});

test('TRAGUARDO — il traguardo non si sovrascrive mai in silenzio: ogni revisione è una riga', () => {
  const p = inWin(Object.assign({}, PAZ_M));
  win._traguardoScrivi(p, { pctGrassoTarget:12, pesoTarget:72.9 });
  win._traguardoScrivi(p, { pctGrassoTarget:12, pesoTarget:72.9 });
  assert.strictEqual(p.obiettivoPercorso.storico.length, 2, 'riscrivere gli stessi valori non aggiunge righe');
  win._traguardoScrivi(p, { pctGrassoTarget:15, pesoTarget:76.5, motivo:'rivisto col paziente' });
  const st = p.obiettivoPercorso.storico;
  assert.strictEqual(st.length, 4, 'due campi cambiati → due righe nuove');
  const ultimoPeso = st.filter(r => r.campo === 'pesoTarget').pop();
  assert.strictEqual(ultimoPeso.da, 72.9, 'il valore precedente resta scritto');
  assert.strictEqual(ultimoPeso.a, 76.5);
  assert.strictEqual(ultimoPeso.motivo, 'rivisto col paziente');
  assert.strictEqual(p.pesoTarget, 76.5);
});

test('TRAGUARDO — _traguardoGet normalizza e non esplode sui pazienti senza obiettivo', () => {
  assert.strictEqual(win._traguardoGet(inWin({})), null);
  assert.strictEqual(win._traguardoGet(inWin({ obiettivoPercorso:'boh' })), null);
  const g = win._traguardoGet(inWin({ obiettivoPercorso:{ clinico:{ pesoTarget:70 } } }));
  assert.strictEqual(g.clinico.pesoTarget, 70);
  assert.ok(Array.isArray(g.storico) && g.storico.length === 0, 'storico mancante → array vuoto, mai undefined');
  assert.ok(Array.isArray(g.traguardi) && g.traguardi.length === 0);
});

// ── F5 — salvataggio anagrafica: i campi non gestiti dal form sopravvivono ────
test('F5 — _pazPreservaCampi riporta i campi che il form non produce', () => {
  const vecchio = inWin({ id:'x', nome:'Mario', percorso:{ inizio:'2026-01-05', fasi:[{tipo:'deficit'}] },
    refertiSangue:[{ id:'r1' }], richiesteAnalisi:[{ id:'q1' }], creato:'2025-03-01',
    obiettivoPercorso:{ clinico:{ pesoTarget:74 } } });
  const nuovo = inWin({ id:'x', nome:'Mario Rossi', tel:'123' });
  win._pazPreservaCampi(nuovo, vecchio);
  assert.strictEqual(nuovo.nome, 'Mario Rossi', 'i campi del form vincono sempre');
  assert.ok(nuovo.percorso && nuovo.percorso.fasi.length, 'la timeline di periodizzazione sopravvive (P115)');
  assert.strictEqual(nuovo.refertiSangue.length, 1, 'i referti del sangue datati sopravvivono (P118)');
  assert.strictEqual(nuovo.richiesteAnalisi.length, 1, 'le richieste esami sopravvivono (P116)');
  assert.strictEqual(nuovo.creato, '2025-03-01', 'la data di creazione non si perde');
  assert.strictEqual(nuovo.obiettivoPercorso.clinico.pesoTarget, 74, 'e il traguardo con il suo storico (P122)');
});

test('F5 — un campo svuotato di proposito nel form resta svuotato', () => {
  const vecchio = inWin({ note:'vecchia nota', allergie:'noci' });
  const nuovo = inWin({ allergie:'' });
  win._pazPreservaCampi(nuovo, vecchio);
  assert.strictEqual(nuovo.allergie, '', 'il form ha detto "vuoto": si rispetta');
  assert.strictEqual(nuovo.note, 'vecchia nota', 'ciò che il form non tocca resta');
});
