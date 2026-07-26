// ── S2 — P122 Tappa 2: la domanda in visita, strutturata ──
// Fissa il contratto su:
//  - _obiettivoPazienteDaForm: scrive SOLO obiettivoPercorso.paziente (clinico e
//    storico intatti), niente strutture vuote, la data racconta QUANDO il
//    paziente l'ha detto (cambia solo a contenuto nuovo), no-op senza markup;
//  - _traguardoConfrontoAspettativa (pura): allineata / ambiziosa / prudente,
//    con il lato "ambizioso" che dipende dalla direzione del percorso;
//  - _traguardoVocePazienteHtml: vuota senza dati, avviso importanza-alta/
//    fiducia-bassa quando serve;
//  - costruisciContestoPaziente: la voce del paziente e il divario
//    aspettativa-traguardo entrano nel contesto AI.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
function inWin(obj){ return win.eval('(' + JSON.stringify(obj) + ')'); }

// campi del form come nel modal (input semplici: la funzione legge .value)
function montaForm(vals){
  const ids=['p-ob-categoria','p-ob-motivo','p-ob-peso-atteso','p-ob-scadenza','p-ob-evento','p-ob-importanza','p-ob-fiducia'];
  ids.forEach(function(id){
    let el=win.document.getElementById(id);
    if(!el){ el=win.document.createElement('input'); el.id=id; win.document.body.appendChild(el); }
    el.value=(vals&&vals[id]!=null)?vals[id]:'';
  });
}
function smontaForm(){
  ['p-ob-categoria','p-ob-motivo','p-ob-peso-atteso','p-ob-scadenza','p-ob-evento','p-ob-importanza','p-ob-fiducia']
    .forEach(function(id){ const el=win.document.getElementById(id); if(el) el.remove(); });
}

const PAZ_M = {
  sesso:'M', altezza:178,
  inbody:[{ id:'b', data:'2026-05-12', peso:92, m:68, g:24, pg:26.1, altezza:178 }]
};

test('OB-PAZIENTE — senza markup è un no-op assoluto', () => {
  smontaForm();
  const pd=inWin({ nome:'Mario' });
  win._obiettivoPazienteDaForm(pd);
  assert.strictEqual(pd.obiettivoPercorso, undefined, 'nessun campo nel DOM → non tocca nulla');
});

test('OB-PAZIENTE — campi tutti vuoti: nessuna struttura vuota creata', () => {
  montaForm({});
  const pd=inWin({ nome:'Mario' });
  win._obiettivoPazienteDaForm(pd);
  assert.strictEqual(pd.obiettivoPercorso, undefined, 'niente da dire → niente scheletri vuoti');
});

test('OB-PAZIENTE — scrive paziente e NON tocca clinico/storico', () => {
  montaForm({ 'p-ob-categoria':'dimagrire', 'p-ob-motivo':'rientrare nei vestiti',
    'p-ob-peso-atteso':'65', 'p-ob-scadenza':'2027-06-12', 'p-ob-evento':'matrimonio',
    'p-ob-importanza':'8', 'p-ob-fiducia':'4' });
  const pd=inWin({ nome:'Mario',
    obiettivoPercorso:{ clinico:{ pesoTarget:72.9, pctGrassoTarget:12 }, storico:[{data:'2026-07-25',campo:'pesoTarget',da:null,a:72.9}] } });
  win._obiettivoPazienteDaForm(pd);
  const v=pd.obiettivoPercorso.paziente;
  assert.strictEqual(v.categoria,'dimagrire');
  assert.strictEqual(v.pesoAtteso,65, 'l\'aspettativa si registra anche se irrealistica');
  assert.strictEqual(v.eventoScadenza,'matrimonio');
  assert.strictEqual(v.importanza,8);
  assert.strictEqual(v.fiducia,4);
  assert.ok(v.data, 'la voce è datata');
  assert.strictEqual(pd.obiettivoPercorso.clinico.pesoTarget,72.9, 'il traguardo clinico resta intatto');
  assert.strictEqual(pd.obiettivoPercorso.storico.length,1, 'lo storico resta intatto');
});

test('OB-PAZIENTE — contenuto invariato → la data resta quella della prima dichiarazione', () => {
  montaForm({ 'p-ob-categoria':'massa', 'p-ob-peso-atteso':'80' });
  const pd=inWin({ obiettivoPercorso:{ paziente:{ categoria:'massa', motivo:'', pesoAtteso:80,
    scadenzaPersonale:'', eventoScadenza:'', importanza:null, fiducia:null, data:'2026-01-10' } } });
  win._obiettivoPazienteDaForm(pd);
  assert.strictEqual(pd.obiettivoPercorso.paziente.data,'2026-01-10', 'stesso contenuto → stessa data');
  montaForm({ 'p-ob-categoria':'massa', 'p-ob-peso-atteso':'82' });
  win._obiettivoPazienteDaForm(pd);
  assert.notStrictEqual(pd.obiettivoPercorso.paziente.data,'2026-01-10', 'contenuto nuovo → data nuova');
  assert.strictEqual(pd.obiettivoPercorso.paziente.pesoAtteso,82);
});

