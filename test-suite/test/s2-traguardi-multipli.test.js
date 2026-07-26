// ── S2 — P122 Tappa 4: traguardi multipli + condizione di uscita fase ──
// Fissa il contratto su:
//  - _traguardoValoreAttuale: ogni tipo legge il dato che l'app ha GIÀ (InBody,
//    pesate, referti del sangue); null quando il dato manca, mai un numero finto;
//  - _traguardoVerso: "auto" (peso, esami) si decide dal punto di partenza;
//  - _traguardoValuta: progresso 0-100 dalla partenza fotografata alla creazione,
//    raggiunto secondo il verso, comportamentali senza misura automatica;
//  - _percorsoCondizione: la fase può finire per soglia invece che per data —
//    e l'app SUGGERISCE soltanto (nessuna mutazione automatica del piano);
//  - percorsoChiudiFase: fotografa l'esito, ri-cliccare riapre (mai irreversibile).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');

const PAZ = {
  id:'t4', sesso:'M', altezza:180,
  inbody:[
    { id:'a', data:'2026-01-10', peso:92, m:68, g:24, girovita:104 },
    { id:'b', data:'2026-05-07', peso:86, m:69, g:17, girovita:96 }
  ]
};

// ── valori attuali: ogni tipo dalla sua fonte ────────────────────────────────

test('TRAGUARDI — ogni tipo legge il dato che l\'app ha già', () => {
  const p = inWin(PAZ);
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'peso'})).valore, 86);
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'massaMagra'})).valore, 69);
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'massaGrassa'})).valore, 17);
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'girovita'})).valore, 96, 'dal referto più recente che ce l\'ha');
  const pct = win._traguardoValoreAttuale(p, inWin({tipo:'pctGrasso'}));
  assert.ok(Math.abs(pct.valore - 19.8) < 0.11, '17 kg su 86 = 19.8% (derivata, non copiata)');
});

test('TRAGUARDI — il peso usa anche le pesate intermedie, non solo gli InBody', () => {
  const p = inWin(Object.assign({}, PAZ, { pesiIntermedi:[{data:'2026-06-20', peso:84.2}] }));
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'peso'})).valore, 84.2);
  assert.strictEqual(win._traguardoValoreAttuale(p, inWin({tipo:'massaMagra'})).valore, 69, 'la composizione resta quella dell\'InBody');
});

test('TRAGUARDI — dato mancante: null, mai un numero inventato', () => {
  assert.strictEqual(win._traguardoValoreAttuale(inWin({}), inWin({tipo:'peso'})), null);
  assert.strictEqual(win._traguardoValoreAttuale(inWin(PAZ), inWin({tipo:'comportamento'})), null, 'i comportamentali non si misurano da soli');
  assert.strictEqual(win._traguardoValoreAttuale(inWin(PAZ), inWin({tipo:'esame', esame:''})), null);
  const senzaGiro = inWin({ inbody:[{ data:'2026-05-07', peso:86, m:69 }] });
  assert.strictEqual(win._traguardoValoreAttuale(senzaGiro, inWin({tipo:'girovita'})), null);
});

test('TRAGUARDI — esame del sangue: legge il referto datato più recente', () => {
  const p = inWin({ refertiSangue:[
    { id:'r1', data:'2026-01-10', valori:{ 'LDL_val':'150' } },
    { id:'r2', data:'2026-05-07', valori:{ 'LDL_val':'118' } }
  ]});
  const v = win._traguardoValoreAttuale(p, inWin({tipo:'esame', esame:'LDL'}));
  assert.strictEqual(v.valore, 118);
  assert.strictEqual(v.data, '2026-05-07');
});

// ── verso e progresso ────────────────────────────────────────────────────────

