// ── S2 — P127: la verifica al controllo ──
// Nasce dalla frase che chiude il cerchio di P123: il muscolo non si prevede, si
// MISURA al controllo. Il contratto fissato qui:
//  - _misuraDaReferto legge OGNI referto con lo stesso metro del traguardo
//    (altrimenti il delta fra due controlli sarebbe di metodo, non del paziente);
//  - _vcTratto misura sul GRASSO e confronta col deficit DAVVERO PRESCRITTO in
//    quel periodo (media pesata sui giorni), non col regime impostato oggi;
//  - la ritaratura si propone solo con tratto >= 21 giorni e copertura >= 60%;
//  - _verificaControllo dice quanto manca AL RITMO REALE e se la data che conta
//    per il paziente regge.
'use strict';
const assert = require('assert');
const { test } = require('node:test');
const { loadApp } = require('./_loadApp');

const win = loadApp();
const inWin = o => win.eval('(' + JSON.stringify(o) + ')');
const G = 864e5;
const iso = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const OGGI = Date.now();

// Paziente al controllo: referto vecchio di 42 giorni e referto di oggi.
// Vecchio: 82 kg, magra 66, grasso 16 (19.5%) · Oggi: 80 kg, magra 66.4, grasso 13.6 (17%)
// → 2.4 kg di grasso persi in 42 giorni = 0.4 kg/settimana.
function pazBase(extra){
  return Object.assign({
    id:'ctrl', sesso:'M', altezza:175,
    inbody:[
      { id:'a', data:iso(OGGI-42*G), peso:82.0, m:66.0, g:16.0, mb:1800, musc:37.0 },
      { id:'b', data:iso(OGGI),      peso:80.0, m:66.4, g:13.6, mb:1810, musc:37.4 }
    ],
    passiGiornalieri:7000, fontePassi:'stimati',
    seduteSettimana:3, minutiSeduta:60, tipoAllenamento:'Misto', intensitaAllenamento:'Media',
    // target salvato 45 giorni fa: copre tutto il tratto, deficit −450 kcal
    macrosStorico:[{ kcal:2050, tdee:2500, offset:-450, timestamp:OGGI-45*G, protG:140, carbG:180, grassiG:70 }]
  }, extra||{});
}

test('VERIFICA — i fatti del tratto: grasso, massa magra e ritmo reale', () => {
  const p = inWin(pazBase());
  const v = win._verificaControllo(p, null);
  assert.strictEqual(v.ok, true, v.motivo||'');
  const t = v.recente;
  assert.strictEqual(t.giorni, 42);
  assert.strictEqual(t.dGrasso, -2.4, 'grasso perso');
  assert.strictEqual(t.dMagra, 0.4, 'massa magra messa');
  assert.strictEqual(t.dMusc, 0.4, 'muscolo scheletrico, quando il referto ce l\'ha');
  assert.ok(Math.abs(t.grassoSett - 0.4) < 0.01, 'ritmo reale 0.4 kg/sett (era ' + t.grassoSett + ')');
  assert.strictEqual(t.magraBreve, false, 'oltre 21 giorni: la magra è leggibile');
});

test('VERIFICA — il previsto viene dal deficit PRESCRITTO, non dal regime di oggi', () => {
  // oggi il medico ha messo −10% sul TDEE, ma nel tratto erano −450 kcal:
  // il confronto deve usare i −450, altrimenti lo scarto è inventato.
  const p = inWin(pazBase({ regimeOffsetPct:-10 }));
  const t = win._verificaControllo(p, null).recente;
  assert.strictEqual(t.previsto.fonte, 'prescritto');
  assert.strictEqual(t.previsto.deficitKcal, -450);
  assert.ok(Math.abs(t.previsto.kgSett - 450*7/7700) < 0.001, 'ritmo atteso = deficit × 7 / 7700');
  // reale 0.40 contro atteso 0.409 → in linea
  assert.strictEqual(t.giudizio.stato, 'in-linea', 'scarto ' + t.giudizio.scartoPct + '%');
  assert.ok(Math.abs(t.giudizio.scartoPct) <= 20);
});

test('VERIFICA — senza storico che copra il tratto si ripiega sul regime attuale, dichiarandolo', () => {
  const p = inWin(pazBase({ macrosStorico:[], regimeOffsetPct:-15 }));
  const t = win._verificaControllo(p, null).recente;
  assert.strictEqual(t.previsto.fonte, 'regime-attuale');
  assert.ok(t.previsto.deficitKcal < 0);
});

