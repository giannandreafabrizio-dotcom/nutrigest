// ═══════════════════════════════════════════════════════════════════
// CLAUDE.md — la numerazione delle regole non ha buchi né doppioni
//
// PERCHÉ QUESTO FILE ESISTE. `CLAUDE.md` è l'unico documento che ogni
// sessione legge PER INTERO, e le sue regole sono citate per numero nel
// CHANGELOG e nella Roadmap: rinumerarle romperebbe quei riferimenti,
// perderne una la farebbe sparire in silenzio. È già successo due volte
// in forme diverse:
//   · 10 ago 2026 — la lista saltava da 22 a 24: chi citava «regola 23»
//     e chi scorreva l'elenco non trovavano la stessa cosa;
//   · 12 ago 2026 — i punti 5, 6 e 7 della Regola 23 esistevano SOLO
//     nella copia dentro claude.ai, non nella fonte di verità.
// Ed è il file su cui si è fatta, il 12 agosto 2026, una compattazione da
// 61 a 48 KB: esattamente l'operazione in cui una regola può cadere senza
// che nessuno se ne accorga.
//
// COSA QUESTO TEST NON VEDE (dichiarato, non nascosto): non giudica il
// CONTENUTO di una regola. Una regola svuotata del suo perché, o
// riscritta al contrario, passa questo test. Verifica solo che la
// struttura numerata regga — che è la parte meccanizzabile. Un verde qui
// significa «nessuna regola è sparita e nessun numero si è spostato»,
// non «CLAUDE.md è in ordine».
// ═══════════════════════════════════════════════════════════════════
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const CLAUDE_PATH = path.join(__dirname, '..', '..', 'CLAUDE.md');

function regoleNumerate(){
  const src = fs.readFileSync(CLAUDE_PATH, 'utf-8');
  const i = src.indexOf('## Regole di sviluppo');
  assert.ok(i > 0, 'Sezione «Regole di sviluppo» non trovata: se è stata rinominata, aggiornare questo test — non cancellarlo.');
  const j = src.indexOf('\n## ', i + 10);
  const sezione = src.slice(i, j > 0 ? j : src.length);
  const numeri = [];
  const enunciati = {};
  sezione.split('\n').forEach(function(riga){
    const m = riga.match(/^(\d{1,2})\. \*\*(.+?)\*\*/);
    if(m){ numeri.push(Number(m[1])); enunciati[Number(m[1])] = m[2]; }
  });
  return { numeri, enunciati, sezione };
}

test('CLAUDE.md — le regole sono numerate da 1 senza buchi', () => {
  const { numeri } = regoleNumerate();
  assert.ok(numeri.length >= 28, 'Le regole non diminuiscono: erano 28 al 12 ago 2026, ne risultano ' + numeri.length + '.');
  const attese = Array.from({length: numeri.length}, (_, k) => k + 1);
  assert.deepStrictEqual(numeri.slice().sort((a,b)=>a-b), attese,
    'Buco nella numerazione: una regola citata per numero nel CHANGELOG non si troverebbe più. Il rimedio è riaggiungere la voce mancante, MAI rinumerare.');
});

test('CLAUDE.md — nessun numero di regola usato due volte', () => {
  const { numeri } = regoleNumerate();
  const visti = new Set(), doppi = [];
  numeri.forEach(function(n){ if(visti.has(n)) doppi.push(n); visti.add(n); });
  assert.deepStrictEqual(doppi, [], 'Due regole con lo stesso numero: la citazione diventa ambigua.');
});

test('CLAUDE.md — le regole sono in ordine crescente nel file', () => {
  const { numeri } = regoleNumerate();
  const ordinato = numeri.slice().sort((a,b)=>a-b);
  assert.deepStrictEqual(numeri, ordinato,
    'Chi scorre l\'elenco e chi cerca per numero devono trovare la stessa cosa.');
});

test('CLAUDE.md — ogni regola ha un enunciato non vuoto', () => {
  const { numeri, enunciati, sezione } = regoleNumerate();
  // TARATURA (P146 — uno strumento di misura va tarato prima di credergli).
  // La prima versione pretendeva un grassetto lungo e segnalava le regole
  // 4-7, che sono sane: il loro grassetto è un'ETICHETTA breve («Null
  // check») seguita dalla spiegazione. Si misura quindi la riga intera, e
  // si chiede al grassetto solo di esistere.
  const righe = {};
  sezione.split('\n').forEach(function(r){
    const m = r.match(/^(\d{1,2})\. \*\*/);
    if(m) righe[Number(m[1])] = r;
  });
  numeri.forEach(function(n){
    assert.ok((enunciati[n]||'').trim().length > 0,
      'La regola ' + n + ' non ha un titolo in grassetto.');
    // Soglia tarata sul file vero: la regola più corta è la 6 («Un solo
    // file», 58 caratteri) ed è completa. 40 lascia passare le regole
    // brevi legittime e ferma solo un titolo rimasto senza frase.
    assert.ok(righe[n].length > 40,
      'La regola ' + n + ' è ridotta a un titolo senza contenuto: una regola svuotata è peggio di una regola assente, perché occupa il suo numero.');
  });
});

test('CLAUDE.md — la tabella dei documenti di progetto non si svuota', () => {
  const src = fs.readFileSync(CLAUDE_PATH, 'utf-8');
  const righe = src.match(/^\| `[^`]+`[^\n]*\|/gm) || [];
  assert.ok(righe.length >= 28,
    'La tabella di fiducia elencava 28 documenti al 12 ago 2026, ne risultano ' + righe.length +
    '. Un indice incompleto è più pericoloso di un documento vecchio (Regola 23, punto 7).');
});

test('CLAUDE.md — le sezioni a cui le regole rimandano esistono ancora', () => {
  const src = fs.readFileSync(CLAUDE_PATH, 'utf-8');
  // Le regole 23 e 24 non contengono il testo: rimandano. Se la sezione
  // sparisce, la regola diventa un vicolo cieco senza che nulla lo segnali.
  assert.ok(/### Regola 23 —/.test(src), 'La regola 23 rimanda alla sezione «Regola 23», che non c\'è più.');
  assert.ok(/## Connettori collegati/.test(src), 'La regola 24 rimanda alla sezione «Connettori collegati», che non c\'è più.');
});
