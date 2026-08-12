// ═══════════════════════════════════════════════════════════════════
// P159 — «Vai al giorno» porta anche lo SGUARDO, non solo lo stato
//
// PERCHÉ QUESTO FILE ESISTE. Il 12 agosto 2026, collaudando P94, Fabrizio
// ha segnalato che il pulsante «Vai →» del validatore clinico «non fa
// niente». Verificato in console sull'app vera: lo stato cambiava
// eccome (indice giorno da 6 a 0, nessun errore). Il difetto non era nel
// calcolo ma nella promessa del comando: cambiava il giorno attivo e
// ridisegnava il piano SENZA muovere la pagina — e siccome il pannello si
// apre dal badge del validatore, che sta SOPRA il piano, alla chiusura si
// guardano i badge mentre il cambiamento avviene fuori schermo.
//
// **Un comando che si chiama "Vai" e non porta lo sguardo da nessuna parte
// è indistinguibile da un comando rotto.** Ed è stato dato per rotto.
//
// COSA QUESTO TEST NON VEDE (dichiarato, non nascosto): JSDOM non ha un
// vero scorrimento né un vero rendering, quindi qui si verifica che lo
// scorrimento venga CHIESTO sull'elemento giusto e che la notifica dica il
// giorno giusto — non che a schermo si veda davvero. Quella parte resta
// verifica a occhio nel browser. E non copre l'evidenziazione della riga
// colpevole, che è consapevolmente non fatta (miglioramento in roadmap).
// ═══════════════════════════════════════════════════════════════════
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { loadApp } = require('./_loadApp');
const { INDEX_PATH } = require('./_extract');

function scenario(){
  const w = loadApp();
  const piano = [
    { giorno:'Lunedì',  pasti:{ colazione:{celle:[],ricette:['Pancarrè con albume e burro di arachidi']} } },
    { giorno:'Martedì', pasti:{ pranzo:{celle:[],ricette:['Riso in bianco con 2 uova e avocado']} } },
    { giorno:'🏆 Giorno gara', speciale:true, temaKey:'gara', pasti:{ cena:{celle:[],ricette:[]} } }
  ];
  w._pianoCorrente = piano;
  w._pianoGiornoCorrente = 2;              // si parte dal giorno speciale, come Fabrizio

  // Il box del piano: JSDOM non implementa scrollIntoView, quindi lo si mette
  // noi e si registra se e come viene chiamato.
  const box = w.document.createElement('div');
  box.id = 'piano-piano-box';
  const scroll = [];
  box.scrollIntoView = function(opt){ scroll.push(opt || null); };
  w.document.body.appendChild(box);

  const notifiche = [];
  w.notif = function(msg){ notifiche.push(String(msg)); };
  w._aggiornaPianoBox = function(){ /* il ridisegno non è in prova qui */ };

  return { w, piano, scroll, notifiche };
}

test('P159 — «Vai» cambia il giorno E chiede lo scorrimento sul piano', () => {
  const { w, scroll } = scenario();
  w._validaVaiAlGiorno(0, 'colazione');
  assert.strictEqual(w._pianoGiornoCorrente, 0, 'Lo stato deve cambiare (questo funzionava già).');
  assert.strictEqual(scroll.length, 1,
    'Senza scorrimento il cambiamento avviene fuori schermo: è tutto il difetto di P159.');
});

test('P159 — la notifica dice DOVE sei finito: giorno e pasto', () => {
  const { w, notifiche } = scenario();
  w._validaVaiAlGiorno(0, 'colazione');
  assert.strictEqual(notifiche.length, 1);
  assert.match(notifiche[0], /Lunedì/, 'Il nome del giorno è il minimo per capire che è successo qualcosa.');
  assert.match(notifiche[0], /Colazione/, 'Il pasto va scritto per esteso, non con la chiave interna.');
});

test('P159 — senza pasto indicato la notifica dice comunque il giorno (nessuna riga muta)', () => {
  const { w, notifiche } = scenario();
  w._validaVaiAlGiorno(1);
  assert.match(notifiche[0], /Martedì/);
  assert.ok(!/undefined/.test(notifiche[0]), 'Mai un "undefined" a schermo: è peggio di un\'informazione mancante.');
});

test('P159 — il giorno speciale conserva il suo titolo a tema nella notifica', () => {
  const { w, notifiche } = scenario();
  w._pianoGiornoCorrente = 0;
  w._validaVaiAlGiorno(2, 'cena');
  assert.match(notifiche[0], /Giorno gara/,
    'L\'etichetta a tema (P94) è il nome con cui Fabrizio riconosce quel giorno.');
});

test('P159 — il pannello del validatore chiude prima di navigare', () => {
  const { w, scroll } = scenario();
  const ov = w.document.createElement('div');
  ov.id = 'valida-overlay';
  w.document.body.appendChild(ov);
  w._validaVaiAlGiorno(0, 'colazione');
  assert.strictEqual(w.document.getElementById('valida-overlay'), null,
    'Restare col pannello aperto sopra il piano vanificherebbe lo scorrimento.');
  assert.strictEqual(scroll.length, 1);
});

test('P159 — niente box del piano: nessuna eccezione, la navigazione avviene lo stesso', () => {
  const w = loadApp();
  w._pianoCorrente = [{ giorno:'Lunedì', pasti:{} }];
  w._pianoGiornoCorrente = 0;
  w.notif = function(){};
  w._aggiornaPianoBox = function(){};
  assert.doesNotThrow(function(){ w._validaVaiAlGiorno(0, 'pranzo'); },
    'Una funzione di navigazione non deve mai spegnere la pagina quando il box non c\'è.');
});

// ── Guardia strutturale ──────────────────────────────────────────────
test('P159 — i pulsanti del pannello passano anche il pasto, non solo il giorno', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  const chiamate = src.match(/_validaVaiAlGiorno\('\+\w+\.giornoIdx\+'[^"]*/g) || [];
  assert.strictEqual(chiamate.length, 2,
    'I pulsanti sono due — violazioni e non verificabili. Se cambiano di numero, aggiornare questo test, non cancellarlo.');
  chiamate.forEach(function(c){
    assert.ok(/slot/.test(c),
      'Senza il pasto la notifica direbbe solo il giorno, e su una colazione e una cena dello stesso giorno non basta.');
  });
});

test('P159 — le etichette dei pasti sono definite in UN posto solo (regola 15)', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  const definizioni = src.match(/spuntino_pomeriggio\s*:\s*'Spuntino pomeriggio'/g) || [];
  assert.strictEqual(definizioni.length, 1,
    'Due copie della stessa mappa divergono al primo pasto rinominato: "ripara il rubinetto".');
});
