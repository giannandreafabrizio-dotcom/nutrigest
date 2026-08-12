// ═══════════════════════════════════════════════════════════════════
// P157 — Il dispositivo rimasto indietro non riscrive il server
//
// PERCHÉ QUESTO FILE ESISTE. L'11 agosto 2026 un PC con la copia locale
// ferma a metà luglio ha sincronizzato: `pushToSheets` ha spinto tutti e
// 41 i pazienti PRIMA di scaricare i blob aggiornati, e sei pazienti
// hanno perso quello che era stato caricato da un altro PC — fra cui i
// 24 referti InBody di una paziente. Recuperati dal backup del 9 agosto.
//
// Il difetto non era in `_flushDirtyIds` (che il controllo conflitti P69
// ce l'aveva già): era nel push COMPLETO, l'unica strada che scriveva
// senza passare da nessun controllo.
//
// COSA QUESTO TEST NON VEDE (dichiarato, non nascosto — regola 23
// applicata al rimedio): non esercita il vero Supabase, quindi non dice
// niente su RLS, sui permessi o sul comportamento della rete reale; e
// non vede il caso in cui una scrittura fatta DIRETTAMENTE sul database
// lasci `updated_at` invariato — lì nessun confronto di date può
// accorgersi di niente, ed è il motivo per cui esiste il comando
// `riallineaTuttoDalCloud()` (verificato qui solo nella sua esistenza,
// non nel suo effetto sul server vero). Un verde qui non significa «la
// sincronizzazione è sicura»: significa «il dispositivo indietro non
// sovrascrive, e il conflitto viene mostrato».
// ═══════════════════════════════════════════════════════════════════
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { loadApp } = require('./_loadApp');
const { INDEX_PATH } = require('./_extract');

const VECCHIO = '2026-07-15T10:00:00.000Z'; // quello che questo PC aveva visto l'ultima volta
const NUOVO   = '2026-08-01T09:30:00.000Z'; // quello che l'altro PC ha scritto nel frattempo

// ── Un solo caricamento dell'app per tutti i test sul classificatore ──
let win;
test.before(() => { win = loadApp(); });

// ═══════════════════════════════════════════════════════════════════
// A — Il classificatore puro `_p157Decidi`
// È puro apposta: la decisione vera si può esercitare senza simulare
// un server, e resta leggibile fra un anno.
// ═══════════════════════════════════════════════════════════════════

test('P157 — IL CASO DELL\'11 AGOSTO: copia vecchia e nessuna modifica locale → si RISCARICA, non si spinge', () => {
  const esito = win._p157Decidi({
    esisteInLocale: true,
    remotoNoto: true,
    remotoUpdatedAt: NUOVO,
    baseline: VECCHIO,
    sporco: false,
    improntaLocale: 'aaa-100',
    improntaInviata: 'aaa-100'   // il locale è ancora quello che il server aveva dato a luglio
  });
  assert.strictEqual(esito, 'ricarica',
    'Un dispositivo indietro senza modifiche proprie non ha niente da difendere: deve scaricare, mai scrivere.');
});

test('P157 — copia vecchia MA con modifiche locali marcate sporche → conflitto (si mostra, non si vince)', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: NUOVO, baseline: VECCHIO,
    sporco: true, improntaLocale: 'bbb-120', improntaInviata: 'aaa-100'
  }), 'conflitto');
});

test('P157 — copia vecchia e impronta locale diversa da quella inviata → conflitto anche senza set sporco', () => {
  // È il caso del `save()` senza id: la modifica c'è ma nessuno l'ha marcata.
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: NUOVO, baseline: VECCHIO,
    sporco: false, improntaLocale: 'bbb-120', improntaInviata: 'aaa-100'
  }), 'conflitto');
});

test('P157 — allineato e contenuto identico → non si scrive niente', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: NUOVO, baseline: NUOVO,
    sporco: false, improntaLocale: 'aaa-100', improntaInviata: 'aaa-100'
  }), 'salta-uguale');
});

test('P157 — prima esecuzione (nessuna impronta registrata) su dispositivo allineato → si registra e si salta', () => {
  // Senza questa regola il primo sync dopo l'aggiornamento riscriverebbe
  // tutti e 41 i pazienti: proprio il gesto che P157 esiste per evitare.
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: NUOVO, baseline: NUOVO,
    sporco: false, improntaLocale: 'aaa-100', improntaInviata: undefined
  }), 'salta-allineato');
});

test('P157 — allineato ma contenuto cambiato in locale → si spinge', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: NUOVO, baseline: NUOVO,
    sporco: false, improntaLocale: 'ccc-140', improntaInviata: 'aaa-100'
  }), 'push');
});

