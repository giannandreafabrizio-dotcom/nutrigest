// ── S2 — P126: il contesto AI cita i numeri che il motore USA davvero ──
// Il bug che questa suite blocca per sempre: il blocco Attività del contesto
// elencava "3 ore/sett · Misto · intensità media" — i tre campi che il motore MET
// additivo SCARTA quando ci sono sedute×minuti e un'attività specifica — mentre i
// macro erano calcolati su 1,8 ore effettive a 8 MET. Il ragionamento clinico
// commentava quindi numeri diversi da quelli su cui stava lavorando.
// Contratto: ciò che il contesto scrive come "usato" deve coincidere con
// calcolaTDEE, e ciò che è stato scartato dev'essere dichiarato tale.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const OGGI = iso(Date.now());

function paz(extra){
  return Object.assign({
    id:'ctx', nome:'Mario', cognome:'Rossi', sesso:'M', altezza:175, nascita:'1985-04-02',
    inbody:[{ id:'b', data:OGGI, peso:79.1, m:67.1, g:12, pg:15.2, mb:1817 }]
  }, extra||{});
}

test('CONTESTO — con sedute×minuti e attività specifica, ore/tipo/intensità sono dichiarati SCARTATI', () => {
  const p = inWin(paz({
    passiGiornalieri:6000, fontePassi:'stimati',
    seduteSettimana:3, minutiSeduta:36, attivitaSpecifica:'Circuit training',
    tipoAllenamento:'Misto', intensitaAllenamento:'Media', oreAllenamento:3
  }));
  const ctx = win.costruisciContestoPaziente(p);
  assert.ok(/ore EFFETTIVE\/settimana/.test(ctx), 'dice le ore effettive');
  assert.ok(/3 sedute × 36 minuti = 1,8 ore EFFETTIVE/.test(ctx), 'e il conto da cui vengono');
  assert.ok(/8 MET \(valore dell attivita specifica selezionata\)/.test(ctx), 'e il MET dell\'attività specifica');
  const scartati = /Dichiarato ma NON usato dal calcolo: ([^\n]+)/.exec(ctx);
  assert.ok(scartati, 'la riga degli scartati esiste');
  assert.ok(/3 ore\/settimana/.test(scartati[1]), 'le ore generiche sono fra gli scartati');
  assert.ok(/tipo "Misto"/.test(scartati[1]) && /intensita "Media"/.test(scartati[1]), 'tipo e intensità pure');
});

test('CONTESTO — i numeri scritti coincidono con calcolaTDEE (nessuna aritmetica duplicata)', () => {
  const p = inWin(paz({
    passiGiornalieri:6000, fontePassi:'stimati', tipoLavoro:'in-piedi',
    seduteSettimana:3, minutiSeduta:36, attivitaSpecifica:'Circuit training'
  }));
  const ct = win.calcolaTDEE(p);
  const ctx = win.costruisciContestoPaziente(p);
  assert.ok(ctx.indexOf('MB '+ct.mb+' + NEAT '+ct.neat+' + EAT '+ct.eat+' + TEF '+ct.tef+' = TDEE '+ct.tdee) > -1,
    'la somma nel contesto è quella del motore');
  assert.strictEqual(ct.fonteOre, 'sedute-minuti');
  assert.strictEqual(ct.fonteMet, 'attivita-specifica');
  assert.ok(Math.abs(ct.oreEffSett - 1.8) < 0.01, 'ore effettive esposte dal motore: ' + ct.oreEffSett);
  assert.ok(/bonus lavoro in-piedi/.test(ctx), 'il bonus lavoro entra nel racconto del NEAT');
});

test('CONTESTO — senza attività specifica, tipo e intensità SONO i dati usati e non vanno fra gli scartati', () => {
  const p = inWin(paz({
    passiGiornalieri:8000, seduteSettimana:4, minutiSeduta:45,
    tipoAllenamento:'Forza', intensitaAllenamento:'Alta'
  }));
  const ct = win.calcolaTDEE(p);
  const ctx = win.costruisciContestoPaziente(p);
  assert.strictEqual(ct.fonteMet, 'tipo-intensita');
  assert.ok(/Forza a intensita Alta → 6 MET/.test(ctx), 'il MET viene dalla griglia tipo × intensità');
  const scartati = /Dichiarato ma NON usato dal calcolo: ([^\n]+)/.exec(ctx);
  assert.ok(!scartati || !/tipo "Forza"/.test(scartati[1]), 'il tipo NON è fra gli scartati quando è quello che decide');
});

test('CONTESTO — solo ore generiche: sono loro a fare il calcolo, e non risultano scartate', () => {
  const p = inWin(paz({ passiGiornalieri:5000, oreAllenamento:4, tipoAllenamento:'Cardio', intensitaAllenamento:'Media' }));
  const ct = win.calcolaTDEE(p);
  const ctx = win.costruisciContestoPaziente(p);
  assert.strictEqual(ct.fonteOre, 'ore-legacy');
  assert.ok(/campo ore generico/.test(ctx));
  const scartati = /Dichiarato ma NON usato dal calcolo: ([^\n]+)/.exec(ctx);
  assert.ok(!scartati, 'niente da dichiarare scartato: tutto quello che c\'è è entrato nel calcolo');
});

test('CONTESTO — senza dati di attività il fallback LAF manuale è detto esplicitamente', () => {
  const p = inWin(paz({ tipoAllenamento:'Misto', intensitaAllenamento:'Media', oreAllenamento:0 }));
  const ctx = win.costruisciContestoPaziente(p);
  assert.ok(/LAF manuale/.test(ctx), 'dice che il TDEE non viene dal motore MET');
  assert.ok(/non entrano in nessun calcolo/.test(ctx), 'e che i campi dichiarati non pesano');
});

test('CONTESTO — cronotipo e giorni ON restano, ma separati dal calcolo del TDEE', () => {
  const p = inWin(paz({
    passiGiornalieri:6000, seduteSettimana:3, minutiSeduta:36,
    giorniAllenamento:['Lun','Mer','Ven'], cronotipo:'mattutino', orarioPastoPrincipale:'13:00'
  }));
  const ctx = win.costruisciContestoPaziente(p);
  assert.ok(/Ritmi \(non entrano nel TDEE/.test(ctx));
  assert.ok(/giorni ON: Lun, Mer, Ven/.test(ctx) && /cronotipo: mattutino/.test(ctx));
});
