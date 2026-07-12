# NutriGest — Roadmap unificata (pianificazione + analisi CTO)

**Documento di lavoro operativo.** Unifica la Roadmap Due (pianificazione: priorità, dipendenze, categorie) e l'Analisi Critica CTO (per ogni voce: critica + soluzione ottimizzata + scheda C/I/R + modello + autonomia). Erano due documenti separati con lo stesso scheletro P-numerato — fusi l'8 luglio 2026 in un'unica fonte per eliminare la duplicazione (chunk concorrenti nel retrieval) e avere **una sola casa per voce**. Ogni critica è ancorata a comportamenti verificati nel codice.

> **REGOLA FONDAMENTALE E PERMANENTE:** il File di Contesto descrive SEMPRE il presente, questa Roadmap SEMPRE il futuro. Quando una voce è sviluppata, chiusa e testata: esce da qui ed entra nel Contesto (funzionalità) + CHANGELOG (commit), nello stesso momento. Nessuna voce vive in entrambi.

> **Numerazione:** P1–P58 = storica (voci chiuse nel Contesto/CHANGELOG). Voci nuove da P59.

**Stato voci chiuse (8 lug 2026, aggiornato 13 lug 2026):** P61 (validatore clinico), P62 (troncamento), P77 (output strutturato tool-use, commit `676927e`), P78 (suite test, commit `ba5c109`), **P68** (push incrementale, commit `5487754`+`97f0d53`), **P55** (sorgente unica target macros, `getTargetAttivi`, commit `85b18ea`, 9 lug 2026), **P105** (fix sessione anti-42501, commit `d32f6aa`, 12 lug 2026), **P108 fase 0** (catalogo unico alimenti con id stabile, `risolviAlimento`, commit `f574bb5`, 13 lug 2026), **P109** (valori CREA-INRAN per 68/95 alimenti privi di macros, commit `937cf17`, 13 lug 2026) chiuse **per intero** → archiviate in fondo (ragionamento CTO) e dettagliate nel CHANGELOG. P63 (diff import, `8c9e77a`) e P66 (proxy AI, `85fc8cd`) chiuse **in parte**, restano come voci-residuo qui sotto. **P60** (separatore frutta PDF, commit `17064c8`) chiusa il 7 lug 2026; **P59** (marker frutta su celle) chiusa lo stesso giorno ma **scartata** dopo verifica clinica (implementata poi revertita, commit `d3c50e0`→`177dce9`) — corretto il 9 lug 2026 un disallineamento: erano rimaste segnate "Da fare" in questo file nonostante CHANGELOG e Contesto le documentassero già chiuse dal 7 luglio. Tutte secondo la SOLUZIONE OTTIMIZZATA, non l'approccio originario.

**12 luglio 2026:** scoperto (screenshot console + Supabase Advisor) che `sincronizzaTutto()` andava in `42501` (RLS violation su `pazienti`) dopo ~1h di sessione. Diagnosi: schema/RLS/policy `owner_all_*` erano corretti (colonna `user_id default auth.uid()`, `NOT NULL`, policy `WITH CHECK (user_id = auth.uid())`); il bug era in `index.html` — `getSessioneSalvata()` cancellava la sessione scaduta perdendo il `refresh_token`, poi `supaHeaders()` ripiegava in silenzio sulla chiave anonima → scrittura anonima → RLS la respingeva. **P105 chiude questo** (commit `d32f6aa`). Restano da fare, dal Security Advisor visto nella stessa sessione: **P106** (funzione `rls_auto_enable()` SECURITY DEFINER eseguibile da public/signed-in) e **P107** (Leaked Password Protection disabilitata) — voci nuove sotto.

**Tentata 9 lug 2026, rimandata:** P72 (SRI CDN) — bloccata da un limite d'ambiente, non da una decisione di prodotto: vedi voce sotto.

**Legenda scheda:** Complessità / Impatto / Rischio su scala 1-5 · Autonomia LLM: **L0** = esegue solo ciò che è scritto, zero iniziativa (dati pazienti / clinica) · **L1** = micro-ottimizzazioni locali ammesse (naming, refactor nel file toccato) · **L2** = può proporre alternative ma NON applicarle senza ok.

---

## Guida modello/effort (quale Claude usare per ogni blocco)

> Regola pratica: **decidere o toccare dati pazienti reali → Opus/Fable, effort High/Max, Thinking ON. Eseguire una decisione già presa, lavoro meccanico → Sonnet, effort Low/Medium, Thinking OFF.**
> Il selettore modello+effort è nell'app, accanto al tasto invio (clic sul nome del modello).
> **Procedura:** prima di iniziare un punto della roadmap, Claude dichiara modello/effort consigliato per quel punto specifico, così Fabrizio può cambiarlo nel selettore prima di procedere.

| Voce / blocco | Modello | Effort | Thinking | Perché |
|---|---|---|---|---|
| **P63b** conferma-diff import InBody | — | — | — | Decisa di non fare (8 lug 2026): storico misurazioni, non correzione valore corrente |
| **P65** repo privato | — (manuale) | — | — | Operazione GitHub di Fabrizio, 5 minuti |
| **P66c** chiusura trasporto diretto | Fable | Alto | ON | Rimozione chiave client, sicurezza — condizionata a uso stabile |
| **P66d** proxy Fase 2 (quota) | Opus/Fable | High | ON | Costi per utente multi-tenant |
| **P67** pacchetto GDPR | Opus/Fable | Max | ON | Conformità legale, testi + flussi + policy |
| ~~**P68**~~ ✅ chiusa 9 lug 2026 (v. sopra) | — | — | — | — |
| ~~**P105**~~ ✅ chiusa 12 lug 2026 (fix sessione, v. sopra) | — | — | — | — |
| **P106** blindare/rimuovere `rls_auto_enable()` | Opus/Fable | High | ON | Permessi DB, decisione con Fabrizio prima |
| **P107** attivare Leaked Password Protection | — (manuale) | — | — | Toggle dashboard Supabase, 1 minuto |
| **P70** escaping XSS | Sonnet | Medium | OFF | Meccanico ma esteso (186 innerHTML), a lotti |
| **P71** IndexedDB | Opus | High | ON | Migrazione storage, retrocompatibilità |
| **P72** SRI CDN | Sonnet | Low | OFF | Due tag script |
| **P73** revisione linguaggio prescrittivo | Opus | High | ON | Rischio medico-legale, revisione con Fabrizio |
| **P75** SMTP proprio | Sonnet | Low | OFF | Configurazione Supabase + DNS |
| **P76** gestione errori visibile | Sonnet | Medium | OFF | Sostituzione catch vuoti, notifiche |
| **P79** billing Stripe | Opus | Max | ON | Denaro reale, webhook, stati abbonamento |
| ~~**P108 Fase 0**~~ ✅ chiusa 13 lug 2026 (catalogo unico + id stabile, commit `f574bb5`) | — | — | — | — |
| **P108** Fase 1 — sezione Alimenti + form manuale | Opus | High | ON | Salvataggio dati; layout/CSS può scendere a Sonnet Medium OFF |
| ~~**P109**~~ ✅ chiusa 13 lug 2026 (valori CREA-INRAN, 68/95 buchi colmati, commit `937cf17`) | — | — | — | — |
| **P111** chiarezza UI medie settimanali su piano parziale | Sonnet | Low/Medium | OFF | Solo testo/badge esplicativo, nessun calcolo tocca dati clinici |
| **P110** scanner barcode (Open Food Facts) | Opus/Fable | Max | ON | Integrazione esterna + flusso di conferma dati; camera UI a Sonnet |
| ~~**P55**~~ ✅ chiusa 9 lug 2026 (`getTargetAttivi`, commit `85b18ea`) | — | — | — | — |
| **P33b** aggancio auto alternative | Opus | High | ON | Evoluzione P33, decisione dopo uso sul campo |
| **P33c** piano lungo a ricetta singola | Opus | High | ON | Tocca struttura piano + export |
| P37, P80–P83 (ricettario) | Sonnet | Low/Medium | OFF | Contenuti e UI, rischio basso |
| P19, P25, P4, P3 (prodotto) | Opus | High | ON | Sono decisioni, non esecuzione |
| P84–P89 (nuove funzioni prodotto) | Opus prima (decisione), Sonnet poi | High→Medium | ON→OFF | Prima il disegno, poi l'esecuzione |
| P35, P43, P90–P101 (UX/pulizia) | Sonnet | Low/Medium | OFF | Meccaniche o estetiche, rischio basso |
| P38–P42 (trigger futuri) | da valutare al momento | — | — | Dipende dalla natura specifica quando si attivano |
| P47–P53, P102–P104 (long-term) | Opus/Fable | High | ON | Conversazioni di strategia/business |

---

## Blocchi di esecuzione e findings trasversali

> Riconciliati l'8 lug 2026 con lo stato reale: **P78, P61, P62, P77 sono chiusi** (vedi CHANGELOG). Ciò che resta dei blocchi è segnato sotto.

**F1 — "Resurrezione" dei pazienti eliminati. ✅ CHIUSO.** Con il sync a push completo, last-write-wins, un paziente eliminato dal dispositivo A veniva ripubblicato da B al primo `save()`: mancava un marcatore di eliminazione. Risolto con un **tombstone** (`db._deleted` con timestamp, TTL 90gg, consultato da push e pull) integrato in **P64** (commit `ffec363`/`1ba666a`→`cd5a14a`, 8 lug 2026) — prerequisito logico anche di P69 (chiusa il 9 lug 2026).

**F2 — I test prima del validatore. ✅ ASSORBITO.** P78 era classificata MEDIA ma è la rete dell'intero blocco clinico (P61 senza golden test è un validatore non validato). Chiusa il 7 lug (commit `ba5c109`) come prerequisito pratico prima di P61: il principio ha tenuto.

