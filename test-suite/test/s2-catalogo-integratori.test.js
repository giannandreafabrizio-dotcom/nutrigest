// ── S2 — catalogo unico integratori (P148, tappa 2) ──────────────────────
//
// Fino al 5 ago 2026 lo stesso integratore viveva in due elenchi che non si
// parlavano: le 19 caselle della scheda Clinica (solo etichette) e le 12 voci
// della libreria Routine (con dose/quando/razionale). Solo 5 su 19 avevano un
// corrispondente, e con nomi diversi. Ora c'è un catalogo solo, e gli altri due
// elenchi sono derivati da quello.
//
// IL TEST PIÙ IMPORTANTE DI QUESTO FILE è `ogni etichetta storica risolve`.
// REGOLA 21: rinominare una voce di catalogo è una migrazione di dati, non un
// ritocco di testo. Gli integratori sono salvati sui pazienti per ETICHETTA
// ("Probiotici", "Ferro"), non per chiave. Il catalogo unico ha rinominato
// diverse voci ("Probiotico (multistrain)", "Ferro (bisglicinato)"): senza la
// mappa INTEGR_ALIAS, aprendo un paziente salvato prima del rinomino la casella
// risulterebbe NON spuntata, e al primo salvataggio successivo il dato
// sparirebbe — senza un solo errore a video. Il sintomo in produzione è
// invisibile, quindi il test deve essere rumoroso: se una sola etichetta
// storica smette di risolvere, questo file diventa rosso.
//
// Le etichette elencate qui sotto NON sono inventate: sono copiate dalle due
// strutture come erano in `origin/main` al commit 108a8bb, refusi compresi
// ("Ferro (bisgliccinato)" con due c).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp, puro } = require('./_loadApp');

const win = loadApp();

// Etichette della scheda Clinica (INTEGR_LABELS, versione storica: 19 voci)
const STORICHE_CLINICA = [
  'Omega-3', 'Magnesio + Potassio', 'Solo Magnesio', 'Multivitaminico',
  'Probiotici', 'Creatina', 'Ferro', 'Vitamina D', 'Vitamina K2',
  'Proteine in polvere', 'BCAA (ramificati)', 'EAA (essenziali)', 'Leucina',
  'Pappa reale', 'Beta-alanina', 'Acido folico', 'Blu di metilene',
  'Fosfatidilcolina', 'Lecitina di soia'
];

// Etichette della libreria Routine (LIBRERIA_ROUTINE, versione storica: 12 voci)
const STORICHE_ROUTINE = [
  'Berberina', 'Vitamina D3', 'Omega-3 (EPA/DHA)', 'Magnesio glicinato',
  'Probiotico (multistrain)', 'Vitamina C', 'Zinco', 'Coenzima Q10',
  'Vitamina B12 (metilcobalamina)', 'Ferro (bisgliccinato)',
  'Collagene idrolizzato', 'Melatonina'
];

// ── Regola 21: nessuna etichetta storica deve perdersi ───────────────────

test('REGOLA 21 — ogni etichetta storica della scheda Clinica risolve in una chiave', () => {
  const perse = STORICHE_CLINICA.filter(l => !win.chiaveIntegratore(l));
  assert.deepStrictEqual(perse, [],
    'queste etichette sono nei dati dei pazienti reali: se non risolvono, il dato sparisce al primo salvataggio');
});

test('REGOLA 21 — ogni etichetta storica della libreria Routine risolve in una chiave', () => {
  const perse = STORICHE_ROUTINE.filter(l => !win.chiaveIntegratore(l));
  assert.deepStrictEqual(perse, [], 'stesso rischio dell\'altra lista, altra provenienza');
});

test('REGOLA 21 — il refuso storico "bisgliccinato" (due c) risolve come il ferro', () => {
  assert.strictEqual(win.chiaveIntegratore('Ferro (bisgliccinato)'), 'ferro');
  assert.strictEqual(win.chiaveIntegratore('Ferro (bisglicinato)'), 'ferro');
  assert.strictEqual(win.chiaveIntegratore('Ferro'), 'ferro');
});

test('REGOLA 21 — i due nomi diversi dello stesso magnesio convergono sulla stessa chiave', () => {
  assert.strictEqual(win.chiaveIntegratore('Solo Magnesio'), 'mag');
  assert.strictEqual(win.chiaveIntegratore('Magnesio glicinato'), 'mag');
  assert.strictEqual(win.chiaveIntegratore('Solo Magnesio (glicinato)'), 'mag');
});

