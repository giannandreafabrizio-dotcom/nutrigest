// ── S2 — P122 Tappa 5: vista paziente ──
// Fissa il contratto su:
//  - _percorsoVittorie: le vittorie si contano DALL'INIZIO DEL PERCORSO, non dal
//    primo referto di sempre; e riconosce la ricomposizione (peso fermo,
//    composizione migliorata) che è il caso in cui la bilancia mente;
//  - _percorsoNascondiPeso: in fase di surplus il peso non si mostra al paziente;
//  - _traguardoFaseCorrente: traguardo della fase IN CORSO, non quello lontano;
//  - _traguardoTestoPaziente: righe in linguaggio semplice, riusate anche dal
//    messaggio WhatsApp.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const OGGI = iso(Date.now());

// ── vittorie ────────────────────────────────────────────────────────────────

test('VITTORIE — servono almeno due misurazioni, altrimenti null', () => {
  assert.strictEqual(win._percorsoVittorie(inWin({})), null);
  assert.strictEqual(win._percorsoVittorie(inWin({ inbody:[{data:'2026-01-01', peso:90, m:68}] })), null);
});

test('VITTORIE — grasso, muscolo e girovita dal primo all\'ultimo referto', () => {
  const v = win._percorsoVittorie(inWin({ inbody:[
    { data:'2026-01-10', peso:92, m:68, girovita:104 },
    { data:'2026-05-07', peso:86, m:69, girovita:96 }
  ]}));
  assert.strictEqual(v.pesoDelta, -6);
  assert.strictEqual(v.grassoPerso, 7, '24 kg di grasso → 17');
  assert.strictEqual(v.magraGuadagnata, 1);
  assert.strictEqual(v.girovitaPerso, 8);
  assert.strictEqual(v.ricomposizione, false, 'sei chili in meno non sono "peso fermo"');
});

test('VITTORIE — si contano dall\'INIZIO DEL PERCORSO, non dal referto più vecchio', () => {
  const p = inWin({
    inbody:[
      { data:'2023-02-01', peso:110, m:70 },        // storia vecchia, fuori percorso
      { data:'2026-01-15', peso:92, m:68 },         // la vera partenza
      { data:'2026-05-07', peso:86, m:69 }
    ],
    percorso:{ inizio:'2026-01-10', fasi:[{tipo:'deficit', settimane:20, pct:-18}] }
  });
  const v = win._percorsoVittorie(p);
  assert.strictEqual(v.dal, '2026-01-15', 'la base è la prima misurazione dopo l\'inizio del percorso');
  assert.strictEqual(v.pesoDelta, -6, 'non −24: quella è la storia di tre anni fa');
});

test('VITTORIE — RICOMPOSIZIONE: il peso è fermo ma la composizione è cambiata', () => {
  const v = win._percorsoVittorie(inWin({ inbody:[
    { data:'2026-01-10', peso:83, m:70 },     // grasso 13
    { data:'2026-05-07', peso:83.4, m:73 }    // grasso 10.4
  ]}));
  assert.ok(Math.abs(v.pesoDelta - 0.4) < 0.01, 'sulla bilancia non è successo niente');
  assert.ok(Math.abs(v.grassoPerso - 2.6) < 0.11);
  assert.strictEqual(v.magraGuadagnata, 3);
  assert.strictEqual(v.ricomposizione, true, 'è il caso in cui il paziente ha bisogno di sentirselo dire');
});

test('VITTORIE — referto senza composizione: i delta di composizione restano null', () => {
  const v = win._percorsoVittorie(inWin({ inbody:[
    { data:'2026-01-10', peso:92 }, { data:'2026-05-07', peso:86 }
  ]}));
  assert.strictEqual(v.pesoDelta, -6);
  assert.strictEqual(v.grassoPerso, null, 'mai un numero dedotto dal nulla');
  assert.strictEqual(v.magraGuadagnata, null);
});

// ── il peso in fase di massa ────────────────────────────────────────────────

test('MASSA — in fase di surplus il peso non si mostra, nelle altre sì', () => {
  const base = { inbody:[{data:OGGI, peso:83, m:70, mb:1800}] };
  const surplus = inWin(Object.assign({}, base, { percorso:{ inizio:iso(Date.now()-7*G), fasi:[{tipo:'surplus', settimane:16, pct:8}] } }));
  assert.strictEqual(win._percorsoNascondiPeso(surplus), true);
  const deficit = inWin(Object.assign({}, base, { percorso:{ inizio:iso(Date.now()-7*G), fasi:[{tipo:'deficit', settimane:12, pct:-18}] } }));
  assert.strictEqual(win._percorsoNascondiPeso(deficit), false);
  assert.strictEqual(win._percorsoNascondiPeso(inWin(base)), false, 'senza percorso non si nasconde niente');
});

// ── fase corrente ───────────────────────────────────────────────────────────