**F3 — Blocchi di esecuzione consigliati** (stato aggiornato):
- **Blocco A — Rete clinica:** P78 ✅ → P61 ✅ + P62 ✅ + P77 ✅ + P55 ✅ (9 lug 2026). *(chiuso)*
- **Blocco B — Integrità del dato:** tombstone + P64 ✅ → P68 ✅ (9 lug 2026) → P69 ✅ (9 lug 2026). *(chiuso)*
- **Blocco C — Fondamenta SaaS:** P65 + P72 (mezz'ora) → P66 (Fase 0+1 ✅, resta Fase 2 quota + commit di chiusura) → P75 → P67 → P79. *(in corso)*
- **Blocco D — Prodotto:** P90 (riprogettato, vedi FOCUS) → ~~P82~~ ✅ chiusa 12 lug 2026 (v. archivio) → P37 → P84. *(aperto)*

**F4 — "Aggiungi un avviso" dove serve "elimina la doppia fonte".** P55 e parte di P76: la soluzione non è notificare la divergenza ma renderla impossibile (funzione sorgente unica). Principio permanente (Scoperta tecnica #13).

**F5 — Vittoria gratuita non in roadmap:** PostgREST permette proiezioni nel JSON (`select=id,data->>nome,updated_at`): la lista pazienti può smettere di scaricare i blob interi **oggi**, senza migrazione. Inserita come fase 0.5 di P74.

---

# PRIORITÀ 0 — Sicurezza clinica e del dato

### P63 — Conferma con diff per gli import AI dei referti ✅ CHIUSA (commit `8c9e77a`, 8 lug 2026 — solo Analisi del sangue; InBody da fare)
**L'APPROCCIO ORIGINARIO:** tabella campo→attuale→estratto con checkbox, evidenza fuori-range, scrittura solo dopo conferma.
**LA CRITICA DEL CTO:** giusto, ma se la tabella viene costruita a mano per ~117 voci analisi + campi InBody diventa un muro di codice fragile e non riusabile. E manca la memoria: dopo la conferma non resta traccia di COSA è arrivato da AI.
**LA SOLUZIONE OTTIMIZZATA:** componente **generico guidato dallo schema**: `RANGE_RIF` enumera già campi, label e range → il diff per le analisi si genera da lì; per InBody si definisce una piccola mappa campi equivalente. Pattern staging: l'estrazione scrive in `_staging`, mai su `p.*`; la conferma applica solo le righe spuntate. Normalizzazione input (virgole decimali, unità note) PRIMA del confronto; delta anomalo (>50% dal valore precedente) evidenziato. Provenienza per campo: `{fonte:'ai-import', data, file}` nel meta — costa nulla e serve a GDPR (P67) e a P100/P101 (debug estrazioni).
**FOCUS COMPONENTI COINVOLTI:** Frontend (componente diff riusabile) + struttura dati (meta provenienza, additivo, retrocompatibile). AI Layer invariato.
**SCHEDA:** Stato: **CHIUSA** (commit `8c9e77a`) · Priorità: Alta · C: 3 | I: 4 | R: 1 · Modello: Sonnet (Media), design del componente dichiarato prima · Autonomia: L1. — *Nota di chiusura: implementata come da soluzione ottimizzata (componente generico su ANALISI/RANGE_RIF esistenti, staging + modal diff, provenienza p._analisiMeta). Scope ridotto rispetto all'originale su decisione di Fabrizio: solo Analisi del sangue in questa sessione, InBody resta aperto.*

### P63b — Conferma con diff per gli import AI dei referti (InBody) 🔴 ALTA
**Descrizione:** `loadInbodyPDF` oggi scrive i valori estratti direttamente nei campi del paziente. Estendere a InBody lo stesso pattern staging+diff già chiuso per Analisi del sangue (commit `8c9e77a`): tabella "campo → valore attuale → valore estratto" con checkbox per riga, evidenza dei valori fuori range o con delta anomalo, scrittura solo dopo conferma, provenienza in meta.
**Motivo:** stesso rischio di P63 originaria (errore di estrazione AI che finisce nei dati clinici senza revisione), non ancora coperto per InBody — scelta di Fabrizio di fare prima solo Analisi del sangue, il caso con più campi (~117).
**SCHEDA:** Stato: **DECISA DI NON FARE** (8 luglio 2026) · Priorità: ALTA (era) · Categoria: Sicurezza clinica / InBody · Dipendenze: nessuna.
> *Nota di chiusura: a differenza dell'Analisi del sangue, InBody non sostituisce un valore corrente ma aggiunge una nuova misurazione a uno storico (`p.inbody[]`) — il confronto "attuale vs estratto" ha meno senso clinico qui (non si sta correggendo una misura precedente, se ne sta aggiungendo una nuova). Il costo del click aggiuntivo a ogni import, pagato sempre anche quando l'estrazione è corretta, non è stato ritenuto giustificato da Fabrizio per questo caso specifico. Restano invariati: scrittura diretta nei campi del form da parte di `loadInbodyPDF`, autofill anagrafica invariato (scrive subito, fuori da qualunque diff).*

> Nota di riconciliazione: voce presente in Roadmap Due ma non isolata nell'Analisi Critica (trattata lì solo come nota di chiusura dentro P63) — reintegrata dopo il controllo di completezza dell'8 luglio 2026, e chiusa come "decisa di non fare" nella stessa data dopo discussione pro/contro con Fabrizio.

### P65 — Repository privato
**L'APPROCCIO ORIGINARIO:** rendere privato il repo; verificare lo storico; nota su Pages a pagamento.
**LA CRITICA DEL CTO:** giusto e banale, ma la voce elude la decisione vera: **Pages-privato richiede piano a pagamento, e P51 (Vercel) è già in roadmap**. Pagare GitHub per poi migrare a Vercel è un doppio costo.
**LA SOLUZIONE OTTIMIZZATA:** decidere ORA in 10 minuti: se P66 si farà entro 2-3 mesi → migrare subito a Vercel (repo privato gratis, hosting gratis, Functions pronte per P66, preview deploy) e chiudere P51; altrimenti pagare GitHub e rimandare. Scan dello storico commit per segreti in ogni caso (l'anon key è pubblica by design, ma verificare che non sia MAI passata una service_role o la chiave Anthropic).
**FOCUS COMPONENTI COINVOLTI:** Infrastruttura. Zero codice (o un file di config Vercel).
**SCHEDA:** Stato: Da fare · Priorità: Alta (costo ~zero) · C: 1 | I: 3 | R: 1 · Modello: nessuno (operazione manuale guidata) · Autonomia: L0 (esegue Fabrizio).

### P73 — Revisione linguaggio prescrittivo
**L'APPROCCIO ORIGINARIO:** audit dei testi hardcoded (Berberina in primis), riformulazione non prescrittiva o gating.
**LA CRITICA DEL CTO:** ok, ma come task una-tantum non impedisce la recidiva: il prossimo contenuto incollato riporterà "prescrivo".
**LA SOLUZIONE OTTIMIZZATA:** (1) audit completo con lista parole-sentinella (prescriv*, posologia, mg/die su integratori, "terapia") su TUTTI i contenuti (schede, concetti, prompt FX/WA — anche i prompt parlano al paziente); (2) riformulazione con Fabrizio voce per voce; (3) componente `disclaimerClinico()` unico riusato nei PDF; (4) la lista sentinella entra in P78 come test sui contenuti (grep automatico che fallisce se ricompaiono). Sinergia P53/MDR: il wording decide anche la classificazione regolatoria.
**FOCUS COMPONENTI COINVOLTI:** Contenuti + Frontend (PDF). Zero dati.
**SCHEDA:** Stato: Da fare · Priorità: Alta · C: 2 | I: 4 | R: 1 · Modello: Fable 5 (revisione linguistico-legale) con Fabrizio in loop · Autonomia: **L0** (nessuna riformulazione autonoma di contenuto clinico).
---

# PRIORITÀ 0b — Architettura SaaS e conformità

### P66 — Proxy AI via Edge Functions ⭐ ✅ CHIUSA Fase 0+1 (commit `85fc8cd`, 8 lug 2026 — commit di chiusura trasporto diretto ancora da fare)
**L'APPROCCIO ORIGINARIO:** spostare le 8+ chiamate dietro una Edge Function autenticata: chiave lato server, rate-limit, consumi, modello centralizzato; migrazione una chiamata alla volta con fallback.
**LA CRITICA DEL CTO:** direzione sacrosanta, ma "migrare una chiamata alla volta" su 8 call-site significa toccare 8 volte fetch/headers/error handling sparsi. Manca il passo zero che riduce il rischio dell'80%: **prima si unifica il client, poi si cambia il trasporto**.
**LA SOLUZIONE OTTIMIZZATA:** Fase 0 (subito, anche prima di Supabase): wrapper unico `aiCall({tipo, messages, max_tokens, schema?})` che ingloba fetch, headers, timeout, retry-once, parsing errori, logging usage — le 8 chiamate diventano 8 one-liner. Fase 1: la Edge Function `ai-proxy` replica il contratto; `aiCall` cambia URL e smette di leggere la chiave da localStorage (che viene RIMOSSA, insieme a `window.prompt`); tabella `ai_usage {user_id, tipo, tokens, data}` scritta dalla funzione; registry modelli per `tipo` (fx/piano/import) lato server → cambio modello senza deploy client. Fase 2: quota per utente (409 con messaggio in UI). Decidere subito: streaming no (la UI attuale è attendi-e-mostra) — semplifica la funzione. **Edge case ignorato dalla roadmap:** la cache 90gg resta client e VA preservata (Scoperta #4) — il proxy non deve romperne l'hash.
**FOCUS COMPONENTI COINVOLTI:** AI Layer (tutto), Frontend (8 call-site → 1 wrapper), Database (tabella usage + RLS), Infrastruttura (prima Edge Function del progetto: setup CLI/secret una tantum).
**SCHEDA:** Stato: **CHIUSA Fase 0+1** (commit `85fc8cd`) · Priorità: Alta (keystone) · C: 4 | I: 5 | R: 3 · Modello: Fable 5 (Alto) per contratto+funzione; Sonnet (Media) per la sostituzione dei call-site · Autonomia: L1 (L0 sul flusso generazione piano). — *Nota di chiusura: 15 call-site reali migrati (non 8 come stimato), wrapper aiCall con registro modelli e log consumi (Fase 0); trasporto proxy Edge Function con fallback automatico al diretto, refresh token, kill-switch, verificato end-to-end in produzione con riga reale in ai_usage (Fase 1). GitHub↔Supabase deliberatamente non collegato (vedi Contesto v18, DECISIONI ARCHITETTURALI). Fase 2 (quota 409) e il commit di chiusura che rimuove trasporto diretto/chiave client/window.prompt restano DA FARE — quest'ultimo in attesa di qualche giorno di uso stabile in produzione.*

### P66c — Commit di chiusura: rimozione trasporto diretto legacy 🔴 ALTA (condizionata)
**Descrizione:** dopo qualche giorno di uso stabile in produzione col proxy (senza fallback anomali visibili in `ai_usage`), rimuovere da `aiCall` il ramo trasporto diretto, la lettura/scrittura di `anthropicApiKey` in localStorage e il `window.prompt` di `getAnthropicKey`. Da questo commit in poi la chiave Anthropic esiste SOLO come secret server-side.
**Motivo:** il fallback automatico introdotto in Fase 1 è per design una fase di transizione, non lo stato finale — serve a non fermare l'ambulatorio se il proxy ha un problema, ma la chiave non deve restare indefinitamente esposta lato client.
**SCHEDA:** Stato: Da fare (condizionata: NON eseguire finché non c'è evidenza di uso reale stabile attraverso il proxy) · Priorità: ALTA · Categoria: Sicurezza · Dipendenze: P66 Fase 1 (chiusa) + tempo di osservazione in produzione + **P105 (chiusa 12 lug 2026)**: prima del fix la sessione scadeva e rompeva il sync in silenzio, quindi "uso stabile in produzione" non era osservabile; ora osservabile normalmente.

### P106 — Blindare/rimuovere `rls_auto_enable()` 🟡 MEDIA
**Descrizione:** la funzione `public.rls_auto_enable()` (SECURITY DEFINER) è eseguibile da `public` e da utenti loggati senza restrizioni (2 warning del Security Advisor Supabase, visti 12 lug 2026). È la funzione che ha acceso la RLS sulle tabelle in autonomia in passato. Da decidere con Fabrizio: (a) `REVOKE EXECUTE` a public/authenticated lasciandola solo per uso manuale da service_role, o (b) `DROP FUNCTION` se non serve più (RLS ormai stabile su tutte le tabelle sync).
**Motivo:** una funzione SECURITY DEFINER eseguibile da chiunque loggato è superficie d'attacco non necessaria — se contiene logica che tocca lo schema/permessi, un utente autenticato potrebbe invocarla.
**SCHEDA:** Stato: Da fare · Priorità: Media · Categoria: Sicurezza · Dipendenze: nessuna, ma decisione (a)/(b) da prendere con Fabrizio prima di eseguire · Modello: Opus/Fable (High), Thinking ON — permessi DB.

### P107 — Attivare Leaked Password Protection 🟢 BASSA (manuale)
**Descrizione:** toggle in Supabase → Authentication → Settings, attualmente disabilitato (Info del Security Advisor, 12 lug 2026). Blocca password compromesse note (HaveIBeenPwned) in fase di signup/cambio password.
**Motivo:** protezione minima per gli account di studio (utenti da 42 e da 2 righe), un solo click.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · Categoria: Sicurezza · Dipendenze: nessuna · Esecuzione: manuale di Fabrizio in dashboard Supabase, 1 minuto.

### P66d — Fase 2: quota AI per utente
**Descrizione:** nella Edge Function `ai-proxy`, aggiungere un controllo di quota per utente (conteggio/costo da `ai_usage`) con risposta 409 e messaggio in UI quando superata.
**Motivo:** senza quota, un solo utente in un prodotto multi-tenant potrebbe consumare costi illimitati; prerequisito per aprire l'accesso a utenti esterni (P53) e per un billing sostenibile (P79).
**SCHEDA:** Stato: Da fare · Priorità: MEDIA (sale ad ALTA quando si avvicina la vendita a terzi) · Categoria: Architettura / Costi · Dipendenze: P66 Fase 1 (chiusa, tabella `ai_usage` già esiste e già registra i consumi) · Modello: Opus/Fable (High).

> Nota di riconciliazione: P66c e P66d erano voci proprie in Roadmap Due, ridotte a nota di chiusura dentro P66 nell'Analisi Critica — reintegrate come voci tracciabili dopo il controllo di completezza dell'8 luglio 2026.

### P67 — Pacchetto GDPR ⭐
**L'APPROCCIO ORIGINARIO:** consenso versionato, informativa, registro trattamenti, DPA/ruoli Supabase, residency UE, retention, export/oblio, valutare DPIA.
**LA CRITICA DEL CTO:** elenco giusto ma indistinto: mescola 30 minuti di verifica, modellazione dati, e deliverable legali che Claude non deve inventare. E ignora un dato imbarazzante già agli atti: **i backup CSV in chiaro sul Desktop (protocollo P29/P30) sono essi stessi un trattamento non protetto**.
**LA SOLUZIONE OTTIMIZZATA:** spacchettare in 4 tracce con nature diverse. (T1 — verifica, 30 min: regione del progetto Supabase = UE? Se no, è LA priorità: migrare prima che i dati crescano). (T2 — modello dati, sviluppo: `p.consensi[] {tipo, versioneInformativa, data, revocaData?}` + blocco funzioni cliniche senza consenso attivo + provenienza import di P63; export fascicolo = quello di P64). (T3 — legale, NON si genera: informativa, registro, DPA, EULA → consulente; Claude prepara solo la bozza tecnica dei flussi di dati da consegnargli). (T4 — igiene: policy backup, cifratura o eliminazione dei CSV desktop, retention con promemoria — il job automatico server arriva con P74/pg_cron). DPIA: con dati art. 9 la si fa comunque, è anche un ottimo documento di design.
**FOCUS COMPONENTI COINVOLTI:** Database (region check), Frontend (consensi UI + gate), Processi (T3/T4).
**SCHEDA:** Stato: Da fare (T1 SUBITO) · Priorità: Alta pre-vendita · C: 3 (tecnico) | I: 5 | R: 2 · Modello: Fable 5 (Alto) per T2 e la mappa dati; umani per T3 · Autonomia: **L0** su testi legali (mai generarli come definitivi), L1 sul codice consensi.

### P68 — Push incrementale (dirty tracking) ✅ CHIUSA (commit `5487754` + `97f0d53`, 9 lug 2026)
**L'APPROCCIO ORIGINARIO:** set di id sporchi, push solo di quelli, reset a successo, coerenza con `_syncPendingFail`.
**LA CRITICA DEL CTO:** giusto, ma sottovaluta il punto operativo: `save()` è chiamato in ~47 punti e molti non sanno QUALE paziente hanno toccato. Se si prova a istruire tutti i call-site in un colpo, si introduce il bug opposto (modifiche non pushate = perdita dati silenziosa: rischio peggiore del problema di partenza).
**LA SOLUZIONE OTTIMIZZATA (implementata):** `save(pazId?)` retro-compatibile: senza argomento → comportamento storico invariato (push completo, ancora usato da `importa` e dall'eliminazione definitiva paziente); con argomento → marca dirty in `window._dirtyIds` e pusha il set dopo debounce 2s (raffiche di save → 1 POST per id coalescato). Meta-record (`meta_collections`, `__alimenti_custom`, `__modelli_rotazione`, `__concetti_educativi`) trattati come id sporchi normali via `_pushRigaPerId`. Reset del set SOLO a 2xx per-id (un fallimento non azzera gli altri). Migrati 44/47 call-site (parte 2, Sonnet Medio): i 3 rimasti anonimi sono voluti. Telemetria temporanea `p68SaveAnon` per censire eventuali save() anonimi residui non previsti.
**NON INCLUSO (residuo, vedi F3 sotto):** retry automatico con backoff esponenziale sugli id falliti e indicatore "N modifiche in attesa" — questo pezzo resta la voce a sé stante più in basso nella roadmap (ex-P89, coda offline), che ora si appoggia al dirty-set già persistito in memoria da P68 invece di doverne creare uno nuovo.
**FOCUS COMPONENTI COINVOLTI:** Frontend/sync. Zero DB.
**SCHEDA:** Stato: ✅ Chiusa (meccanismo + migrazione call-site) · Priorità: Media (Alta >30 pazienti) · C: 3 | I: 4 | R: 3 (perdita dati se sbagliato) · Modello: Fable 5 (Alto, meccanismo) + Sonnet (Medio, migrazione call-site) · Autonomia: L0 sul meccanismo, L1 sui call-site.

### P69 — Conflitti multi-dispositivo (updated_at) ✅ CHIUSA (commit `eb52ece`, 9 lug 2026)
**L'APPROCCIO ORIGINARIO:** confrontare updated_at remoto vs ultimo pull; avvisare; scelta ricarica/sovrascrittura.
**LA CRITICA DEL CTO:** il confronto con "l'ultimo pull" richiede una mappa etag locale che invecchia male (pull rari). Più robusto e più semplice: chiedere al server la verità un attimo prima di scrivere.
**LA SOLUZIONE OTTIMIZZATA (implementata):** con P68 chiuso, il push per-id premette una `SELECT id,updated_at` dei soli id sporchi (una chiamata, payload minuscolo): se remoto > baseline locale (`p69Baseline` in localStorage, salvata a ogni pull/push riuscito per-record) → dialogo a tre vie: "ricarica loro / sovrascrivi (consapevole) / esporta la mia copia e ricarica". Niente merge per-campo (fuori scopo finché il blob è blob — onestà architetturale). Il caso "record assente remoto" con baseline nota = tombstone (P64) → non ricreato. Fail-open: un pre-check di rete fallito non blocca il salvataggio (torna al last-write-wins pre-P69, mai peggio). Record in conflitto restano "pending" fino a decisione (niente dialoghi ripetuti a ogni debounce).
**FOCUS COMPONENTI COINVOLTI:** Frontend/sync. Zero DB.
**SCHEDA:** Stato: ✅ Chiusa · Priorità: Media · C: 3 | I: 4 | R: 2 · Modello: Fable 5 (Alto) · Autonomia: L0.

### P105 — Fix sessione: RLS 42501 su sincronizzazione ✅ CHIUSA (commit `d32f6aa`, 12 lug 2026)
**Scoperta (non pianificata in roadmap, emersa da segnalazione utente):** `sincronizzaTutto()` falliva con `42501 — new row violates row-level security policy for table "pazienti"` dopo circa 1h di sessione aperta; i pull tornavano silenziosamente 0 righe. Verificato prima con query read-only su Supabase (`pg_tables`, `pg_policies`, `information_schema.columns`, `auth.users`) che lo schema NON era la causa: colonna `user_id` con `default auth.uid()` e `NOT NULL`, policy `owner_all_pazienti` (`ALL`, `USING`/`WITH CHECK` = `user_id = auth.uid()`) corrette e già presenti su tutte le tabelle sync. Escluso anche il sospetto iniziale (righe orfane su due `user_id` diversi): erano semplicemente due account distinti dello stesso Fabrizio (42 righe l'account principale, 2 righe un secondo account di test) — nessuna riga senza proprietario, tenuti volutamente separati, non uniti.
**LA CAUSA REALE (nel client, non nel DB):** `getSessioneSalvata()` cancellava da `localStorage` la sessione appena il suo `expires_at` risultava scaduto — perdendo con essa il `refresh_token` necessario a rinnovarla. Il rinnovo periodico/pre-sync (`assicuraTokenValido`, P29) non aveva quindi più nulla da rinnovare; `supaHeaders()` ripiegava in silenzio sulla chiave anonima; la richiesta arrivava a Supabase con `auth.uid()` NULL e la RLS (correttamente) la respingeva. Concausa: `sincronizzaTutto()` (il bottone "Sincronizza" premuto dall'utente) non chiamava affatto `assicuraTokenValido()` prima di scrivere, a differenza di `syncNow()` e del flush incrementale P68; e questi ultimi due ne ignoravano comunque l'esito (`await` senza controllo del valore di ritorno).
**LA SOLUZIONE (implementata):** (1) `getSessioneSalvata()` su token scaduto ritorna `null` ma NON cancella più il record in `localStorage` — il `refresh_token` resta disponibile al rinnovo; la sessione viene sovrascritta al login/rinnovo successivo e cancellata solo dal logout esplicito (`cancellaSessione`). (2) Nuovo guard `_garantiscoSessionePerSync()`: chiama `assicuraTokenValido()` e, se il rinnovo fallisce, avvisa l'utente ("Sessione scaduta — esci e rientra per sincronizzare") e ferma la scrittura invece di procedere in anonimo. (3) `syncNow`, `sincronizzaTutto` (che prima non aveva alcun controllo) e `_flushDirtyIds` (che ora libera correttamente `window._syncInFlight` se si ferma) chiamano il guard invece del vecchio `assicuraTokenValido()` non verificato. Verificato con `node --check` sul blocco script (17.651 righe, sintassi valida) + 9 asserzioni mirate in Node (sessione scaduta non cancellata/refresh_token preservato/guard ritorna false e avvisa se il rinnovo fallisce/ritorna true senza falsi allarmi se ok), tutte verdi. Confermato anche a mano dall'utente: uscire e rientrare ripristina il sync verde.
**FOCUS COMPONENTI COINVOLTI:** Frontend/auth/sync. Zero DB (schema e policy Supabase già corretti, non toccati).
**SCHEDA:** Stato: ✅ Chiusa · Priorità: Alta (bloccava la sincronizzazione multi-dispositivo) · C: 2 | I: 4 | R: 3 (autenticazione/dati pazienti) · Modello: Opus (High, Thinking ON) · Autonomia: L0.
**Nota per P66c:** la precondizione "qualche giorno di uso stabile in produzione col proxy" ora è finalmente osservabile — prima di questo fix il sync si rompeva in silenzio ogni ~1h e avrebbe mascherato eventuali fallback anomali del proxy AI nello stesso modo.
**Residui aperti dalla stessa sessione di scoperta (Security Advisor Supabase):** P106 (funzione `rls_auto_enable()` SECURITY DEFINER da blindare/rimuovere) e P107 (Leaked Password Protection da attivare) — vedi voci in PRIORITÀ 0b.

### P70 — Escaping centralizzato (XSS)
**L'APPROCCIO ORIGINARIO:** `esc()` applicata progressivamente ai ~186 innerHTML, partendo dai campi liberi.
**LA CRITICA DEL CTO:** "applicare esc() 186 volte" è il modo giusto di generare 186 occasioni di regressione. E senza inventario, "progressivamente" significa "per sempre".
**LA SOLUZIONE OTTIMIZZATA:** (1) Audit una-tantum: script che elenca gli innerHTML con interpolazioni e classifica la sorgente (input utente libero / dati DB / costanti) → tabella; realisticamente i punti CALDI (nomi pazienti/ricette/alimenti custom, note, tag) sono 25-40, non 186. (2) Introdurre `esc()` + tagged template `html\`...\`` che escapa di default (opt-out esplicito `raw()`): i nuovi render nascono sicuri, i vecchi migrano per funzione di render, non per riga. (3) CSP: dirlo onestamente — con 357 handler inline una CSP seria è impossibile fino a P102; nel frattempo SRI (P72) e niente promesse. Rete: P78 con snapshot test dei render principali prima di toccare.
**FOCUS COMPONENTI COINVOLTI:** Frontend (render). Zero dati.
**SCHEDA:** Stato: Da fare · Priorità: Media (Alta a utenti esterni; PREREQUISITO di P41) · C: 3 | I: 4 | R: 3 (regressioni visive) · Modello: Sonnet (Media) a lotti, dopo audit approvato · Autonomia: L1.

### P70b — Durata del refresh_token in localStorage (30 giorni) ⚠️ DA RIVALUTARE
**Descrizione:** `salvaCredenzialiPersistenti` mantiene il refresh_token valido 30 giorni in localStorage. Da solo è un compromesso ragionevole per l'uso quotidiano; combinato con una superficie XSS aperta (P70 non ancora chiusa) diventa furto di sessione persistente.
**Motivo:** individuata nella revisione Fable 5 come voce "Media, condizionata a P70". **Nota:** da rivalutare quando si affronta P70, non prima — la decisione naturale è valutare un binding più corto (7 giorni) + logout remoto SOLO a P70 chiusa, non come intervento isolato.
**SCHEDA:** Stato: Da fare (a P70 chiusa) · Priorità: BASSA oggi, sale con P70 · Categoria: Sicurezza · Dipendenze: P70 (va rivalutata insieme, non prima).

> Nota di riconciliazione: voce assente dall'Analisi Critica (aggiunta alla Roadmap dopo la prima stesura, mai passata per la revisione CTO) — reintegrata dopo il controllo di completezza dell'8 luglio 2026. Merita revisione critica quando si arriva a lavorare P70.

### P71 — Storage locale → IndexedDB
**L'APPROCCIO ORIGINARIO:** migrare l'intero db a IndexedDB con layer di compatibilità e migrazione automatica.
**LA CRITICA DEL CTO:** è la voce più "da manuale" della roadmap, e per questo sospetta: **nessuno ha misurato**. Se i referti non vengono persistiti come base64 nel blob, il db reale potrebbe pesare 300KB e la migrazione essere ingegneria per un problema inesistente. In compenso l'impatto nascosto è concreto: IndexedDB è async → il boot dell'app diventa async → tutto il flusso di init (login, load, render) va rivisto.
**LA SOLUZIONE OTTIMIZZATA:** tre gradini, si sale solo se i numeri lo chiedono. (G1 — oggi, 20 min: gauge `JSON.stringify(db).length` in Impostazioni + warning non-silenzioso al 60% dei ~5MB + verifica: i base64 dei referti finiscono nel blob? Se sì, smettere subito di persistirli è la vera correzione). (G2 — se >2MB: compressione LZ-string sul valore localStorage: 3-5× di pista con 30 righe e zero cambi di architettura). (G3 — se cresce ancora o arriva P48: IndexedDB con wrapper async e boot rivisto). La roadmap parte da G3: si parte da G1.
**FOCUS COMPONENTI COINVOLTI:** Frontend/storage; G3 tocca il boot (rischio init).
**SCHEDA:** Stato: **Da verificare** (G1 decide) · Priorità: Bassa→Media (dato-dipendente) · C: 1/2/4 per gradino | I: 3 | R: 1/1/4 · Modello: Sonnet (Bassa) G1-G2; Fable (Alto) G3 · Autonomia: L1.

### P72 — SRI + versioni pinnate CDN ⏸ TENTATA 9 LUG 2026, RIMANDATA
**L'APPROCCIO ORIGINARIO:** integrity+crossorigin su Chart.js e jsPDF, versioni pinnate.
**LA CRITICA DEL CTO:** giusto, ma c'è un'opzione più pulita che la roadmap non considera: **self-hosting**. Due file .min.js copiati nel repo = zero terze parti a runtime, funziona offline, niente SRI da mantenere. Col repo privato (P65) non ci sono controindicazioni.
**COSA È SUCCESSO IL 9 LUG 2026:** tentativo di generare gli hash SRI (sha384) per i due tag `<script>` CDN. Bloccato da un limite d'ambiente, non da una decisione: `cdnjs.cloudflare.com` non è raggiungibile dalla rete del sandbox (403), e il tool di fetch web restituisce i JS come dato binario opaco, non hashabile localmente. Copiare un hash "riportato" da terzi è stato scartato come rischioso: esiste un bug noto e documentato (cdnjs/cdnjs discussion #14124) per cui l'hash pubblicato sul sito cdnjs a volte NON combacia col file realmente servito — un `integrity` sbagliato blocca silenziosamente lo script in produzione. Nessun codice modificato.
**LA SOLUZIONE OTTIMIZZATA (invariata, da valutare alla ripresa):** self-host di chart.min.js e jspdf.min.js (versioni attuali, hash annotato nel Contesto); il CDN sparisce, il problema SRI diventa non-applicabile. Ripiego se si resta su CDN: generare l'hash da un ambiente con accesso di rete pieno (es. il PC di Fabrizio: `curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A`) e passarlo a Claude, oppure passare a jsDelivr che espone l'attributo `integrity` direttamente nella pagina del pacchetto.
**FOCUS COMPONENTI COINVOLTI:** Frontend (2 tag script) + repo.
**SCHEDA:** Stato: Rimandata (blocco tecnico ambientale) · Priorità: Bassa (ma immediata: costo nullo) · C: 1 | I: 2 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P75 — SMTP proprio
**L'APPROCCIO ORIGINARIO:** dominio email proprio con SPF/DKIM al posto del mittente Supabase Free; template personalizzati.
**LA CRITICA DEL CTO:** nulla da eccepire sul cosa; sul quando: senza dominio deciso (posizionamento — Valutazioni aperte) è prematuro. Non comprare due domini.
**LA SOLUZIONE OTTIMIZZATA:** trigger = acquisto dominio (decisione P52/P53). Poi: provider transazionale (Resend/Brevo), SPF+DKIM+DMARC, template conferma/recovery brandizzati, test su Gmail/Outlook. Mezza giornata, quasi tutta DNS.
**FOCUS COMPONENTI COINVOLTI:** Infrastruttura (Supabase Auth settings + DNS). Zero codice app.
**SCHEDA:** Stato: Da fare (a trigger) · Priorità: Media pre-vendita · C: 2 | I: 3 | R: 1 · Modello: guida testuale, nessun codice · Autonomia: L1.

### P76 — Gestione errori visibile
**L'APPROCCIO ORIGINARIO:** sostituire i ~14 catch vuoti con notif()+log; ripulire i ~69 console.log; mini-log in localStorage consultabile.
**LA CRITICA DEL CTO:** "notif() ovunque" produce alert-fatigue e il medico smetterà di leggerli in una settimana — peggio del silenzio. E cancellare i console.log butta via debuggabilità gratis.
**LA SOLUZIONE OTTIMIZZATA:** tassonomia a 3 livelli decisa a tavolino per ciascun catch: silenzioso-ma-loggato / toast non bloccante / bloccante (solo perdita dati e AI fallita). Nucleo: `logErr(area, err, ctx)` → ring buffer 100 voci in localStorage + pannello "Diagnostica" in Impostazioni con "copia per assistenza". I console.log NON si cancellano: si convertono in `dbg()` gated da flag `?debug` — puliti in produzione, vivi quando servono. `window.onerror`/`onunhandledrejection` → logErr (avrebbe reso visibile il bug emojiCache in 10 secondi).
**FOCUS COMPONENTI COINVOLTI:** Frontend trasversale (meccanico, per lotti).
**SCHEDA:** Stato: Da fare · Priorità: Media · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Media), tassonomia approvata prima · Autonomia: L1.

### P79 — Billing Stripe
**L'APPROCCIO ORIGINARIO:** Checkout + portal + webhook Edge che scrive `subscriptions`; gate client + RLS; trial secondo P53.
**LA CRITICA DEL CTO:** tecnicamente giusto, ma per l'Italia manca il convitato di pietra: **fatturazione elettronica SDI**. Stripe non la fa nativamente: o si aggiunge un connettore (Fatture in Cloud API) o si valuta un merchant-of-record (Paddle/Lemon Squeezy: loro fatturano, tu incassi royalty — niente SDI tuo, fee più alta). Deciderlo DOPO aver costruito Stripe = rifare.
**LA SOLUZIONE OTTIMIZZATA:** decisione MoR vs Stripe+connettore fiscale PRIMA di scrivere codice (mezz'ora con commercialista). Poi, qualunque sia: webhook idempotente (event id dedup), stati `active/past_due/canceled` con grace period, gate lato RLS (colonna piano su profilo utente) non solo client, trial senza carta. Prerequisito duro: P66 (stessa infrastruttura functions).
**FOCUS COMPONENTI COINVOLTI:** Infrastruttura (Edge webhook), Database (subscriptions + RLS), Frontend (paywall states).
**SCHEDA:** Stato: Da fare (a P53 attivo) · Priorità: Alta solo pre-lancio · C: 4 | I: 5 | R: 4 (denaro reale) · Modello: Fable 5 (Alto) · Autonomia: **L0**.

---

# PRIORITÀ 1 — Bug aperti

### P59 — Marker 🍎 frutta per spuntini a sole celle ✅ CHIUSA — SCARTATA dopo test (commit `d3c50e0` → revert `177dce9`, 7 lug 2026)
**L'APPROCCIO ORIGINARIO:** estendere l'aggancio del marker al pasto (prima riga disponibile o riga sintetica).
**LA CRITICA DEL CTO:** la "riga sintetica" è vietata: inquinerebbe i DATI per aggirare un limite del RENDERER. Il flag frutta è per-pasto; è il disegno PDF che deve saperlo, non la struttura del piano.
**COSA È SUCCESSO:** implementata (riga sintetica "+ frutta"/emoji sotto il blocco celle quando `!hasRicette`, riuso di `getFruttaMarker`) e verificata via screenshot reale. Fabrizio ha segnalato che la riga è ridondante e confonde la lettura quando la cella è già un alimento-frutta esplicito con propria emoji (es. "🍎 Frutta mista 150g"). **Decisione di prodotto, non errore tecnico:** il marker frutta resta agganciato SOLO alle righe ricetta testuali. Revert completo di `measurePasto`/`drawPasto` (commit `177dce9`), comportamento tornato identico a prima di P59.
**FOCUS COMPONENTI COINVOLTI:** Frontend/PDF. Zero dati.
**SCHEDA:** Stato: ✅ Chiusa (scartata dopo verifica clinica) · Modello usato: Sonnet (Bassa) · Autonomia: L1.

### P60 — Separatore "+" tra ricetta ed emoji frutta ✅ CHIUSA (commit `17064c8`, 7 lug 2026)
**L'APPROCCIO ORIGINARIO:** "+" grigio attenuato tra testo e emoji.
**LA CRITICA DEL CTO:** nulla da criticare, solo da inchiodare i dettagli: colore = var testo terziario già in palette, allineamento con `baseline:'middle'` (Scoperta #9), e spaziatura che non sposti il wrapping delle righe lunghe.
**LA SOLUZIONE OTTIMIZZATA (implementata):** "+" disegnato in GRIGIO3 (160,160,160, stesso tono di "Alternative:") prima dell'emoji stagionale, emoji spostata della larghezza reale del "+" misurata con `measure()`. Applicato nel ramo ricette testuali di `drawPasto`; l'estensione al blocco celle (P59) è stata rimossa insieme al suo revert.
**FOCUS COMPONENTI COINVOLTI:** Frontend/PDF.
**SCHEDA:** Stato: ✅ Chiusa · Modello usato: Sonnet (Bassa) · Autonomia: L1.

### P55 — Sorgente unica target macros (`getTargetAttivi`) ✅ CHIUSA (commit `85b18ea`, 9 lug 2026)
**L'APPROCCIO ORIGINARIO:** banner pre-generazione se si entra nel ramo fallback; allineare la logica duplicata in `costruisciContestoPaziente`.
**LA CRITICA DEL CTO:** il banner cura il sintomo e "allineare la duplicazione" ammette di volerla mantenere. La causa è che funzioni multiple ricalcolano i target per conto proprio — pattern della Scoperta #13, già pagato una volta con P34.
**LA SOLUZIONE OTTIMIZZATA (implementata):** in fase di implementazione l'audit ha trovato **6 sedi duplicate** (non 2 come stimato), già divergenti tra loro su riferimento peso/FFM e g/kg personalizzati. Estratta `getTargetAttivi(p)` come sorgente unica: priorità (1) target salvato dal medico (`_getActiveMacrosTarget`, vince il più recente tra FX/TDEE) → fonte `fx`/`tdee`; (2) fallback canonico unificato (FFM/BMI≥25 + g/kg personalizzati, mai più hardcoded 1.8/0.9 ignorando i custom) → fonte `fallback`. Le 6 sedi (`costruisciContestoPaziente`, `_aggiornaAnteprimaCiclizzazione`, box macros generatore, `calcolaTargetsCiclizzazione`, `_setupPianoTargets`, `costruisciPrompt`) ora consumano tutte `getTargetAttivi`. Il blocco generazione senza target (BUG3 STEP2) resta **bloccante**, non solo avviso — più severo di quanto proponesse la scheda originale, mantenuto perché già collaudato; `costruisciPrompt` mostra ora un avviso visibile (non solo console.log) quando cade nel fallback. 24 test unitari/coerenza in JSDOM (P78), tutti pass.
**FOCUS COMPONENTI COINVOLTI:** Frontend (refactor 6 punti → 1 funzione). Zero dati modificati, solo lettura/calcolo.
**SCHEDA:** Stato: ✅ Chiusa · Modello usato: Fable 5 (Alto), Thinking ON · Autonomia: L0.

---

# PRIORITÀ 2 — Ricettario

### P33b — Aggancio automatico alternative nella scomposizione
**L'APPROCCIO ORIGINARIO:** dopo la scomposizione, agganciare a ogni cella le alternative isocaloriche della stessa categoria; decisione rimandata a dopo l'uso sul campo.
**LA CRITICA DEL CTO:** la cautela è giusta, la parola "automatico" è sbagliata. Auto-attach = rumore da ripulire su ogni cella (lo dice la roadmap stessa). Il valore è la scorciatoia, non l'automatismo.
**LA SOLUZIONE OTTIMIZZATA:** on-demand: bottone "⇄" per cella (e "⇄ tutte" per pasto) che propone 2-3 alternative isocaloriche dalla stessa categoria funzionale (gruppi semaforo + logica olio già esistenti), in stato *proposta* finché non accettate. Ranking: preferenze paziente > stagione > frequenza. Il campo resta libero di dire no senza costi.
**FOCUS COMPONENTI COINVOLTI:** Frontend (griglia unificata) — riuso mapping esistente, zero AI, zero DB.
**SCHEDA:** Stato: Da fare (post-campo) · Priorità: Media · C: 3 | I: 4 | R: 2 · Modello: Fable (Alto) per il ranking, Sonnet per la UI · Autonomia: L1.

### P33c — Piano lungo a ricetta singola
**L'APPROCCIO ORIGINARIO:** modalità alternativa 10-12+ giorni, un pasto = una ricetta senza alternative; da pensare struttura, PDF, collocazione.
**LA CRITICA DEL CTO:** la roadmap la tratta come possibile TERZA architettura di piano — sarebbe un errore da pagare per anni. La struttura N-giorni esiste già (manuale, max 31); "senza alternative" = array alternative vuoto. Non c'è niente da inventare nel modello dati.
**LA SOLUZIONE OTTIMIZZATA:** ridefinirla come **preset di generazione + variante di stampa**: (a) flag `pianoStile:'rotazione-lunga'` nelle regole → il prompt AI riceve "N giorni, 1 ricetta/pasto, zero alternative, massima varietà tra giorni"; (b) layout PDF compatto dedicato (griglia giorni×pasti, una riga per cella). Il piano risultante è un piano normale: validatore P61, PDF, storico funzionano senza saperne nulla.
**FOCUS COMPONENTI COINVOLTI:** AI Layer (prompt mode) + Frontend/PDF (layout). Zero struttura dati.
**SCHEDA:** Stato: Da fare (dopo rodaggio manuale) · Priorità: Media-Bassa · C: 3 | I: 3 | R: 2 · Modello: Fable (Alto) decisione, Sonnet stampa · Autonomia: L2 sul layout.

### P37 — Caricamento graduale 1.256 ricette dagli appunti
**L'APPROCCIO ORIGINARIO:** batch da 20 con conferma t/s (~30s/batch), dopo che l'architettura è stabile; compilare gli attributi al caricamento.
**LA CRITICA DEL CTO:** 63 batch × conferme manuali = ore del tempo più costoso del progetto (quello di Fabrizio) spese a dire "sì" a estrazioni ovvie. Il collo di bottiglia va spostato sulle eccezioni.
**LA SOLUZIONE OTTIMIZZATA:** pipeline a 2 passate. (Pass 1 — macchina: estrazione integrale in JSON di staging con confidence per campo; dedupe fuzzy su titolo+ingredienti; attributi auto-derivati: categoria dallo slot d'origine nel piano sorgente, stagione da ingredienti-sentinella, tempoPrep euristico; kcal ricalcolate col motore deterministico del BLOCCO 17 e confrontate con l'eventuale valore dichiarato → mismatch = flag). (Pass 2 — umano: UI di revisione che mostra SOLO low-confidence, duplicati sospetti e mismatch kcal — realisticamente 100-200 voci, non 1.256). Import con `origin:'archivio-2026'` per poterle filtrare/ritirare in blocco. Stima costi AI dichiarata prima (principio di progetto). Prerequisiti: P82 (ingredienti ignoti → custom) e gauge P71-G1 (peso db).
**FOCUS COMPONENTI COINVOLTI:** AI Layer (estrazione batch), Frontend (staging review), Database (tabella ricette, campo origin).
**SCHEDA:** Stato: Da fare · Priorità: Bassa→Media (sblocca P3/P84/P80) · C: 3 | I: 4 | R: 2 · Modello: Fable (Alto) pipeline, Sonnet esecuzione · Autonomia: L1.

> **Nota:** lista ricette pendenti spostata dal Contesto (v17→v18, 8 luglio 2026) — persa per un attimo nel merge con l'Analisi Critica del passaggio successivo, reintegrata dopo il controllo di completezza.

KETO COLAZIONI (13, già pronte nel ricettario): chia pudding | yogurt+mandorle |
  porridge keto | uova+bacon | uova in avocado+mirtilli | fiocchi latte+more |
  ricotta+mirtilli | petto parmigiano | torta keto | nuvola albume+ciocc |
  budino cocco keto | budino ciocc keto | porridge farina mandorle

KETO DA COMPLETARE (con grammature):
  Salmone+spinaci burro | uova+funghi burro | sgombro+insalata olio aromatico |
  insalata greca (cetrioli, pomodori, feta, olive, cipolla) |
  crepes salate (quasi pronta — iniziare da qui: 4 crepes, 250g lievitante,
    70g farina mandorle, 80g formaggio spalmabile + erbe) |
  pollo curry | omelette feta | gamberoni griglia

VERDURE (quasi complete, alta priorità):
  Zucchine olio/limone/menta | barbabietola+carote/aglio/menta | broccoli limone |
  zucca al forno | aglio fermentato | melanzane grigliate aglio/erbe/limone |
  fagiolini bolliti+limone | radicchio+mela+kiwi | finocchi+arance |
  sedano+mela verde+pinoli | finocchi gratinati | spinaci crudi+noci+limone |
  gazpacho | cardo rosso marinato | indivia

COLAZIONI NON-KETO:
  Fette biscottate+marmellata+frutsc+yogurt | weetabix+frutsc+yogurt |
  latte veg+fiocchi orzo/farro+frutsc | porridge latte veg | porridge acqua+ciocc.fond |
  pancake proteici | pancake banana | plumcake integrale+lamponi+banane |
  ciambella yogurt | pancake lenticchie+animelle | pancake/crepes farina legumi+avocado+pomodori

CONDIMENTI ANTINFIAMMATORI (da aggiungere):
  Avocado-lime-basilico | crema di carote e zenzero | rucola-noci-limone

SMOOTHIE BOWL: da valutare quando si decide di inserirle


### P80 — Raggruppare ricette simili
**L'APPROCCIO ORIGINARIO:** vista raggruppata per "famiglia" (prefisso o tag/attributi).
**LA CRITICA DEL CTO:** non inventare clustering: dopo P37 le famiglie emergono dal dedupe fuzzy già calcolato. Un campo esplicito batte ogni euristica.
**LA SOLUZIONE OTTIMIZZATA:** campo opzionale `r.famiglia` (es. "Overnight"), assegnato in Pass 2 di P37 ai gruppi rilevati e editabile a chip; `renderRic` raggruppa per famiglia quando il filtro è attivo. 
**FOCUS COMPONENTI COINVOLTI:** Frontend + un campo additivo.
**SCHEDA:** Stato: Da fare (con/après P37) · Priorità: Bassa · C: 2 | I: 2 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P81 — "Salva nel Ricettario" dal generatore
**L'APPROCCIO ORIGINARIO:** pulsante sulla riga ricetta del piano che salva titolo+ingredienti+macro, categoria dallo slot.
**LA CRITICA DEL CTO:** giusto; due dettagli mancanti: dedupe (o il ricettario si riempie di "Pollo con verdure" ×40) e provenienza.
**LA SOLUZIONE OTTIMIZZATA:** al click: fuzzy-match sul titolo → se simile esiste, dialogo "Apri esistente / Salva variante"; salvataggio con `origin:'ai-piano'`, attributi precompilati (categoria da slot, stagione corrente), ingredienti da scomposizione se disponibile. Un modal, riuso dell'editor BLOCCO 17.
**FOCUS COMPONENTI COINVOLTI:** Frontend. Zero AI aggiuntiva.
**SCHEDA:** Stato: Da fare · Priorità: Media-Bassa · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P83 — Caffè fitto operativo
**L'APPROCCIO ORIGINARIO:** collegarlo a valori nutrizionali reali e renderlo selezionabile nel piano.
**LA CRITICA DEL CTO:** non merita codice: è UNA voce di contenuto. Se serve struttura, è quella di P82.
**LA SOLUZIONE OTTIMIZZATA:** inserirlo come alimento custom (valori reali) + eventuale ricetta nel ricettario con tag. 15 minuti dentro un'altra sessione. Se entro P37 nessuno lo reclama, cade nella valutazione "ricette fit" (archiviare).
**FOCUS COMPONENTI COINVOLTI:** Dati/contenuto. Zero codice.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 1 | I: 1 | R: 1 · Modello: nessuno · Autonomia: L1.

---

# PRIORITÀ 3 — Contenuti e prodotto

### P19 — Libreria colazioni fisse
**L'APPROCCIO ORIGINARIO:** 10-20 colazioni predefinite, selettore, grammature fisse ritoccabili, categoria funzionale salvata.
**LA CRITICA DEL CTO:** "libreria" al singolare è la parola pericolosa: implica una SECONDA struttura parallela al ricettario, con secondo editor, secondo sync, secondo filtro. Ridondanza pura.
**LA SOLUZIONE OTTIMIZZATA:** le colazioni fisse SONO ricette: cat `colazione`, tag dedicato (`colazione-fissa` o famiglia P80), ingredienti strutturati (post-P90) così le grammature sono ritoccabili con macro live. Il "selettore" = vista filtrata del ricettario dentro le regole piano ("colazioni gradite" = lista di id ricetta). Zero strutture nuove.
**FOCUS COMPONENTI COINVOLTI:** Contenuti + Frontend (un filtro). 
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P25 — Farmaci strutturati (+ Routine)
**L'APPROCCIO ORIGINARIO:** textarea → `{farmaco, dose, posologia}` in 2 livelli; match clinici affidabili; quarta tipologia in Routine.
**LA CRITICA DEL CTO:** voce solida — la migliore della vecchia P3. Due rischi taciuti: (1) la migrazione del testo libero esistente NON può essere un parse silenzioso (sono farmaci: errore = danno) — serve il pattern P63; (2) FX/WA/prompt oggi leggono la stringa: cambiare il campo rompe i prompt in punti non ovvi.
**LA SOLUZIONE OTTIMIZZATA:** Livello 1: `p.farmaciStruct[] {nome, dose, note}` + **adapter `farmaciToString(p)`** che alimenta OGNI consumatore testuale esistente (prompt, PDF, WA) — zero regressioni per costruzione; migrazione via parse AI del textarea con diff di conferma (riuso componente P63); i match clinici (warfarin ecc.) passano da regex sul testo a lookup su `nome` normalizzato (mappa farmaco→flag data-driven). Livello 2 (dopo uso): posologia per-giorno + ingresso in Routine come `tipo:'farmaco'`. UI a chip coerente col BLOCCO 17.
**FOCUS COMPONENTI COINVOLTI:** Struttura dati (additiva, textarea conservato in sola lettura fino a fine migrazione), Frontend, AI Layer (solo migrazione one-shot).
**SCHEDA:** Stato: Da fare · Priorità: Media · C: 3 | I: 4 | R: 3 (dati clinici) · Modello: Fable 5 (Alto) L1; Sonnet il resto · Autonomia: **L0** su migrazione e mappa flag.

### P4 — Questionario di anamnesi
**L'APPROCCIO ORIGINARIO:** rivedere insieme il questionario originale; priorità alle domande che alimentano il generatore.
**LA CRITICA DEL CTO:** com'è scritta produce un documento, non una feature. Il valore c'è solo se ogni domanda atterra su un campo che `costruisciContestoPaziente` legge.
**LA SOLUZIONE OTTIMIZZATA:** vincolo di accettazione esplicito: ogni domanda nuova → campo `p.anamnesi.*` → riga nel contesto AI → (dove sensato) leva nel generatore (pasti fuori casa → vincolo pranzo; chi cucina/tempo → filtro tempoPrep, che ora esiste). Domande senza consumatore: fuori. Sessione unica con Fabrizio, poi 1h di implementazione.
**FOCUS COMPONENTI COINVOLTI:** Struttura dati (additiva) + AI Layer (contesto).
**SCHEDA:** Stato: Da fare (materiale da Fabrizio) · Priorità: Bassa · C: 2 | I: 3 | R: 1 · Modello: Fable (Alto) per il mapping, Sonnet per l'implementazione · Autonomia: L2 sulle domande.

### P3 — Protocolli dietetici + percorsi (Zero Cucina / Fast)
**L'APPROCCIO ORIGINARIO:** ogni protocollo = set di vincoli, dopo il sistema regole base; percorsi come stessa meccanica.
**LA CRITICA DEL CTO:** giustissima la direzione "protocollo = dati, non codice". Il rischio è l'implementazione a if-branch nel prompt (un ramo per Paleo, uno per Dukan…): insostenibile alla quinta dieta. E manca la regola di precedenza con le impostazioni manuali.
**LA SOLUZIONE OTTIMIZZATA:** `PRESET_PROTOCOLLI` = array di oggetti composti SOLO da primitive già esistenti (esclusioni categorie/alimenti, distribuzione macro, filtri attributi tempoPrep/profilo, testo-guida prompt). Applicare un preset = scriverlo nelle regole del piano con badge "Preset: Fast ✕"; le modifiche manuali successive VINCONO (il preset è baseline, non gabbia). Zero Cucina = preset (tipo/tag + guida "zero preparazioni"); Fast = preset (tempoPrep ∈ {0-5, 5-10}) — grazie al BLOCCO 17 è un filtro, non un progetto. Nuovo protocollo = nuova riga dati.
**FOCUS COMPONENTI COINVOLTI:** Frontend (regole piano) + AI Layer (una sezione prompt generica "PROTOCOLLO ATTIVO"). Zero DB.
**SCHEDA:** Stato: Da fare · Priorità: Bassa-Media · C: 3 | I: 4 | R: 2 · Modello: Fable (Alto) per il modello preset, Sonnet per i preset concreti · Autonomia: L1 (L0 sui contenuti clinici dei preset).

### P84 — Lista della spesa automatica
**L'APPROCCIO ORIGINARIO:** lista categorizzata dal piano, aggregazione per settimana, pagina PDF + testo WhatsApp, predisposta per app paziente.
**LA CRITICA DEL CTO:** la roadmap ignora la domanda che decide tutto: **le alternative contano?** Se ogni cella ha 3 alternative, aggregare tutto = lista gonfiata ×3, inutilizzabile; solo il principale = lista che "manca" ciò che il paziente sceglierà. Non è un dettaglio, è la feature.
**LA SOLUZIONE OTTIMIZZATA:** decisione: aggregare i SOLI principali, con nota a piè di lista ("le alternative non sono incluse") — semplice, onesto, corrispondente all'uso reale. Motore: funzione pura `listaSpesa(piano) → [{categoria, voci:[{alimento, g|q}]}]` che somma celle + scomposizione delle righe testuali (riuso P33); arrotondamenti commerciali (g→ettogrammi, uova→pezzi) via mini-mappa unità; categorie da ALIMENTI. Output: pagina PDF + copia-testo (wa.me). Pure function → 3 test in P78.
**FOCUS COMPONENTI COINVOLTI:** Frontend (motore + PDF + share). Zero AI, zero DB.
**SCHEDA:** Stato: Da fare · Priorità: Media · C: 2 | I: 4 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P85 — Diario paziente
**L'APPROCCIO ORIGINARIO:** decidere interno vs esterno; se interno: voci giornaliere commentabili dal medico.
**LA CRITICA DEL CTO:** qui va detto un no da CTO: **un diario interno implica account-paziente**, cioè una seconda classe di tenancy (oggi RLS = professionista proprietario di tutto). È un cambio di architettura di sicurezza travestito da feature. Farlo "un po'" è il modo per farlo male.
**LA SOLUZIONE OTTIMIZZATA:** decisione consigliata: NON ora. Percorso a costo marginale: (1) P41 (link sola-lettura) come primo canale paziente; (2) intake strutturato via WhatsApp (il paziente manda, il medico incolla in una nota-diario del paziente: campo `p.diario[] {data, testo, commento}` compilato DAL medico — zero auth nuova, 80% del valore clinico); (3) il diario vero con account paziente si progetta dentro P50, dove la tenancy si affronta per intero.
**FOCUS COMPONENTI COINVOLTI:** oggi: struttura dati additiva + UI note. Il resto: P50.
**SCHEDA:** Stato: Da fare (decisione) · Priorità: Media come decisione, sviluppo rinviato · C: 1 (versione note) | I: 3 | R: 1 · Modello: Fable (Alto) solo per la decisione · Autonomia: L2.

### P86 — Testo educativo personalizzato
**L'APPROCCIO ORIGINARIO:** generatore AI di testo su misura, allegato al PDF, con revisione del medico.
**LA CRITICA DEL CTO:** "AI scrive un testo libero su dati clinici" è la ricetta per riformulazioni prescrittive e allucinazioni gentili — in un documento CONSEGNATO al paziente. La revisione del medico su testo libero ogni volta è attrito che ucciderà l'uso.
**LA SOLUZIONE OTTIMIZZATA:** template-first: 8-10 template curati (da Fabrizio, passati per P73) con slot dati (`{nome}`, `{obiettivo}`, `{3 alimenti verdi preferiti}`); l'AI compila SOLO gli slot e al massimo leviga i raccordi, temperatura bassa, output nel formato concetto-allegato con `origin:'ai-personalizzato'` e stato BOZZA finché il medico non approva (riuso flusso concetti P31). Vietato l'invio diretto. Post-P66 per costi.
**FOCUS COMPONENTI COINVOLTI:** AI Layer (compilazione vincolata), Frontend (riuso concetti). 
**SCHEDA:** Stato: Da fare · Priorità: Bassa-Media · C: 3 | I: 3 | R: 3 (contenuto al paziente) · Modello: Fable (Alto) per i template col medico; runtime anche Haiku via P66 · Autonomia: **L0** sui contenuti.

### P87 — Centro comunicazione (WhatsApp/Telegram/email)
**L'APPROCCIO ORIGINARIO:** punto unico canali, template, storico invii, invio PDF analisi via WhatsApp.
**LA CRITICA DEL CTO:** contiene una promessa impossibile a costo zero: "invio automatico" WhatsApp richiede la Business API (approvazioni, costi per conversazione, niente allegati arbitrari facili). Oggi esiste solo `wa.me` (apre l'app con testo precompilato: l'allegato lo fa l'utente). Se non lo si dice, la voce arriverà in sviluppo e morirà lì.
**LA SOLUZIONE OTTIMIZZATA:** scope onesto v1: tab "Comunicazione" nella scheda paziente = template variabilizzati ({nome},{link},{prossimo appuntamento}), bottoni wa.me/mailto, log invii unificato (oggi il log WA-AI vive già in localStorage: si consolida lì), e per "inviare le analisi": genera PDF + istruzione allega (o link P41 quando esiste). Telegram: fuori. Business API: si rivaluta con P50, non prima.
**FOCUS COMPONENTI COINVOLTI:** Frontend. Zero backend.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P88 — Database clinico interno
**L'APPROCCIO ORIGINARIO:** repository per patologia (raccomandazioni, alimenti, strategie), consultabile e riusabile.
**LA CRITICA DEL CTO:** il rischio è costruire un mini-CMS. Il progetto HA già le strutture giuste: gruppi clinici (patologia→flag/alimenti) e concetti educativi (testo). Manca solo il livello "note di strategia per patologia" e il collegamento.
**LA SOLUZIONE OTTIMIZZATA:** estendere i gruppi clinici con `note` (markdown: cosa funziona, riferimenti) + link a concetti correlati; una vista "Sapere clinico" che li elenca e cerca; le note del gruppo appaiono come suggerimento quando il gruppo è attivo sul paziente. Storage nel meta-record collections (poi P74). Niente editor nuovi: textarea + markdown-lite già in uso.
**FOCUS COMPONENTI COINVOLTI:** Frontend + meta-record. Zero AI.
**SCHEDA:** Stato: Da fare · Priorità: Bassa-Media · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Media); contenuti = Fabrizio · Autonomia: L1 (L0 sui contenuti).

### P89 — Onboarding nuovi utenti
**L'APPROCCIO ORIGINARIO:** tour guidato data-driven, pagina primi passi, dati demo; trigger P53.
**LA CRITICA DEL CTO:** giusta e giustamente rimandata. Unico upgrade: il **dataset demo è un asset a triplo uso** (onboarding, fixture per P78, screenshot per P52) — costruirlo prima del tour, non come contorno.
**LA SOLUZIONE OTTIMIZZATA:** `seedDemo()` idempotente e cancellabile (2 pazienti fittizi completi: analisi, InBody, un piano) → subito utile ai test; il tour ({selector, testo}[]) e la checklist arrivano col trigger P53.
**FOCUS COMPONENTI COINVOLTI:** Frontend + fixture.
**SCHEDA:** Stato: Da fare (seed anticipabile) · Priorità: Alta solo pre-lancio · C: 2 | I: 4 (in trial) | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

---

# PRIORITÀ 4 — UX, pulizia, strutturali residui

### P35 — Peso intermedio casalingo
**L'APPROCCIO ORIGINARIO:** raffinare gradualmente: offset bilance, trend, forse grafico/WhatsApp.
**LA CRITICA DEL CTO:** il problema clinico è UNO: il valore assoluto della bilancia di casa è rumore. Tutto il resto è decorazione.
**LA SOLUZIONE OTTIMIZZATA:** alla prima pesata casalinga post-visita si calcola e salva `offsetBilancia` (peso casa − peso studio); da lì la sezione mostra SOLO trend normalizzato (sparkline + Δ settimanale), mai il valore grezzo in evidenza. Grafico = sparkline inline, non un nuovo Chart. WhatsApp-intake rimandato a P87/P85.
**FOCUS COMPONENTI COINVOLTI:** Frontend + campo additivo.
**SCHEDA:** Stato: Da fare (trigger uso reale) · Priorità: Bassa · C: 2 | I: 2 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P43 — Piccoli interventi "quando capita"
**L'APPROCCIO ORIGINARIO:** pulizia prompt | sidebar <1130px | backup settimanale JSON | DB equivalenze.
**LA CRITICA DEL CTO:** due delle quattro non sono "ritagli": la pulizia prompt tocca la cache 90gg (stesso avvertimento di P77: hash invalidato) e va fatta INSIEME a P77, non a tempo perso; la sidebar mobile è mezzo progetto UI, non un ritaglio.
**LA SOLUZIONE OTTIMIZZATA:** ricollocare: pulizia prompt → dentro P77 (un solo invalidamento cache). Sidebar mobile → voce propria a trigger "uso reale da tablet/phone". Restano ritagli veri: backup settimanale (bottone export + promemoria; File System Access API se si vuole silenzioso) e DB equivalenze (contenuto, sinergia P33b).
**FOCUS COMPONENTI COINVOLTI:** vari, tutti frontend.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 1-2 | I: 2 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P74 — Estrazione entità dal blob + fine dei meta-record
**L'APPROCCIO ORIGINARIO:** (1) meta-record → tabella collections; (2) entità pesanti → tabelle/colonne tipizzate; (3) query mirate al posto del pull totale. Rischio alto, backup CSV.
**LA CRITICA DEL CTO:** piano giusto ma manca il gradino a costo zero (F5) e la disciplina di transizione: senza finestra di dual-write e senza P68/P69 fatti prima, la migrazione multi-dispositivo è roulette.
**LA SOLUZIONE OTTIMIZZATA:** fasi rinumerate: **(0.5)** proiezione lista pazienti via `select=id,updated_at,data->>nome,data->>cognome,...` — pull "shallow" per la lista, blob completo solo all'apertura scheda: taglia il payload dell'80% SENZA migrare nulla; **(1)** `collections` per i 4 meta-record (dual-read 1 sessione, poi cutover); **(2)** una entità per sessione (ordine: analisiSangue → inbody → note) in tabelle `{pazId, user_id, data jsonb}` con stessa RLS, dual-write finché il diff notturno è pulito; **(3)** FK reali → la cascata P64 passa al DB e il codice client si ritira. Ogni fase: backup + test P78 verdi prima/dopo. Definire ORA lo schema target su carta (mezza pagina nel Contesto) così P63/P25/P88 non inventano forme incompatibili.
**FOCUS COMPONENTI COINVOLTI:** Database (migrazioni), Frontend (sync/lettura), tutto dietro P68/P69/P78.
**SCHEDA:** Stato: Da fare (0.5 subito) · Priorità: Media-Alta · C: 5 | I: 5 | R: 4 · Modello: Fable 5 (Ragionamento Attivo Massimo) · Autonomia: **L0**.

---

## ⭐ FOCUS SPECIALE — P90: gestione degli alimenti che compongono ricette e pasti (riprogettazione da zero)

**L'APPROCCIO ORIGINARIO:** "card dedicata per alimento, rotellina per la grammatura, gestione alimenti marginali" (Roadmap Zero #5) — un restyling della cella.

**LA CRITICA DEL CTO (perché il restyling è la risposta sbagliata):** il progetto ha oggi **due editor diversi per lo stesso identico problema** — "una lista di {alimento, grammi} con feedback nutrizionale":
1. nel **piano**, le celle si aggiungono da un popup a 2 pannelli e le grammature si ritoccano cella per cella, senza vedere l'effetto sul totale del pasto mentre lo si fa;
2. nell'**editor ricetta**, gli ingredienti sono UNA TEXTAREA a testo libero ("Pasta 80g, Pomodoro 100g") ri-parsata a ogni input dal ricalcolo del BLOCCO 17 — che è ottimo come motore, ma il testo libero come *fonte di verità* significa: refusi che diventano "ingrediente non riconosciuto", nessuna manipolazione per-riga, nessun colore semaforo/allergene mentre scrivi, e il paradosso per cui il dato più strutturabile dell'app vive nel campo meno strutturato.
Una "rotellina" sopra questo stato delle cose lucida la maniglia di una porta che va sostituita. In più, la rotellina è un pattern scadente su touch (il 50% dell'uso dichiarato è iPhone) e non risolve né l'inserimento né il feedback.

**LA SOLUZIONE OTTIMIZZATA — un componente unico: `FoodRowEditor`.**
*Modello dati (minimo, additivo):* riga = `{ref, label, g}` dove `ref` è la chiave canonica (`trovaChiaveAlimento`) o `custom:<id>` o `null` (testo libero, marcato ⚠ non verificabile — la stessa semantica della copertura di P61: i due sistemi si parlano).

*Flusso di inserimento (fluidità):* un solo campo con **combobox type-ahead** sull'indice precomputato (NOMI_CANONICI + ALIMENTI + custom): 2 lettere → suggerimenti con emoji, categoria e kcal/100g; Enter aggiunge la riga con la **porzione di default per categoria** (pasta 80, olio 10, verdura 200 — mini-mappa `PORZIONI_DEFAULT`) e rimette il focus nel campo → inserire 6 ingredienti = 6 digitazioni brevi + 6 Enter, mai il mouse. Voce non trovata → ultima opzione della tendina: "➕ crea '<testo>' come alimento custom" (aggancio diretto a P82) oppure "usa come testo libero ⚠".

*Gestione quantità (senza rotellina):* per riga, **stepper ±** con incremento intelligente per categoria (±10g solidi, ±5g condimenti), pressione prolungata = accelerazione, tap sul numero = edit diretto; **chip di porzioni note** contestuali ("1 cucchiaio = 10g", "1 fetta = 25g", "1 vasetto = 125g") — un tap e la grammatura è quella. Su iPhone: riga alta 44px, stepper largo, combobox in bottom-sheet.

*Feedback immediato (il cuore):* ogni riga mostra kcal della riga ricalcolate live (motore BLOCCO 17, per-riga invece che re-parse totale: più preciso e più veloce) e un **pallino semaforo calcolato SUL PAZIENTE attivo** — verde/arancione/rosso, e **bordo rosso + icona se allergene**: l'errore clinico viene bloccato *mentre viene digitato*, non scoperto dal validatore a valle (P61 resta la rete; questo è il guard-rail). In testa al gruppo, una **barra di budget del pasto**: kcal e P/C/G correnti vs target dello slot (dalla distribuzione attiva via `getTargetAttivi` di P55 — riuso, non ricalcolo), con tinta neutra/ambra/rossa per sotto/vicino/oltre.

*Granularità senza peso:* progressive disclosure — la riga mostra solo `[nome] [g][±] [kcal] [•]`; un tap sull'espansore rivela P/C/G, alternative (aggancio futuro P33b) e nota. Niente tabelle dense di default.

*Dove vive (rollout in 3 tappe, stessa componente):*
1. **Editor ricetta** (perimetro chiuso, rischio minimo): le righe strutturate diventano la fonte di verità in `r.ingredienti[]`; la textarea resta come **import** (incolla testo → parser P33 → righe) e come **export** (`ingredientiToString()` rigenera la stringa `r.ing` che TUTTO il resto dell'app continua a leggere: prompt, PDF, scomposizione — **zero breakage per costruzione**, il campo legacy è derivato). Il ricalcolo macro smette di ri-parsare testo: somma le righe.
2. **Celle del pasto** nella griglia unificata (AI+manuale insieme, grazie al BLOCCO 16): la cella diventa una FoodRow; il popup "Aggiungi alimento" resta per la navigazione per categorie, la combobox per chi sa cosa vuole.
3. Riuso gratuito in: colazioni fisse (P19), revisione import (P37), anteprima lista spesa (P84).

*Edge case previsti:* alimenti con q>0 in pezzi (uova) → unità nella mappa porzioni; righe `ref:null` escluse dal totale con contatore visibile ("2 righe non conteggiate"); rename custom (P82) aggiorna `label` via `ref`.

**FOCUS COMPONENTI COINVOLTI:** Frontend (componente + 2 integrazioni); struttura dati additiva (`r.ingredienti[]`, `PORZIONI_DEFAULT`); zero AI; zero DB. Dipendenze: `getTargetAttivi` (P55, ✅ disponibile dal 9 lug 2026) per la barra budget; sinergie: P61, P82, P19, P37, P84.
**SCHEDA:** Stato: Da fare · Priorità: **Media-Alta** (promossa: è il gesto più frequente dell'app) · C: 4 | I: 5 | R: 3 (tappa 2 tocca la griglia) · Modello: Fable 5 (Ragionamento Attivo Alto) per componente e contratto dati; Sonnet (Media) per porzioni/chip/rifiniture · Autonomia: L1 sulla UI, **L0** su semaforo/allergeni e sul ponte `r.ing`↔`r.ingredienti`.

---

## ⭐ FOCUS SPECIALE — P108/P109/P110: sezione "Alimenti" — catalogo unico, import INRAN, scanner barcode

> **Aggiornamento 13 lug 2026:** P108 fase 0 e P109 chiuse (dettagli in CHANGELOG). Resta da fare: P108 fase 1 (sezione menu "Alimenti") e P110 (scanner barcode). Lo scope di P109 è stato ridotto in corso d'opera rispetto a quanto scritto sotto: non un import massivo delle tabelle CREA-INRAN, ma il riempimento mirato dei buchi nel catalogo che Fabrizio già usa (95 alimenti con categoria ma senza macros → 68 colmati, 27 restano vuoti perché sono spezie/esotici/composti non presenti nelle tabelle CREA classiche). La motivazione: un import massivo avrebbe imposto le scelte cliniche di Fabrizio ad altri nutrizionisti che in futuro useranno NutriGest come SaaS — meglio che il catalogo di base resti snello e ognuno lo ampli dalla sezione Alimenti (P108 fase 1) o dallo scanner (P110).

**Origine:** conversazione 12 luglio 2026 con Fabrizio, nata da un fastidio concreto ("non voglio cambiare nomi/valori dentro il profilo paziente") e sfociata in una richiesta più ampia: una sezione dedicata a sinistra per gestire gli alimenti, dove ognuno amplia il proprio database — a mano, da tabelle INRAN ufficiali, o scansionando il codice a barre del prodotto (tipo Yuka).

**Rapporto con P82 (già chiusa):** P82 ha risolto la sicurezza del rename/delete degli `alimentiCustom` **senza id**, con `scanRiferimentiAlimento()` che scandisce piani/ricette/profili per NOME e chiede conferma. Funziona ed è in produzione — non va toccato. Questa voce non lo sostituisce: **coesiste**. Il motivo per introdurre ora un id stabile non è più "rendere sicuro il rename" (P82 lo ha già fatto per nome), ma uno nuovo, emerso proprio dalla richiesta dello scanner: **due prodotti diversi con lo stesso nome a schermo** (es. due yogurt di marche diverse, o due letture barcode con nome generico identico) devono poter convivere come schede distinte senza che l'una sovrascriva l'altra. Il nome da solo non basta più a distinguerli quando è una scansione automatica — senza un umano nel loop — a crearli.

**LA CRITICA DEL CTO — perché non è "solo" un nuovo pannello:** oggi un alimento vive spezzato in tre punti tenuti insieme dal nome (`ALIMENTI` = catalogo per categoria/grammatura, `CREA_ALIMENTI` = valori nutrizionali per 100g, `db.alimentiCustom` = solo metà di questo, iniettato in `CREA_ALIMENTI` ma **mai** nel catalogo `ALIMENTI`). Risultato verificato nel codice: un alimento custom oggi può avere le kcal ma non ha una casa nel picker a categorie usato da preferenze cibi e costruttore piani — l'inserimento è a metà. In più `getValoriCREA()` fa fallback silenzioso sui generici (`Verdura mista`, `Frutta mista`…) quando il nome non matcha: un errore di battitura o un nome AI non riconosciuto degrada i macros del piano **senza avviso**. Aggiungere solo il form manuale senza chiudere questa asimmetria significa costruire la sezione sopra la stessa crepa.

**LA SOLUZIONE OTTIMIZZATA — tre fasi, stesso impianto dati:**

**P108 (fasi 0+1) — record unico + sezione Alimenti.** Fase 0: scheda alimento unificata `{id, nome, categoriaSem, categoriaFunz, gDefault, per100g:{kcal,p,c,g,...}, tags[], barcode?, fonte:'crea'|'custom'|'off', attivo}`; id calcolato per gli alimenti CREA-INRAN esistenti (retro-compatibile, zero rotture); funzione di risoluzione che trova un alimento per id O per nome (compatibilità con `p.alimenti` esistenti, che restano per-nome). **Nessuna migrazione pesante**: Fabrizio ha ~4 alimenti custom oggi, esplicitamente sacrificabili — la finestra per fare la cosa per bene senza costi di migrazione è ora, non dopo. Fase 1: voce di menu "Alimenti" con lista/ricerca/filtri, form di aggiunta manuale (nome, valori/100g, categoria, grammatura, allergeni), modifica, archivia (mai elimina secco — coerente con P82: riferimenti esistenti restano validi). Questa fase **assorbe** `alimentiCustom`, chiudendo l'asimmetria: un alimento aggiunto qui entra sia nei valori nutrizionali sia nel catalogo a categorie. Testo esplicativo in sezione: gli alimenti di base vengono dalle tabelle CREA-INRAN, l'utente può ampliarli.

**P109 — import tabelle INRAN.** Caricamento CSV, mappa colonne → scheda unificata, id assegnato in bulk, anti-doppioni per nome, report di cosa è entrato/cosa mancava.

**P110 — scanner barcode via Open Food Facts.** Database aperto, gratuito, senza chiave API (`world.openfoodfacts.org/api/v2/product/{barcode}.json`). Flusso: inquadra barcode → fetch prodotto → precompila nome + valori/100g nel form di P108 → **l'utente conferma/corregge prima di salvare** (mai auto-salvataggio: i dati Open Food Facts sono crowdsourced, qualità variabile) → l'alimento salvato vive SOLO nel database di NutriGest da quel momento (Open Food Facts è un rubinetto una-tantum, non una dipendenza runtime — un piano già generato non deve mutare se Open Food Facts cambia o è irraggiungibile). Copre solo prodotti confezionati (per definizione, serve un barcode); pollo/mela/verdura restano da INRAN o manuali. Fotocamera nativa su Chrome/Android; Safari/Firefox richiedono una libreria di lettura barcode via CDN — verificare compatibilità e prestazioni su iPhone prima del rollout, dato che è la piattaforma dichiarata come maggioritaria (P90 lo nota per FoodRowEditor: stesso vincolo qui).

**Sinergia con P90 (non sovrapposizione):** P90 disegna come una riga-alimento entra in una ricetta/cella (`FoodRowEditor`, combobox type-ahead). P108-110 disegnano da dove viene il *catalogo* che quella combobox interroga. Sono la stessa lista di alimenti vista da due punti diversi: il catalogo (qui) e il punto di consumo (P90). Ordine naturale: se si fa anche P90, farlo dopo P108 fase 0, così l'indice precomputato di P90 (`NOMI_CANONICI + ALIMENTI + custom`) include già il record unificato invece di doverlo poi rifattorizzare.

**Punto di alto valore rimandabile (non in questa apertura):** vincolare il prompt del generatore AI a scegliere i nomi solo dal catalogo unificato — chiude il fallback silenzioso sui generici e rende i macros dei piani AI affidabili quanto quelli manuali. Dipende da P108 fatto, va in coda come voce propria quando il catalogo è stabile.

**FOCUS COMPONENTI COINVOLTI:** Frontend (nuova sezione + form + import + scanner), struttura dati (`ALIMENTI`+`CREA_ALIMENTI`+`alimentiCustom` → record unico, additivo, id calcolato per compatibilità), integrazione esterna (Open Food Facts, sola lettura, nessuna chiave). Zero AI in P108/P109; P110 non chiama l'AI di NutriGest, chiama Open Food Facts.
**SCHEDA:** Stato: Da fare · Priorità: Alta (dichiarata da Fabrizio, "voglio fare tutto ora") · C: 4 | I: 4 | R: 3 (P108 fase 0 tocca risoluzione alimenti usata da preferenze/piani) · Modello: **P108 fase 0 → Opus/Fable Max ON** (fondazione, non reversibile a costo zero una volta popolato il catalogo) · **P108 fase 1 → Opus High ON** per salvataggio dati, Sonnet Medium OFF per layout/CSS · **P109 → Sonnet Medium OFF**, controllo anti-doppioni verificato da Opus High · **P110 → Opus/Fable Max ON** per l'integrazione e il flusso di conferma, Sonnet per la UI fotocamera · Autonomia: **L0** su risoluzione/id e su salvataggio dati alimento; L1 su layout, filtri, ricerca.

---

### P111 — Chiarezza UI: medie settimanali su piano parziale

**Origine:** 13 luglio 2026, Fabrizio ha segnalato macros che sembravano assurdi in un piano di test (115 kcal per un pasto di pollo+pasta, −96% dal target). Verificato: nessun bug nei dati o nel calcolo — la tabella "PRIME SCELTE / MEDIA PONDERATA" divide sempre per 6 giorni, e il piano aveva un solo pasto compilato su 6. I conti tornavano esattamente, ma la UI non comunicava che si trattasse di una media settimanale su un piano incompleto, e il numero risultante sembrava un errore invece che un dato corretto ma parziale.

**Il problema:** un nutrizionista che compila un piano un pasto alla volta (flusso normale di lavoro) vede numeri fortemente sottostimati finché non ha riempito tutti i giorni, senza alcun segnale che lo avvisi che è normale. Rischio concreto: prendere per buono (o rifiutare come bug) un numero che invece dipende solo da quanti giorni sono ancora vuoti.

**Soluzione minima proposta:** aggiungere un'indicazione visibile accanto a "MEDIA POND." — es. "media su 6 giorni, N compilati" — o un badge quando meno del 100% dei giorni ha almeno un pasto. Nessun cambiamento al calcolo, solo comunicazione.

**SCHEDA:** Stato: Da fare · C: 1 | I: 3 | R: 1 (solo testo/badge, nessun dato clinico toccato) · Modello: **Sonnet, Low/Medium, Thinking OFF** · Autonomia: L1 (può proporre dove posizionare il badge, non serve conferma preventiva sul layout).

---

### P91 — Modalità 7 slot (vista per-pasto)
**L'APPROCCIO ORIGINARIO:** schermata unica con 7 slot per la colazione, estendibile agli altri pasti.
**LA CRITICA DEL CTO:** "schermata unica" = seconda UI da mantenere. È la stessa griglia, trasposta.
**LA SOLUZIONE OTTIMIZZATA:** toggle "per giorno / per pasto" sulla griglia esistente: la vista per-pasto è una slice `giorni×[pasto]` renderizzata dalle STESSE celle (`_renderCelleGriglia`); si aggiunge solo "applica a tutti i giorni" (copia struttura cella sui 7). Il drag tra giorni può arrivare dopo: la copia copre il 90% dell'uso.
**FOCUS COMPONENTI COINVOLTI:** Frontend (render alternativo + copia). Zero dati.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 3 | I: 3 | R: 2 · Modello: Sonnet (Media) · Autonomia: L1.

### P92 — Consigli condizionali nel PDF
**L'APPROCCIO ORIGINARIO:** suggerimenti pre-pranzo/anti-dolce con attivazione condizionale, toggle come i promemoria.
**LA CRITICA DEL CTO:** corretta; unico rischio è cablarli. 
**LA SOLUZIONE OTTIMIZZATA:** estendere la struttura pillole/promemoria esistente con `{id, testo, condizione?}`: i due consigli sono RIGHE DATI, il renderer non cambia. Contenuti approvati da Fabrizio (P73-compliant).
**FOCUS COMPONENTI COINVOLTI:** Frontend/PDF (dati).
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 1 | I: 2 | R: 1 · Modello: Sonnet (Bassa) · Autonomia: L1.

### P93 — Sabato sera / alcol
**L'APPROCCIO ORIGINARIO:** combinazioni (pizza+sushi), spostamento nel generatore, emoji, toggle bevuto, gestione alcolici.
**LA CRITICA DEL CTO:** cinque desideri, nessun modello. Il "toggle bevuto/non bevuto" poi è tracking del consumato: appartiene al diario (P85/P50), non al piano — metterlo qui crea un dato senza casa.
**LA SOLUZIONE OTTIMIZZATA:** modellare il **pasto libero** come config nelle regole: `{giorno, pasto, opzioni:[pizza|sushi|...], alcol:{tipo, unità}?}`; il generatore lo riceve come vincolo ("sabato cena: pasto libero — non generare"), il PDF lo stampa come blocco dedicato con le opzioni ed emoji. Il tracking del bevuto: fuori, annotato per P85.
**FOCUS COMPONENTI COINVOLTI:** Frontend (regole + PDF) + AI Layer (una riga di vincolo).
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 2 | I: 3 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P94 — Giornate speciali
**L'APPROCCIO ORIGINARIO:** giornata extra (Natale, Pasqua, Viaggio) accodata dopo l'ultimo giorno, con regole proprie.
**LA CRITICA DEL CTO:** ok, ma "regole proprie" senza P3 = altro sistema di regole ad hoc. E c'è un edge ignorato: cosa ne fa il validatore/lista spesa/kcal medie di un giorno "speciale"?
**LA SOLUZIONE OTTIMIZZATA:** `giorno.tipo:'speciale'` + etichetta + preset P3 applicato solo a quel giorno; escluso dalle medie kcal e dalla lista spesa (dichiarato in UI), incluso nel validatore P61 (le allergie non vanno in vacanza). Farla DOPO P3: diventa un giorno+preset, 1 sessione.
**FOCUS COMPONENTI COINVOLTI:** Frontend (struttura giorno additiva + PDF). Dipendenza: P3.
**SCHEDA:** Stato: Da fare · Priorità: Bassa · C: 2 | I: 2 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P95 — Nomi dei giorni configurabili
**L'APPROCCIO ORIGINARIO:** opzione Lun-Dom / Giorno 1-N / Giorno A-B; prima verificare lo stato attuale.
**LA CRITICA DEL CTO:** giusta la verifica; il rischio tecnico è che i nomi giorno siano CHIAVI (oggetti indicizzati per 'Lunedì') e non etichette — nel qual caso "rinominare" = migrazione, non opzione.
**LA SOLUZIONE OTTIMIZZATA:** verifica in 10 min (come indicizza `_ngCreaPianoManuale`/il piano AI); se chiavi: introdurre `giorno.label` separata dalla chiave (additivo) e far leggere SOLO la label a UI/PDF. L'opzione diventa banale e P33c la eredita gratis.
**SCHEDA:** Stato: **Da verificare** · Priorità: Bassa · C: 2 | I: 2 | R: 2 (se chiavi) · Modello: Sonnet (Media) · Autonomia: L1.

### P96 — Estetica tag WE nel PDF
**L'APPROCCIO ORIGINARIO:** rivedere l'estetica del tag weekend; verificare prima.
**LA CRITICA DEL CTO:** voce-fossile di Roadmap Zero: probabile che i lavori PDF di giugno l'abbiano già assorbita.
**LA SOLUZIONE OTTIMIZZATA:** 5 minuti: generare un PDF con weekend attivo e guardare. Se ok → chiudere senza codice; se no → è un pomeriggio dentro un'altra sessione PDF.
**SCHEDA:** Stato: **Da verificare** · Priorità: Bassa · C: 1 | I: 1 | R: 1 · Modello: — · Autonomia: L1.

### P97 — Stile "carta" nel PDF
**L'APPROCCIO ORIGINARIO:** sfondo/texture carta importabile per look editoriale.
**LA CRITICA DEL CTO:** un'immagine full-page per pagina = PDF che passa da ~200KB a molti MB (WhatsApp li comprime male, la stampa li sbiadisce) e testo meno leggibile. Costo alto, valore estetico discutibile.
**LA SOLUZIONE OTTIMIZZATA:** ottenere il "calore" con mezzi vettoriali: tinta di fondo crema (`setFillColor` full-page, +0KB), cornice/filetti, eventuale pattern leggerissimo SOLO in copertina. Texture raster: solo se dopo il mock Fabrizio insiste, e allora una sola immagine riusata e compressa. Test stampa B/N obbligatorio.
**SCHEDA:** Stato: Da fare (mock prima) · Priorità: Bassa · C: 2 | I: 2 | R: 2 (peso/leggibilità) · Modello: Sonnet (Media), mock visivo prima di implementare (regola di progetto) · Autonomia: L2.

### P98 — Concetti: estetica PDF, formattazione, foto
**L'APPROCCIO ORIGINARIO:** migliorare layout PDF; valutare barra grassetto/corsivo; card foto (richiede campo immagine).
**LA CRITICA DEL CTO:** tre voci con tre nature diverse incollate. La barra "stile Word" con contentEditable è un pozzo di sanitizzazione (che P70 dovrà poi bonificare); le foto base64 nel blob sono il modo più rapido di far esplodere localStorage (vedi P71-G1).
**LA SOLUZIONE OTTIMIZZATA:** (a) layout PDF: sì, un pomeriggio; (b) formattazione: markdown-lite (**grassetto**, *corsivo*, elenchi) con 3 bottoni che inseriscono i marcatori — niente contentEditable, sanitizzazione banale, il PDF li interpreta; (c) foto: SOLO dopo P74/decisione storage (Supabase Storage, mai base64 nel blob) — congelata con motivazione scritta.
**SCHEDA:** Stato: Da fare (a+b); foto congelata · Priorità: Bassa · C: 2 | I: 2 | R: 1 (a+b) · Modello: Sonnet (Media) · Autonomia: L1.

### P99 — Grafici InBody (dimensioni/uniformità)
**L'APPROCCIO ORIGINARIO:** grafici più compatti su desktop, uniformi su mobile; servono screenshot.
**LA CRITICA DEL CTO:** senza gli screenshot è un desiderio, non un task. E "uniformare" spesso significa solo: stesse opzioni Chart.js condivise invece di 4 config copiate.
**LA SOLUZIONE OTTIMIZZATA:** con gli screenshot: definire UNA config base (`CHART_BASE`) + override minimi per G1-G4; container con aspect-ratio responsive. Mezza sessione.
**SCHEDA:** Stato: **Da verificare** (materiale) · Priorità: Bassa · C: 2 | I: 2 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P100 — Grasso viscerale: parser
**L'APPROCCIO ORIGINARIO:** rivedere l'estrazione nei casi in cui fallisce o è ambigua (livello vs area).
**LA CRITICA DEL CTO:** l'ambiguità livello (1-20) vs area (cm²) non è un bug del parser: è **assenza di contratto sul campo**. Finché `p.viscerale` non dichiara l'unità, ogni fix è un cerotto.
**LA SOLUZIONE OTTIMIZZATA:** definire il contratto (`{valore, unita:'livello'|'cm2'}` o normalizzare sempre a livello con conversione dichiarata); prompt di estrazione aggiornato per chiedere ENTRAMBI se presenti; sanity-check di plausibilità (livello 1-20, area 20-300) → fuori range = campo in staging P63, mai scritto diretto. Servono i 2-3 referti reali che falliscono.
**SCHEDA:** Stato: **Da verificare** (referti) · Priorità: Media se confermato · C: 2 | I: 3 | R: 2 · Modello: Fable (Alto) per il contratto, Sonnet per il prompt · Autonomia: L0.

### P101 — Referti non-InBody
**L'APPROCCIO ORIGINARIO:** prompt più generico + mappatura campi; provare prima un referto reale.
**LA CRITICA DEL CTO:** giusta la prova-prima. Il rischio vero è il **falso amico**: una bilancia diversa che riporta "massa grassa" segmentale con metodo non confrontabile → trend misti InBody/altro che mentono.
**LA SOLUZIONE OTTIMIZZATA:** dopo il test reale: prompt con sinonimi campo + unità normalizzate; salvare `misurazione.fonte:'inbody'|'altro:<marca>'`; i grafici storici segnalano il cambio fonte (linea tratteggiata/badge) invece di fondere in silenzio. P63 prima: il diff rende visibile cosa è stato estratto.
**SCHEDA:** Stato: **Da verificare** (referto) · Priorità: Media pre-vendita · C: 3 | I: 3 | R: 3 (dati clinici misti) · Modello: Fable (Alto) · Autonomia: L0.

---

# TRIGGER

### P38 — Ghiaccioli della salute
**Sintesi:** concetto educativo + routine stagionale. **Critica:** è contenuto, non codice; la "routine stagionale automatica" riusi getStagioneCorrente (BLOCCO 17) — niente logica nuova. **Soluzione:** al trigger, 1h contenuti + un flag stagione sulla routine. **Componenti:** dati. **SCHEDA:** Da fare (trigger) · Bassa · C1|I1|R1 · Sonnet (Bassa) · L1.

### P39 — Template keto nell'editor ROT
**Sintesi:** 1-2 modelli keto a mano, zero codice, al primo paziente keto. **Critica:** perfetta così — l'unica nota: salvarli con nome-versione ("KETO-base-v1") così P47 potrà evolverli senza ambiguità. **Componenti:** dati. **SCHEDA:** Da fare (trigger) · Bassa · C1|I2|R0 · nessun modello · L1.

### P40 — Passi giornalieri + storico
**Sintesi:** campo passi + grafico al trigger smartwatch. **Critica:** non creare l'ennesima serie storica ad hoc: nasce già nella forma misurazioni-per-data (come pesiIntermedi), sparkline riusata da P35. **Componenti:** dati+frontend. **SCHEDA:** Da fare (trigger) · Bassa · C1|I2|R1 · Sonnet (Bassa) · L1.

### P41 — Link paziente Fase 1
**Sintesi:** token univoco, piano sola-lettura mobile. **Critica del CTO:** la versione "pagina statica con token nell'URL" è **inaccettabile per dati sanitari**: il link inoltrato/loggato è il dato. E richiede comunque P70 (escaping) sul rendering. **Soluzione:** farla POST-P66: Edge Function `piano/:token` con token firmato, scadenza e revoca, `noindex`, rendering server-lite o client con escaping; il medico genera/revoca dal paziente. I concetti in vista paziente entrano qui. **Componenti:** Edge + Frontend. **SCHEDA:** Da fare (trigger) · Media · C3|I4|R3 · Fable (Alto) · **L0**.

### P42 — Offline con coda
**Sintesi:** coda locale al trigger connessione instabile. **Critica:** con P68 chiuso (9 lug 2026), `window._dirtyIds` È il dirty-set — vive in memoria, non persistito tra reload (se il browser si chiude a metà flush, l'id sporco si perde ma il dato è già salvo in localStorage via saveLocal: ritardo nel push cloud, non perdita dato). Manca ancora: (1) persistenza del set stesso su reload, (2) retry con backoff esponenziale sugli id falliti (oggi restano nel set ma solo un nuovo `save(id)` o una sincronizzazione manuale li ritenta), (3) indicatore "N modifiche in attesa" in UI. Con P69 chiuso (9 lug 2026) il rilevamento conflitti multi-dispositivo copre già il caso "due dispositivi offline poi online insieme"; questa voce resta comunque utile per l'esperienza offline (nessun dato perso, solo latenza di sync). **Soluzione:** persistere `_dirtyIds` in localStorage, retry esponenziale sul flush fallito, badge di stato. **Componenti:** sync. **SCHEDA:** Da fare (trigger) · Bassa · C2|I3|R2 · Sonnet (Media) · L1.

---

# LONG-TERM

### P47 — Keto avanzato
**Sintesi:** template dai piani keto storici + reintroduzione carbo a step. **Critica:** dipende da P48 (i piani vanno prima digitalizzati) — la roadmap non lo dice; la reintroduzione a step è un PRESET SEQUENZIALE: modellarla come serie di preset P3 (Sett.1-2, 3-4…) applicati a piani successivi, non come motore nuovo. **Componenti:** contenuti + P3. **SCHEDA:** Da fare (15+ pazienti keto) · Bassa · C3|I3|R2 · Fable (Alto) · L2.

### P48 — Storico piani (400+ PDF)
**Sintesi:** caricare i piani storici; doppio uso storia clinica + "training" del generatore. **Critica:** "training" è la parola sbagliata e va corretta prima che generi aspettative: niente fine-tuning; l'uso reale è **retrieval few-shot** (piani simili per profilo → esempi nel prompt) e statistiche. E la pipeline è LA STESSA di P37: costruirne due sarebbe assurdo. **Soluzione:** riuso pipeline P37 (staging+review) con target `piani{origin:'archivio'}`; il retrieval arriva dopo, come esperimento misurabile su P66 (costi tracciati). Prerequisito: P71-G1/G3 (volume). **Componenti:** AI+DB. **SCHEDA:** Da fare · Bassa · C4|I3|R2 · Fable (Alto) · L1.

### P49 — Refactor qualità codice
**Sintesi:** funzioni centralizzate, debounce, globals→NG. **Critica:** `calcolaTargetMacros centralizzata` = P55/getTargetAttivi: NON aspettare il long-term per quella (è già nel Blocco A). Il resto senza P78 è pericolo gratuito. **Soluzione:** assorbire la parte target in P55 (fatto sopra); il resto diventa il "riscaldamento" di P102, stessa disciplina (test verdi prima/dopo). **SCHEDA:** Da fare · Bassa · C3|I3|R3 · Sonnet dopo piano Fable · L1.

### P102 — Modularizzazione incrementale
**Sintesi:** ES modules per aree, un'area alla volta, P78 obbligatoria. **Critica:** giusta; l'unico inganno è l'ordine "costanti prima": psicologicamente facile, ma il valore sta nell'isolare PDF e sync (le aree che cambiano di più). E i 357 handler inline vanno convertiti in delega eventi DURANTE l'estrazione di ogni area, non "poi" (sennò i moduli restano incatenati a window). **Soluzione:** ordine per valore: pdf → sync → generatore → dati; per area: estrai + delega eventi + test; build minimale (esbuild) solo quando serve il primo import. **SCHEDA:** Da fare (post P66/P74) · Media · C5|I4|R4 · Fable (Massimo) piano, Sonnet esecuzione · L0 sul piano, L1 sull'esecuzione.

### P50 — App paziente Fasi 2-3
**Sintesi:** prenotazione autonoma, poi app completa. **Critica:** qui si paga la decisione P85: la tenancy paziente (auth, RLS a due ruoli, consensi propri) va progettata UNA volta, qui — P41 e il diario devono confluirvi, non precederla con scorciatoie. **Soluzione:** al trigger, iniziare dal modello di identità/permessi (documento), non dalle feature. **SCHEDA:** Da fare (15-20 pazienti) · Bassa oggi · C5|I4|R4 · Fable (Massimo) · L2.

### P51 — Infrastruttura Vercel
**Sintesi:** hosting alternativo. **Critica:** non è una voce autonoma: è la variabile della decisione P65 (vedi). Tenerla aperta separatamente = decidere due volte. **Soluzione:** si chiude DENTRO P65 con la matrice (privato+functions+preview vs status quo). **SCHEDA:** Da verificare (decisione con P65) · Media · C2|I3|R2 · — · L2.

### P52 — Instagram + FitChef
**Sintesi:** strategia contenuti. **Critica:** fuori dal codice; unico aggancio tecnico utile: i reel "ricette dal DB" diventano quasi gratis se P37 popola il ricettario e il seed P89 fornisce screenshot puliti. **SCHEDA:** Da fare (business) · Bassa · C—|I—|R— · — · L2.

### P53 — Vendita SaaS
**Sintesi:** pricing, EULA, GDPR, MDR, dipendenze tecniche aggiornate. **Critica:** un punto sottovalutato: **MDR dipende dal wording**. "Il software genera e VERIFICA CLINICAMENTE il piano" (claim proposto) avvicina il prodotto al perimetro dispositivo medico; "supporta il professionista, che decide" lo allontana. P73 e il copy di P52/P53 vanno scritti CON il consulente regolatorio, presto e una volta sola. **Soluzione:** checklist di lancio ordinata: P66→P67→P75→P79→P89, consulente MDR alla definizione del claim. **SCHEDA:** Da fare · Alta (come programma) · C—|I5|R4 · Fable (Alto) per i materiali tecnici · L0 su testi legali/claim.

### P103 — Percorso societario e fondi
**Sintesi:** forma societaria, limiti dipendente pubblico, bandi. **Critica:** il vincolo "dipendente pubblico" è il gate di TUTTO P53: va sciolto per primo, dal professionista giusto (non da un LLM). **Soluzione:** primo appuntamento consulente; Claude prepara solo il one-pager del progetto per il commercialista. **SCHEDA:** Da fare (con P53) · Media · — · L0.

### P104 — Ecosistema multi-app
**Sintesi:** visione app multiple coordinate. **Critica:** oggi è una slide, e va bene così; l'unico output utile ora è il **principio d'interfaccia**: tutto ciò che il paziente vedrà (P41, P84-share, P86) nasce già come "contenuto pubblicabile" (dati serializzabili, niente dipendenze dal DOM del gestionale). **SCHEDA:** Da fare (discussione a P50) · Bassa · — · L2.

---

# VALUTAZIONI APERTE — verdetti del CTO

- **Ricette fit (#2):** non cancellare, ARCHIVIARE: tag `archiviata` + filtro default che le nasconde. Cancellare dati per fare ordine è sempre la scelta sbagliata. → 20 min dentro P82/P80.
- **"Test da sforzo" (#17):** tagliare. Nessuno ha saputo dire cosa sia in tre roadmap: se una voce non sopravvive alla domanda "che problema risolve?", non merita la quarta.
- **Posizionamento (#18):** adottare il claim in forma MDR-safe: *"il gestionale che genera il piano con l'AI **e lo verifica contro il profilo clinico del paziente, sotto il controllo del professionista**"*. Diventa vero il giorno in cui P61 va live — che è un altro motivo per farla per prima.
- **Posizione competitiva esplicita (C3 della revisione Fable 5) ⚠️ DA RIVALUTARE (aggiunta dopo):** NutriGest non compete con Practice Better/That Clean Life sulla gestione dello studio (agenda, fatturazione, telehealth — terreno dove perderebbe), ma su profondità clinica + generazione AI verificata. Conseguenza dichiarata: NON inseguire feature-parity gestionale; integrare dove serve (es. export calendario) e concentrare lo sforzo sul core clinico. Non era stata portata nella prima fusione Fable5→Roadmap come posizione strategica a sé (solo il lato claim/MDR era stato recepito sopra) — riportata qui per essere ridiscussa insieme al posizionamento quando si arriva a P52/P53, non prima.

---

## CHIUSURA — le 5 cose che cambierei domattina

> **Stato (8 lug):** il punto 1 (P78) è chiuso; i punti 2-5 restano validi.

1. **P78 prima di tutto** (mezza giornata): senza rete, ogni voce clinica è un salto senza corda.
2. **Tombstone dentro P64**: il bug di resurrezione è il più grave non scritto in nessun documento.
3. **P55 come refactor (getTargetAttivi), non come banner**: un'ora in più oggi, una classe di bug in meno per sempre.
4. **P90 riprogettata come componente unico** ingredienti/celle: è il gesto più frequente dell'app e oggi ha due implementazioni, di cui una a textarea.
5. **Le decisioni-lampo da 10-30 minuti** (P65/P51 hosting, P67-T1 region UE, P71-G1 gauge, P96 screenshot): quattro incertezze che evaporano in un'ora totale.

## Scoperte tecniche chiave (da non dimenticare)

1. **FX / generatore sono 2 cose diverse** (dal 25 giu 2026, P16, commit 84e776a). `avviaFX` (max_tokens 1400) = UNA chiamata che produce in un solo output la scheda macro+composizione+parere (ex-F1) **e** i flag clinici (ex-F3); il contesto (costruisciContestoPaziente) viaggia una volta sola. Prima erano due chiamate parallele F1(900)+F3(450) con contesto duplicato (Promise.allSettled). Il **piano alimentare** resta una chiamata **separata** (chiamaGeneraPiano → costruisciPrompt, max_tokens 12000).
2. **Il vero buco del P20** era il **generatore del piano** (costruisciPrompt), che ignorava emotivo/farmaci/patologie/analisi — NON F1/F3. ✅ Risolto.
3. **Input duplicato (P16) — RISOLTO 25 giu 2026 (84e776a):** F1 e F3 inviavano lo stesso contesto due volte; ora `avviaFX` lo invia una sola volta. Risparmio sull'input, output invariato.
4. **Cache piano (90gg) + hash deterministico:** difesa token principale, da preservare ESATTAMENTE.
5. **Nomi alimenti regole** devono combaciare esatti con le chiavi DB (`trovaChiaveAlimento`) o sono ignorati in silenzio.
6. **6 stati colore automatici** (grigioScuro, celeste, grigio_scuro_1/2, celeste_1/2) NON sono scelte del medico. Solo si/verde/arancione/rosso sono manuali.
7. **P26 ✅ COMPLETATO 25 giu 2026 (c9fab21):** l'ancora finale NON è "TARGET MEDICO" nell'output FX, ma "TARGET FINALE" nel riassunto post-raffinamento (`_ragRiassunto`) — necessario perché il riassunto incorpora eventuali correzioni della chat. Stesso fix applicato anche al fallback del generatore (bug gemello non previsto inizialmente).
8. **Twemoji 14.0.2 (P23-bis):** i codepoint emoji con variation selector (`-fe0f`) esistono su Twemoji solo per varianti con tono di pelle o genere specifico. Il file base è il codepoint nudo (`1f3cb.png`). Verificare sempre contro il catalogo reale — un 404 silenzioso non genera errore, semplicemente l'emoji non compare.
9. **jsPDF `doc.text(..., {baseline:'middle'})`** è più robusto di un offset empirico per centrare verticalmente testo rispetto a elementi disegnati sulla stessa riga — da preferire nel PDF.
10. **Popup costruiti a mano con `position:fixed` proprio sono invisibili a qualsiasi bonifica centralizzata basata su `.overlay`/`.modal`.** Nell'app esistono 4 popup così (`popup-add-cat`, `popup-add-alt`, `popup-ric`, `popup-ricetta-composta`). **Regola:** ogni nuovo popup riusa `.overlay`/`.modal` standard o va registrato negli helper `ngChiudiModale`/`ngChiudiPopupCoppia`.
11. **Pattern bug "reset di stato senza aggiornare la UI dipendente" (P27):** ogni volta che si resetta una variabile di stato globale, verificare se esiste una funzione "render label/UI" dipendente e chiamarla subito dopo.
12. **Pattern bug "chiave scritta con un nome, letta con un altro" (fix NaN grassi):** quando due strutture dati rappresentano lo stesso concetto con chiavi diverse (`g100` vs `g`), il punto di conversione è dove i refusi si nascondono per mesi — audit mirato ogni volta che si tocca quel ponte.
13. **Pattern "calcolo parallelo duplicato che diverge dalla logica reale" (P34):** quando una UI "di anteprima" ricalcola dati che un'altra funzione userà per l'azione vera, farla puntare alla STESSA funzione sorgente (helper unico `_setupPianoTargets`), mai una copia locale.
14. **Gli id dei checkbox patologie/allergie/speciali sono CONDIVISI** tra campo testuale legacy e `checkSemaforo` (BLOCCO 17, commit 5a0721f): ogni nuova UI che tocca quei checkbox deve rispettare l'ordine "prima setXFromStr, poi checkSemaforo" e il merge in `salvaPaz` — dettaglio nel Contesto (STRUTTURA DATI → p.checkSemaforo).
15. **I Pointer Events non sono simulabili in jsdom** (barra giorni BLOCCO 16, riordino ricette BLOCCO 17): i drag&drop si verificano SOLO a mano in browser, su desktop e iPhone.
16. **parseJSONSicuro "ripara" chiudendo le parentesi** (revisione Fable 5): riparazione cosmetica invariata; dal 7 lug 2026 P62 aggiunge un confronto STRUTTURALE (giorni/pasti attesi vs ottenuti) sopra questa riparazione. Dal 7 lug 2026 (sessione serale, commit 676927e) **P77 ha sostituito il percorso primario** con tool-use/JSON schema vincolato (garanzia strutturale a monte); parseJSONSicuro resta attivo SOLO sul ramo di fallback legacy, previsto per la settimana di campo — da rimuovere insieme al blocco FORMATO OUTPUT del prompt nel commit di chiusura fallback.

---

## Principi operativi

- **Una modifica alla volta**, spiegata riga per riga prima di eseguire.
- **Prima di ogni modifica, dichiarare modello/effort consigliato** (vedi "Guida modello/effort" in apertura).
- Codice sempre da GitHub main a inizio sessione (mai chiedere upload).
- Modifiche delicate (dati pazienti, prompt AI, salvataggio) → passaggio dedicato verificato.
- Commit: blocco unico copia-incollabile su una riga.
- "Last save wins by timestamp" → ora **tra TDEE e FX**.
- Cache 90gg e hash deterministico: preservare esattamente.
- Nomi alimenti nelle regole: match esatto col DB.
- **Aggiornare i file (roadmap + contesto) solo a modifica chiusa e testata** — e sempre secondo la REGOLA FONDAMENTALE in testa: la voce esce da qui ed entra nel Contesto nello stesso momento.
- **Modifiche di rendering/layout estese:** dopo l'implementazione, verificare con un test di rendering reale (jsPDF in Node o equivalente) prima del commit — soprattutto quando più funzioni annidate condividono un fattore di scala.
- **Lavoro da due computer:** `git pull` sempre prima di iniziare; idealmente un dispositivo alla volta (fine sessione → push → cambio). Il punto debole storico era il push parallelo senza sync nel mezzo — da P69 (chiusa 9 lug 2026) è visibile anche a livello dati, con dialogo di risoluzione invece di sovrascritture silenziose.

### Procedura "una chat per sessione di lavoro" (introdotta 22 giugno 2026)

> Obiettivo: chat brevi (meno token, più gestibili) con roadmap+contesto come unica memoria persistente tra una chat e l'altra.

1. **Dentro la chat:** si lavora normalmente, una modifica alla volta, commit Git ad ogni feature completata (come da regole d'oro nel contesto).
2. **A fine sessione**, Fabrizio chiede esplicitamente l'aggiornamento di roadmap + contesto. Claude:
   - riparte dalla versione di roadmap/contesto già presente nel project knowledge (non da zero, non rigenerando tutto);
   - applica **solo le modifiche puntuali** relative a quanto fatto in quella sessione, con `str_replace` — mai una riscrittura integrale del documento;
   - **include sempre il numero di commit Git** di ogni modifica descritta, così la chat successiva può verificare con certezza, scaricando da GitHub main, che il codice corrisponda a quanto dichiarato;
   - applica la REGOLA FONDAMENTALE: voce rimossa da qui = funzionalità inserita nel Contesto, nello stesso aggiornamento.
3. **Fabrizio scarica entrambi i file aggiornati e li salva in DUE posti:** Desktop (copia di lavoro) e **project knowledge** (sovrascrivendo — passo obbligatorio: la chat successiva legge solo da lì).
4. Fabrizio può cancellare la chat appena chiusa: nulla si perde, roadmap e contesto ne contengono già la sintesi completa con riferimento al commit.
5. **Nuova chat:** Claude legge la versione fresca di roadmap+contesto dal project knowledge e riparte da lì; se serve, verifica lo stato reale scaricando da GitHub main e confrontando col commit citato.

**Punto debole conosciuto:** se al passo 3 il ricaricamento nel progetto viene saltato, la chat successiva riparte da file vecchi e le modifiche "non esistono" per Claude finché non vengono raccontate di nuovo.

---

## Materiali che Fabrizio invierà al momento

- **P99 (ex P22-materiale):** screenshot InBody (grafici da migliorare).
- **P4:** questionario anamnesi originale.
- **P100:** 2-3 referti in cui il grasso viscerale viene letto male.
- **P101:** un referto di bilancia non-InBody per il primo test di compatibilità.

---

# ARCHIVIO — ragionamento CTO delle voci chiuse

> Voci completate per intero e uscite dalla pianificazione attiva (REGOLA FONDAMENTALE). Il ragionamento CTO originale è conservato qui perché "c'è SEMPRE un modo di sapere perché è stata presa una decisione". Lo stato del codice, i commit e le note di sessione sono nel CHANGELOG e nel Contesto.

### P61 — Validatore clinico post-generazione AI
**L'APPROCCIO ORIGINARIO:** dopo il parsing, scorrere celle e righe testuali contro allergie / alimenti rossi / esclusi; esito a 3 livelli (blocco/avviso/nota); pannello pre-salvataggio; riuso `NOMI_CANONICI`, `trovaChiaveAlimento`, semaforo.
**LA CRITICA DEL CTO:** l'impianto è giusto ma ha due buchi. (1) **Il problema vero non sono le celle, sono le righe testuali**: "Vellutata di zucca con crostini e semi" non matcha nessuna chiave DB — se il validatore salta ciò che non riconosce, dà un falso senso di sicurezza proprio dove il rischio è massimo. (2) Validare "post-generazione" è troppo tardi e troppo poco: il piano viene modificato a mano dopo (griglia, drag&drop, Pesca ricetta) e ogni modifica può reintrodurre un allergene. Un pannello una-tantum diventa teatro della sicurezza.
**LA SOLUZIONE OTTIMIZZATA:** una funzione pura `validaPiano(piano, p) → {violazioni[], copertura}` con **tre esiti per elemento**: conforme / violazione (tipo+gravità) / **non verificabile**. Le righe testuali passano da `_ngScomponiIngredienti` (già esiste, P33) per estrarre ingredienti e validare quelli; i token non riconosciuti alimentano il contatore di copertura, mostrato sempre ("verificati 31/36 elementi — 5 non verificabili"). La funzione gira: (a) post-generazione, (b) a ogni mutazione del piano (chiamata già centralizzata in `_aggiornaPianoBox`), (c) come gate prima di `generaPDF` e del salvataggio. Badge permanente sul piano (verde/giallo/rosso), pannello dettagli on-click con "vai alla cella". Allergene = blocco PDF con override esplicito motivato (registrato nel piano).
**FOCUS COMPONENTI COINVOLTI:** Frontend only (nessun DB, nessuna AI). Punti di innesto: `chiamaGeneraPiano` (post-parse), `_aggiornaPianoBox`, `generaPDF`. Zero nuove strutture: legge `p.checkSemaforo`, regole semaforo, esclusioni esistenti.
**SCHEDA:** Stato: Da fare · Priorità: Alta (CRITICA) · C: 3 | I: 5 | R: 2 · Modello: Fable 5 (Ragionamento Attivo Alto) per la funzione + golden test; Sonnet (Media) per il pannello UI · Autonomia: **L0** sul motore, L1 sulla UI.

### P62 — Stop all'accettazione silenziosa di piani troncati
**L'APPROCCIO ORIGINARIO:** controllare `stop_reason`, distinguere riparazione cosmetica da troncamento sostanziale in `parseJSONSicuro`, log giorni/pasti attesi vs ottenuti.
**LA CRITICA DEL CTO:** corretto ma difensivo: cura il sintomo di un contratto debole (testo libero + riparazione). E "avvisa e rigenera tutto" butta via i giorni buoni già pagati in token.
**LA SOLUZIONE OTTIMIZZATA:** (1) `stop_reason==='max_tokens'` → mai salvare in silenzio; (2) confronto strutturale atteso/ottenuto (giorni richiesti, pasti attivi per giorno); (3) **rigenerazione delta**: se mancano i giorni 6-7, si richiedono SOLO quelli (il prompt già costruisce per-giorno) e si fondono — costo minimo, UX migliore; (4) persistere `stop_reason` + `usage` nel meta del piano (osservabilità, utile a P66 per i quota). La riparazione di `parseJSONSicuro` resta solo per virgole/spazi, mai per strutture mancanti. **Nota di sequenza:** se si fa P77 nello stesso blocco, metà di questa voce evapora (lo schema garantisce la struttura) — eseguirle insieme.
**FOCUS COMPONENTI COINVOLTI:** Frontend (parser + flusso generazione). AI Layer solo per la chiamata delta (riuso `chiamaGeneraPiano` con subset giorni).
**SCHEDA:** Stato: Da fare · Priorità: Alta · C: 2 | I: 4 | R: 2 · Modello: Sonnet (Media); Fable se accorpata a P77 · Autonomia: L1.

### P77 — Output strutturato per la generazione piani
**L'APPROCCIO ORIGINARIO:** tool-use/JSON schema vincolato per il piano; validazione dello schema al ricevimento; meglio dopo P66.
**LA CRITICA DEL CTO:** giusto, con tre impatti nascosti non dichiarati: (1) **la cache 90gg**: se l'hash include il prompt e il prompt cambia, tutta la cache invalida in un colpo → picco di costi una-tantum da mettere in conto (o hash-versioning per convivenza); (2) lo schema costa token di input a ogni chiamata — misurare prima/dopo; (3) i campi "liberi" (nomi ricetta, note) restano liberi anche nello schema: P61 resta necessario, P77 non lo sostituisce.
**LA SOLUZIONE OTTIMIZZATA:** schema versionato (`schemaVersion` nel meta piano), definito UNA volta e condiviso col validatore P61 (stessa forma = validazione banale); periodo di doppio parser (schema-first, fallback legacy) per una settimana di campo; `max_tokens` dimensionato dinamicamente sui giorni richiesti. **Eseguire nello stesso blocco di P62**: sono la stessa superficie, metà del lavoro si fonde.
**FOCUS COMPONENTI COINVOLTI:** AI Layer (contratto), Frontend (parser), cache (strategia hash).
**SCHEDA:** Stato: Da fare · Priorità: Media (Alta se accorpata a P62) · C: 3 | I: 4 | R: 3 (cache/costi) · Modello: Fable 5 (Alto) · Autonomia: L0 sul contratto.

### P78 — Suite test automatica minima
**L'APPROCCIO ORIGINARIO:** consolidare l'harness jsdom/Node in `npm test` con casi su funzioni critiche.
**LA CRITICA DEL CTO:** classificarla MEDIA è l'errore di priorità più costoso della roadmap (vedi F2). E "locale" non basta: il valore è il gate automatico.
**LA SOLUZIONE OTTIMIZZATA:** tre strati in mezza giornata: (S1) smoke: lo script estratto da index.html si carica in JSDOM senza ReferenceError — il test anti-febf056; (S2) unit sui puri: getValoriCREA, NOMI_CANONICI/trovaChiaveAlimento, _ngScomponiIngredienti, parseJSONSicuro, semaforo, getTargetAttivi (P55), validaPiano (P61, golden set di piani con violazioni note); (S3) render smoke jsPDF headless (un giorno-tipo → nessuna eccezione). GitHub Actions su push (2 min). Regola sociale nei Principi: bug clinico trovato = caso di test aggiunto.
**FOCUS COMPONENTI COINVOLTI:** Tooling (repo: /test, workflow). Zero runtime app.
**SCHEDA:** Stato: Da fare · Priorità: **ALTA (per prima)** · C: 2 | I: 5 | R: 1 · Modello: Sonnet (Media) · Autonomia: L1.

### P82 — Alimenti custom: gestione completa ✅ CHIUSA 12 luglio 2026
**L'APPROCCIO ORIGINARIO:** sezione con lista/modifica/duplica/elimina/log; aggiunta rapida dal generatore; verificare se l'eliminazione singola esiste già.
**LA CRITICA DEL CTO:** la roadmap ignora il problema serio: **l'identità è il NOME**. Celle, ricette e regole referenziano gli alimenti per stringa: rinominare un custom orfanizza silenziosamente ogni riferimento sparso nei piani. Un "edit" ingenuo è un generatore di bug clinici retroattivi. Il "log delle modifiche" invece è over-engineering: basta un livello di undo.
**LA SOLUZIONE OTTIMIZZATA:** (1) edit VALORI libero (kcal/P/C/G, categoria) — sicuro, i riferimenti restano validi; (2) RINOMINA = operazione dedicata che scandisce piani/ricette/regole e mostra "trovati N riferimenti — aggiorno tutti?" (o mantiene alias vecchio→nuovo in `_ALIMENTI_OVERRIDE_CATEGORIA`-style map); (3) elimina consentito solo a riferimenti zero (altrimenti "usato in…"); (4) `{updated_at, prev}` per undo singolo; (5) il ponte `g100↔g` (Scoperta #12) diventa funzione unica testata in P78; (6) quick-add dal generatore riusa il popup categoria/alimento con badge "custom" — **rimandato a sessione Sonnet/UI, non incluso in questa chiusura**.
**FOCUS COMPONENTI COINVOLTI:** Frontend + meta-record `__alimenti_custom` (già sync). Scansione riferimenti = funzione pura testabile.
**SCHEDA:** Modello: Fable 5 (Alto) per identità/rename/delete · Autonomia: L0.
**ESITO REALE E CHIUSURA:** implementata con `scanRiferimentiAlimento()` (funzione pura: cerca il nome in celle piano con match esatto, righe testuali con regex a confini di parola/accentate, ingredienti ricette, chiavi semaforo profili paziente). 🏷 Rinomina scandisce e chiede conferma col conteggio prima di applicare ovunque (piani, template, piano aperto in editor, ricette, profili) + push mirato. ✕ Eliminazione bloccata a riferimenti >0, mostra dove è usato. ✎ Modifica valori con `{prev, updated_at}` per un undo singolo. Ponte macros unificato in `_alimCustomMacros()`. Commit iniziale `8edc873` (12 lug 2026).
**BUG POST-RILASCIO E FIX (stessa sessione):** dopo il primo test reale, rinomina ed eliminazione non producevano alcun effetto e nessun messaggio. **Causa:** `pianoJSON` nel DB è salvato come **stringa** (`JSON.stringify`), ma `scanRiferimentiAlimento`/`_scanGiorniPerNome` la scandivano come se fosse già un array — `.forEach()` su una stringa lanciava un `TypeError` non gestito, interrotto silenziosamente prima di mostrare qualsiasi `alert`/`confirm`. La ✎ modifica valori funzionava perché non chiama lo scanner (da qui il sintomo "solo la matita funziona"). **Fix:** normalizzatore `_alimGiorniDaPiano()` che parsa la stringa (gestisce anche `{giorni:[...]}` e JSON corrotto → `[]`), usato dallo scanner; la rinomina ri-serializza in stringa dopo la mutazione. Commit fix `8ac585e` (12 lug 2026). Verificato con 16+9 asserzioni Node su funzioni pure estratte (regex a confini di parola, scanner multi-fonte, normalizzatore, crash riprodotto e risolto) e confermato funzionante da Fabrizio in produzione.



Le voci completate NON vivono più in questo file (REGOLA FONDAMENTALE in testa): il dettaglio tecnico di ogni modifica chiusa — commit, motivazioni, root cause — è nel **CHANGELOG.md** (STORICO SESSIONI E COMMIT, spostato dal Contesto l'8 luglio 2026). La vecchia `NutriGest_Roadmap_Modifiche.md` (Roadmap Uno, versione 5 lug 2026) resta conservata sul Desktop come archivio storico di sola consultazione: non va più aggiornata.
