// patch_grafici_inbody_v3_final.js
// Applica i grafici InBody v3 finali partendo da ae9cfa7
// G1: composizione corporea + traiettoria ideale
// G2: cintura/fianchi + viscerale (senza gauge)
// G3: ritmo grasso vs muscolo per periodo con zone colore
// G4: composizione a barre impilate
// Comando: cd C:\Users\User\Desktop\nutrigest && node patch_grafici_inbody_v3_final.js

const fs = require('fs');
const path = require('path');
const filePath = process.argv[2] || path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Applica prima la patch v3 HTML+Chart (da ae9cfa7 → v3)

// Verifica versione file
if (!html.includes('GRAFICI INBODY MIGLIORATI')) {
  console.error('ERRORE: versione file non riconosciuta. Assicurati di usare il file dopo il commit ae9cfa7.');
  process.exit(1);
}

// ── STEP 1: sostituisci blocco HTML ─────────────────────────────────────────
const MARKER_HTML_START = '  // ── GRAFICI INBODY MIGLIORATI ────────────────────────────────────────────';
const MARKER_HTML_END   = '\n\n  // ── Cards singole misurazioni ─────────────────────────────────────────────';
const idxStart = html.indexOf(MARKER_HTML_START);
const idxEnd   = html.indexOf(MARKER_HTML_END);
if (idxStart === -1 || idxEnd === -1) {
  console.error('ERRORE: marker HTML non trovati nel file.');
  process.exit(1);
}

