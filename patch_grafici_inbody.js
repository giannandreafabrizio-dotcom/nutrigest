const fs = require('fs');
const filePath = process.argv[2] || './index.html';
let html = fs.readFileSync(filePath, 'utf8');

// ── Sostituiamo il blocco grafici dentro renderPdInbody ──
// Troviamo il punto esatto: dal commento "// ── Grafico" fino alla fine del blocco Chart.js

const OLD = `  // ── Grafico ───────────────────────────────────────────────────────────────
  if(hasMulti){
    const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
    const dataPeso=sorted.map(ib=>ib.peso||null);
    const dataMusc=sorted.map(ib=>ib.musc||null);
    const dataGrassa=sorted.map(ib=>(ib.peso&&ib.pg)?+(ib.peso*ib.pg/100).toFixed(1):null);
    const pesoTarget=p.pesoTarget||null;
    html+=\`<div class="card" style="margin-bottom:.7rem">
      <div class="card-hd"><h3>📈 Andamento nel tempo</h3></div>
      <div class="card-bd">
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.7rem;font-size:.78rem">
          <span><span style="display:inline-block;width:12px;height:12px;background:#3b82f6;border-radius:2px;margin-right:4px"></span>Peso</span>
          <span><span style="display:inline-block;width:12px;height:12px;background:#16a34a;border-radius:2px;margin-right:4px"></span>Massa muscolare</span>
          <span><span style="display:inline-block;width:12px;height:12px;background:#dc2626;border-radius:2px;margin-right:4px"></span>Massa grassa</span>
          \${pesoTarget?\`<span><span style="display:inline-block;width:12px;height:12px;background:#94a3b8;border-radius:2px;margin-right:4px"></span>Obiettivo \${pesoTarget} kg</span>\`:''}
        </div>
        <canvas id="ib-chart-canvas" style="max-height:260px"></canvas>
      </div>
    </div>\`;

    // ── Velocità di dimagrimento ───────────────────────────────────────────
    const prev=sortedDesc[1];
    const totalDays=Math.max(1,Math.round((new Date(last.data)-new Date(first.data))/86400000));
    const mediaKgSett=last.peso&&first.peso?+((first.peso-last.peso)/totalDays*7).toFixed(2):null;
    const lastDays=Math.max(1,Math.round((new Date(last.data)-new Date(prev.data))/86400000));
    const ultimoKgSett=last.peso&&prev.peso?+((prev.peso-last.peso)/lastDays*7).toFixed(2):null;
    if(mediaKgSett!==null){
      const ultimoColor=ultimoKgSett!==null?(Math.abs(ultimoKgSett)<1?'#16a34a':'#d97706'):'#6b7280';
      const ultimoLabel=ultimoKgSett!==null?(Math.abs(ultimoKgSett)<1?'ritmo sostenibile':'ritmo elevato'):'';
      let obiStr='';
      if(pesoTarget&&mediaKgSett>0&&last.peso){
        const mancano=+(last.peso-pesoTarget).toFixed(1);
        if(mancano>0){
          const sett=Math.ceil(mancano/mediaKgSett);
          obiStr=\`<div style="margin-top:.4rem;font-size:.8rem;color:#1d4ed8">🎯 Mancano <strong>\${mancano} kg</strong> all'obiettivo · circa <strong>\${sett} settimane</strong></div>\`;
        }
      }
      html+=\`<div class="card" style="margin-bottom:.7rem">
        <div class="card-hd"><h3>⚡ Velocità di dimagrimento</h3></div>
        <div class="card-bd" style="font-size:.84rem;display:flex;flex-direction:column;gap:.35rem">
          <div>Media generale (\${totalDays} giorni): <strong>\${mediaKgSett>0?'−'+mediaKgSett:'+'+Math.abs(mediaKgSett)} kg/settimana</strong></div>
          \${ultimoKgSett!==null?\`<div>Ultimo periodo (\${lastDays} giorni): <strong style="color:\${ultimoColor}">\${ultimoKgSett>0?'−'+ultimoKgSett:'+'+Math.abs(ultimoKgSett)} kg/settimana</strong> <span style="color:\${ultimoColor};font-size:.75rem">\${ultimoLabel}</span></div>\`:''}
          \${obiStr}
        </div>
      </div>\`;
    }
  }`;