test('VERIFICA — un calo molto più lento del previsto viene detto, non arrotondato', () => {
  // stesso periodo, ma solo 0.8 kg di grasso persi: 0.13 kg/sett contro 0.41 attesi
  const p = inWin(pazBase({
    inbody:[
      { id:'a', data:iso(OGGI-42*G), peso:82.0, m:66.0, g:16.0, mb:1800 },
      { id:'b', data:iso(OGGI),      peso:81.2, m:66.0, g:15.2, mb:1800 }
    ]
  }));
  const t = win._verificaControllo(p, null).recente;
  assert.strictEqual(t.giudizio.stato, 'piu-lento');
  assert.ok(t.giudizio.scartoPct < -50, 'scarto grosso e negativo: ' + t.giudizio.scartoPct);
});

test('VERIFICA — due referti troppo vicini: non si legge un ritmo, e lo si dice', () => {
  const p = inWin(pazBase({
    inbody:[
      { id:'a', data:iso(OGGI-4*G), peso:82.0, m:66.0, g:16.0, mb:1800 },
      { id:'b', data:iso(OGGI),     peso:81.0, m:66.0, g:15.0, mb:1800 }
    ]
  }));
  const v = win._verificaControllo(p, null);
  assert.strictEqual(v.ok, false);
  assert.ok(/4 giorni/.test(v.motivo), v.motivo);
});

test('VERIFICA — con un solo referto la verifica non esiste (nessun numero inventato)', () => {
  const p = inWin(pazBase({ inbody:[{ id:'b', data:iso(OGGI), peso:80, m:66.4, g:13.6, mb:1810 }] }));
  const v = win._verificaControllo(p, null);
  assert.strictEqual(v.ok, false);
  assert.ok(/secondo referto/.test(v.motivo), v.motivo);
});

test('VERIFICA — il TDEE reale e la ritaratura: solo con tratto lungo e calorie note', () => {
  const p = inWin(pazBase());
  const t = win._verificaControllo(p, null).recente;
  // 2050 kcal medie, −2 kg in 42 giorni → 2050 + 2*7700/42 = 2416
  assert.ok(t.tdeeReale, 'con 42 giorni e copertura piena il TDEE reale si calcola');
  assert.ok(Math.abs(t.tdeeReale.kcal - 2417) <= 2, 'TDEE reale ~2417 (era ' + t.tdeeReale.kcal + ')');
  assert.strictEqual(t.tdeeReale.kcalMedia, 2050);

  // stesso paziente su 14 giorni: sotto la soglia, niente proposta
  const breve = inWin(pazBase({
    inbody:[
      { id:'a', data:iso(OGGI-14*G), peso:81.0, m:66.0, g:15.0, mb:1800 },
      { id:'b', data:iso(OGGI),      peso:80.0, m:66.4, g:13.6, mb:1810 }
    ]
  }));
  const tb = win._verificaControllo(breve, null).recente;
  assert.strictEqual(tb.tdeeReale, null, 'sotto i 21 giorni nessun TDEE misurato');
  assert.strictEqual(tb.magraBreve, true, 'e la massa magra va letta con prudenza');
});

test('VERIFICA — quanto manca AL RITMO REALE, e la data che conta per il paziente', () => {
  const p = inWin(pazBase({
    obiettivoPercorso:{
      clinico:{ pctGrassoTarget:12, modo:'dimagrimento', quotaMagraPersa:20 },
      paziente:{ scadenzaPersonale: iso(OGGI + 30*G), eventoScadenza:'il matrimonio di sua sorella' },
      storico:[], traguardi:[]
    }
  }));
  const v = win._verificaControllo(p, null);
  assert.ok(v.residuo, 'col traguardo salvato il residuo si calcola');
  assert.ok(v.residuo.kgGrasso > 2 && v.residuo.kgGrasso < 5, 'grasso residuo: ' + v.residuo.kgGrasso);
  // a 0.4 kg/sett servono ~8+ settimane: la scadenza a 30 giorni non regge
  assert.ok(v.residuo.settimane > 5, 'settimane al ritmo reale: ' + v.residuo.settimane);
  assert.strictEqual(v.residuo.arrivaEntro, false, 'e va detto che a quella data non ci arriva');
  assert.strictEqual(v.residuo.evento, 'il matrimonio di sua sorella');
});

