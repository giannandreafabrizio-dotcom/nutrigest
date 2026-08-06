// ── S2 — P122 correzioni post-collaudo (26 lug 2026) ──
// Nate dal collaudo sul campo di Fabrizio. Fissano il contratto su:
//  1. RICOMPOSIZIONE: la massa magra può SALIRE — puntare al 9% di grasso non
//     significa dimagrire. Modo scelto dalla categoria dichiarata in visita;
//  2. COERENZA REFERTI: la % di grasso è SEMPRE derivata dalla massa magra usata
//     (mai la coppia contraddittoria "13 kg (10%)"), e i referti che non tornano
//     fra loro vengono dichiarati, non aggiustati in silenzio;
//  3. CONFRONTO ASPETTATIVA: direzioni opposte riconosciute guardando il peso
//     attuale e lo scenario in uso;
//  4. MESSAGGI: quota 0 non è "non calcolabile", è "i due scenari coincidono";
//  5. Retrocompatibilità della firma (terzo parametro numerico).
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');

// Il paziente del collaudo: 83 kg, massa magra 70 → grasso 13 kg = 15.7%.
function paz(extra){
  return Object.assign({
    id:'c', sesso:'M', altezza:180,
    inbody:[{ id:'i1', data:'2026-05-07', peso:83, m:70, g:13, altezza:180 }]
  }, extra||{});
}

// ── 1. RICOMPOSIZIONE ────────────────────────────────────────────────────────

test('RICOMPOSIZIONE — la tabella del collaudo: stesso 9%, peso finale da 76.9 a 83.5', () => {
  const t = g => win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:g});
  assert.strictEqual(t(0).ottimista.peso, 76.9, 'magra ferma: 70 / 0.91');
  assert.strictEqual(t(2).realistico.peso, 79.1, '+2 kg di magra');
  assert.strictEqual(t(4).realistico.peso, 81.3, '+4 kg di magra');
  const r6 = t(6);
  assert.strictEqual(r6.realistico.peso, 83.5, '+6 kg di magra: il peso NON scende');
  assert.ok(r6.realistico.delta > 0, 'anzi sale di mezzo chilo mentre il grasso crolla');
  assert.strictEqual(r6.direzionePeso, 'stabile', 'sulla bilancia non succede niente');
});

test('RICOMPOSIZIONE — il vincolo torna: la magra finale è il 91% del peso finale', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:4});
  assert.ok(Math.abs(r.realistico.m / r.realistico.peso - 0.91) < 0.002, 'la % di grasso obiettivo è davvero il 9%');
  assert.strictEqual(r.realistico.m, 74, '70 + 4 kg di massa magra');
});

test('RICOMPOSIZIONE — i due numeri che contano: grasso da togliere e magra da mettere', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:6});
  assert.strictEqual(r.magraDaMettere, 6);
  assert.ok(Math.abs(r.grassoDaPerdere - 5.5) < 0.11, '13 kg di grasso → 7.5: ne perde 5.5 (era ' + r.grassoDaPerdere + ')');
  // P150 — la nota e' stata accorciata (la coppia di numeri e' gia' nel riquadro
  // sopra): quello che deve restare e' l'indicazione di NON guardare la bilancia.
  assert.ok(r.avvisi.some(a => /non la bilancia/i.test(a.txt)), 'lo dice esplicitamente: guarda la coppia, non la bilancia');
});

test('RICOMPOSIZIONE — in dimagrimento la magra CALA, in ricomposizione SALE: segni opposti', () => {
  const dim = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'dimagrimento', quotaMagraPersa:20});
  const ric = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:2});
  assert.ok(dim.magraDaMettere < 0, 'dimagrendo si perde anche magra: ' + dim.magraDaMettere);
  assert.ok(ric.magraDaMettere > 0, 'in ricomposizione se ne mette: ' + ric.magraDaMettere);
  assert.ok(ric.realistico.peso > dim.realistico.peso, 'e il peso obiettivo è più alto');
});