test('FASE CORRENTE — settimane che restano, non il traguardo a otto mesi', () => {
  const p = inWin({ sesso:'M', inbody:[{data:OGGI, peso:90, pg:30, mb:1700}],
    passiGiornalieri:8000, fontePassi:'misurati',
    percorso:{ inizio:iso(Date.now()-14*G), fasi:[
      {tipo:'deficit', settimane:10, pct:-18}, {tipo:'mantenimento', settimane:4, pct:0}
    ]}});
  const fc = win._traguardoFaseCorrente(p);
  assert.strictEqual(fc.fuoriFase, false);
  assert.strictEqual(fc.indice, 0);
  assert.strictEqual(fc.totFasi, 2);
  assert.strictEqual(fc.settimaneRestanti, 8, '10 settimane meno le 2 già passate');
  assert.ok(fc.pesoAtteso < 90, 'in deficit il peso atteso a fine fase è più basso: ' + fc.pesoAtteso);
});

test('FASE CORRENTE — in fase di massa niente peso atteso', () => {
  const p = inWin({ sesso:'M', inbody:[{data:OGGI, peso:83, m:70, mb:1800}],
    passiGiornalieri:8000, fontePassi:'misurati',
    percorso:{ inizio:iso(Date.now()-7*G), fasi:[{tipo:'surplus', settimane:16, pct:8}] }});
  const fc = win._traguardoFaseCorrente(p);
  assert.strictEqual(fc.nascondiPeso, true);
  assert.strictEqual(fc.pesoAtteso, null, 'mostrare un peso obiettivo in massa manderebbe il messaggio opposto');
});

test('FASE CORRENTE — percorso in pausa: lo dichiara invece di far finta di niente', () => {
  const p = inWin({ inbody:[{data:OGGI, peso:90, pg:30, mb:1700}],
    percorso:{ inizio:iso(Date.now()-300*G), fasi:[{tipo:'deficit', settimane:4, pct:-18}] }});
  assert.strictEqual(win._traguardoFaseCorrente(p).fuoriFase, true);
  assert.strictEqual(win._traguardoFaseCorrente(inWin({})), null, 'senza percorso: null');
});

test('FASE CORRENTE — porta i traguardi della fase e quelli del percorso intero, non gli altri', () => {
  const p = inWin({ sesso:'M', inbody:[{data:OGGI, peso:90, m:63, mb:1700}],
    passiGiornalieri:8000, fontePassi:'misurati',
    percorso:{ inizio:iso(Date.now()-14*G), fasi:[{tipo:'deficit', settimane:10, pct:-18},{tipo:'surplus', settimane:8, pct:8}]},
    obiettivoPercorso:{ traguardi:[
      { id:'a', tipo:'massaMagra', etichetta:'Muscolo', valore:66, partenza:63, faseIdx:0, stato:'aperto' },
      { id:'b', tipo:'comportamento', etichetta:'Passi', valore:9000, faseIdx:null, stato:'aperto' },
      { id:'c', tipo:'peso', etichetta:'Peso', valore:80, partenza:90, faseIdx:1, stato:'aperto' },
      { id:'d', tipo:'comportamento', etichetta:'Vecchio', valore:1, faseIdx:0, stato:'mancato' }
    ]}});
  const ids = win._traguardoFaseCorrente(p).traguardi.map(t => t.id).join(',');
  assert.ok(ids.indexOf('a') >= 0, 'quello della fase in corso');
  assert.ok(ids.indexOf('b') >= 0, 'quello valido per tutto il percorso');
  assert.ok(ids.indexOf('c') < 0, 'quello di un\'altra fase no');
  assert.ok(ids.indexOf('d') < 0, 'quelli già mancati non si ripropongono');
});

// ── testo per il paziente ───────────────────────────────────────────────────

test('TESTO PAZIENTE — in ricomposizione la frase parla di composizione, non di bilancia', () => {
  const p = inWin({ sesso:'M', inbody:[
      { data:iso(Date.now()-120*G), peso:83, m:70, mb:1800 },
      { data:OGGI, peso:83.4, m:73, mb:1800 }],
    passiGiornalieri:8000, fontePassi:'misurati',
    percorso:{ inizio:iso(Date.now()-120*G), fasi:[{tipo:'surplus', settimane:24, pct:8}] }});
  const t = win._traguardoTestoPaziente(p).join(' ');
  assert.match(t, /peso è praticamente lo stesso/i);
  assert.match(t, /muscolo/);
  assert.match(t, /il peso sale ed è normale/i, 'in massa lo dice esplicitamente');
});

test('TESTO PAZIENTE — cita la fase in corso e gli impegni comportamentali aperti', () => {
  const p = inWin({ sesso:'M', inbody:[
      { data:iso(Date.now()-60*G), peso:92, m:68, mb:1700 },
      { data:OGGI, peso:88, m:68, mb:1700 }],
    passiGiornalieri:8000, fontePassi:'misurati',
    percorso:{ inizio:iso(Date.now()-14*G), fasi:[{tipo:'deficit', settimane:10, pct:-18}]},
    obiettivoPercorso:{ traguardi:[{ id:'x', tipo:'comportamento', etichetta:'Allenamenti a settimana', valore:3, unita:'a sett.', stato:'aperto' }]}});
  const t = win._traguardoTestoPaziente(p).join(' ');
  assert.match(t, /fase di deficit/i);
  assert.match(t, /restano 8 settimane/i);
  assert.match(t, /Allenamenti a settimana/);
  assert.match(t, /grasso −4 kg/, 'le vittorie di composizione ci sono');
});

test('TESTO PAZIENTE — paziente senza niente: nessuna riga inventata', () => {
  assert.strictEqual(win._traguardoTestoPaziente(inWin({})).length, 0);
});