test('REGOLA 21 — "Vitamina D" e "Vitamina D3" sono la stessa voce, con o senza dose', () => {
  ['Vitamina D', 'Vitamina D3', 'Vitamina D (2000 UI)', 'Vitamina D3 (4000 UI)']
    .forEach(l => assert.strictEqual(win.chiaveIntegratore(l), 'vitd', l));
});

test('REGOLA 21 — maiuscole e spazi doppi non fanno perdere la corrispondenza', () => {
  assert.strictEqual(win.chiaveIntegratore('  OMEGA-3  '), 'omega3');
  assert.strictEqual(win.chiaveIntegratore('probiotici'), 'prob');
  assert.strictEqual(win.chiaveIntegratore('Magnesio  +  Potassio'), 'magpot');
});

// ── Le etichette sconosciute si conservano, non si buttano ───────────────

test('SILENZIO — un\'etichetta sconosciuta dà null, non una chiave a caso', () => {
  assert.strictEqual(win.chiaveIntegratore('Integratore mai visto'), null);
  assert.strictEqual(win.chiaveIntegratore(''), null);
  assert.strictEqual(win.chiaveIntegratore(null), null);
  assert.strictEqual(win.chiaveIntegratore(undefined), null);
});

test('MIGRAZIONE — le voci non riconosciute finiscono in `liberi`, non sparite', () => {
  const r = win.migraEtichetteIntegratori(['Omega-3', 'Roba scritta a mano dal nutrizionista', 'Ferro']);
  assert.deepStrictEqual(puro(r.chiavi), ['omega3', 'ferro']);
  assert.deepStrictEqual(puro(r.liberi), ['Roba scritta a mano dal nutrizionista'],
    'una voce che non sappiamo tradurre va conservata come testo libero, mai scartata in silenzio');
});

test('MIGRAZIONE — due etichette diverse della stessa voce non producono un doppione', () => {
  const r = win.migraEtichetteIntegratori(['Solo Magnesio', 'Magnesio glicinato']);
  assert.deepStrictEqual(puro(r.chiavi), ['mag']);
});

test('MIGRAZIONE — lista vuota o malformata: nessuna eccezione, nessuna invenzione', () => {
  [null, undefined, [], 'non una lista'].forEach(v => {
    const r = win.migraEtichetteIntegratori(v);
    assert.deepStrictEqual(puro(r.chiavi), []);
    assert.deepStrictEqual(puro(r.liberi), []);
  });
});

// ── Blu di metilene: ritirato ma non cancellato (famiglia F6/F7) ─────────

test('BLU DI METILENE — resta nel catalogo come non attivo, non è stato cancellato', () => {
  const v = win.integratorePerChiave('blumet');
  assert.ok(v, 'cancellare la riga farebbe sparire il dato dai pazienti che ce l\'hanno');
  assert.strictEqual(v.attivo, false);
});

test('BLU DI METILENE — non compare fra le voci proponibili né nella libreria Routine', () => {
  const attivi = win.catalogoIntegratoriAttivi().map(v => v.chiave);
  assert.ok(!attivi.includes('blumet'));
  const lib = win.eval('LIBRERIA_ROUTINE').filter(v => v.tipo === 'integratore');
  assert.ok(!lib.some(v => v.chiave === 'blumet'));
});

test('BLU DI METILENE — la sua etichetta storica continua a risolvere (dato conservato)', () => {
  assert.strictEqual(win.chiaveIntegratore('Blu di metilene'), 'blumet');
  const r = win.migraEtichetteIntegratori(['Blu di metilene']);
  assert.deepStrictEqual(puro(r.chiavi), ['blumet'],
    'un paziente che ce l\'ha in scheda non deve perderlo: ritirato non vuol dire cancellato');
});

test('BLU DI METILENE — resta senza dose di default (decisione clinica di Fabrizio)', () => {
  assert.strictEqual(win.integratorePerChiave('blumet').dose, '');
});

// ── Integrità del catalogo ───────────────────────────────────────────────

test('CATALOGO — le chiavi sono uniche', () => {
  const chiavi = win.eval('CATALOGO_INTEGRATORI').map(v => v.chiave);
  assert.strictEqual(new Set(puro(chiavi)).size, chiavi.length);
});

