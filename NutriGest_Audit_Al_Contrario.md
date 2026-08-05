# NutriGest — Audit "al contrario": dal codice ai documenti

**Data:** 4 agosto 2026 · **Baseline:** commit `b413f08` (HEAD di `main` all'inizio e alla fine — nessuna modifica al codice fatta durante questo audit).

## Cosa chiedeva Fabrizio

Il verso opposto del solito controllo: non "i documenti dicono il vero sul codice?" ma **"esiste codice di cui nessun documento parla affatto?"**. L'idea è nata durante la sessione precedente (peso casalingo), quando è emerso che nei primi mesi di lavoro insieme non tutte le modifiche erano state registrate in CHANGELOG.

## Metodologia

1. **Inventario meccanico.** `INDEX.md` mappa 877 funzioni top-level di `index.html` con la riga esatta. Uno script ha cercato il NOME letterale di ognuna (con confini di parola, per evitare falsi positivi tipo "row" dentro una frase) in `CHANGELOG.md`, `NutriGest_Roadmap_v4.md`, `NutriGest_Contesto_v18.txt`, `CLAUDE.md`.
2. **Filtro grezzo:** 401 funzioni su 877 (46%) non compaiono per nome in nessuno dei quattro documenti. Questo è solo un segnale — non vuol dire "non documentate", vuol dire "il nome esatto non è scritto da nessuna parte".
3. **Lettura umana (per modo di dire — 9 sessioni di lettura indipendenti, una per area funzionale).** Ognuna delle 401 funzioni è stata letta per intero nel codice e giudicata: banale (getter/setter/wiring UI) → scartata; comportamento già descritto in prosa sotto un numero di roadmap anche senza il nome esatto → scartata; comportamento reale e non descritto da nessuna parte → **segnalata**.
4. **Verifica finale mia, riga per riga**, su tutte le segnalazioni sopravvissute: ho riletto il codice sorgente di ognuna e ricontrollato con grep i documenti, per lo stesso motivo per cui l'ho fatto in tutto l'audit precedente — "il codice è l'arbitro", una segnalazione non verificata non entra in questa lista.

**Risultato:** delle 401 candidate, **7 sono segnalazioni reali**. Le altre 394 erano getter/setter/wiring banali, oppure funzionalità già raccontate in CHANGELOG/Roadmap/Contesto sotto un numero di voce anche senza il nome esatto della funzione. Non è un cattivo risultato per un file da 30.300 righe: la disciplina di documentazione tenuta finora regge, con sette buchi puntuali da colmare.

---

## Le 7 segnalazioni

### ✅ 1. `selCatAl` — un clic può spegnere un avviso di sicurezza alimentare senza conferma — **CORRETTA 5 ago 2026**
**Riga 27316** · sezione ALIMENTI (semaforo)

*Decisione di Fabrizio: "'tutti' si deve comportare come 'singolo' ... deve restare visibile che quell'alimento era o celeste o grigio scuro." Corretto: "Tutti" registra l'origine (come `togAl`) prima di sovrascrivere, `renderAlEditor` mostra comunque il badge con un marcatore ✏️ di override, e il ciclo completo torna all'origine invece che al neutro. Dettagli in CHANGELOG, 5 agosto 2026. Test: `s2-selcatal-preserva-origine.test.js`.*

Il bottone "Tutti" accanto a ogni categoria dell'editor alimenti fa scorrere l'intera categoria fra 4 stati (neutro → sì → arancione → rosso → neutro) e scrive quello stato per OGNI alimento della categoria in un colpo solo — **senza controllare se qualcuno di quegli alimenti era colorato grigio scuro/celeste per un motivo clinico automatico** (allergia, intolleranza, patologia). Il toggle singolo (`togAl`) ha una protezione che ricorda il colore automatico di origine; il bottone "Tutti" no.

Conseguenza pratica: un clic su "Tutti → sì" su una categoria che contiene un alimento segnato automaticamente grigio scuro per glutine o lattosio lo marca "consigliato" senza avviso. E siccome `applicaRegoloSemaforo` (la funzione che ricalcola i colori automatici a ogni apertura) **non tocca mai i colori impostati manualmente**, quella sovrascrittura resta per sempre, anche se in futuro cambiano le condizioni cliniche del paziente.

Non è un bug nel senso di "codice rotto" — fa esattamente quello che è scritto per fare. È un comportamento mai discusso da nessuna parte, e vale la domanda: **è voluto che "Tutti" bypassi la protezione che "singolo" ha?**

### 🟠 2. `suggerisciPastoEQuando` — due voci della libreria integratori si autoclassificano nel momento sbagliato
**Riga 8229** · sezione PAZIENTI (routine/integratori)

Quando si aggiunge una voce dalla libreria predefinita di 30 integratori/spezie/superfood, questa funzione legge il campo libero "quando assumerlo" e lo traduce in un pasto strutturato (colazione, pranzo, cena, pre-nanna…) — è questo dato a decidere sotto quale sezione la voce compare nel PDF consegnato al paziente.

L'ordine dei controlli testa prima `/sera|...|notte|.../ ` e solo dopo `/mattin|.../`. Due voci **native della libreria stessa** ci cadono dentro:
- "Fieno greco (semi)": `quando: "Ammollo la sera, consumo al mattino"` → contiene "sera" → classificato **Pre-nanna** invece di Colazione.
- "Semi di chia (ammollo)": `quando: "Notte precedente, consumo a colazione"` → contiene "notte" → stesso errore.

Il professionista può correggere a mano dal menu a tendina che appare subito dopo l'aggiunta, ma il valore proposto di default è sbagliato per due voci pensate apposta per essere aggiunte con un clic, e nulla segnala l'errore.

### 🟠 3. `verificaRegola_75_20_5` — il nome del badge non è la soglia che il codice controlla
**Riga 17819** · sezione GENERATORE PIANI (validatore clinico)

Il badge mostrato al professionista si chiama "75/20/5" ovunque — nel codice, nei commenti, nell'interfaccia. Ma la soglia effettivamente calcolata è:
```
percV >= 70 && percA <= 25 && percR <= 10
```
cioè **70/25/10**, non 75/20/5. Nessuno dei quattro documenti riporta i numeri reali né spiega lo scarto — CHANGELOG e Contesto citano solo genericamente "badge 75/20/5". Non so se 70/25/10 sia una tolleranza voluta (più permissiva del nome) o un disallineamento fra etichetta e soglia mai aggiornato in un verso o nell'altro — è la domanda da fare a Fabrizio.

### 🟡 4. `delRic` su una ricetta di sistema — "Eliminata" non è vero
**Riga 27995** · sezione RICETTARIO

Quando si elimina una delle 6 ricette di sistema (`RICETTE_DEFAULT`), la funzione la toglie da `db.ricette` in locale e mostra "✅ Ricetta eliminata" — **ma non chiama mai `delRicetteSupabase`**, perché il ramo `if(!isDefault)` lo salta apposta. Il problema è che `pullRicetteSupabase` (chiamata a ogni sync/pull/ricarica) ricostruisce sempre `db.ricette` ripartendo da `[...RICETTE_DEFAULT]` senza eccezioni: al primo sync dopo l'eliminazione, la ricetta **ritorna da sola**, silenziosamente, dopo che l'utente ha visto un messaggio di successo.

Impatto pratico basso (solo 6 ricette coinvolte, probabilmente mai eliminate sul serio), ma il messaggio a video mente su cosa è realmente successo.

### 🟡 5. Il modulo "B3 — Validazione input numerici" non è mai stato raccontato
**Riga 30201** (funzione IIFE, contiene `validaInput`/`getHint`/`attaccaTutti`, esposta come `window.b3Attach`)

È un modulo completo e attivo su **26 campi diversi** in tutta l'app — tutti i parametri InBody (peso, %grasso, massa magra, MB, livello viscerale, pressione, girovita, altezza…), macro (g/kg proteine/grassi, peso target), ricette (kcal, macro, porzioni) e persino campi economici (prezzo visita/controllo, importo entrata). Per ognuno applica una soglia "fuori range" (bordo rosso, bloccante solo visivamente) e una "valore insolito" (giallo, di avviso) — non impedisce mai il salvataggio, solo segnala.

L'ho cercato apposta sotto P63b (che tocca la stessa area, i controlli InBody) perché il commit che lo introduce (`ec6b52c`) è vicino a quella voce — ma la voce P63b in CHANGELOG parla solo di `_ibControllaCoerenza` (le identità aritmetiche peso=grassa+magra), non di questo modulo. Le 26 soglie (es. MB 500-5000 kcal, girovita 40-200 cm, peso target 30-250 kg) sono decisioni di plausibilità clinica che nessun documento discute o giustifica: oggi, se un valore andasse aggiornato, nessuno saprebbe dove cercarlo.

### 🟡 6. `ascoltaProgresso` — l'AI scrive e legge ad alta voce un commento motivazionale al paziente, e nessuno lo sa
**Riga 26442** · sezione COMPOSIZIONE CORPOREA

Il pulsante "▶ Ascolta il tuo progresso" nella card "Memoria paziente tra visite" confronta le ultime due misurazioni InBody, chiede all'AI di scrivere un commento **in seconda persona, rivolto per nome al paziente** ("Sei un nutrizionista empatico che parla direttamente al paziente…"), poi legge il testo ad alta voce con la sintesi vocale del browser (`speechSynthesis`).

L'unico riscontro nei documenti è una riga di passaggio nella chiusura di P66c (18 lug 2026, rimozione della chiave API diretta) che cita "voce-progresso" come uno dei 15 punti di chiamata AI da bonificare — nessuno descrive **cosa fa** la funzione. Due cose valgono la pena di essere scritte da qualche parte: il testo che l'AI genera non viene rivisto da Fabrizio prima di essere letto ad alta voce al paziente, e la qualità/compatibilità della sintesi vocale fra Chrome (PC) e Safari (iPhone) non è garantita.

### ⚪ 7. `applicaPatch` — funzione morta, mai chiamata
**Riga 30108** · sezione GENERATORE PIANI

Converte un "patch" dal formato pasto esteso (`principale1`/`principale2`/`alternative`) al formato compatto ormai superato (`p1`/`p2`/`alt`/`olio`). `grep` sul nome nell'intero file trova solo la sua definizione — zero chiamate. Sembra un residuo di un meccanismo di correzione via chat pre-P27. Non fa danno finché resta spenta, ma è lo stesso pattern già visto con `_applicaRegoloSemaforoLEGACY` (regola 13 di CLAUDE.md): codice raggiungibile che nessuno ha tolto. Se qualcuno la ricollegasse per errore scriverebbe silenziosamente nelle chiavi sbagliate di un piano.

---

## Cosa NON è una segnalazione (per trasparenza sul metodo)

Un caso è stato scartato dopo verifica: `applicaPatch` era inizialmente segnalato con dubbio "forse ancora in uso" da un agente — confermato morto con `grep -c` (1 sola occorrenza, la definizione). Restano dentro alla lista come segnalazione 7 solo perché "codice morto raggiungibile" è di per sé un rischio secondo la regola 13 di CLAUDE.md, non perché faccia danno oggi.

Le altre 394 funzioni "a zero menzioni" scartate includono, per fare qualche esempio concreto: l'intera sezione ANDAMENTO NEL TEMPO (P118 tappa 3) risultava a zero per nome ma è descritta in dettaglio, riga per riga, in CHANGELOG; la messaggistica WhatsApp AI (varianti, storico) è coperta da B1; tutta la lista della spesa da P84; i template piano dal commit del 27 giugno. In questi casi il nome della funzione non compare, ma il *comportamento* sì — non sono buchi.

---

## Come procedere

Nessuna modifica al codice è stata fatta. Come per l'audit di coerenza: **ecco la lista, decidi tu voce per voce** — quali di questi 7 punti vuoi sistemare (e come), quali vuoi solo documentare così come sono oggi, e quali vuoi lasciare aperti in Roadmap per dopo.
