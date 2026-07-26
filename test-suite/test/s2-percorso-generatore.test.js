// ── S2 — P122 Tappa 3: modelli di periodizzazione + riallinea ──
// Fissa il contratto su:
//  - _percorsoGeneraFasi (pura): dal traguardo alle fasi, con le regole cliniche
//    di Fabrizio — deficit MAI oltre 12 settimane, mantenimento 4 tra i blocchi,
//    stabilizzazione 6 prima della massa, guardia a 8 cicli;
//  - il ritmo usato è lo STESSO della proiezione P115 (TDEE × %fase ÷ 7700):
//    generatore e grafico non possono contraddirsi;
//  - degradazioni pulite: senza traguardo/InBody/peso → ok:false con motivo;
//  - le fasi generate sono fasi NORMALI: passano _percorsoGet/_percorsoIntervalli;
//  - _percorsoShiftGiorni (pura): l'ancora del riallineo è l'ultima pesata.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const OGGI = iso(Date.now());

// Paziente base: MB 1700 + passi misurati → TDEE deterministico (stesso fixture della proiezione).
function pazBase(extra){
  return Object.assign({
    id:'pg', sesso:'M', inbody:[{ data:OGGI, peso:90, pg:30, mb:1700 }],
    passiGiornalieri:8000, fontePassi:'misurati'
  }, extra);
}
const TDEE = win.calcolaTDEE(inWin(pazBase())).tdee;
const RATE_DEF = TDEE*0.18*7/7700;   // kg/sett al -18%
const RATE_SUR = TDEE*0.08*7/7700;   // kg/sett al +8%

test('GENERATORE — degradazioni pulite: modello sconosciuto, senza InBody, senza traguardo', () => {
  assert.strictEqual(win._percorsoGeneraFasi(inWin(pazBase()), 'boh').ok, false);
  const senzaIb = win._percorsoGeneraFasi(inWin({ sesso:'M', pesoTarget:80 }), 'dimagrimento');
  assert.strictEqual(senzaIb.ok, false);
  assert.match(senzaIb.motivo, /TDEE|InBody/);
  const senzaTarget = win._percorsoGeneraFasi(inWin(pazBase()), 'ricomposizione');
  assert.strictEqual(senzaTarget.ok, false);
  assert.match(senzaTarget.motivo, /🎯|traguardo|obiettivo/i, 'il messaggio manda alla Tappa 1, non a un campo qualsiasi');
});

test('GENERATORE — dimagrimento corto: un blocco di deficit + stabilizzazione, MAI surplus', () => {
  const kg = RATE_DEF*8;   // esattamente 8 settimane di calo
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:+(90-kg).toFixed(1) })), 'dimagrimento');
  assert.ok(r.ok);
  assert.strictEqual(r.fasi[0].tipo, 'deficit');
  assert.ok(r.fasi[0].settimane>=7 && r.fasi[0].settimane<=9, '≈8 settimane, calcolate dal ritmo reale: '+r.fasi[0].settimane);
  assert.strictEqual(r.fasi[r.fasi.length-1].tipo, 'mantenimento');
  assert.strictEqual(r.fasi[r.fasi.length-1].settimane, 6, 'chiusura con 6 settimane di stabilizzazione');
  assert.ok(!r.fasi.some(f => f.tipo==='surplus'), 'il modello dimagrimento non genera mai massa');
});

test('GENERATORE — ricomposizione: come il dimagrimento ma chiude con la fase di massa', () => {
  const kg = RATE_DEF*8;
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:+(90-kg).toFixed(1) })), 'ricomposizione');
  assert.ok(r.ok);
  const ultima = r.fasi[r.fasi.length-1];
  assert.strictEqual(ultima.tipo, 'surplus', 'la massa è l\'ultima fase');
  assert.strictEqual(ultima.settimane, 16);
  const penultima = r.fasi[r.fasi.length-2];
  assert.strictEqual(penultima.tipo, 'mantenimento');
  assert.strictEqual(penultima.settimane, 6, 'la massa parte SOLO dopo la stabilizzazione');
});

test('GENERATORE — percorso lungo: blocchi ≤12 settimane, mantenimento 4 tra i blocchi, mai due deficit consecutivi', () => {
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:68 })), 'dimagrimento');   // ~22 kg
  assert.ok(r.ok);
  const deficit = r.fasi.filter(f => f.tipo==='deficit');
  assert.ok(deficit.length>=2, '22 kg non stanno in un blocco solo');
  deficit.forEach(f => assert.ok(f.settimane<=12, 'nessun blocco oltre le 12 settimane: '+f.settimane));
  for(let i=1;i<r.fasi.length;i++){
    assert.ok(!(r.fasi[i].tipo==='deficit' && r.fasi[i-1].tipo==='deficit'), 'tra due deficit c\'è sempre un mantenimento');
  }
  const mantTra = r.fasi.filter((f,i) => f.tipo==='mantenimento' && i<r.fasi.length-1);
  mantTra.forEach(f => assert.strictEqual(f.settimane, 4, 'i mantenimenti intermedi durano 4 settimane'));
  const settDeficit = deficit.reduce((s,f)=>s+f.settimane,0);
  assert.ok(settDeficit*RATE_DEF >= 21.5, 'le settimane di deficit coprono i kg del traguardo');
});

test('GENERATORE — guardia a 8 cicli: un traguardo assurdo si ferma e lo dice, non allunga il piano', () => {
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:30 })), 'dimagrimento');
  assert.ok(r.ok);
  assert.strictEqual(r.fasi.filter(f => f.tipo==='deficit').length, 8, 'mai oltre 8 blocchi');
  assert.ok(r.note.some(n => /ridiscusso|traguardo/.test(n)), 'la nota dice di rivedere il traguardo');
});