const NEW_HTML = `  // ── GRAFICI INBODY v3 FINALE ─────────────────────────────────────────────
  if(hasMulti){
    const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
    const pesoTarget=p.pesoTarget||null;

    // G1 — Composizione corporea + traiettoria ideale
    const dP1=sorted.map(ib=>ib.peso||null);
    const dG1=sorted.map(ib=>ib.g||(ib.peso&&ib.pg?+(ib.peso*ib.pg/100).toFixed(1):null));
    const dM1=sorted.map(ib=>ib.musc||null);
    const kpiP=dP1[dP1.length-1]&&dP1[0]?Math.round((dP1[dP1.length-1]-dP1[0])*10)/10:null;
    const kpiG=dG1[dG1.length-1]&&dG1[0]?Math.round((dG1[dG1.length-1]-dG1[0])*10)/10:null;
    const kpiM=dM1[dM1.length-1]&&dM1[0]?Math.round((dM1[dM1.length-1]-dM1[0])*10)/10:null;
    const ds1=[
      {label:'Peso',data:dP1,borderColor:'#888780',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#888780',borderWidth:2.5,fill:false},
      {label:'Grasso',data:dG1,borderColor:'#E24B4A',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#E24B4A',borderWidth:2,fill:false},
      {label:'Muscolo',data:dM1,borderColor:'#1D9E75',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#1D9E75',borderWidth:2,fill:false}
    ];
    if(pesoTarget&&dP1[0]){
      const sl=(pesoTarget-dP1[0])/(sorted.length>1?sorted.length-1:1);
      ds1.splice(1,0,{label:'Traiettoria',data:sorted.map((_,i)=>Math.round((dP1[0]+sl*i)*10)/10),borderColor:'#888780',borderDash:[6,4],tension:.3,pointRadius:3,borderWidth:1.5,fill:false});
    }
    html+=\`<div class="card" style="margin-bottom:.75rem">
      <div class="card-hd"><h3>📈 Composizione corporea nel tempo</h3></div>
      <div class="card-bd">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:8px;margin-bottom:.75rem">
          \${kpiP!==null?\`<div style="background:var(--bg);border-radius:7px;padding:.5rem .7rem"><div style="font-size:.68rem;color:var(--text3);margin-bottom:2px">Peso</div><div style="font-size:1.1rem;font-weight:500">\${dP1[dP1.length-1]} kg</div><div style="font-size:.7rem;color:\${kpiP<=0?'#0F6E56':'#A32D2D'}">\${kpiP>0?'+':''}\${kpiP} kg</div></div>\`:''}
          \${kpiG!==null?\`<div style="background:var(--bg);border-radius:7px;padding:.5rem .7rem"><div style="font-size:.68rem;color:var(--text3);margin-bottom:2px">Massa grassa</div><div style="font-size:1.1rem;font-weight:500">\${dG1[dG1.length-1]} kg</div><div style="font-size:.7rem;color:\${kpiG<=0?'#0F6E56':'#A32D2D'}">\${kpiG>0?'+':''}\${kpiG} kg</div></div>\`:''}
          \${kpiM!==null?\`<div style="background:var(--bg);border-radius:7px;padding:.5rem .7rem"><div style="font-size:.68rem;color:var(--text3);margin-bottom:2px">Massa muscolare</div><div style="font-size:1.1rem;font-weight:500">\${dM1[dM1.length-1]} kg</div><div style="font-size:.7rem;color:\${kpiM>=0?'#0F6E56':'#A32D2D'}">\${kpiM>0?'+':''}\${kpiM} kg</div></div>\`:''}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.6rem;font-size:.73rem;color:var(--text2)">
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#888780;display:inline-block"></span>Peso</span>
          \${pesoTarget?'<span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:0;border-top:2px dashed #888780;display:inline-block"></span>Traiettoria ideale</span>':''}
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#E24B4A;display:inline-block"></span>Massa grassa</span>
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#1D9E75;display:inline-block"></span>Massa muscolare</span>
        </div>
        <canvas id="ib-c1" style="max-height:240px"></canvas>
      </div>
    </div>\`;

    // G2 — Adiposità centrale (cintura/fianchi + viscerale, senza gauge)
    const hasVisc=sorted.some(ib=>ib.visc);
    const hasCF=sorted.some(ib=>ib.cintFianchi);
    if(hasVisc||hasCF){
      const lastVisc=last.visc?parseFloat(last.visc):null;
      const viscColor=lastVisc===null?'#6b7280':lastVisc<10?'#0F6E56':lastVisc<15?'#BA7517':'#A32D2D';
      const viscLabel=lastVisc===null?'—':lastVisc<10?'zona sicura':lastVisc<15?'attenzione':'rischio elevato';
      const sogliaCF=p.sesso==='M'?0.90:0.85;
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>🫀 Adiposità centrale</h3></div>
        <div class="card-bd">
          \${lastVisc!==null?\`<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:.6rem;flex-wrap:wrap">
            <span style="font-size:.73rem;color:var(--text2)">Grasso viscerale attuale:</span>
            <span style="font-size:1.3rem;font-weight:500;color:\${viscColor}">\${lastVisc}</span>
            <span style="font-size:.75rem;font-weight:500;color:\${viscColor}">\${viscLabel}</span>
            <span style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;font-size:.68rem">
              <span style="padding:1px 6px;background:#EAF3DE;color:#27500A;border-radius:4px">&lt;10 sicuro</span>
              <span style="padding:1px 6px;background:#FAEEDA;color:#633806;border-radius:4px">10–14 att.</span>
              <span style="padding:1px 6px;background:#FCEBEB;color:#A32D2D;border-radius:4px">≥15 rischio</span>
            </span>
          </div>\`:''}
          \${hasCF?\`<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.5rem;font-size:.73rem;color:var(--text2)">
            <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#D85A30;display:inline-block"></span>Rapporto cintura/fianchi</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:0;border-top:2px dashed #E24B4A;display:inline-block"></span>Soglia \${sogliaCF} (\${p.sesso==='M'?'M':'F'})</span>
            \${hasVisc?'<span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#378ADD;display:inline-block"></span>Grasso viscerale</span>':''}
          </div>
          <canvas id="ib-c2" style="max-height:200px"></canvas>\`:''}
        </div>
      </div>\`;
    }

    // G3 — Ritmo: grasso vs muscolo per periodo
    const rL=[],rG=[],rM=[],rMC=[];
    for(let i=1;i<sorted.length;i++){
      const a=sorted[i-1],b=sorted[i];
      const gA=a.g||(a.peso&&a.pg?+(a.peso*a.pg/100).toFixed(1):null);
      const gB=b.g||(b.peso&&b.pg?+(b.peso*b.pg/100).toFixed(1):null);
      const mA=a.musc||null,mB=b.musc||null;
      if((gA&&gB)||(mA&&mB)){
        rL.push(_ibFmtBreve(a.data)+' → '+_ibFmtBreve(b.data));
        rG.push(gA&&gB?Math.round((gA-gB)*10)/10:null);
        const dm=mA&&mB?Math.round((mB-mA)*10)/10:null;
        rM.push(dm);rMC.push(dm===null?'#888':dm>=0?'#1D9E75':'#FAC775');
      }
    }
    const totalDays2=Math.max(1,Math.round((new Date(last.data)-new Date(first.data))/86400000));
    const mediaKgSett2=last.peso&&first.peso?Math.round((first.peso-last.peso)/totalDays2*7*100)/100:null;
    const prev2=sortedDesc[1];
    const lastDays2=Math.max(1,Math.round((new Date(last.data)-new Date(prev2.data))/86400000));
    const ultimoKgSett2=last.peso&&prev2.peso?Math.round((prev2.peso-last.peso)/lastDays2*7*100)/100:null;
    if(rL.length){
      let obiStr3='';
      if(pesoTarget&&mediaKgSett2>0&&last.peso){
        const mancano=Math.round((last.peso-pesoTarget)*10)/10;
        if(mancano>0){const sett=Math.ceil(mancano/mediaKgSett2);obiStr3=\`<div style="margin-top:.5rem;font-size:.77rem;color:#185FA5;padding:.4rem .6rem;background:#E6F1FB;border-radius:6px">🎯 Mancano <strong>\${mancano} kg</strong> all'obiettivo · circa <strong>\${sett} settimane</strong> al ritmo attuale</div>\`;}
      }
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>⚡ Ritmo — grasso vs muscolo per periodo</h3></div>
        <div class="card-bd">
          <div style="display:flex;gap:1rem;flex-wrap:wrap;font-size:.77rem;margin-bottom:.5rem">
            \${mediaKgSett2!==null?\`<span>Media: <strong>\${mediaKgSett2>0?'−'+mediaKgSett2:'+'+Math.abs(mediaKgSett2)} kg/sett</strong></span>\`:''}
            \${ultimoKgSett2!==null?\`<span>Ultimo: <strong style="color:\${ultimoKgSett2>=0.5&&ultimoKgSett2<=1.0?'#639922':ultimoKgSett2>1.0?'#A32D2D':'#BA7517'}">\${ultimoKgSett2>0?'−'+ultimoKgSett2:'+'+Math.abs(ultimoKgSett2)} kg/sett</strong></span>\`:''}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.5rem;font-size:.73rem;color:var(--text2)">
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#E24B4A;border-radius:2px;display:inline-block"></span>Grasso perso</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#1D9E75;border-radius:2px;display:inline-block"></span>Muscolo guadagnato</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#FAC775;border:1px solid #BA7517;border-radius:2px;display:inline-block"></span>Muscolo perso</span>
          </div>
          <canvas id="ib-c3" style="max-height:200px"></canvas>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:.5rem;font-size:.68rem">
            <span style="padding:2px 8px;background:#EAF3DE;color:#27500A;border-radius:12px">verde = muscolo stabile o in crescita</span>
            <span style="padding:2px 8px;background:#FAEEDA;color:#633806;border-radius:12px">giallo = lieve perdita muscolare</span>
          </div>
          \${obiStr3}
        </div>
      </div>\`;
    }

    // G4 — Composizione a barre impilate
    const dG4=sorted.map(ib=>ib.g||(ib.peso&&ib.pg?+(ib.peso*ib.pg/100).toFixed(1):null));
    const dM4=sorted.map(ib=>ib.musc||null);
    const dA4=sorted.map(ib=>ib.acqua||null);
    const hasCompos=sorted.some(ib=>ib.g||ib.musc||ib.acqua||ib.pg);
    if(hasCompos){
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>🧱 Composizione a barre — grasso / muscolo / acqua</h3></div>
        <div class="card-bd">
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.6rem;font-size:.73rem;color:var(--text2)">
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#E24B4A;border-radius:2px;display:inline-block"></span>Massa grassa</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#1D9E75;border-radius:2px;display:inline-block"></span>Massa muscolare</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#378ADD;border-radius:2px;display:inline-block"></span>Acqua totale</span>
          </div>
          <canvas id="ib-c4" style="max-height:220px"></canvas>
          <div style="font-size:.7rem;color:var(--text3);margin-top:.4rem">Il grasso scende, il muscolo regge — dimagrimento di qualità.</div>
        </div>
      </div>\`;
    }
  }`;