test('RICOMPOSIZIONE — il modo si presceglie dalla categoria dichiarata in visita', () => {
  assert.strictEqual(win._traguardoModoDaCategoria(inWin({})), 'dimagrimento', 'senza categoria: comportamento storico');
  const ric = inWin({ obiettivoPercorso:{ paziente:{ categoria:'ricomposizione' } } });
  assert.strictEqual(win._traguardoModoDaCategoria(ric), 'ricomposizione');
  const massa = inWin({ obiettivoPercorso:{ paziente:{ categoria:'massa' } } });
  assert.strictEqual(win._traguardoModoDaCategoria(massa), 'ricomposizione', 'anche "massa" fa salire il muscolo');
  const dim = inWin({ obiettivoPercorso:{ paziente:{ categoria:'dimagrire' } } });
  assert.strictEqual(win._traguardoModoDaCategoria(dim), 'dimagrimento');
});

test('RICOMPOSIZIONE — guadagno 0: i due scenari coincidono e il messaggio lo dice', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:0});
  assert.strictEqual(r.realeApplicabile, false);
  assert.strictEqual(r.realistico.peso, r.ottimista.peso);
  assert.ok(r.avvisi.some(a => /coincidono/.test(a.txt)), 'non "non calcolabile": coincidono');
  assert.ok(!r.avvisi.some(a => /non calcolabile/.test(a.txt)));
});

test('CORREZIONE 4 — quota 0 in dimagrimento: messaggio corretto, non un finto errore', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 12, {modo:'dimagrimento', quotaMagraPersa:0});
  assert.ok(r.avvisi.some(a => /si conservi tutta/.test(a.txt) && /coincidono/.test(a.txt)));
  assert.ok(!r.avvisi.some(a => /non calcolabile/.test(a.txt)), 'il vecchio messaggio fuorviante è sparito');
});

test('RETROCOMPATIBILITÀ — terzo parametro numerico = quota del calo, come prima', () => {
  const num = win.calcolaTraguardoComposizione(inWin(paz()), 12, 20);
  const obj = win.calcolaTraguardoComposizione(inWin(paz()), 12, {modo:'dimagrimento', quotaMagraPersa:20});
  assert.strictEqual(num.realistico.peso, obj.realistico.peso);
  assert.strictEqual(num.modo, 'dimagrimento');
  assert.strictEqual(num.quotaMagraPersa, 20);
});

// ── 2. COERENZA DEI REFERTI ──────────────────────────────────────────────────

test('COERENZA — la % di grasso è sempre derivata dalla massa magra, mai copiata dal referto', () => {
  // il referto del collaudo: 83 kg, magra 70, ma %grasso scritta 10 (impossibile)
  const mis = win._traguardoMisura(inWin({ inbody:[{ peso:83, m:70, pg:10 }] }));
  assert.strictEqual(mis.m, 70);
  assert.strictEqual(mis.g, 13);
  assert.strictEqual(mis.pg, 15.7, 'NON 10: 13 kg su 83 sono il 15.7%, e i numeri mostrati devono tornare fra loro');
});

test('COERENZA — il referto che non torna viene dichiarato, con i due traguardi possibili', () => {
  const mis = win._traguardoMisura(inWin({ inbody:[{ peso:83, m:70, pg:10 }] }));
  assert.ok(mis.incoerenza, 'scarto di 5.7 punti: va segnalato');
  assert.strictEqual(mis.incoerenza.magraUsata, 70, 'si usa il campo massa magra, come i macro');
  assert.strictEqual(mis.incoerenza.magraAlternativa, 74.7, 'con la % del referto sarebbe 74.7 kg');
  const r = win.calcolaTraguardoComposizione(inWin({ sesso:'M', inbody:[{ peso:83, m:70, pg:10 }] }), 9, 20);
  assert.ok(r.avvisi.some(a => a.liv === 'avviso' && /non tornano fra loro/.test(a.txt)), 'e l\'avviso arriva nel pannello');
});