test('P157 — paziente nuovo mai arrivato al server → si spinge', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: null, baseline: null,
    sporco: true, improntaLocale: 'ddd-90', improntaInviata: undefined
  }), 'push');
});

test('P157 — assente sul server ma già visto da qui → eliminato altrove, non si resuscita', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: true, remotoUpdatedAt: null, baseline: VECCHIO,
    sporco: true, improntaLocale: 'ddd-90', improntaInviata: 'ddd-90'
  }), 'eliminato-altrove');
});

test('P157 — SECONDA DIFESA: pre-verifica di rete fallita e contenuto invariato → NON si spinge lo stesso', () => {
  // P69 è fail-open per non bloccare i salvataggi. L'impronta no: se il
  // contenuto è identico a quello già arrivato al server, non c'è niente
  // da mandare nemmeno quando la pre-verifica non risponde. È questa
  // riga che avrebbe fermato l'incidente anche con la rete a singhiozzo.
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: false, remotoUpdatedAt: null, baseline: VECCHIO,
    sporco: false, improntaLocale: 'aaa-100', improntaInviata: 'aaa-100'
  }), 'salta-uguale');
});

test('P157 — pre-verifica fallita ma contenuto cambiato davvero → si spinge (non si perde il lavoro)', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, remotoNoto: false, remotoUpdatedAt: null, baseline: VECCHIO,
    sporco: true, improntaLocale: 'bbb-120', improntaInviata: 'aaa-100'
  }), 'push');
});

test('P157 — "sovrascrivi consapevole" (scelta nel dialogo P69) vince su tutto', () => {
  assert.strictEqual(win._p157Decidi({
    esisteInLocale: true, forzaSovrascrittura: true, remotoNoto: true,
    remotoUpdatedAt: NUOVO, baseline: VECCHIO, sporco: true,
    improntaLocale: 'bbb-120', improntaInviata: 'aaa-100'
  }), 'push');
});

test('P157 — id sporco senza riga locale → non c\'è niente da mandare', () => {
  assert.strictEqual(win._p157Decidi({ esisteInLocale: false, sporco: true }), 'salta-senza-riga');
});

// ═══════════════════════════════════════════════════════════════════
// B — L'impronta del contenuto
// ═══════════════════════════════════════════════════════════════════

test('P157 — stessa scheda → stessa impronta; un referto in più → impronta diversa', () => {
  const a = { id:'p1', nome:'Mario', inbody:[{data:'2026-07-01', peso:80}] };
  const b = { id:'p1', nome:'Mario', inbody:[{data:'2026-07-01', peso:80}] };
  const c = { id:'p1', nome:'Mario', inbody:[{data:'2026-07-01', peso:80},{data:'2026-08-01', peso:79}] };
  assert.strictEqual(win._p157Impronta(a), win._p157Impronta(b));
  assert.notStrictEqual(win._p157Impronta(a), win._p157Impronta(c));
});

test('P157 — un solo grammo di differenza cambia l\'impronta (nessun arrotondamento silenzioso)', () => {
  const a = { id:'p1', peso:80.0 };
  const b = { id:'p1', peso:80.1 };
  assert.notStrictEqual(win._p157Impronta(a), win._p157Impronta(b));
});

test('P157 — oggetto non serializzabile → impronta nulla (e quindi si spinge, non si salta)', () => {
  const ciclico = { id:'p1' }; ciclico.se = ciclico;
  assert.strictEqual(win._p157Impronta(ciclico), null);
  assert.strictEqual(win._p157Decidi({
    esisteInLocale:true, remotoNoto:true, remotoUpdatedAt:NUOVO, baseline:NUOVO,
    sporco:false, improntaLocale:null, improntaInviata:'aaa-100'
  }), 'push', 'Senza impronta calcolabile la decisione prudente è mandare, non saltare.');
});

// ═══════════════════════════════════════════════════════════════════
// C — Il push completo, con un server finto
// Qui la decisione non è più isolata: si verifica che `pushToSheets`
// la usi davvero e che l'ordine idratazione→scrittura sia rispettato.
// ═══════════════════════════════════════════════════════════════════

function pazienteFinto(id, nome, referti){
  return { id:id, nome:nome, cognome:'Rossi', inbody:Array.from({length:referti}, (_,i)=>({
    data:'2026-0'+(i%9+1)+'-01', peso:80-i, massaGrassa:20, massaMagra:60
  })) };
}