test('TRAGUARDI — il verso: fisso per composizione, dedotto dalla partenza per peso ed esami', () => {
  assert.strictEqual(win._traguardoVerso(inWin({tipo:'pctGrasso', partenza:25, valore:12})), 'giu');
  assert.strictEqual(win._traguardoVerso(inWin({tipo:'massaMagra', partenza:69, valore:60})), 'su', 'la magra si raggiunge sempre salendo');
  assert.strictEqual(win._traguardoVerso(inWin({tipo:'peso', partenza:92, valore:80})), 'giu');
  assert.strictEqual(win._traguardoVerso(inWin({tipo:'peso', partenza:60, valore:66})), 'su', 'un sottopeso deve salire');
});

test('TRAGUARDI — progresso: dalla partenza fotografata alla creazione', () => {
  const p = inWin(PAZ);
  const t = win._traguardoValuta(p, inWin({tipo:'peso', partenza:92, valore:80, stato:'aperto'}));
  assert.strictEqual(t.attuale, 86);
  assert.strictEqual(t.progresso, 50, 'da 92 a 80: a 86 è a metà strada');
  assert.strictEqual(t.raggiunto, false);
});

test('TRAGUARDI — raggiunto secondo il verso, progresso mai fuori da 0-100', () => {
  const p = inWin(PAZ);
  const giu = win._traguardoValuta(p, inWin({tipo:'peso', partenza:92, valore:88}));
  assert.strictEqual(giu.raggiunto, true, '86 ≤ 88');
  assert.strictEqual(giu.progresso, 100, 'oltre il traguardo resta 100, non 150');
  const su = win._traguardoValuta(p, inWin({tipo:'massaMagra', partenza:68, valore:72}));
  assert.strictEqual(su.raggiunto, false, '69 < 72');
  assert.strictEqual(su.progresso, 25);
  const indietro = win._traguardoValuta(p, inWin({tipo:'massaMagra', partenza:70, valore:74}));
  assert.strictEqual(indietro.progresso, 0, 'peggiorato rispetto alla partenza: 0, non negativo');
});

test('TRAGUARDI — i comportamentali non hanno misura automatica: contano stato e nulla più', () => {
  const p = inWin(PAZ);
  const t = win._traguardoValuta(p, inWin({tipo:'comportamento', etichetta:'Passi al giorno', valore:9000, stato:'aperto'}));
  assert.strictEqual(t.attuale, null);
  assert.strictEqual(t.progresso, null);
  assert.strictEqual(t.raggiunto, null, 'finché non lo confermi tu non è né vinto né perso');
  const vinto = win._traguardoValuta(p, inWin({tipo:'comportamento', valore:9000, stato:'raggiunto'}));
  assert.strictEqual(vinto.raggiunto, true, 'è la vittoria disponibile anche quando la bilancia è ferma');
});

test('TRAGUARDI — la libreria dei comportamenti è quella scelta in visita', () => {
  // dichiarata con const a livello top: binding lessicale, non su window
  const lib = win.eval('_TRG_COMPORTAMENTI');
  const et = lib.map(c => c.etichetta).join(' | ');
  ['Passi al giorno','Allenamenti a settimana','Ore di sonno','Alcol massimo a settimana','Verdura a pranzo e cena','Sgarri massimi a settimana','Acqua al giorno']
    .forEach(function(n){ assert.ok(et.indexOf(n) >= 0, 'manca: ' + n); });
  lib.forEach(function(c){ assert.ok(c.valore > 0 && c.unita, 'ogni voce ha valore e unità: ' + c.etichetta); });
});

test('TRAGUARDI — _traguardiGet degrada a vuoto sui pazienti senza nulla', () => {
  assert.strictEqual(win._traguardiGet(inWin({})).length, 0);
  assert.strictEqual(win._traguardiGet(inWin({obiettivoPercorso:{}})).length, 0);
  assert.strictEqual(win._traguardiValuta(inWin(PAZ)).length, 0);
});

// ── condizione di uscita della fase ──────────────────────────────────────────