const NEW = `  // ── GRAFICI INBODY MIGLIORATI ────────────────────────────────────────────
  if(hasMulti){
    const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
    const pesoTarget=p.pesoTarget||null;

    // GRAFICO 1 — Percorso verso l'obiettivo
    const dataPeso=sorted.map(ib=>ib.peso||null);
    const dataMusc=sorted.map(ib=>ib.musc||null);
    const dataPg=sorted.map(ib=>ib.pg||null);
    let datasetsG1=[
      {label:'Peso reale',data:dataPeso,borderColor:'#1D9E75',backgroundColor:'rgba(29,158,117,.07)',tension:.3,pointRadius:5,pointBackgroundColor:'#1D9E75',fill:false,yAxisID:'y'},
      {label:'Massa muscolare',data:dataMusc,borderColor:'#D85A30',backgroundColor:'transparent',tension:.3,pointRadius:4,pointStyle:'rect',pointBackgroundColor:'#D85A30',fill:false,yAxisID:'y'},
      {label:'% Grassa',data:dataPg,borderColor:'#378ADD',backgroundColor:'transparent',tension:.3,pointRadius:4,pointStyle:'triangle',pointBackgroundColor:'#378ADD',fill:false,yAxisID:'y2'}
    ];
    if(pesoTarget){
      const n=sorted.length;
      const pesoStart=sorted[0].peso||pesoTarget;
      const slope=(pesoTarget-pesoStart)/(n-1);
      const traiettoria=sorted.map((_,i)=>Math.round((pesoStart+slope*i)*10)/10);
      datasetsG1.splice(1,0,{label:'Traiettoria ideale',data:traiettoria,borderColor:'#888780',backgroundColor:'transparent',borderDash:[5,4],tension:.3,pointRadius:3,pointBackgroundColor:'#888780',fill:false,yAxisID:'y'});
    }
    html+=\`<div class="card" style="margin-bottom:.75rem">
      <div class="card-hd"><h3>📈 Percorso verso l'obiettivo</h3></div>
      <div class="card-bd">
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.6rem;font-size:.75rem;color:var(--text2)">
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#1D9E75;display:inline-block"></span>Peso reale</span>
          \${pesoTarget?'<span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:0;border-top:2px dashed #888780;display:inline-block"></span>Traiettoria ideale</span>':''}
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#D85A30;display:inline-block"></span>Massa muscolare</span>
          <span style="display:flex;align-items:center;gap:5px"><span style="width:18px;height:2px;background:#378ADD;display:inline-block"></span>% Grassa</span>
        </div>
        <canvas id="ib-c1" style="max-height:240px"></canvas>
      </div>
    </div>\`;

    // GRAFICO 2 — Composizione corporea (barre impilate)
    const dataGrasso=sorted.map(ib=>ib.g||null);
    const dataMuscG2=sorted.map(ib=>ib.musc||null);
    const dataAcqua=sorted.map(ib=>ib.acqua||null);
    const hasCompos=sorted.some(ib=>ib.g||ib.musc||ib.acqua);
    if(hasCompos){
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>🧱 Composizione corporea nel tempo</h3></div>
        <div class="card-bd">
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:.6rem;font-size:.75rem;color:var(--text2)">
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#E24B4A;border-radius:2px;display:inline-block"></span>Massa grassa</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#1D9E75;border-radius:2px;display:inline-block"></span>Massa muscolare</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;background:#378ADD;border-radius:2px;display:inline-block"></span>Acqua totale</span>
          </div>
          <canvas id="ib-c2" style="max-height:220px"></canvas>
          <div style="font-size:.72rem;color:var(--text3);margin-top:.4rem">Il peso perso è grasso o muscolo? Ogni barra mostra la composizione ad ogni misurazione.</div>
        </div>
      </div>\`;
    }

    // GRAFICO 3 — Velocità di dimagrimento
    const velLabels=[],velData=[],velColors=[];
    for(let i=1;i<sorted.length;i++){
      const a=sorted[i-1],b=sorted[i];
      if(a.peso&&b.peso&&a.data&&b.data){
        const days=Math.max(1,Math.round((new Date(b.data)-new Date(a.data))/86400000));
        const kgSett=Math.round((a.peso-b.peso)/days*7*100)/100;
        velLabels.push(_ibFmtBreve(a.data)+' → '+_ibFmtBreve(b.data));
        velData.push(kgSett);
        velColors.push(kgSett>=0.5&&kgSett<=1.0?'#639922':kgSett<0.5&&kgSett>=0?'#BA7517':kgSett>1.0?'#A32D2D':'#378ADD');
      }
    }
    const totalDays2=Math.max(1,Math.round((new Date(last.data)-new Date(first.data))/86400000));
    const mediaKgSett2=last.peso&&first.peso?Math.round((first.peso-last.peso)/totalDays2*7*100)/100:null;
    const prev2=sortedDesc[1];
    const lastDays2=Math.max(1,Math.round((new Date(last.data)-new Date(prev2.data))/86400000));
    const ultimoKgSett2=last.peso&&prev2.peso?Math.round((prev2.peso-last.peso)/lastDays2*7*100)/100:null;
    if(velData.length){
      let obiStr2='';
      if(pesoTarget&&mediaKgSett2>0&&last.peso){
        const mancano=Math.round((last.peso-pesoTarget)*10)/10;
        if(mancano>0){const sett=Math.ceil(mancano/mediaKgSett2);obiStr2=\`<div style="margin-top:.5rem;font-size:.78rem;color:#185FA5;padding:.4rem .6rem;background:#E6F1FB;border-radius:6px">🎯 Mancano <strong>\${mancano} kg</strong> all'obiettivo · circa <strong>\${sett} settimane</strong> al ritmo attuale</div>\`;}
      }
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>⚡ Velocità di dimagrimento</h3></div>
        <div class="card-bd">
          <div style="display:flex;gap:1rem;flex-wrap:wrap;font-size:.78rem;margin-bottom:.6rem">
            <span>Media: <strong>\${mediaKgSett2!==null?(mediaKgSett2>0?'−'+mediaKgSett2:'+'+Math.abs(mediaKgSett2))+' kg/sett':'—'}</strong></span>
            \${ultimoKgSett2!==null?\`<span>Ultimo periodo: <strong style="color:\${ultimoKgSett2>=0.5&&ultimoKgSett2<=1.0?'#639922':ultimoKgSett2>1.0?'#A32D2D':'#BA7517'}">\${ultimoKgSett2>0?'−'+ultimoKgSett2:'+'+Math.abs(ultimoKgSett2)} kg/sett</strong></span>\`:''}
          </div>
          <canvas id="ib-c3" style="max-height:180px"></canvas>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:.5rem;font-size:.7rem">
            <span style="padding:2px 8px;background:#EAF3DE;color:#27500A;border-radius:12px">verde = 0.5–1 kg/sett ottimale</span>
            <span style="padding:2px 8px;background:#FAEEDA;color:#633806;border-radius:12px">giallo = troppo lento</span>
            <span style="padding:2px 8px;background:#FCEBEB;color:#A32D2D;border-radius:12px">rosso = troppo veloce</span>
          </div>
          \${obiStr2}
        </div>
      </div>\`;
    }

    // GRAFICO 4 — Rischio metabolico (viscerale + cintura/fianchi)
    const hasVisc=sorted.some(ib=>ib.visc);
    const hasCF=sorted.some(ib=>ib.cintFianchi);
    if(hasVisc||hasCF){
      const lastVisc=last.visc?parseFloat(last.visc):null;
      const viscColor=lastVisc===null?'#6b7280':lastVisc<10?'#16a34a':lastVisc<15?'#d97706':'#dc2626';
      const viscLabel=lastVisc===null?'—':lastVisc<10?'zona sicura':lastVisc<15?'attenzione':'rischio elevato';
      const cfData=sorted.map(ib=>ib.cintFianchi?Math.round(parseFloat(ib.cintFianchi)*100)/100:null);
      const sogliaCF=p.sesso==='M'?0.90:0.85;
      html+=\`<div class="card" style="margin-bottom:.75rem">
        <div class="card-hd"><h3>🫀 Rischio metabolico</h3></div>
        <div class="card-bd">
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start">
            \${lastVisc!==null?\`<div style="flex:0 0 auto">
              <div style="font-size:.72rem;color:var(--text3);margin-bottom:.3rem">Grasso viscerale — attuale</div>
              <div style="display:flex;align-items:baseline;gap:6px">
                <span style="font-size:2rem;font-weight:500;color:\${viscColor}">\${lastVisc}</span>
                <span style="font-size:.78rem;color:\${viscColor}">livello</span>
              </div>
              <div style="font-size:.75rem;font-weight:500;color:\${viscColor};margin-top:2px">\${viscLabel}</div>
              <div style="display:flex;gap:6px;margin-top:.5rem;font-size:.68rem;flex-direction:column">
                <span style="padding:2px 7px;background:#EAF3DE;color:#27500A;border-radius:4px">sicuro &lt; 10</span>
                <span style="padding:2px 7px;background:#FAEEDA;color:#633806;border-radius:4px">attenzione 10–14</span>
                <span style="padding:2px 7px;background:#FCEBEB;color:#A32D2D;border-radius:4px">rischio ≥ 15</span>
              </div>
            </div>\`:''}
            \${hasCF?\`<div style="flex:1;min-width:200px">
              <div style="font-size:.72rem;color:var(--text3);margin-bottom:.3rem">Rapporto cintura/fianchi nel tempo <span style="color:#888">(soglia: \${sogliaCF})</span></div>
              <canvas id="ib-c4" style="max-height:160px"></canvas>
            </div>\`:''}
          </div>
        </div>
      </div>\`;
    }
  }`;