// Prepara una finestra con l'app caricata, un server finto e i punti di
// contatto col resto dell'app messi a tacere.
function preparaScenario({ localeReferti, remotoReferti, remotoUpdatedAt, baseline, impronte, sporchi }){
  const w = loadApp();
  const locale = pazienteFinto('paz1', 'Lilly', localeReferti);
  const remoto = pazienteFinto('paz1', 'Lilly', remotoReferti);

  // `db` è dichiarato con `let` nello script: in JSDOM NON diventa una
  // proprietà di window (le `function` sì). Riassegnare `w.db` creerebbe
  // un secondo oggetto che il codice applicativo non guarda mai — è il
  // quirk già documentato in `_loadApp.js`. Si prende quello vero e lo
  // si popola SUL POSTO.
  const dbReale = w.eval('db');
  dbReale.pazienti = [locale];
  dbReale.ricette = []; dbReale.eventi = []; dbReale.entrate = []; dbReale.piani = [];
  dbReale.disponibilita = {}; dbReale._deleted = {};
  w._pazIndex = [{ id:'paz1', updated_at:remotoUpdatedAt, nome:'Lilly', cognome:'Rossi' }];
  w._dirtyIds = new Set(sporchi||[]);
  w._p69Pending = new Set();
  w._p69ForceOverwrite = new Set();
  w._idratazionePromise = null;
  w.localStorage.setItem('p69Baseline', JSON.stringify(baseline||{}));
  w.localStorage.setItem('p157Impronte', JSON.stringify(impronte||{}));

  const registro = { scritturePaz:[], letture:[], dialoghi:[] };
  w.fetch = async function(url, opt){
    const u = String(url);
    const metodo = (opt && opt.method) || 'GET';
    if(u.includes('/rest/v1/pazienti')){
      if(metodo === 'POST'){
        registro.scritturePaz.push(JSON.parse(opt.body));
        return { ok:true, status:201, text:async()=>'', json:async()=>[] };
      }
      registro.letture.push(u);
      if(u.includes('select=id,updated_at')) return { ok:true, status:200, json:async()=>[{id:'paz1', updated_at:remotoUpdatedAt}] };
      // richiesta del blob completo (idratazione / riscaricamento)
      return { ok:true, status:200, json:async()=>[{id:'paz1', data:remoto, updated_at:remotoUpdatedAt}] };
    }
    return { ok:true, status:200, text:async()=>'', json:async()=>[] };
  };

  // Punti di contatto col resto dell'app: qui non sono in prova.
  w.notif = function(){};
  w.setSyncStatus = function(){};
  w.saveLocal = function(){};
  w.renderPaz = function(){};
  w._analisiSangueUpsert = async function(){};
  w._mergeTombstonesRemoti = async function(){};
  w._collectionsUpsert = async function(){ return true; };
  w.pushRicetteSupabase = async function(){ return true; };
  w.pushEntrateSupabase = async function(){ return true; };
  w.pushEventiSupabase = async function(){ return true; };
  w.pushConcetiSupabase = async function(){ return true; };
  w._p69DialogoConflitti = function(c){ registro.dialoghi.push(c); };

  return { w, registro, db: dbReale };
}

test('P157 — INCIDENTE RIPRODOTTO: il PC indietro NON riscrive il server, e si riprende i 24 referti', async () => {
  const { w, registro, db } = preparaScenario({
    localeReferti: 0,                 // questo PC ha una copia di metà luglio, senza referti
    remotoReferti: 24,                // il server ha i 24 referti caricati dall'altro PC
    remotoUpdatedAt: NUOVO,
    baseline: { paz1: VECCHIO },
    impronte: {},                     // prima esecuzione dopo l'aggiornamento
    sporchi: []
  });

  await w.pushToSheets();

  assert.strictEqual(registro.scritturePaz.length, 0,
    'Il dispositivo indietro non deve scrivere NIENTE sulla tabella pazienti.');
  assert.strictEqual(db.pazienti[0].inbody.length, 24,
    'La copia locale deve essere stata sostituita da quella del server: è il rimedio, non solo l\'astensione.');
  assert.strictEqual(registro.dialoghi.length, 0,
    'Senza modifiche locali da difendere non si disturba l\'utente con un dialogo di conflitto.');
});

test('P157 — dispositivo allineato: il push completo non scrive più 41 righe a vuoto', async () => {
  const { w, registro, db } = preparaScenario({
    localeReferti: 24, remotoReferti: 24, remotoUpdatedAt: NUOVO,
    baseline: { paz1: NUOVO }, impronte: {}, sporchi: []
  });

  await w.pushToSheets();

  assert.strictEqual(registro.scritturePaz.length, 0,
    'Contenuto identico e dispositivo allineato: zero scritture, zero updated_at mossi.');
  const impronte = JSON.parse(w.localStorage.getItem('p157Impronte'));
  assert.ok(impronte.paz1, 'L\'impronta va registrata alla prima passata, altrimenti la volta dopo si spinge di nuovo.');
});

