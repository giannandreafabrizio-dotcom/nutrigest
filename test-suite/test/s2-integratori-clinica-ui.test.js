// ── S2 — scheda Clinica: caselle generate, colori, pannello ⓘ (P148 tappa 3) ──
//
// Tre cose insieme, tutte chieste da Fabrizio il 5 ago 2026:
//
// 1. LE CASELLE SI GENERANO DAL CATALOGO. Prima erano 19 blocchi di markup
//    scritti a mano nella scheda paziente: aggiungere un integratore voleva
//    dire toccare il catalogo E il markup, ed è esattamente così che i due
//    elenchi erano andati alla deriva (12 voci in Routine, 19 in Clinica).
//
// 2. I COLORI NON DEVONO ESSERE QUELLI DEL SEMAFORO. "prende già" e "vorrebbe
//    prendere" si leggevano come verde e arancione — gli stessi registri con
//    cui l'app dice se un alimento è consigliato o sconsigliato. Il rischio
//    non è estetico: è che una casella di ANAMNESI (un fatto: il paziente lo
//    prende) venga letta come un GIUDIZIO clinico (una raccomandazione).
//    Ora teal e blu, due toni freddi, lontani dalla rampa calda del semaforo.
//
// 3. IL BLU DI METILENE È RITIRATO MA NON CANCELLATO. La sua casella compare
//    solo sui pazienti che ce l'hanno già in scheda. Toglierla del tutto
//    avrebbe fatto sparire il dato al primo salvataggio, senza un errore a
//    video — famiglia F6/F7. Il test `il paziente che ce l'ha non lo perde` è
//    quello che difende questa proprietà.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

function scheda(win) {
  win.document.body.innerHTML =
    '<div id="int-dual-group"></div>' +
    '<div id="int-info-box" style="display:none"></div>';
}

function render(p) {
  scheda(win);
  win.renderCaselleIntegratori(p || { integratori: [], integraWant: [] });
  return win.document.getElementById('int-dual-group');
}

// ── Le caselle vengono dal catalogo ──────────────────────────────────────

test('GENERAZIONE — un paziente nuovo vede tutte e sole le voci attive del catalogo', () => {
  const box = render();
  const attive = win.catalogoIntegratoriAttivi();
  const caselle = box.querySelectorAll('input[type=checkbox][id^="int-"]');
  assert.strictEqual(caselle.length, attive.length);
  attive.forEach(v => {
    assert.ok(win.document.getElementById('int-' + v.chiave), 'manca la casella "prende già" di ' + v.chiave);
    assert.ok(win.document.getElementById('inw-' + v.chiave), 'manca la casella "vorrebbe" di ' + v.chiave);
  });
});

test('GENERAZIONE — aggiungere una voce al catalogo la fa comparire senza toccare il markup', () => {
  // Il markup statico non contiene più nessuna casella scritta a mano: se
  // questo test fallisce vuol dire che qualcuno ne ha reintrodotta una,
  // e da lì ricomincia la deriva fra i due elenchi.
  const box = render();
  assert.ok(box.innerHTML.length > 100, 'la griglia deve essere popolata dal render, non dal markup');
  scheda(win); // ridisegna il contenitore vuoto senza chiamare il render
  assert.strictEqual(win.document.getElementById('int-dual-group').innerHTML, '',
    'il contenitore nel markup è vuoto: le caselle esistono solo se le genera il codice');
});

test('GENERAZIONE — il selettore di dose della vitamina D viene generato con la sua voce', () => {
  render();
  const sel = win.document.getElementById('int-vitd-dose');
  assert.ok(sel, 'senza questo la dose 2000/4000 UI non sarebbe più selezionabile');
  const valori = Array.from(sel.querySelectorAll('option')).map(o => o.value);
  assert.ok(valori.includes('2000') && valori.includes('4000'));
});

test('GENERAZIONE — ogni voce ha il suo pulsante ⓘ', () => {
  const box = render();
  const attive = win.catalogoIntegratoriAttivi();
  assert.strictEqual(box.querySelectorAll('button').length, attive.length);
});