if (!html.includes(OLD)) {
  console.error('ERRORE: testo OLD non trovato. Controlla che il file sia corretto.');
  process.exit(1);
}

html = html.replace(OLD, NEW);

// ── Sostituiamo anche il blocco Chart.js alla fine di renderPdInbody ──
const OLD_CHART = `  // ── Render Chart.js dopo iniezione HTML ───────────────────────────────────
  if(hasMulti&&typeof Chart!=='undefined'){
    const canvas=document.getElementById('ib-chart-canvas');
    if(canvas){
      if(window._ibChart){window._ibChart.destroy();window._ibChart=null;}
      const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
      const dataPeso=sorted.map(ib=>ib.peso||null);
      const dataMusc=sorted.map(ib=>ib.musc||null);
      const dataGrassa=sorted.map(ib=>(ib.peso&&ib.pg)?+(ib.peso*ib.pg/100).toFixed(1):null);
      const pesoTarget=p.pesoTarget||null;
      const datasets=[
        {label:'Peso',data:dataPeso,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.08)',tension:.3,pointRadius:4,fill:false},
        {label:'Massa muscolare',data:dataMusc,borderColor:'#16a34a',backgroundColor:'rgba(22,163,74,.08)',tension:.3,pointRadius:4,fill:false},
        {label:'Massa grassa',data:dataGrassa,borderColor:'#dc2626',backgroundColor:'rgba(220,38,38,.05)',borderDash:[5,4],tension:.3,pointRadius:4,fill:false}
      ];
      if(pesoTarget){
        datasets.push({label:'Obiettivo',data:sorted.map(()=>pesoTarget),borderColor:'#94a3b8',borderDash:[8,4],pointRadius:0,fill:false,tension:0});
      }
      window._ibChart=new Chart(canvas,{
        type:'line',
        data:{labels,datasets},
        options:{
          responsive:true,maintainAspectRatio:true,
          plugins:{legend:{display:false}},
          scales:{y:{ticks:{callback:v=>v+'kg'},grid:{color:'rgba(0,0,0,.05)'}},x:{grid:{display:false}}}
        }
      });
    }
  }`;