test('P157 — modifica locale vera su dispositivo allineato: si scrive, e il set sporco si svuota per quell\'id', async () => {
  const { w, registro, db } = preparaScenario({
    localeReferti: 25, remotoReferti: 24, remotoUpdatedAt: NUOVO,
    baseline: { paz1: NUOVO }, impronte: {}, sporchi: ['paz1']
  });

  await w.pushToSheets();

  assert.strictEqual(registro.scritturePaz.length, 1, 'La modifica locale deve arrivare al server.');
  assert.strictEqual(registro.scritturePaz[0].data.inbody.length, 25);
  assert.strictEqual(w._dirtyIds.has('paz1'), false, 'Id confermato 2xx → esce dal set sporco.');
});

test('P157 — conflitto vero: modifica qui E modifica altrove → niente scrittura, dialogo aperto, id ancora sporco', async () => {
  const { w, registro, db } = preparaScenario({
    localeReferti: 25,                // modificato qui
    remotoReferti: 24, remotoUpdatedAt: NUOVO,
    baseline: { paz1: VECCHIO },      // ma il server è andato avanti nel frattempo
    impronte: {}, sporchi: ['paz1']
  });

  await w.pushToSheets();

  assert.strictEqual(registro.scritturePaz.length, 0, 'Un conflitto non si vince in silenzio: non si scrive.');
  assert.strictEqual(db.pazienti[0].inbody.length, 25, 'E nemmeno si buttano via le modifiche locali senza chiedere.');
  await new Promise(r => setTimeout(r, 60)); // il dialogo si apre fuori dal flush
  assert.strictEqual(registro.dialoghi.length, 1, 'Il conflitto va MOSTRATO.');
  assert.strictEqual(w._dirtyIds.has('paz1'), true, 'L\'id resta sporco finché Fabrizio non decide.');
});

// ═══════════════════════════════════════════════════════════════════
// D — Le guardie strutturali
// Non provano un comportamento: impediscono che il rimedio venga tolto
// per distrazione da una sessione futura. Il rimedio, se si rompe, si
// rompe in silenzio — come il difetto che lo ha reso necessario.
// ═══════════════════════════════════════════════════════════════════

test('P157 — pushToSheets attende l\'idratazione PRIMA di qualunque scrittura', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  const i = src.indexOf('async function pushToSheets()');
  assert.ok(i > 0, 'pushToSheets non trovata: se è stata rinominata, aggiornare questo test — non cancellarlo.');
  const corpo = src.slice(i, i + 6000);
  const attesa = corpo.indexOf('_idratazioneAttendi()');
  const primaScrittura = corpo.indexOf("method:'POST'");
  assert.ok(attesa > 0, 'Manca l\'attesa dell\'idratazione: è la prima difesa di P157 (idratare prima di spingere).');
  assert.ok(primaScrittura > attesa,
    'L\'attesa deve venire PRIMA della prima POST. Questo è letteralmente il difetto dell\'11 agosto 2026.');
});

test('P157 — il push completo non svuota più il set sporco in blocco', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  const i = src.indexOf('async function pushToSheets()');
  // I commenti si tolgono: questo file NOMINA la trappola per spiegarla,
  // e un test che si fa ingannare dalla propria spiegazione è rumore.
  const corpo = src.slice(i, i + 6000).replace(/\/\/[^\n]*/g, '');
  assert.ok(!/_dirtyIds\.clear\(\)/.test(corpo),
    'Svuotare _dirtyIds in blocco cancella anche gli id NON scritti perché in conflitto: le loro modifiche sparirebbero senza un errore.');
});

test('P157 — la sincronizzazione d\'avvio è marcata come tale', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  assert.ok(/syncNow\(\{\s*avvio\s*:\s*true\s*\}\)/.test(src),
    'L\'avvio deve chiamare syncNow({avvio:true}): senza il marcatore la spinta a vuoto delle 800 ms torna.');
});

test('P157 — esiste il comando di riallineamento forzato ed è raggiungibile da un pulsante', () => {
  const src = fs.readFileSync(INDEX_PATH, 'utf-8');
  assert.ok(/async function riallineaTuttoDalCloud\(\)/.test(src));
  assert.ok(/onclick="riallineaTuttoDalCloud\(\)"/.test(src),
    'Una funzione di soccorso che non ha un pulsante è una funzione che nessuno troverà il giorno in cui serve.');
});