test('CATALOGO — ogni voce attiva ha nome, quando, razionale e una regolaOrario valida', () => {
  const ammesse = ['fisso', 'pasto_piu_grasso', 'pasto_piu_carbo'];
  win.catalogoIntegratoriAttivi().forEach(v => {
    assert.ok(v.nome && v.nome.length > 2, 'nome mancante: ' + v.chiave);
    assert.ok(v.quando && v.quando.length > 2, 'quando mancante: ' + v.chiave);
    assert.ok(v.razionale && v.razionale.length > 20, 'razionale troppo corto: ' + v.chiave);
    assert.ok(ammesse.includes(v.regolaOrario), 'regolaOrario non valida: ' + v.chiave + ' → ' + v.regolaOrario);
    assert.ok(Array.isArray(v.sinergie), 'sinergie non array: ' + v.chiave);
  });
});

test('CATALOGO — ogni sinergia punta a una chiave che esiste davvero', () => {
  const chiavi = new Set(win.eval('CATALOGO_INTEGRATORI').map(v => v.chiave));
  win.eval('CATALOGO_INTEGRATORI').forEach(v => {
    (v.sinergie || []).forEach(s => {
      assert.ok(chiavi.has(s), 'sinergia verso una chiave inesistente: ' + v.chiave + ' → ' + s);
    });
  });
});

test('CATALOGO — le 4 voci liposolubili vanno nel pasto più grasso, la creatina nei carboidrati', () => {
  ['omega3', 'vitd', 'k2', 'coq10'].forEach(k => {
    assert.strictEqual(win.integratorePerChiave(k).regolaOrario, 'pasto_piu_grasso', k);
  });
  assert.strictEqual(win.integratorePerChiave('creat').regolaOrario, 'pasto_piu_carbo');
});

test('CATALOGO — le incompatibilità decise con Fabrizio sono presenti e non vuote', () => {
  const attese = {
    k2: /anticoagulant/i, coq10: /anticoagulant/i,
    berber: /ipoglicemizzant/i, pappar: /alveare/i,
    lecsoia: /soia/i, ferro: /latticin|caff|t[èe]/i, blumet: /SSRI|serotoniner/i
  };
  Object.keys(attese).forEach(k => {
    const v = win.integratorePerChiave(k);
    assert.ok(v.evitareCon && attese[k].test(v.evitareCon),
      'incompatibilità mancante o cambiata su ' + k + ': ' + JSON.stringify(v.evitareCon));
  });
});

test('CATALOGO — i BCAA hanno la dose calcolata sul peso, non una dose fissa', () => {
  const v = win.integratorePerChiave('bcaa');
  assert.ok(v.dosePerPeso, 'senza dosePerPeso la dose tornerebbe fissa e sbagliata per peso');
  assert.strictEqual(v.dosePerPeso.gPer10kg, 1);
});

test('CATALOGO — magnesio e magnesio+potassio hanno più alternative di orario', () => {
  const mag = win.integratorePerChiave('mag');
  assert.ok(Array.isArray(mag.quandoAlt) && mag.quandoAlt.length >= 2,
    'il magnesio ha due usi distinti: mattina energizzante, sera per il sonno');
  mag.quandoAlt.forEach(a => assert.ok(a.testo && a.motivo, 'ogni alternativa porta il suo motivo'));
  const magpot = win.integratorePerChiave('magpot');
  assert.ok(Array.isArray(magpot.quandoAlt) && magpot.quandoAlt.length >= 2);
});

// ── Gli elenchi derivati ─────────────────────────────────────────────────

test('DERIVAZIONE — INTEGR_KEYS e INTEGR_LABELS vengono dal catalogo, non da un elenco parallelo', () => {
  const cat = win.eval('CATALOGO_INTEGRATORI');
  const keys = win.eval('INTEGR_KEYS');
  const labels = win.eval('INTEGR_LABELS');
  assert.deepStrictEqual(puro(keys), puro(cat.map(v => v.chiave)));
  cat.forEach(v => assert.strictEqual(labels[v.chiave], v.nome));
});

test('DERIVAZIONE — la libreria Routine ha una voce integratore per ogni voce attiva', () => {
  const attivi = win.catalogoIntegratoriAttivi();
  const lib = win.eval('LIBRERIA_ROUTINE').filter(v => v.tipo === 'integratore');
  assert.strictEqual(lib.length, attivi.length);
  assert.deepStrictEqual(puro(lib.map(v => v.chiave)), puro(attivi.map(v => v.chiave)));
});