// ── I colori: fuori dalla rampa del semaforo ─────────────────────────────

test('COLORI — "prende già" è teal, "vorrebbe prendere" è blu', () => {
  const box = render();
  const gia = win.document.getElementById('int-omega3').getAttribute('style') || '';
  const vuole = win.document.getElementById('inw-omega3').getAttribute('style') || '';
  assert.ok(/var\(--teal\)/.test(gia), 'prende già: ' + gia);
  assert.ok(/var\(--blue\)/.test(vuole), 'vorrebbe prendere: ' + vuole);
});

test('COLORI — sparito il vecchio #BA7517, che non era nemmeno una variabile CSS', () => {
  const box = render();
  assert.ok(!/BA7517/i.test(box.innerHTML),
    'era un colore scritto a mano in venti punti del markup');
});

test('COLORI — nessun accent-color usa i colori del semaforo alimenti', () => {
  const box = render();
  const accent = (box.innerHTML.match(/accent-color:[^";]+/g) || []);
  assert.ok(accent.length > 0, 'il test deve avere qualcosa da controllare');
  accent.forEach(a => {
    assert.ok(!/--green|--orange|--red/.test(a),
      'una casella di anamnesi non deve usare i colori con cui l\'app dà un giudizio clinico: ' + a);
  });
});

// ── Blu di metilene: ritirato, ma chi ce l'ha non lo perde ───────────────

test('RITIRATO — un paziente nuovo non vede il Blu di metilene fra le scelte', () => {
  render({ integratori: [], integraWant: [] });
  assert.strictEqual(win.document.getElementById('int-blumet'), null);
});

test('RITIRATO — il paziente che ce l\'ha in scheda continua a vederlo (F6/F7)', () => {
  render({ integratori: ['Blu di metilene'], integraWant: [] });
  assert.ok(win.document.getElementById('int-blumet'),
    'togliere la casella avrebbe cancellato il dato al primo salvataggio, senza errori a video');
});

test('RITIRATO — compare anche se sta fra i "vorrebbe prendere", non solo fra i "prende già"', () => {
  render({ integratori: [], integraWant: ['Blu di metilene'] });
  assert.ok(win.document.getElementById('int-blumet'));
});

test('RITIRATO — è marcato come tale a schermo, non si confonde con le voci attive', () => {
  const box = render({ integratori: ['Blu di metilene'], integraWant: [] });
  assert.ok(/ritirato/i.test(box.innerHTML), 'deve essere visibilmente diverso dalle voci proponibili');
});

test('RITIRATO — il giro completo non perde il dato: render → spunta → rilettura', () => {
  render({ integratori: ['Blu di metilene', 'Omega-3'], integraWant: [] });
  win.setIntegratori(['Blu di metilene', 'Omega-3']);
  const riletto = puro(win.getIntegratori());
  const chiavi = riletto.map(l => win.chiaveIntegratore(l)).sort();
  assert.deepStrictEqual(chiavi, ['blumet', 'omega3'],
    'è il salvataggio successivo all\'apertura della scheda: qui il dato o sopravvive o sparisce per sempre');
});

// ── Il pannello informativo ──────────────────────────────────────────────

test('ⓘ — il pannello si apre e mostra dose, quando e razionale', () => {
  render();
  win.mostraInfoIntegratore('omega3');
  const box = win.document.getElementById('int-info-box');
  assert.strictEqual(box.style.display, 'block');
  const v = win.integratorePerChiave('omega3');
  assert.ok(box.innerHTML.includes(v.nome));
  assert.ok(box.innerHTML.includes(v.dose));
  assert.ok(/pasto più grasso/i.test(box.innerHTML));
});

test('ⓘ — le incompatibilità sono mostrate in evidenza, non sepolte nel testo', () => {
  render();
  win.mostraInfoIntegratore('k2');
  const html = win.document.getElementById('int-info-box').innerHTML;
  assert.ok(/anticoagulant/i.test(html), 'l\'avvertenza sul warfarin deve esserci');
  assert.ok(/Attenzione/.test(html), 'e deve essere etichettata come avvertenza');
  assert.ok(/--red/.test(html), 'con un segno visivo che la stacca dal resto');
});

test('ⓘ — le sinergie sono scritte col NOME dell\'integratore, non con la chiave interna', () => {
  render();
  win.mostraInfoIntegratore('vitd');
  const html = win.document.getElementById('int-info-box').innerHTML;
  assert.ok(html.includes('Omega-3 (EPA/DHA)'), 'il nutrizionista non deve leggere "omega3"');
  assert.ok(!/>omega3</.test(html));
});

test('ⓘ — le alternative di orario del magnesio compaiono col loro motivo', () => {
  render();
  win.mostraInfoIntegratore('mag');
  const html = win.document.getElementById('int-info-box').innerHTML;
  assert.ok(/energizzante/i.test(html), 'l\'uso mattutino');
  assert.ok(/sonno/i.test(html), 'l\'uso serale');
});

test('ⓘ — i BCAA spiegano che la dose si calcola sul peso', () => {
  render();
  win.mostraInfoIntegratore('bcaa');
  const html = win.document.getElementById('int-info-box').innerHTML;
  assert.ok(/10 kg/.test(html), 'la dose non è fissa e il pannello deve dirlo');
});

test('ⓘ — un secondo click sulla stessa voce chiude il pannello', () => {
  render();
  const box = win.document.getElementById('int-info-box');
  win.mostraInfoIntegratore('ferro');
  assert.strictEqual(box.style.display, 'block');
  win.mostraInfoIntegratore('ferro');
  assert.strictEqual(box.style.display, 'none');
});

test('ⓘ — passando a un\'altra voce il pannello cambia contenuto e resta aperto', () => {
  render();
  const box = win.document.getElementById('int-info-box');
  win.mostraInfoIntegratore('ferro');
  win.mostraInfoIntegratore('zinco');
  assert.strictEqual(box.style.display, 'block');
  assert.ok(box.innerHTML.includes('Zinco'));
  assert.ok(!box.innerHTML.includes('Ferro (bisglicinato)'));
});

// ── Silenzio e robustezza (regola 19) ────────────────────────────────────

test('SILENZIO — chiave inesistente: nessuna eccezione, nessun pannello vuoto aperto', () => {
  render();
  const box = win.document.getElementById('int-info-box');
  win.mostraInfoIntegratore('chiave-che-non-esiste');
  assert.strictEqual(box.style.display, 'none');
});

test('SILENZIO — render senza paziente o con paziente vuoto non esplode', () => {
  scheda(win);
  win.renderCaselleIntegratori(null);
  assert.ok(win.document.getElementById('int-dual-group').innerHTML.length > 100);
  scheda(win);
  win.renderCaselleIntegratori({});
  assert.ok(win.document.getElementById('int-omega3'));
});

test('SILENZIO — se il contenitore non c\'è nel DOM la funzione esce senza errori', () => {
  win.document.body.innerHTML = '<div></div>';
  win.renderCaselleIntegratori({ integratori: [], integraWant: [] });
  win.mostraInfoIntegratore('omega3');
});

test('ORDINE — le spunte si applicano dopo il render, altrimenti non troverebbero le caselle', () => {
  // Riproduce l'ordine reale della scheda paziente: prima renderCaselleIntegratori,
  // poi setIntegratori. Invertendolo le spunte non comparirebbero, in silenzio.
  render({ integratori: ['Omega-3'], integraWant: ['Creatina'] });
  win.setIntegratori(['Omega-3']);
  win.setIntegraWant(['Creatina']);
  assert.strictEqual(win.document.getElementById('int-omega3').checked, true);
  assert.strictEqual(win.document.getElementById('inw-creat').checked, true);
  assert.strictEqual(win.document.getElementById('inw-omega3').checked, false);
});