test('COERENZA — massa magra + massa grassa che non fanno il peso', () => {
  const mis = win._traguardoMisura(inWin({ inbody:[{ peso:83, m:70, g:8 }] }));
  assert.ok(mis.incoerenza);
  assert.ok(mis.incoerenza.problemi.some(x => /peso/.test(x.cosa)), '70 + 8 = 78, non 83');
  assert.strictEqual(mis.incoerenza.magraAlternativa, 75, 'con la grassa del referto: 83 − 8');
});

test('COERENZA — un referto che torna non produce nessun allarme', () => {
  const mis = win._traguardoMisura(inWin({ inbody:[{ peso:83, m:70, g:13, pg:15.7 }] }));
  assert.strictEqual(mis.incoerenza, null);
  const arrotondato = win._traguardoMisura(inWin({ inbody:[{ peso:83, m:70, g:13, pg:15.6 }] }));
  assert.strictEqual(arrotondato.incoerenza, null, 'un decimo di scarto è arrotondamento, non un errore');
});

test('COERENZA — quando la magra è derivata non c\'è niente da controllare', () => {
  const daG = win._traguardoMisura(inWin({ inbody:[{ peso:80, g:20, pg:99 }] }));
  assert.strictEqual(daG.m, 60);
  assert.strictEqual(daG.incoerenza, null, 'la magra viene da peso−grassa: per costruzione coerente');
  assert.strictEqual(daG.fonteMagra, 'peso − massa grassa');
});

// ── 3. CONFRONTO CON L'ASPETTATIVA ───────────────────────────────────────────

test('ASPETTATIVA — direzioni opposte: pesa 83, ne vuole 86, il traguardo lo porta a 79', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:2});
  const c = win._traguardoConfrontoAspettativa(86, r);
  assert.strictEqual(c.liv, 'opposto', 'non è "più prudente": sono direzioni opposte');
  assert.match(c.txt, /vuole salire/);
  assert.match(c.txt, /scendere/);
  assert.ok(!/alzare l'asticella/.test(c.txt), 'il vecchio messaggio senza senso è sparito');
});

test('ASPETTATIVA — se il traguardo porta al peso attuale, 86 torna a essere solo ambizioso', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:6});
  assert.strictEqual(r.direzionePeso, 'stabile');
  const c = win._traguardoConfrontoAspettativa(86, r);
  assert.notStrictEqual(c.liv, 'opposto', 'qui le direzioni non sono in conflitto');
});

test('ASPETTATIVA — la direzione è quella dello scenario in uso, non del centro fascia', () => {
  // fascia 76.9–83.5 a cavallo del peso attuale (83): il centro direbbe "scendere",
  // ma lo scenario scelto porta a 83.5, cioè fermo/su.
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 9, {modo:'ricomposizione', guadagnoMagra:6});
  assert.ok(r.fascia[0] < 83 && r.fascia[1] > 83, 'la fascia sta davvero a cavallo: ' + r.fascia.join('–'));
  const c = win._traguardoConfrontoAspettativa(90, r);
  assert.notStrictEqual(c.liv, 'opposto', '90 kg è nella stessa direzione dello scenario in uso');
});

test('ASPETTATIVA — in dimagrimento puro il comportamento storico non cambia', () => {
  const r = win.calcolaTraguardoComposizione(inWin(paz()), 12, {modo:'dimagrimento', quotaMagraPersa:20});
  assert.strictEqual(win._traguardoConfrontoAspettativa(r.realistico.peso, r).liv, 'ok');
  assert.strictEqual(win._traguardoConfrontoAspettativa(60, r).liv, 'gap', 'molto sotto il corridoio: ambizioso');
  assert.strictEqual(win._traguardoConfrontoAspettativa(82, r).liv, 'nota', 'sopra il corridoio ma stessa direzione: prudente');
});
