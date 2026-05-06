const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx4s4JpllLc9H34GRCpxi6MVw3tzMJhI_VFeT1qfvko6TJyNmJd2_qws6nCm1oHEemfuA/exec';
const SUPABASE_URL = 'https://zrhmspylnlklppvhgplp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaG1zcHlsbmxrbHBwdmhncGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDA0NDQsImV4cCI6MjA5MzY3NjQ0NH0.imawIV00emURjzLAWyrHdQ0VsRC_3pey4-D-6z8Y5Jg';

async function migra() {
  console.log('📥 Lettura dati da Google Sheets...');
  
  const res = await fetch(SHEETS_URL);
  const db = await res.json();
  
  if (!db.pazienti || !db.pazienti.length) {
    console.error('❌ Nessun paziente trovato in Google Sheets');
    return;
  }
  
  console.log(`✅ Trovati ${db.pazienti.length} pazienti: ${db.pazienti.map(p => p.nome + ' ' + p.cognome).join(', ')}`);
  console.log('📤 Migrazione verso Supabase...');

  // Migra ogni paziente come record separato
  for (const p of db.pazienti) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pazienti`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ id: p.id, data: p })
    });
    
    if (r.ok || r.status === 201 || r.status === 200) {
      console.log(`  ✅ ${p.nome} ${p.cognome}`);
    } else {
      const err = await r.text();
      console.error(`  ❌ ${p.nome} ${p.cognome}: ${err}`);
    }
  }

  // Migra anche le altre collezioni (ricette, eventi, entrate, disponibilita)
  const META_KEY = 'meta_collections';
  const metaData = {
    ricette: db.ricette || [],
    eventi: db.eventi || [],
    entrate: db.entrate || [],
    disponibilita: db.disponibilita || {},
    piani: db.piani || []
  };
  
  const rMeta = await fetch(`${SUPABASE_URL}/rest/v1/pazienti`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify({ id: META_KEY, data: metaData })
  });
  
  if (rMeta.ok || rMeta.status === 201 || rMeta.status === 200) {
    console.log(`  ✅ Collezioni extra (ricette, eventi, entrate, disponibilità)`);
  } else {
    console.error(`  ❌ Collezioni extra: ${await rMeta.text()}`);
  }

  console.log('');
  console.log('🎉 MIGRAZIONE COMPLETATA');
  console.log(`   ${db.pazienti.length} pazienti migrati su Supabase`);
  console.log('   Verifica su: https://supabase.com/dashboard/project/zrhmspylnlklppvhgplp/editor');
}

migra().catch(console.error);