test('CONDIZIONE — scatta quando il valore supera la soglia, nella direzione giusta', () => {
  const p = inWin(PAZ);   // grasso 19.8%, magra 69, peso 86
  const giu = win._percorsoCondizione(p, inWin({tipo:'deficit', condizioneUscita:{tipo:'pctGrasso', valore:15}}));
  assert.strictEqual(giu.op, '<=', 'il grasso si raggiunge scendendo');
  assert.strictEqual(giu.scattata, false, '19.8% non è ancora sotto 15');
  const giuOk = win._percorsoCondizione(p, inWin({tipo:'deficit', condizioneUscita:{tipo:'pctGrasso', valore:22}}));
  assert.strictEqual(giuOk.scattata, true);
  const su = win._percorsoCondizione(p, inWin({tipo:'surplus', condizioneUscita:{tipo:'massaMagra', valore:68}}));
  assert.strictEqual(su.op, '>=', 'la massa magra si raggiunge salendo');
  assert.strictEqual(su.scattata, true, '69 ≥ 68');
});

test('CONDIZIONE — assente o incompleta: null, nessun falso allarme', () => {
  const p = inWin(PAZ);
  assert.strictEqual(win._percorsoCondizione(p, inWin({tipo:'deficit'})), null);
  assert.strictEqual(win._percorsoCondizione(p, inWin({tipo:'deficit', condizioneUscita:{tipo:'pctGrasso'}})), null, 'senza valore non si valuta');
  assert.strictEqual(win._percorsoCondizione(p, inWin({tipo:'deficit', condizioneUscita:{tipo:'boh', valore:10}})), null);
});

test('CONDIZIONE — senza il dato non scatta mai (nessuna soglia raggiunta per finta)', () => {
  const vuoto = inWin({ id:'x' });
  const c = win._percorsoCondizione(vuoto, inWin({tipo:'deficit', condizioneUscita:{tipo:'pctGrasso', valore:12}}));
  assert.strictEqual(c.attuale, null);
  assert.strictEqual(c.scattata, false);
});

test('CONDIZIONE — valutarla non tocca il piano: nessuna mutazione automatica', () => {
  const p = inWin(Object.assign({}, PAZ, { percorso:{ inizio:'2026-01-05',
    fasi:[{tipo:'deficit', settimane:12, pct:-18, condizioneUscita:{tipo:'pctGrasso', valore:22}}] } }));
  const prima = JSON.stringify(p.percorso);
  const c = win._percorsoCondizione(p, p.percorso.fasi[0]);
  assert.strictEqual(c.scattata, true, 'la condizione È raggiunta…');
  assert.strictEqual(JSON.stringify(p.percorso), prima, '…e il piano non è cambiato di una virgola: l\'app suggerisce e basta');
});

test('CONDIZIONE — _percorsoGet conserva condizione, stato ed esito (regressione)', () => {
  // La normalizzazione ricostruiva la fase con i soli tre campi originari:
  // la scheda leggeva da lì e mostrava condizione vuota e fase mai chiusa,
  // pur essendo tutto salvato su p.percorso. Stessa famiglia di F5.
  const p = inWin({ percorso:{ inizio:'2026-01-05', fasi:[
    { tipo:'deficit', settimane:12, pct:-18,
      condizioneUscita:{tipo:'pctGrasso', op:'<=', valore:12},
      stato:'chiusa', esito:{data:'2026-04-01', peso:84, pctGrasso:18} }
  ]}});
  const f = win._percorsoGet(p).fasi[0];
  assert.ok(f.condizioneUscita, 'la condizione sopravvive alla normalizzazione');
  assert.strictEqual(f.condizioneUscita.valore, 12);
  assert.strictEqual(f.stato, 'chiusa');
  assert.strictEqual(f.esito.peso, 84);
  assert.strictEqual(f.settimane, 12, 'e i campi originari restano numerici');
});

test('CHIUSURA FASE — fotografa peso e composizione, e si può riaprire', () => {
  const p = inWin({ percorso:{ inizio:'2026-01-05', fasi:[{tipo:'deficit', settimane:12, pct:-18}] } });
  const f = p.percorso.fasi[0];
  assert.ok(!f.stato, 'nasce senza stato: nessun campo imposto ai percorsi esistenti');
});