test('GENERATORE — massa con traguardo sopra il peso: surplus a cicli fino al target', () => {
  const kg = RATE_SUR*20;   // ~20 settimane → due blocchi
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:+(90+kg).toFixed(1) })), 'massa');
  assert.ok(r.ok);
  assert.strictEqual(r.fasi[0].tipo, 'surplus', 'si parte dal surplus');
  const surplus = r.fasi.filter(f => f.tipo==='surplus');
  assert.ok(surplus.length>=2, '20 settimane di surplus → almeno due blocchi (max 16)');
  surplus.forEach(f => assert.ok(f.settimane<=16));
  assert.strictEqual(r.fasi[r.fasi.length-1].tipo, 'mantenimento', 'chiusura in mantenimento');
});

test('GENERATORE — massa senza traguardo: template standard, non un errore', () => {
  const r = win._percorsoGeneraFasi(inWin(pazBase()), 'massa');
  assert.ok(r.ok, 'la massa non pretende un traguardo');
  assert.strictEqual(r.fasi[0].tipo, 'surplus');
  assert.ok(r.fasi.filter(f => f.tipo==='surplus').length>=2);
});

test('GENERATORE — salute: una sola fase di mantenimento, traguardi altrove', () => {
  const r = win._percorsoGeneraFasi(inWin(pazBase()), 'salute');
  assert.ok(r.ok);
  assert.strictEqual(r.fasi.length, 1);
  assert.strictEqual(r.fasi[0].tipo, 'mantenimento');
  assert.ok(r.note.some(n => /esami|abitudini/.test(n)));
});

test('GENERATORE — traguardo già raggiunto: dimagrimento si rifiuta, ricomposizione parte dalla massa', () => {
  const dim = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:91 })), 'dimagrimento');
  assert.strictEqual(dim.ok, false);
  assert.match(dim.motivo, /già raggiunto/);
  const ric = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:91 })), 'ricomposizione');
  assert.ok(ric.ok);
  assert.strictEqual(ric.fasi[0].tipo, 'mantenimento');
  assert.strictEqual(ric.fasi[1].tipo, 'surplus');
});

test('GENERATORE — le fasi generate sono fasi normali: passano la validazione e le date del percorso', () => {
  const r = win._percorsoGeneraFasi(inWin(pazBase({ pesoTarget:82 })), 'ricomposizione');
  const paz = inWin(pazBase({ percorso:{ inizio:'2026-08-03', fasi:r.fasi } }));
  const pc = win._percorsoGet(paz);
  assert.strictEqual(pc.fasi.length, r.fasi.length, 'nessuna fase scartata dalla normalizzazione');
  const ints = win._percorsoIntervalli(pc);
  for(let i=1;i<ints.length;i++) assert.strictEqual(ints[i].dal, ints[i-1].al, 'fasi consecutive senza buchi');
});

test('RIALLINEA — l\'ancora è l\'ultima pesata: il buco dopo di lei è il tempo fermo', () => {
  assert.strictEqual(win._percorsoShiftGiorni(inWin({})), null, 'senza percorso: null');
  const inizio60 = iso(Date.now()-60*G), pesata42 = iso(Date.now()-42*G);
  const p1 = inWin({ inbody:[{ data:pesata42, peso:88, pg:29, mb:1700 }],
                     percorso:{ inizio:inizio60, fasi:[{tipo:'deficit',settimane:20,pct:-18}] } });
  assert.strictEqual(win._percorsoShiftGiorni(p1), 42, 'sparito da 42 giorni → il piano trasla di 42');
  const p2 = inWin({ inbody:[{ data:iso(Date.now()-1*G), peso:88, pg:29, mb:1700 }],
                     percorso:{ inizio:inizio60, fasi:[{tipo:'deficit',settimane:20,pct:-18}] } });
  assert.strictEqual(win._percorsoShiftGiorni(p2), 1, 'pesata ieri → praticamente allineato');
  const p3 = inWin({ percorso:{ inizio:inizio60, fasi:[{tipo:'deficit',settimane:20,pct:-18}] } });
  assert.strictEqual(win._percorsoShiftGiorni(p3), 60, 'nessuna pesata → l\'ancora è l\'inizio del percorso');
});

test('RIALLINEA — traslare l\'inizio conserva l\'offset dentro le fasi', () => {
  // all'ultima pesata (42 giorni fa) il paziente era al giorno 18 del percorso;
  // dopo il riallineo, OGGI deve cadere di nuovo al giorno 18.
  const inizio60 = iso(Date.now()-60*G), pesata42 = iso(Date.now()-42*G);
  const p = inWin({ inbody:[{ data:pesata42, peso:88, pg:29, mb:1700 }],
                    percorso:{ inizio:inizio60, fasi:[{tipo:'deficit',settimane:20,pct:-18}] } });
  const shift = win._percorsoShiftGiorni(p);
  const nuovoInizio = iso(new Date(inizio60+'T00:00:00').getTime()+shift*G);
  const offsetPesata = Math.round((new Date(pesata42+'T00:00:00')-new Date(inizio60+'T00:00:00'))/G);
  const offsetOggi = Math.round((new Date(OGGI+'T00:00:00')-new Date(nuovoInizio+'T00:00:00'))/G);
  assert.strictEqual(offsetOggi, offsetPesata, 'stesso giorno-fase: si riprende da dove ci si era fermati');
});
