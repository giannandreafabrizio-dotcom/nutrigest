// ═══════════════════════════════════════════════════════════════════════════
// NutriGest — Google Apps Script
// Foglio: https://docs.google.com/spreadsheets/d/1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA
//
// PROPRIETÀ SCRIPT richieste (File → Proprietà progetto → Proprietà script):
//   ANTHROPIC_API_KEY  →  la tua chiave API Anthropic (sk-ant-...)
// ═══════════════════════════════════════════════════════════════════════════

var SHEET_DB    = 'NutriGest';   // foglio che contiene il db JSON principale
var SHEET_PIANI = 'Piani';       // foglio che contiene i piani generati dall'AI
var CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// ─── GET ────────────────────────────────────────────────────────────────────
function doGet(e) {
  var action = e && e.parameter && e.parameter.action ? e.parameter.action : '';

  if (action === 'getPiano') {
    return getPiano(e.parameter.pazienteId || '');
  }

  if (action === 'salvaPiano') {
    var pazId = e.parameter.pazienteId || '';
    var pianoStr = e.parameter.piano || '';
    if (pazId && pianoStr) {
      salvaPiano(pazId, pianoStr);
      return jsonResponse({ ok: true });
    }
    return jsonResponse({ ok: false, error: 'parametri mancanti' });
  }

  // default: restituisce il db completo
  return getDb();
}

// ─── POST ───────────────────────────────────────────────────────────────────
function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents); } catch(err) { body = {}; }

  if (body.action === 'generatePiano') {
    return generatePiano(body.pazienteId || '', body.prompt || '');
  }

  // default: salva il db completo
  return saveDb(body);
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNZIONI PRINCIPALI
// ═══════════════════════════════════════════════════════════════════════════

// Salva l'intero db JSON nel foglio NutriGest (cella A1)
function saveDb(data) {
  try {
    var ss    = SpreadsheetApp.openById('1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA');
    var sheet = ss.getSheetByName(SHEET_DB) || ss.insertSheet(SHEET_DB);
    sheet.getRange('A1').setValue(JSON.stringify(data));
    return jsonResponse({ ok: true });
  } catch(err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

// Restituisce il db JSON dal foglio NutriGest
function getDb() {
  try {
    var ss    = SpreadsheetApp.openById('1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA');
    var sheet = ss.getSheetByName(SHEET_DB);
    if (!sheet) return jsonResponse({});
    var raw = sheet.getRange('A1').getValue();
    var data = raw ? JSON.parse(raw) : {};
    return jsonResponse(data);
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

// Chiama Claude con il prompt ricevuto e salva il piano nel foglio Piani
function generatePiano(pazienteId, prompt) {
  if (!pazienteId || !prompt) {
    return jsonResponse({ ok: false, error: 'pazienteId e prompt sono obbligatori' });
  }

  try {
    var apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY non configurata nelle Proprietà script');

    // Chiamata all'API Anthropic
    var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      }),
      muteHttpExceptions: true
    });

    var result = JSON.parse(response.getContentText());
    if (!result.content || !result.content[0]) {
      throw new Error('Risposta API non valida: ' + response.getContentText());
    }

    var rawText = result.content[0].text.trim();
    // Rimuovi eventuali blocchi markdown ```json ... ```
    var jsonStr = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    // Verifica che sia JSON valido
    JSON.parse(jsonStr); // lancia eccezione se non valido

    // Salva nel foglio Piani
    salvaPiano(pazienteId, jsonStr);

    return jsonResponse({ ok: true });

  } catch(err) {
    // Salva l'errore nel foglio Piani così il GET può restituirlo
    salvaPiano(pazienteId, JSON.stringify({ errore: err.message }));
    return jsonResponse({ ok: false, error: err.message });
  }
}

// Restituisce il piano salvato per un paziente
function getPiano(pazienteId) {
  if (!pazienteId) return jsonResponse({ error: 'pazienteId mancante' });

  try {
    var ss    = SpreadsheetApp.openById('1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA');
    var sheet = ss.getSheetByName(SHEET_PIANI);
    if (!sheet) return jsonResponse({ error: 'Foglio Piani non trovato' });

    var data  = sheet.getDataRange().getValues();
    // Struttura colonne: A=pazienteId, B=timestamp, C=pianoJSON
    for (var i = 1; i < data.length; i++) {  // riga 0 = intestazioni
      if (String(data[i][0]) === String(pazienteId)) {
        var pianoRaw = data[i][2];
        var piano    = pianoRaw ? JSON.parse(pianoRaw) : null;
        return jsonResponse({ piano: piano, timestamp: data[i][1] });
      }
    }
    return jsonResponse({ error: 'Piano non ancora pronto, riprova tra qualche secondo' });

  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNZIONI DI SUPPORTO
// ═══════════════════════════════════════════════════════════════════════════

// Salva o aggiorna una riga nel foglio Piani
function salvaPiano(pazienteId, pianoJsonStr) {
  var ss    = SpreadsheetApp.openById('1zjdPU8JTy8E9ZtXVQO-QM2uwpO1ExhCkdFb9zYhA4QA');
  var sheet = ss.getSheetByName(SHEET_PIANI);

  // Crea il foglio con intestazioni se non esiste
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_PIANI);
    sheet.appendRow(['pazienteId', 'timestamp', 'piano']);
  }

  var timestamp = new Date().toISOString();
  var data      = sheet.getDataRange().getValues();

  // Cerca riga esistente per questo paziente e aggiornala
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(pazienteId)) {
      sheet.getRange(i + 1, 1, 1, 3).setValues([[pazienteId, timestamp, pianoJsonStr]]);
      return;
    }
  }

  // Riga non trovata: aggiunge nuova
  sheet.appendRow([pazienteId, timestamp, pianoJsonStr]);
}

// Risposta JSON con CORS per chiamate da browser
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