test('OB-PAZIENTE — categoria sconosciuta non passa', () => {
  montaForm({ 'p-ob-categoria':'boh', 'p-ob-motivo':'x' });
  const pd=inWin({});
  win._obiettivoPazienteDaForm(pd);
  assert.strictEqual(pd.obiettivoPercorso.paziente.categoria,'', 'solo le categorie previste');
  smontaForm();
});

test('CONFRONTO — aspettativa dentro il corridoio (tolleranza 1 kg)', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);   // fascia 72.9–77.3
  assert.strictEqual(win._traguardoConfrontoAspettativa(75, r).liv, 'ok');
  assert.strictEqual(win._traguardoConfrontoAspettativa(72.2, r).liv, 'ok', '72.2 è dentro la tolleranza dal bordo 72.9');
});

test('CONFRONTO — aspettativa ambiziosa in dimagrimento: sotto il bordo prudente', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  const c = win._traguardoConfrontoAspettativa(65, r);
  assert.strictEqual(c.liv, 'gap');
  assert.match(c.txt, /7\.9 kg OLTRE/, 'il divario è quantificato (72.9 − 65)');
  assert.match(c.txt, /abbandono/, 'e motivato clinicamente');
});

test('CONFRONTO — aspettativa più prudente del corridoio', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  const c = win._traguardoConfrontoAspettativa(85, r);
  assert.strictEqual(c.liv, 'nota');
  assert.match(c.txt, /alzare l'asticella/);
});

test('CONFRONTO — in aumento il lato ambizioso si ribalta', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 30, 20);   // direzione: aumentare
  assert.strictEqual(r.direzione, 'aumentare');
  const hi=r.fascia[1];
  const c = win._traguardoConfrontoAspettativa(hi+5, r);
  assert.strictEqual(c.liv, 'gap', 'aspettarsi PIÙ chili del corridoio, in massa, è il lato ambizioso');
});

test('CONFRONTO — niente aspettativa o corridoio → null, mai un errore', () => {
  const r = win.calcolaTraguardoComposizione(inWin(PAZ_M), 12, 20);
  assert.strictEqual(win._traguardoConfrontoAspettativa(null, r), null);
  assert.strictEqual(win._traguardoConfrontoAspettativa(70, {ok:false}), null);
});

test('VOCE PAZIENTE — vuota senza dati, completa con avviso importanza/fiducia', () => {
  assert.strictEqual(win._traguardoVocePazienteHtml(inWin({})), '');
  const h = win._traguardoVocePazienteHtml(inWin({ obiettivo:'rientrare nei vestiti',
    obiettivoPercorso:{ paziente:{ categoria:'dimagrire', motivo:'giocare coi figli senza fiatone',
      pesoAtteso:65, scadenzaPersonale:'2027-06-12', eventoScadenza:'matrimonio', importanza:8, fiducia:3, data:'2026-07-25' } } }));
  assert.match(h, /65 kg/);
  assert.match(h, /matrimonio/);
  assert.match(h, /8\/10 · fiducia 3\/10/);
  assert.match(h, /non crede di farcela/, 'importanza ≥7 + fiducia ≤4 → avviso traguardi comportamentali');
  assert.match(h, /terzo mese/, 'il motivo è lì per essere riletto');
});

test('CONTESTO AI — la voce del paziente e il divario entrano nel contesto', () => {
  const p = inWin(Object.assign({}, PAZ_M, { nome:'Mario', cognome:'Rossi', obiettivo:'rientrare nei vestiti',
    obiettivoPercorso:{
      paziente:{ categoria:'dimagrire', motivo:'giocare coi figli', pesoAtteso:65,
        scadenzaPersonale:'2027-06-12', eventoScadenza:'matrimonio', importanza:8, fiducia:4, data:'2026-07-25' },
      clinico:{ metodo:'pctGrasso', pctGrassoTarget:12, pesoTarget:72.9, pesoOttimista:77.3, pesoRealistico:72.9, decisoDa:'condiviso', data:'2026-07-25' }
    } }));
  const ctx = win.costruisciContestoPaziente(p);
  assert.match(ctx, /OBIETTIVO DEL PAZIENTE/);
  assert.match(ctx, /Peso che SI ASPETTA il paziente: 65 kg/);
  assert.match(ctx, /matrimonio — 2027-06-12/);
  assert.match(ctx, /importanza alta ma fiducia bassa/i);
  assert.match(ctx, /12% di grasso → fascia 72\.9–77\.3 kg/);
  assert.match(ctx, /Divario aspettativa-traguardo/, 'il divario di 7.9 kg viene segnalato all\'AI');
});

test('CONTESTO AI — paziente senza Tappa 2: il blocco non compare (retrocompatibile)', () => {
  const ctx = win.costruisciContestoPaziente(inWin(Object.assign({}, PAZ_M, { nome:'Anna', cognome:'Bianchi' })));
  assert.ok(!/OBIETTIVO DEL PAZIENTE/.test(ctx), 'nessun dato → nessun blocco nuovo');
});
