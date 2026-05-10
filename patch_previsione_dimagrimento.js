// patch_previsione_dimagrimento.js
// Aggiunge previsione kg/settimana e stima tempo all'obiettivo nel tab TDEE
// Comando: cd C:\Users\User\Desktop\nutrigest && node patch_previsione_dimagrimento.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const OLD = `      <div class="macro-grid">
        <div class="macro-item"><div class="macro-lbl">Proteine</div><div class="macro-val">\${protG}g</div><div style="font-size:.62rem;color:\${refColor}">\${prot} g/kg · \${kcalProt} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Carboidrati</div><div class="macro-val">\${carbG}g</div><div style="font-size:.62rem;color:var(--text3)">\${(carbG/ref).toFixed(1)} g/kg · \${kcalCarb} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Grassi</div><div class="macro-val">\${grassiG}g</div><div style="font-size:.62rem;color:\${refColor}">\${grassi} g/kg · \${kcalGrassi} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Totale kcal</div><div class="macro-val" style="font-size:.9rem">\${kcalObj}</div><div style="font-size:.62rem;color:var(--text3)">Obiettivo giornaliero</div></div>
      </div>
    </div>\`;`;

const NEW = `      <div class="macro-grid">
        <div class="macro-item"><div class="macro-lbl">Proteine</div><div class="macro-val">\${protG}g</div><div style="font-size:.62rem;color:\${refColor}">\${prot} g/kg · \${kcalProt} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Carboidrati</div><div class="macro-val">\${carbG}g</div><div style="font-size:.62rem;color:var(--text3)">\${(carbG/ref).toFixed(1)} g/kg · \${kcalCarb} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Grassi</div><div class="macro-val">\${grassiG}g</div><div style="font-size:.62rem;color:\${refColor}">\${grassi} g/kg · \${kcalGrassi} kcal</div></div>
        <div class="macro-item"><div class="macro-lbl">Totale kcal</div><div class="macro-val" style="font-size:.9rem">\${kcalObj}</div><div style="font-size:.62rem;color:var(--text3)">Obiettivo giornaliero</div></div>
      </div>
      \${(()=>{
        if(obj===0)return '<div style="margin-top:.8rem;padding:.6rem .9rem;background:var(--bg2);border:1px solid var(--border);border-radius:8px;font-size:.78rem;color:var(--text2)"><strong>Normocalorico</strong> — nessuna variazione di peso prevista. Obiettivo: mantenimento della composizione corporea attuale.</div>';
        const kgSett=Math.round(Math.abs(obj)/7700*7*100)/100;
        const segno=obj<0?'−':'+';
        const verbo=obj<0?'dimagrimento previsto':'aumento di peso previsto';
        const colBg=obj<0?'#f0fdf4':'#eff6ff';
        const colBorder=obj<0?'#86efac':'#93c5fd';
        const colText=obj<0?'#166534':'#1e40af';
        const colAccent=obj<0?'#16a34a':'#2563eb';
        const zona=kgSett<=0.3?'molto lenta':kgSett<=0.5?'lenta (ideale mantenimento)':kgSett<=1.0?'ottimale ✓':kgSett<=1.5?'rapida (monitorare)':'aggressiva ⚠';
        const kgMese=Math.round(Math.abs(obj)*30/7700*10)/10;
        const pesoAttualeVal=peso||null;
        const pesoTargetVal=parseFloat(document.getElementById?.('mac-peso-target')?.value)||null;
        let previsione='';
        if(pesoAttualeVal&&pesoTargetVal){
          const kgDiff=obj<0?(pesoAttualeVal-pesoTargetVal):(pesoTargetVal-pesoAttualeVal);
          if(kgDiff>0&&kgSett>0){
            const settNec=Math.round(kgDiff/kgSett);
            const mesiApprox=Math.round(settNec/4.3*10)/10;
            const dataArrivo=new Date();dataArrivo.setDate(dataArrivo.getDate()+settNec*7);
            const mn=['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
            const dataStr=dataArrivo.getDate()+' '+mn[dataArrivo.getMonth()]+' '+dataArrivo.getFullYear();
            const colObi=obj<0?'#16a34a':'#2563eb';
            const bgObi=obj<0?'rgba(22,163,74,.08)':'rgba(37,99,235,.08)';
            const bordObi=obj<0?'#16a34a':'#2563eb';
            previsione=\`<div style="margin-top:.55rem;padding:.45rem .7rem;background:\${bgObi};border-left:3px solid \${bordObi};border-radius:0 6px 6px 0;font-size:.74rem;color:\${colObi}">
              🎯 <strong>Obiettivo \${pesoTargetVal} kg</strong> — mancano <strong>\${Math.round(kgDiff*10)/10} kg</strong> · stima <strong>\${settNec} settimane</strong> (~\${mesiApprox} mesi) · arrivo indicativo: <strong>\${dataStr}</strong>
              <div style="font-size:.66rem;color:#6b7280;margin-top:2px">Stima lineare — rivalutare a ogni controllo</div>
            </div>\`;
          }
        }
        return \`<div style="margin-top:.8rem;padding:.7rem 1rem;background:\${colBg};border:1px solid \${colBorder};border-radius:8px;">
          <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-bottom:.3rem">
            <strong style="font-size:.92rem;color:\${colAccent}">\${segno}\${kgSett} kg/settimana</strong>
            <span style="font-size:.75rem;color:\${colText}">\${verbo}</span>
            <span style="margin-left:auto;font-size:.68rem;color:#6b7280">\${Math.abs(obj)} kcal/giorno di \${obj<0?'deficit':'surplus'}</span>
          </div>
          <div style="display:flex;gap:1.2rem;font-size:.72rem;color:\${colText};flex-wrap:wrap">
            <span>📅 ~<strong>\${kgMese} kg/mese</strong></span>
            <span>⚡ Ritmo: <strong>\${zona}</strong></span>
          </div>
          \${previsione}
        </div>\`;
      })()}
    </div>\`;`;

if (!html.includes(OLD)) {
  console.error('ERRORE: testo da sostituire non trovato. Il file potrebbe essere diverso dalla versione attesa.');
  process.exit(1);
}

html = html.replace(OLD, NEW);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Patch applicata con successo!');
console.log('  Previsione kg/settimana aggiunta nel tab TDEE');
console.log('  Stima tempo obiettivo con data indicativa');
console.log('');
console.log('Prossimo passo:');
console.log('  git add . && git commit -m "feat: previsione kg/settimana e tempo obiettivo nel tab TDEE" && git push');