test('VERIFICA — con tre referti compare anche il quadro dall\'inizio', () => {
  const p = inWin(pazBase({
    inbody:[
      { id:'z', data:iso(OGGI-120*G), peso:88.0, m:66.0, g:22.0, mb:1790 },
      { id:'a', data:iso(OGGI-42*G),  peso:82.0, m:66.0, g:16.0, mb:1800 },
      { id:'b', data:iso(OGGI),       peso:80.0, m:66.4, g:13.6, mb:1810 }
    ]
  }));
  const v = win._verificaControllo(p, null);
  assert.ok(v.complessivo && v.complessivo.ok);
  assert.strictEqual(v.complessivo.giorni, 120);
  assert.strictEqual(v.complessivo.dGrasso, -8.4, 'tutto il cammino, non solo l\'ultimo tratto');
  assert.strictEqual(v.nReferti, 3);
});

test('VERIFICA — referti inseriti fuori ordine: la lettura resta cronologica', () => {
  // P120 garantisce l'ordine in scrittura; qui si verifica che la LETTURA non
  // dipenda da quell'invariante (un referto caricato dopo non deve invertire i segni)
  const p = inWin(pazBase({
    inbody:[
      { id:'b', data:iso(OGGI),      peso:80.0, m:66.4, g:13.6, mb:1810 },
      { id:'a', data:iso(OGGI-42*G), peso:82.0, m:66.0, g:16.0, mb:1800 }
    ]
  }));
  const t = win._verificaControllo(p, null).recente;
  assert.strictEqual(t.dGrasso, -2.4, 'il grasso è sceso, non salito');
  assert.ok(t.grassoSett > 0);
});

test('VERIFICA — la magra usata è la stessa del traguardo (nessuna doppia fonte)', () => {
  const p = inWin(pazBase());
  const ultimo = win._misuraDaReferto(p.inbody[p.inbody.length-1], p);
  const trg = win._traguardoMisura(p);
  assert.strictEqual(ultimo.m, trg.m);
  assert.strictEqual(ultimo.g, trg.g);
  assert.strictEqual(ultimo.pg, trg.pg);
});

test('VERIFICA — regime non in deficit: si guarda il muscolo, non la velocità di calo', () => {
  const p = inWin(pazBase({
    macrosStorico:[{ kcal:2600, tdee:2500, offset:100, timestamp:OGGI-45*G }],
    inbody:[
      { id:'a', data:iso(OGGI-42*G), peso:80.0, m:65.0, g:15.0, mb:1800 },
      { id:'b', data:iso(OGGI),      peso:81.0, m:66.2, g:14.8, mb:1810 }
    ]
  }));
  const t = win._verificaControllo(p, null).recente;
  assert.strictEqual(t.giudizio.stato, 'non-deficit');
  assert.ok(t.dMagra > 1, 'e il dato che conta è la magra: +' + t.dMagra + ' kg');
});

test('VERIFICA — _kcalMediaPrescrittaOss continua a funzionare dopo la generalizzazione', () => {
  const p = inWin(pazBase());
  const km = win._kcalMediaPrescrittaOss(p, iso(OGGI-42*G), iso(OGGI));
  assert.ok(km && Math.abs(km.kcalMedia - 2050) < 1);
  assert.ok(Math.abs(km.coperturaGiorni - 42) < 1);
});

test('VERIFICA — il blocco HTML compare nei due posti e le azioni solo dove servono', () => {
  const p = inWin(pazBase({ regimeOffsetPct:-15 }));   // la ritaratura riusa la % impostata
  const conAzioni = win._verificaControlloHtml(p, null, {azioni:true});
  const senzaAzioni = win._verificaControlloHtml(p, null, {azioni:false});
  assert.ok(/Com/.test(conAzioni) && /andata davvero/.test(conAzioni));
  assert.ok(/_vcRitara\(/.test(conAzioni), 'nel pannello 🎯 c\'è il tasto di ritaratura');
  assert.ok(!/_vcRitara\(/.test(senzaAzioni), 'nella scheda Percorso no: lì il campo calorie non esiste');
  assert.ok(/scheda Macros/.test(senzaAzioni), 'e si dice dove applicarla');
  // paziente senza secondo referto: nessun riquadro, nemmeno vuoto
  const solo = inWin(pazBase({ inbody:[{ id:'b', data:iso(OGGI), peso:80, m:66.4, g:13.6, mb:1810 }] }));
  assert.strictEqual(win._verificaControlloHtml(solo, null, {azioni:true}), '');
});
