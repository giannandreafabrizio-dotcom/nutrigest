// ── S1 — P141: "che giorno è" si chiede all'orologio GIUSTO (31 lug 2026) ──
// `toISOString()` risponde con l'ora di Greenwich. In Italia, fra mezzanotte e
// le 01:00 (inverno) / 02:00 (estate), Greenwich è ancora al giorno prima:
// `today()` rispondeva IERI. Il danno non è a video — quelle date finiscono
// SALVATE (il registro degli invii, il log dei consumi AI) e il giorno dopo non
// si correggono da sole. È la regola 11 del CLAUDE.md: un valore di ripiego
// silenzioso su un dato che ordina il tempo è un bug in attesa.
//
// Nello stesso giro è emerso un secondo difetto che la scheda non conosceva:
// `addDays` sbagliava di un giorno ogni volta che l'intervallo scavalcava il
// cambio dell'ora legale. Stagionale, silenzioso, tutte le primavere.
//
// E soprattutto: il file conteneva TRE funzioni per la stessa cosa — `today()`
// rotta e due copie corrette scritte da chi aveva sbattuto contro il problema
// nel proprio angolo. Questo file rende ROSSA la quarta.
'use strict';
process.env.TZ = 'Europe/Rome';   // prima di qualunque uso di Date

const assert = require('assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const SORGENTE = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf-8');

test('P141 — la data si legge dall\'orologio locale, non da Greenwich', () => {
  // l'ora in cui il difetto si vedeva: mezzanotte e mezza, d'estate
  assert.strictEqual(win.ymdLoc(new Date(2026, 7, 12, 0, 30)), '2026-08-12');
  assert.strictEqual(win.ymdLoc(new Date(2026, 7, 12, 1, 45)), '2026-08-12');
  // e d'inverno, quando la finestra è più stretta ma c'è lo stesso
  assert.strictEqual(win.ymdLoc(new Date(2026, 0, 15, 0, 30)), '2026-01-15');
  // il resto della giornata non deve cambiare
  assert.strictEqual(win.ymdLoc(new Date(2026, 7, 12, 14, 0)), '2026-08-12');
  assert.strictEqual(win.ymdLoc(new Date(2026, 7, 12, 23, 59)), '2026-08-12');
  // e la stessa data letta con Greenwich sarebbe SBAGLIATA: è la prova che il
  // test morde davvero e non sta solo confermando sé stesso
  assert.strictEqual(new Date(2026, 7, 12, 0, 30).toISOString().slice(0, 10), '2026-08-11');
});

test('P141 — ymdLoc accetta Date, timestamp e niente, e non inventa date', () => {
  assert.strictEqual(win.ymdLoc(new Date(2026, 2, 1, 12).getTime()), '2026-03-01');
  assert.strictEqual(win.ymdLoc(), win.today(), 'senza argomenti = oggi');
  assert.strictEqual(win.ymdLoc('non-una-data'), '', 'una data illeggibile resta vuota, non diventa oggi');
});

test('P141 — addDays conta giorni di CALENDARIO, anche sopra il cambio dell\'ora legale', () => {
  // 29 marzo 2026: l'Italia sposta l'orologio avanti di un'ora. La versione
  // vecchia perdeva un giorno per strada e rispondeva 31/03.
  assert.strictEqual(win.addDays('2026-03-25', 7), '2026-04-01');
  assert.strictEqual(win.addDays('2026-03-26', 7), '2026-04-02');
  assert.strictEqual(win.addDays('2026-03-20', 14), '2026-04-03');
  // e in autunno, quando l'orologio torna indietro
  assert.strictEqual(win.addDays('2026-10-20', 7), '2026-10-27');
  // casi normali, all'indietro, e a cavallo d'anno
  assert.strictEqual(win.addDays('2026-08-01', 7), '2026-08-08');
  assert.strictEqual(win.addDays('2026-08-08', -7), '2026-08-01');
  assert.strictEqual(win.addDays('2026-12-28', 7), '2027-01-04');
  assert.strictEqual(win.addDays('2028-02-28', 1), '2028-02-29', 'anno bisestile');
  assert.strictEqual(win.addDays('', 7), '', 'senza data non si inventa un giorno');
});

test('P141 — esiste UNA sola funzione data-locale, non tre', () => {
  ['_percorsoIsoLocal', '_calYmd'].forEach(function (vecchia) {
    assert.strictEqual(new RegExp('function\\s+' + vecchia + '\\s*\\(').test(SORGENTE), false,
      vecchia + ' era una copia di ymdLoc: non deve tornare');
  });
  assert.ok(/function\s+ymdLoc\s*\(/.test(SORGENTE));
  assert.strictEqual((SORGENTE.match(/function\s+ymdLoc\s*\(/g) || []).length, 1,
    'una definizione sola: è tutto il senso di questa voce');
});

// ── LA RETE DI SICUREZZA ────────────────────────────────────────────────────
// Il difetto è già riemerso tre volte da solo, perché scrivere
// `new Date().toISOString().slice(0,10)` è la cosa che viene in mente per prima.
// Qui si vieta il gesto, nello spirito di ORFANI_NOTI in s1-doc-allineata: si
// può derogare, ma solo dichiarandolo.
//
// NB: i marca-tempo (`updated_at`, `creato`, `timestamp`, `generatoIl`) NON
// rientrano nel divieto: non tagliano la data, tengono l'istante intero, e per
// quello Greenwich è la scelta giusta — è su quell'istante che due dispositivi
// decidono chi ha salvato per ultimo.
// L'unica deroga ammessa è un marcatore ESPLICITO sulla riga: `UTC-VOLUTO`,
// seguito dal motivo. Non un elenco di frammenti da qualche parte in un file di
// test — la dichiarazione sta accanto al codice che deroga, dove la legge chi
// lo modifica. Aggiungerne uno è un gesto consapevole, che è tutto il punto.
test('P141 — nessun NUOVO punto che chiede il giorno all\'orologio di Greenwich', () => {
  const righe = SORGENTE.split(/\r?\n/);
  const sospette = [];
  const re = /toISOString\(\)\s*\.\s*(?:slice\(0\s*,\s*(?:10|7)\)|split\(['"]T['"]\)\s*\[0\])/;
  righe.forEach(function (l, i) {
    if (!re.test(l)) return;
    if (l.indexOf('UTC-VOLUTO') >= 0) return;
    sospette.push((i + 1) + ': ' + l.trim().slice(0, 110));
  });
  assert.strictEqual(sospette.length, 0,
    'toISOString usato per ricavare un GIORNO (' + sospette.length + '): ' + sospette.join(' · ') +
    '. Usa ymdLoc()/today(); se il caso è davvero in UTC — cioè la data nasce e ' +
    'resta in UTC — marca la riga con /* UTC-VOLUTO: motivo */.');
});