html = html.slice(0, idxStart) + NEW_HTML + html.slice(idxEnd);

// ── STEP 2: sostituisci blocco Chart.js ─────────────────────────────────────
const MARKER_CHART_START = '  // ── Render Chart.js grafici InBody migliorati ───────────────────────────';
const MARKER_CHART_END   = '\n}\n\nlet _macrosPaziente';
const idxCS = html.indexOf(MARKER_CHART_START);
const idxCE = html.indexOf(MARKER_CHART_END, idxCS);
if (idxCS === -1 || idxCE === -1) {
  console.error('ERRORE: marker Chart.js non trovati.');
  process.exit(1);
}

const NEW_CHART = `  // ── Render Chart.js — grafici InBody v3 finale ──────────────────────────
  if(hasMulti&&typeof Chart!=='undefined'){
    const gC='rgba(128,128,128,.1)';
    const tk={color:'#888',font:{size:11}};
    const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
    const pesoTarget=p.pesoTarget||null;
    ['_ibC1','_ibC2','_ibC3','_ibC4'].forEach(k=>{if(window[k]){window[k].destroy();window[k]=null;}});

    // C1 — Composizione corporea + traiettoria
    const c1=document.getElementById('ib-c1');
    if(c1){
      const dP=sorted.map(ib=>ib.peso||null);
      const dG=sorted.map(ib=>ib.g||(ib.peso&&ib.pg?+(ib.peso*ib.pg/100).toFixed(1):null));
      const dM=sorted.map(ib=>ib.musc||null);
      const ds=[
        {label:'Peso',data:dP,borderColor:'#888780',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#888780',borderWidth:2.5,fill:false},
        {label:'Grasso',data:dG,borderColor:'#E24B4A',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#E24B4A',borderWidth:2,fill:false},
        {label:'Muscolo',data:dM,borderColor:'#1D9E75',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:'#1D9E75',borderWidth:2,fill:false}
      ];
      if(pesoTarget&&dP[0]){const sl=(pesoTarget-dP[0])/(sorted.length>1?sorted.length-1:1);ds.splice(1,0,{label:'Traiettoria',data:sorted.map((_,i)=>Math.round((dP[0]+sl*i)*10)/10),borderColor:'#888780',borderDash:[6,4],tension:.3,pointRadius:3,borderWidth:1.5,fill:false});}
      window._ibC1=new Chart(c1,{type:'line',data:{labels,datasets:ds},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{y:{ticks:{...tk,callback:v=>v+' kg'},grid:{color:gC}},x:{ticks:tk,grid:{display:false}}}}});
    }

    // C2 — Adiposità centrale (cintura/fianchi + viscerale)
    const c2=document.getElementById('ib-c2');
    if(c2){
      const dCF=sorted.map(ib=>ib.cintFianchi?Math.round(parseFloat(ib.cintFianchi)*100)/100:null);
      const dVs=sorted.map(ib=>ib.visc?parseFloat(ib.visc):null);
      const sCF=p.sesso==='M'?0.90:0.85;
      const cfVals=dCF.filter(Boolean);
      window._ibC2=new Chart(c2,{type:'line',data:{labels,datasets:[
        {label:'Cintura/fianchi',data:dCF,borderColor:'#D85A30',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:dCF.map(v=>v===null?'#D85A30':v>sCF?'#E24B4A':'#1D9E75'),borderWidth:2,fill:false,yAxisID:'y'},
        {label:'Soglia',data:sorted.map(()=>sCF),borderColor:'#E24B4A',borderDash:[5,3],pointRadius:0,fill:false,borderWidth:1.5,yAxisID:'y'},
        {label:'Viscerale',data:dVs,borderColor:'#378ADD',backgroundColor:'transparent',tension:.35,pointRadius:5,pointBackgroundColor:dVs.map(v=>v===null?'#378ADD':v<10?'#1D9E75':v<15?'#BA7517':'#E24B4A'),borderWidth:2,fill:false,yAxisID:'y2'}
      ]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{y:{min:cfVals.length?Math.min(...cfVals)-0.05:undefined,ticks:{...tk,callback:v=>v.toFixed(2)},grid:{color:gC}},y2:{position:'right',ticks:{...tk,color:'#185FA5',callback:v=>'lv.'+v},grid:{display:false}},x:{ticks:tk,grid:{display:false}}}}});
    }

    // C3 — Ritmo grasso vs muscolo
    const c3=document.getElementById('ib-c3');
    if(c3){
      const rL=[],rG=[],rM=[],rMC=[];
      for(let i=1;i<sorted.length;i++){
        const a=sorted[i-1],b=sorted[i];
        const gA=a.g||(a.peso&&a.pg?+(a.peso*a.pg/100).toFixed(1):null);
        const gB=b.g||(b.peso&&b.pg?+(b.peso*b.pg/100).toFixed(1):null);
        const mA=a.musc||null,mB=b.musc||null;
        if((gA&&gB)||(mA&&mB)){
          rL.push(_ibFmtBreve(a.data)+' → '+_ibFmtBreve(b.data));
          rG.push(gA&&gB?Math.round((gA-gB)*10)/10:null);
          const dm=mA&&mB?Math.round((mB-mA)*10)/10:null;
          rM.push(dm);rMC.push(dm===null?'#888':dm>=0?'#1D9E75':'#FAC775');
        }
      }
      if(rL.length){window._ibC3=new Chart(c3,{type:'bar',data:{labels:rL,datasets:[{label:'Grasso perso',data:rG,backgroundColor:'#E24B4A',borderRadius:4,barPercentage:.5},{label:'Muscolo',data:rM,backgroundColor:rMC,borderColor:rM.map(v=>v!==null&&v<0?'#BA7517':'transparent'),borderWidth:rM.map(v=>v!==null&&v<0?1:0),borderRadius:4,barPercentage:.5}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{ticks:tk,grid:{display:false}},y:{ticks:{...tk,callback:v=>(v>0?'+':'')+v+' kg'},grid:{color:gC},afterDataLimits(s){s.max+=0.3;s.min=Math.min(s.min,-0.3);}}}}}); }
    }

    // C4 — Composizione barre impilate
    const c4=document.getElementById('ib-c4');
    if(c4){
      const dG4=sorted.map(ib=>ib.g||(ib.peso&&ib.pg?+(ib.peso*ib.pg/100).toFixed(1):null));
      const dM4=sorted.map(ib=>ib.musc||null);
      const dA4=sorted.map(ib=>ib.acqua||null);
      window._ibC4=new Chart(c4,{type:'bar',data:{labels,datasets:[{label:'Massa grassa',data:dG4,backgroundColor:'#E24B4A',stack:'comp'},{label:'Massa muscolare',data:dM4,backgroundColor:'#1D9E75',stack:'comp'},{label:'Acqua totale',data:dA4,backgroundColor:'#378ADD',stack:'comp'}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{stacked:true,ticks:tk,grid:{display:false}},y:{stacked:true,ticks:{...tk,callback:v=>v+' kg'},grid:{color:gC}}}}});
    }
  }`;

html = html.slice(0, idxCS) + NEW_CHART + html.slice(idxCE);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Patch applicata con successo!');
console.log('  G1: composizione corporea + traiettoria ideale');
console.log('  G2: cintura/fianchi + viscerale (senza gauge)');
console.log('  G3: ritmo grasso vs muscolo per periodo');
console.log('  G4: barre impilate grasso/muscolo/acqua');
console.log('');
console.log('Prossimo passo:');
console.log('  git add . && git commit -m "feat: grafici InBody v3 finali" && git push');