test('DERIVAZIONE — le voci Routine mantengono i campi che il render già usa', () => {
  const lib = win.eval('LIBRERIA_ROUTINE').filter(v => v.tipo === 'integratore');
  lib.forEach(v => {
    assert.ok(typeof v.nome === 'string' && v.nome, 'nome');
    assert.ok(typeof v.quando === 'string' && v.quando, 'quando');
    assert.ok(typeof v.razionale === 'string' && v.razionale, 'razionale');
    assert.ok(typeof v.quante_volte === 'number', 'quante_volte (nome storico con underscore)');
    assert.strictEqual(v.tipo, 'integratore');
  });
});

test('NON REGRESSIONE — spezie e superfood della libreria sono rimasti intatti', () => {
  const lib = win.eval('LIBRERIA_ROUTINE');
  assert.strictEqual(lib.filter(v => v.tipo === 'spezia').length, 6);
  assert.ok(lib.filter(v => v.tipo === 'superfood').length >= 20);
  assert.ok(lib.some(v => v.nome === 'Curcuma + pepe nero'));
  assert.ok(lib.some(v => v.nome === 'Succo Verde 🟢'));
});

// ── Il guasto vero: ripristinare le spunte da etichette vecchie ──────────

function domIntegratori(win) {
  const keys = win.eval('INTEGR_KEYS');
  win.document.body.innerHTML =
    keys.map(k => `<input type="checkbox" id="int-${k}"><input type="checkbox" id="inw-${k}">`).join('') +
    '<select id="int-vitd-dose"><option value=""></option><option value="2000">2000</option><option value="4000">4000</option></select>';
}

test('IL GUASTO — un paziente salvato con le etichette VECCHIE ritrova le caselle spuntate', () => {
  domIntegratori(win);
  // Come sarebbe salvato un paziente prima del catalogo unico:
  win.setIntegratori(['Probiotici', 'Ferro', 'Omega-3', 'Solo Magnesio']);
  ['prob', 'ferro', 'omega3', 'mag'].forEach(k => {
    assert.strictEqual(win.document.getElementById('int-' + k).checked, true,
      'col vecchio confronto esatto questa casella restava vuota e il dato spariva al salvataggio: ' + k);
  });
});

test('IL GUASTO — e risalvando, il dato non si perde (andata e ritorno)', () => {
  domIntegratori(win);
  win.setIntegratori(['Probiotici', 'Ferro', 'Omega-3']);
  const risalvato = win.getIntegratori();
  const chiavi = puro(risalvato.map(l => win.chiaveIntegratore(l))).sort();
  assert.deepStrictEqual(chiavi, ['ferro', 'omega3', 'prob'],
    'le tre voci devono sopravvivere al giro completo lettura → scrittura');
});

test('IL GUASTO — la dose della vitamina D sopravvive al cambio di etichetta', () => {
  domIntegratori(win);
  win.setIntegratori(['Vitamina D (4000 UI)']);
  assert.strictEqual(win.document.getElementById('int-vitd').checked, true);
  assert.strictEqual(win.document.getElementById('int-vitd-dose').value, '4000');
  assert.ok(/4000 UI/.test(win.getIntegratori()[0]), 'e viene riscritta con la dose dentro');
});

test('SILENZIO — nessuna casella spuntata se la lista è vuota o sconosciuta', () => {
  domIntegratori(win);
  win.setIntegratori(['Integratore inventato']);
  win.eval('INTEGR_KEYS').forEach(k => {
    assert.strictEqual(win.document.getElementById('int-' + k).checked, false, k);
  });
  win.setIntegratori(null);
  assert.strictEqual(win.getIntegratori().length, 0);
});

test('SILENZIO — "prende già" e "vorrebbe prendere" restano due liste indipendenti', () => {
  domIntegratori(win);
  win.setIntegratori(['Omega-3']);
  win.setIntegraWant(['Creatina']);
  assert.strictEqual(win.document.getElementById('int-omega3').checked, true);
  assert.strictEqual(win.document.getElementById('inw-omega3').checked, false);
  assert.strictEqual(win.document.getElementById('inw-creat').checked, true);
  assert.strictEqual(win.document.getElementById('int-creat').checked, false);
});