const NEW_CHART = `  // ── Render Chart.js grafici InBody migliorati ───────────────────────────
  if(hasMulti&&typeof Chart!=='undefined'){
    const gridColor='rgba(128,128,128,.1)';
    const tickStyle={color:'#888',font:{size:11}};
    const labels=sorted.map(ib=>_ibFmtBreve(ib.data));
    const pesoTarget=p.pesoTarget||null;

    // distruggi grafici precedenti
    ['_ibC1','_ibC2','_ibC3','_ibC4'].forEach(k=>{if(window[k]){window[k].destroy();window[k]=null;}});

    // GRAFICO 1 — Percorso obiettivo
    const c1=document.getElementById('ib-c1');
    if(c1){
      const dataPeso=sorted.map(ib=>ib.peso||null);
      const dataMusc=sorted.map(ib=>ib.musc||null);
      const dataPg=sorted.map(ib=>ib.pg||null);
      const ds1=[
        {label:'Peso reale',data:dataPeso,borderColor:'#1D9E75',backgroundColor:'rgba(29,158,117,.07)',tension:.3,pointRadius:5,pointBackgroundColor:'#1D9E75',fill:false,yAxisID:'y'},
        {label:'Massa muscolare',data:dataMusc,borderColor:'#D85A30',backgroundColor:'transparent',tension:.3,pointRadius:4,pointStyle:'rect',pointBackgroundColor:'#D85A30',fill:false,yAxisID:'y'},
        {label:'% Grassa',data:dataPg,borderColor:'#378ADD',backgroundColor:'transparent',tension:.3,pointRadius:4,pointStyle:'triangle',pointBackgroundColor:'#378ADD',fill:false,yAxisID:'y2'}
      ];
      if(pesoTarget){
        const pesoStart=sorted[0].peso||pesoTarget;
        const slope=(pesoTarget-pesoStart)/(sorted.length-1);
        const traiett=sorted.map((_,i)=>Math.round((pesoStart+slope*i)*10)/10);
        ds1.splice(1,0,{label:'Traiettoria ideale',data:traiett,borderColor:'#888780',backgroundColor:'transparent',borderDash:[5,4],tension:.3,pointRadius:3,pointBackgroundColor:'#888780',fill:false,yAxisID:'y'});
      }
      window._ibC1=new Chart(c1,{type:'line',data:{labels,datasets:ds1},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{y:{ticks:{...tickStyle,callback:v=>v+' kg'},grid:{color:gridColor}},y2:{position:'right',ticks:{...tickStyle,color:'#378ADD',callback:v=>v+'%'},grid:{display:false}},x:{ticks:tickStyle,grid:{display:false}}}}});
    }

    // GRAFICO 2 — Composizione corporea (barre impilate)
    const c2=document.getElementById('ib-c2');
    if(c2){
      const dataGrasso=sorted.map(ib=>ib.g||null);
      const dataMuscG2=sorted.map(ib=>ib.musc||null);
      const dataAcqua=sorted.map(ib=>ib.acqua||null);
      window._ibC2=new Chart(c2,{type:'bar',data:{labels,datasets:[
        {label:'Massa grassa',data:dataGrasso,backgroundColor:'#E24B4A',stack:'comp'},
        {label:'Massa muscolare',data:dataMuscG2,backgroundColor:'#1D9E75',stack:'comp'},
        {label:'Acqua totale',data:dataAcqua,backgroundColor:'#378ADD',stack:'comp'}
      ]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{stacked:true,ticks:tickStyle,grid:{display:false}},y:{stacked:true,ticks:{...tickStyle,callback:v=>v+' kg'},grid:{color:gridColor}}}}});
    }

    // GRAFICO 3 — Velocità di dimagrimento
    const c3=document.getElementById('ib-c3');
    if(c3){
      const velL=[],velD=[],velC=[];
      for(let i=1;i<sorted.length;i++){
        const a=sorted[i-1],b=sorted[i];
        if(a.peso&&b.peso&&a.data&&b.data){
          const days=Math.max(1,Math.round((new Date(b.data)-new Date(a.data))/86400000));
          const ks=Math.round((a.peso-b.peso)/days*7*100)/100;
          velL.push(_ibFmtBreve(a.data)+' → '+_ibFmtBreve(b.data));
          velD.push(ks);
          velC.push(ks>=0.5&&ks<=1.0?'#639922':ks<0.5&&ks>=0?'#BA7517':ks>1.0?'#A32D2D':'#378ADD');
        }
      }
      if(velD.length){
        window._ibC3=new Chart(c3,{type:'bar',data:{labels:velL,datasets:[{data:velD,backgroundColor:velC,borderRadius:4,barThickness:Math.min(50,Math.floor(400/velD.length))}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{ticks:tickStyle,grid:{display:false}},y:{min:0,ticks:{...tickStyle,callback:v=>v.toFixed(1)+' kg'},grid:{color:gridColor}}}}});
      }
    }

    // GRAFICO 4 — Cintura/fianchi nel tempo
    const c4=document.getElementById('ib-c4');
    if(c4){
      const cfData=sorted.map(ib=>ib.cintFianchi?Math.round(parseFloat(ib.cintFianchi)*100)/100:null);
      const sogliaCF=p.sesso==='M'?0.90:0.85;
      window._ibC4=new Chart(c4,{type:'line',data:{labels,datasets:[
        {label:'Cintura/fianchi',data:cfData,borderColor:'#D85A30',backgroundColor:'transparent',tension:.3,pointRadius:5,pointBackgroundColor:cfData.map(v=>v===null?'#D85A30':v>sogliaCF?'#E24B4A':'#1D9E75'),fill:false},
        {label:'Soglia rischio',data:sorted.map(()=>sogliaCF),borderColor:'#E24B4A',borderDash:[4,3],pointRadius:0,fill:false}
      ]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{ticks:tickStyle,grid:{display:false}},y:{ticks:{...tickStyle,callback:v=>v.toFixed(2)},grid:{color:gridColor}}}}});
    }
  }`;

if (!html.includes(OLD_CHART)) {
  console.error('ERRORE: testo OLD_CHART non trovato.');
  process.exit(1);
}

html = html.replace(OLD_CHART, NEW_CHART);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Patch applicata con successo!');
console.log('  4 grafici InBody migliorati nel tab InBody');
console.log('  Grafico 1: Percorso verso obiettivo (linea multi-serie + traiettoria ideale)');
console.log('  Grafico 2: Composizione corporea (barre impilate grasso/muscolo/acqua)');
console.log('  Grafico 3: Velocita dimagrimento (bar chart con zone colore)');
console.log('  Grafico 4: Rischio metabolico (gauge viscerale + linea cintura/fianchi)');
console.log('');
console.log('Prossimo passo:');
console.log('  git add . && git commit -m "feat: 4 grafici InBody migliorati (Priorita 6)" && git push');
