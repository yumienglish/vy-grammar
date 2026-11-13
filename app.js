/* Vy's Grammar Path – app logic.
   Stand-alone: progress and recordings stay on Vy's device. When every lesson in a unit is done,
   the unit can be sent to the teacher by email (Apps Script web app, see VyGrammar.gs). */

/* ====== CONFIG: paste the Apps Script web app URL (…/exec) here ====== */
const SCRIPT_URL='https://script.google.com/macros/s/AKfycbwBz2Q2EHbcg7o90yXI4OUqUVxTsJyHIBxJX5rxE7CTrI3jOtpS2S3-_svw53cVO21Anw/exec';
const APP_KEY='vy-grammar-2026';   // must match APP_KEY in VyGrammar.gs
const STUDENT='Vy';
const MAX_REC=60;                  // seconds per recording

/* ---------- helpers ---------- */
const LVL=[{n:'Understand',vi:'Hiểu đúng quy tắc trước khi dùng.',ic:'bulb'},{n:'Use',vi:'Tự viết câu đúng: điền, sắp xếp, đổi câu, dịch.',ic:'pencil'},{n:'Challenge',vi:'Trộn với ngữ pháp các bài trước. Đọc kỹ từng chữ nhé!',ic:'trophy'}];
const lvlOf=i=>i<5?0:i<10?1:2;
const DEF_P={mc:'Choose the answer.',tf:'Correct or not?',tap:'Tap the wrong word.',match:'Match the pairs.',gap:'Fill in the gaps.',order:'Put the words in order.',write:'Write the answer.',forms:'Write the verb after “she”.'};
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const typo=s=>s.replace(/(^|[\s(\[])"(?=\S)/g,'$1“').replace(/"/g,'”').replace(/'/g,'’');
const tx=s=>typo(esc(s)).replace(/\*([^*]+)\*/g,'<i>$1</i>');
const attr=s=>esc(s).replace(/"/g,'&quot;');
function cm(s){let o='',last=0,m;const re=/\[(s|v|a|j|u):([^\]]*)\]/g;while((m=re.exec(s))){o+=tx(s.slice(last,m.index))+`<span class="g g-${m[1]}">${tx(m[2])}</span>`;last=re.lastIndex;}return o+tx(s.slice(last));}
const plain=s=>String(s||'').replace(/\[(?:s|v|a|j|u):([^\]]*)\]/g,'$1');
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function expand(s){
  return s.replace(/\bcan'?t\b/g,'cannot').replace(/\bcan not\b/g,'cannot').replace(/\bwon't\b/g,'will not')
   .replace(/n't\b/g,' not').replace(/\bi'm\b/g,'i am').replace(/'re\b/g,' are').replace(/'ve\b/g,' have')
   .replace(/\b(he|she|it|what|where|who|that|there|how|this)'s\b/g,'$1 is').replace(/\s+/g,' ').trim();
}
function norm(s,exact){
  s=String(s||'').toLowerCase().replace(/[’‘`´]/g,"'").replace(/[“”"]/g,'').replace(/[.,!?;:]/g,' ').replace(/\s+/g,' ').trim();
  return exact?s:expand(s);
}
const same=(a,b,exact)=>norm(a,exact)===norm(b,exact);
const fmtSec=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
const fmtDate=t=>{try{return new Date(t).toLocaleString('vi-VN',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'});}catch(e){return '';}};

/* ---------- saved progress (this device only) ---------- */
const KEY='vy-grammar-path-v1';
let SAVE={stars:{},sound:true,prog:null,done:{},sent:{}};
try{const v=localStorage.getItem(KEY);if(v)SAVE=Object.assign(SAVE,JSON.parse(v));}catch(e){}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(SAVE));}catch(e){}}

/* ---------- recordings: IndexedDB (kept after the page is closed) ---------- */
let IDBP=null;
function idb(){
  if(!IDBP)IDBP=new Promise((res,rej)=>{
    if(!window.indexedDB)return rej(new Error('no indexedDB'));
    const r=indexedDB.open('vy-grammar',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('rec');
    r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);
  });
  return IDBP;
}
async function idbPut(k,v){const d=await idb();return new Promise((res,rej)=>{const t=d.transaction('rec','readwrite');t.objectStore('rec').put(v,k);t.oncomplete=()=>res();t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error);});}
async function idbGet(k){const d=await idb();return new Promise((res,rej)=>{const q=d.transaction('rec').objectStore('rec').get(k);q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error);});}
async function idbKeys(){const d=await idb();return new Promise((res,rej)=>{const q=d.transaction('rec').objectStore('rec').getAllKeys();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error);});}
const within=(p,ms=4000)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('storage timeout')),ms))]);
const RECMEM={};               // fallback when the device can't store
const REC_MISS=new Set();   // lessons whose recording is confirmed missing on this device
async function saveRec(id,blob){
  RECMEM[id]=blob;REC_MISS.delete(id);
  try{await within(blob.arrayBuffer().then(buf=>idbPut(id,{buf,type:blob.type})));return true;}catch(e){return false;}
}
async function getRec(id){
  if(RECMEM[id])return RECMEM[id];
  try{const v=await within(idbGet(id));if(v&&v.buf)return new Blob([v.buf],{type:v.type||'audio/webm'});}catch(e){}
  return null;
}
within(idbKeys()).then(ks=>{const have=new Set(ks);Object.keys(SAVE.done).forEach(id=>{if(!have.has(id)&&!RECMEM[id])REC_MISS.add(id);});if(REC_MISS.size&&(view==='home'||view==='result'))render();}).catch(()=>{});

/* ---------- sound ---------- */
let AC=null;
function tone(ok){
  if(!SAVE.sound)return;
  try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;(ok?[660,880]:[392,311]).forEach((f,k)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;const s=t+k*.12;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.16,s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+.2);o.connect(g);g.connect(AC.destination);o.start(s);o.stop(s+.22);});}catch(e){}
}
let VOICE=null;
const FEM=/female|woman|samantha|karen|victoria|zira|aria|jenny|susan|allison|ava\b|serena|moira|tessa|fiona|kate|libby|sonia|emma|michelle|salli|joanna|kendra|kimberly|ivy|google us english|en-us-x-(sfg|iob|iog|tpc|tpf)|en-gb-x-(gba|gbc|gbg)/i;
const MAL=/\bmale\b|daniel|\balex\b|fred|david|mark|guy|ryan|george|thomas|arthur|oliver|en-us-x-(iol|iom|tpd)|en-gb-x-(gbb|gbd|rjs)/i;
const vid=v=>(v.name+' '+(v.voiceURI||'')).replace(/female/ig,'FEM');
function pickVoice(){try{
  const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));
  const by=l=>vs.filter(v=>new RegExp('^en[-_]'+l,'i').test(v.lang));
  const pool=[...by('US'),...by('GB'),...vs];
  VOICE=pool.find(v=>FEM.test(v.name+' '+(v.voiceURI||'')))||pool.find(v=>!MAL.test(vid(v)))||pool[0]||null;
}catch(e){}}
if('speechSynthesis' in window){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}}
function say(text,slow){
  try{if(!('speechSynthesis' in window)||!text)return;const ss=speechSynthesis;if(ss.speaking||ss.pending)ss.cancel();try{ss.resume();}catch(e){}const u=new SpeechSynthesisUtterance(text);u.lang=VOICE?VOICE.lang:'en-US';if(VOICE)u.voice=VOICE;
  u.pitch=VOICE&&MAL.test(vid(VOICE))?1.4:1.08;u.rate=slow?.6:.9;speechSynthesis.speak(u);}catch(e){}
}
function autoSay(text){if(SAVE.sound)say(text);}
function hush(){try{speechSynthesis.cancel();}catch(e){}}

/* ---------- state ---------- */
let view='home',L=null,cardsBack=null,qi=0,res=[],streak=0,Q=null,spIdx=null,own='',speakOnly=false,saveWarn=false;
let REC=null,spRec=null,recMsg='';
const SEND={};

/* ---------- UI bits ---------- */
const UI={
  close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  book:'<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  on:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  off:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  play:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  slow:'<svg viewBox="0 0 24 24"><path d="M3 16c0-4 3.5-7 8-7s8 3 8 6h2a1.5 1.5 0 0 1 0 3H5a2 2 0 0 1-2-2z" fill="currentColor"/><circle cx="20" cy="11" r="1.6" fill="currentColor"/></svg>',
  flame:'<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-6 1-9z" fill="currentColor"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cycle:'<svg viewBox="0 0 24 24"><path d="M19 8a7.5 7.5 0 0 0-13.5 1M5 16a7.5 7.5 0 0 0 13.5-1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M19 3.5V8h-4.5M5 20.5V16h4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  mic:'<svg viewBox="0 0 24 24"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  stop:'<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>'
};
const soundBtn=()=>`<button class="iconbtn" data-act="sound" aria-label="${SAVE.sound?'Turn sound off':'Turn sound on'}" title="${SAVE.sound?'Sound on':'Sound off'}">${SAVE.sound?UI.on:UI.off}</button>`;
const starRow=(n,max=3)=>`<span class="stars" aria-label="${n} of ${max} stars">${[0,1,2].slice(0,max).map(i=>`<i class="${i<n?'on':''}">★</i>`).join('')}</span>`;
const listenBtns=text=>`<div class="listen"><button class="pill" data-act="say" data-t="${attr(text)}">${UI.play}Listen</button><button class="pill" data-act="sayslow" data-t="${attr(text)}">${UI.slow}Slow</button></div>`;
const legend=()=>`<div class="legend" aria-label="Colour code"><span class="g g-s">S</span><span class="g g-v">V</span><span class="g g-a">Adv</span><span class="g g-j">Adj</span><span class="g g-u">in / ’s</span></div>`;

/* ---------- units: submit only when the whole unit is done ---------- */
const unitLessons=u=>LESSONS.filter(x=>x.u===u);
const unitOf=u=>UNITS.find(x=>x.n===u)||{n:u,t:''};
function unitState(u){
  const ls=unitLessons(u),done=ls.filter(x=>SAVE.done[x.id]);
  const noRec=done.filter(x=>REC_MISS.has(x.id));
  const last=done.reduce((m,x)=>Math.max(m,SAVE.done[x.id].at||0),0);
  const sent=SAVE.sent[u]||null;
  return {ls,done:done.length,total:ls.length,complete:done.length===ls.length,noRec,sent,fresh:!sent||last>sent.at};
}
function unitBox(u){
  const st=unitState(u),S=SEND[u]||{},name=`Unit ${u}`;
  if(!st.complete){
    const left=st.ls.filter(x=>!SAVE.done[x.id]).map(x=>tx(x.t));
    return `<div class="usend locked"><p class="us-t">${UI.lock}Gửi bài ${name}</p><p class="us-p">Làm xong cả ${st.total} bài của ${name} mới gửi được (đã xong ${st.done}/${st.total}).</p><p class="us-left">Còn: ${left.join(' · ')}</p></div>`;
  }
  if(st.noRec.length){
    return `<div class="usend warn"><p class="us-t">${UI.mic}Thiếu bản ghi âm</p><p class="us-p">Máy này không còn bản ghi âm của ${st.noRec.length===1?'bài':'các bài'} dưới đây. Hãy ghi âm lại phần Speaking rồi gửi bài nhé.</p>${st.noRec.map(x=>`<button class="btn small" data-act="resp" data-id="${x.id}">${UI.mic} ${tx(x.n)}: ${tx(x.t)}</button>`).join('')}</div>`;
  }
  let h='';
  if(st.sent&&!st.fresh&&!S.busy){
    h=`<div class="usend sent"><p class="us-t">${UI.check}Đã gửi ${name}</p><p class="us-p">Giáo viên đã nhận bài lúc ${fmtDate(st.sent.at)}. Nếu bạn làm lại một bài trong ${name}, nút gửi sẽ mở lại.</p>`;
  }else{
    h=`<div class="usend ready"><p class="us-t">${UI.mail}${name} xong rồi!</p><p class="us-p">${st.sent?'Bạn đã làm lại bài sau lần gửi trước. Có thể gửi bản mới.':`Gửi điểm và ${st.total} bản ghi âm cho giáo viên.`}</p>
    <button class="btn ok" data-act="send" data-u="${u}" ${S.busy?'disabled':''}>${S.busy?'Đang gửi…':`Send ${name} to my teacher`}</button>`;
  }
  if(S.busy)h+=`<p class="us-msg">${tx(S.msg||'')}</p>`;
  if(S.err)h+=`<p class="err">${tx(S.err)}</p>`;
  if(S.ok&&!S.busy)h+=`<p class="ok-msg">${UI.check}Gửi xong! Giáo viên đã nhận được bài của bạn.</p>`;
  return h+`</div>`;
}
function blobToB64(b){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result).split(',')[1]||'');fr.onerror=()=>rej(fr.error);fr.readAsDataURL(b);});}
async function sendUnit(u){
  const st=unitState(u);
  if(!st.complete||st.noRec.length||(SEND[u]&&SEND[u].busy))return;
  if(!SCRIPT_URL||SCRIPT_URL.includes('PASTE_')){SEND[u]={err:'Trang này chưa được nối với email của giáo viên. Nhờ giáo viên kiểm tra nhé.'};render();return;}
  if(!confirm(`Gửi bài Unit ${u} (${st.total} bài + ${st.total} bản ghi âm) cho giáo viên?`))return;
  SEND[u]={busy:true,msg:'Đang gửi… có thể mất đến 1 phút. Đừng đóng trang nhé.'};render();
  try{
    const lessons=[];
    for(const x of st.ls){
      const d=SAVE.done[x.id],blob=await getRec(x.id);
      if(!blob){REC_MISS.add(x.id);throw new Error('NOREC');}
      lessons.push({id:x.id,name:x.n,title:x.t,at:new Date(d.at).toISOString(),stars:d.stars,total:d.total,understand:d.c[0],use:d.c[1],challenge:d.c[2],
        wrong:d.wrong||[],speak:d.speak||'',own:d.own||'',rec:{mime:(d.rec&&d.rec.mime)||blob.type||'audio/webm',ext:(d.rec&&d.rec.ext)||'webm',dur:(d.rec&&d.rec.dur)||0,b64:await blobToB64(blob)}});
    }
    const payload={app:'vygrammar',key:APP_KEY,name:STUDENT,unit:u,unitTitle:unitOf(u).t,sentAt:new Date().toISOString(),lessons};
    const r=await fetch(SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const j=await r.json();
    if(!j.ok)throw new Error(j.error||'server error');
    SAVE.sent[u]={at:Date.now()};persist();SEND[u]={ok:true};
  }catch(e){
    const m=e&&e.message||String(e);
    SEND[u]=m==='NOREC'?{}:{err:`Chưa gửi được (${m}). Kiểm tra mạng rồi bấm gửi lại. Bài không bị mất.`};
  }
  render();
}

/* ---------- HOME ---------- */
function homeHTML(){
  const total=Object.values(SAVE.stars).reduce((a,b)=>a+b,0);
  let h=`<header class="home-head"><div><h1 class="hi">Hi, ${STUDENT}!</h1><p class="sub"><span class="star-i">★</span> ${total} / ${LESSONS.length*3}</p></div>${soundBtn()}</header>`;
  h+=`<section class="legend-box"><p>Màu ngữ pháp trong mọi câu:</p>${legend()}</section>`;
  const pr=SAVE.prog&&LESSONS.find(x=>x.id===SAVE.prog.id);
  if(pr&&SAVE.prog.qi<=12)h+=`<button class="resume" data-act="resume"><span class="tile sm ${tileTone(pr.ic)}">${iconSvg(pr.ic)}</span><span><b>Continue</b><br><small>${tx(pr.t)}, ${SAVE.prog.qi<12?`question ${SAVE.prog.qi+1} of 12`:'Speaking'}</small></span></button>`;
  const nextId=(LESSONS.find(x=>!SAVE.done[x.id])||{}).id;
  let k=0;
  for(const u of UNITS){
    const ls=unitLessons(u.n),st=unitState(u.n);
    h+=`<section class="unit"><div class="unit-head"><h2><span>Unit ${u.n}</span>${tx(u.t)}</h2><span class="uprog ${st.complete?'full':''}">${st.done}/${st.total}</span></div><ol class="path">`;
    ls.forEach(x=>{const s=SAVE.stars[x.id]||0,done=!!SAVE.done[x.id];h+=`<li class="node off${k++%4}${x.id===nextId?' next':''}${done?' done':''}"><button data-act="open" data-id="${x.id}"><span class="bubble ${tileTone(x.ic)}">${iconSvg(x.ic)}</span><span class="lbl"><small>${tx(x.n)}</small><b>${tx(x.t)}</b>${starRow(s)}</span></button></li>`;});
    h+=`</ol>${unitBox(u.n)}</section>`;
  }
  return h;
}

/* ---------- CARDS ---------- */
const legendGrid=()=>`<div class="lgrid">${[['s','S','Subject','chủ ngữ'],['v','V','Verb','động từ'],['a','Adv','Adverb','trạng từ'],['j','Adj','Adjective','tính từ']].map(([c,k,en,vi])=>`<div class="lg"><span class="key g-${c}">${k}</span><span><b>${en}</b><small>${vi}</small></span></div>`).join('')}</div>`;
function formulaRow(l){
  if(/ \+ /.test(l))return `<div class="frow">${l.split(' + ').map(p=>`<span class="blk">${cm(p)}</span>`).join('<span class="plus">+</span>')}</div>`;
  if(/ · /.test(l))return `<div class="frow">${l.split(' · ').map(p=>`<span class="blk">${cm(p)}</span>`).join('')}</div>`;
  return `<div class="frow"><span class="blk wide">${cm(l)}</span></div>`;
}
function cardsHTML(){
  const back=!!cardsBack;
  return `<div class="bar"><button class="iconbtn" data-act="${back?'cards-close':'home'}" aria-label="Close">${UI.close}</button><div class="prog"><i style="width:${back?qi/12*100:0}%"></i></div><span class="streak">${UI.flame}${streak}</span>${soundBtn()}</div>
  <header class="cards-head"><p class="lvl">Unit ${L.u} · ${tx(L.n)}</p><h1>${tx(L.t)}</h1></header>
  ${legendGrid()}
  ${L.cards.map((c,i)=>`<article class="card"><div class="card-top"><span class="num">${i+1}</span><div><h2>${tx(c.t)}</h2><p class="card-vi">${tx((CARD_VI[L.id]||[])[i]||'')}</p></div></div>
    <div class="card-ill">${illustration(c.ill)}</div>
    <div class="formula">${c.f.split('|').map(formulaRow).join('')}</div>
    <div class="exs">${c.ex.map(e=>`<div class="ex"><button class="spk" data-act="say" data-t="${attr(plain(e))}" aria-label="Listen">${UI.play}</button><p>${cm(e)}</p></div>`).join('')}</div>
    <div class="trap"><b>Watch out!</b><p>${tx(c.trap)}</p></div></article>`).join('')}
  <div class="foot"><button class="btn" data-act="${back?'cards-close':'cstart'}">${back?'Back to the lesson':'Start practice'}</button></div>`;
}

/* ---------- LEVEL INTRO ---------- */
function introHTML(){
  const l=lvlOf(qi),lv=LVL[l],n=l===2?2:5;
  return `<div class="bar"><button class="iconbtn" data-act="home" aria-label="Close">${UI.close}</button><div class="prog"><i style="width:${qi/12*100}%"></i></div>${soundBtn()}</div>
  <section class="intro"><div class="intro-art"><span class="tile xl t4">${iconSvg(lv.ic)}<i class="spark s1"></i><i class="spark s2"></i></span><span class="tile lg ${tileTone(L.ic)}">${iconSvg(L.ic)}</span></div>
  <p class="eyebrow">Level ${l+1} of 3</p><h2>${lv.n}</h2><p class="intro-vi">${tx(lv.vi)}</p><p class="intro-n">${n} questions</p></section>
  <div class="foot"><button class="btn" data-act="go">Let’s go</button></div>`;
}

/* ---------- QUESTIONS ---------- */
function initQ(){
  const q=L.q[qi];
  Q={q,tries:0,phase:'ask',first:null,firstOk:null,wrongOpts:[],vals:[],bad:[],built:[],pool:[],pick:null,matched:{},flash:null};
  if(q.t==='order')Q.pool=shuffle(q.w.map((w,i)=>({w,i})));
  if(q.t==='gap')Q.vals=q.a.map(()=>'');
  if(q.t==='forms')Q.vals=q.m.map(()=>'');
  if(q.t==='write')Q.vals=[''];
  if(q.t==='match'){const n=q.m.length,idx=[...Array(n).keys()];Q.left=shuffle(idx);let r;let guard=0;do{r=shuffle(idx);guard++;}while(guard<200&&r.some((v,i)=>v===Q.left[i]));Q.right=r;}
}
function lineHTML(t,blank,ctr){
  return tx(t).split('___').map((p,k,arr)=>p.replace(/\(([^)]+)\)/g,'<span class="cue">($1)</span>')+(k<arr.length-1?blank(ctr.i++):'')).join('');
}
function qText(s,blank){
  if(!s)return'';
  const ctr={i:0},lines=s.split('\n');
  if(lines.length>1&&/^A:/.test(lines[0]))return `<div class="dialog">${lines.map(l=>{const w=l.slice(0,1);return `<div class="bub ${w==='A'?'a':'b'}"><b>${w}</b><span>${lineHTML(l.slice(2).trim(),blank,ctr)}</span></div>`;}).join('')}</div>`;
  return `<p class="qline">${lines.map(l=>lineHTML(l,blank,ctr)).join('<br>')}</p>`;
}
function canCheck(){
  const t=Q.q.t;
  if(t==='gap'||t==='forms')return Q.vals.every(v=>v.trim());
  if(t==='write')return !!Q.vals[0].trim();
  if(t==='order')return Q.built.length>0;
  return false;
}
function qBody(){
  const q=Q.q,locked=Q.phase!=='ask',rv=Q.phase==='reveal';
  switch(q.t){
    case 'mc':{
      const fill=Q.phase==='done'||rv;
      const blank=()=>`<span class="blank ${fill?'filled':''}">${fill?tx(q.o[q.a]):'&nbsp;'}</span>`;
      const short=q.o.every(o=>o.length<=14);
      return qText(q.q,blank)+`<div class="opts ${short?'chips':''}">${q.o.map((o,i)=>{let c='';if(Q.wrongOpts.includes(i))c='wrong';if((Q.phase==='done'||rv)&&i===q.a)c='right';return `<button class="opt ${c}" data-act="opt" data-i="${i}" ${locked||Q.wrongOpts.includes(i)?'disabled':''}>${tx(o)}</button>`;}).join('')}</div>`;
    }
    case 'tf':{
      const pick=Q.first;
      return `<p class="qline big">${tx(q.q)}</p><div class="opts two">${[['Correct',true],['Not correct',false]].map(([l,v])=>{let c='';if(locked&&v===q.a)c='right';else if(locked&&pick===l)c='wrong';return `<button class="opt ${c}" data-act="tf" data-v="${v?1:0}" ${locked?'disabled':''}>${v?UI.check:UI.x}${l}</button>`;}).join('')}</div>`;
    }
    case 'tap':{
      return `<div class="words">${q.q.split(' ').map((w,i)=>{let c='';if(Q.wrongOpts.includes(i))c='wrong';if((Q.phase==='done'||rv)&&i===q.a)c='right';return `<button class="word ${c}" data-act="tapw" data-i="${i}" ${locked||Q.wrongOpts.includes(i)?'disabled':''}>${tx(w)}</button>`;}).join('')}</div>`;
    }
    case 'match':{
      const col=(arr,side)=>arr.map(pi=>{const m=Q.matched[pi];const sel=side==='l'&&Q.pick===pi;const fl=Q.flash&&Q.flash[side]===pi;return `<button class="mt ${m?'ok':''} ${sel?'sel':''} ${fl?'bad':''}" data-act="m${side}" data-i="${pi}" ${m||locked?'disabled':''}>${tx(q.m[pi][side==='l'?0:1])}</button>`;}).join('');
      return `<p class="tip">Chạm một ô bên trái, rồi chạm ô hợp với nó bên phải.</p><div class="match"><div>${col(Q.left,'l')}</div><div>${col(Q.right,'r')}</div></div>`;
    }
    case 'gap':{
      const blank=i=>{const w=Math.max(4,...q.a[i].map(a=>a.length))+1;return `<input class="gapin ${Q.bad[i]&&!locked?'bad':''} ${rv?'shown':''}" data-g="${i}" value="${attr(typo(Q.vals[i]))}" style="width:${w+1}ch" aria-label="Gap ${i+1}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" ${locked?'readonly':''}>`;};
      return qText(q.q,blank);
    }
    case 'forms':{
      return `<div class="forms">${q.m.map(([b],i)=>`<label class="frm"><span><b>${b}</b></span><span class="arr">→</span><span>${q.pre} <input class="gapin ${Q.bad[i]&&!locked?'bad':''} ${rv?'shown':''}" data-g="${i}" value="${attr(Q.vals[i])}" style="width:11ch" aria-label="${b}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" ${locked?'readonly':''}></span></label>`).join('')}</div>`;
    }
    case 'order':{
      const built=rv?q.a.replace(/[.?!]$/,'').split(' ').map(w=>({w})):Q.built;
      return `<div class="answer-line ${Q.tries&&Q.phase==='hint'?'bad':''}">${built.length?built.map((b,k)=>`<button class="tl in" data-act="ob" data-k="${k}" ${locked?'disabled':''}>${tx(b.w)}</button>`).join(''):'<span class="ph">Chạm vào các từ bên dưới</span>'}</div>
      <div class="pool">${Q.pool.map((p,k)=>`<button class="tl" data-act="op" data-k="${k}" ${locked?'disabled':''}>${tx(p.w)}</button>`).join('')}</div><p class="tip">Có 1 từ thừa, không cần dùng.</p>`;
    }
    case 'write':{
      return `<div class="src">${tx(q.q)}</div><textarea class="wr ${Q.tries&&!locked?'bad':''}" data-g="0" rows="2" aria-label="Your answer" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Type here…" ${locked?'readonly':''}>${esc(Q.vals[0])}</textarea>`;
    }
  }
  return '';
}
function sheetHTML(){
  const q=Q.q;
  if(Q.phase==='hint')return `<div class="sheet hint" role="status"><p class="sh-t">${UI.bulb}Not quite. Try again!</p><p class="sh-h">${tx(q.h)}</p><button class="btn" data-act="retry">Try again</button></div>`;
  if(Q.phase==='ask')return '';
  const ok=Q.phase==='done',first=Q.tries===0;
  const ttl=ok?(first?['Great!','Correct!','Nice work!','You got it!'][qi%4]:'Good, you fixed it.'):'Here’s the answer.';
  const speakT=plain(q.s);
  let body=`<p class="sh-say">${cm(q.s)}</p>`;
  if(q.t==='tap'&&!ok)body=`<p class="sh-h">Từ sai: <b>${tx(q.q.split(' ')[q.a])}</b></p>`+body;
  if(q.t==='match')body=`<ul class="pairs">${q.m.map(p=>`<li>${tx(p[0])} <span>→</span> ${tx(p[1])}</li>`).join('')}</ul>`;
  if(q.t==='forms')body=`<ul class="pairs">${q.m.map(p=>`<li>${q.pre} ${tx(p[0])} <span>→</span> <b>${q.pre} ${tx(p[1])}</b></li>`).join('')}</ul>`;
  const showEx=!ok||q.t==='tf';
  return `<div class="sheet ${ok?'good':'reveal'}" role="status"><p class="sh-t">${ok?UI.check:UI.bulb}${ttl}</p>${body}${showEx?`<p class="sh-ex">${tx(q.e)}</p>`:''}${listenBtns(speakT)}<button class="btn ${ok?'ok':''}" data-act="next">Continue</button></div>`;
}
const TYPE_TAG={mc:'Choose',tf:'True or false',tap:'Find the mistake',match:'Match',gap:'Fill in',order:'Word order',write:'Write',forms:'Spelling'};
function qHTML(){
  const q=Q.q,l=lvlOf(qi);
  const needCheck=['gap','forms','order','write'].includes(q.t)&&Q.phase==='ask';
  return `<div class="bar"><button class="iconbtn" data-act="home" aria-label="Close">${UI.close}</button><div class="prog"><i style="width:${qi/12*100}%"></i></div><span class="streak ${streak?'hot':''}" title="Đúng liên tiếp">${UI.flame}${streak}</span>${soundBtn()}<button class="iconbtn" data-act="cards-open" aria-label="Open the rule cards">${UI.book}</button></div>
  <section class="qcard"><div class="qhead"><div class="qh-l"><p class="lvl">Level ${l+1} · ${qi+1}/12 <span class="tag">${TYPE_TAG[q.t]}</span></p><h2 class="prompt">${tx(q.p||DEF_P[q.t])}</h2></div><span class="tile qbig ${tileTone(q.i)}">${iconSvg(q.i)}<i class="spark s1"></i><i class="spark s2"></i></span></div>
  <div class="qbody">${qBody()}</div></section>
  ${needCheck?`<div class="foot"><button class="btn" data-act="check" ${canCheck()?'':'disabled'}>Check</button></div>`:''}
  ${sheetHTML()}`;
}
function evaluate(){
  const q=Q.q;
  switch(q.t){
    case 'gap':{const bad=q.a.map((alts,i)=>!alts.some(a=>same(a,Q.vals[i])));return {ok:!bad.some(Boolean),bad,ans:Q.vals.join(' / ')};}
    case 'forms':{const bad=q.m.map((p,i)=>!same(p[1],Q.vals[i],true));return {ok:!bad.some(Boolean),bad,ans:Q.vals.join(', ')};}
    case 'write':{const v=Q.vals[0];return {ok:q.a.some(a=>same(a,v,q.x)),ans:v};}
    case 'order':{const v=Q.built.map(b=>b.w).join(' ');return {ok:same(v,q.a,true),ans:v};}
  }
  return {ok:false,ans:''};
}
function fail(){
  Q.tries++;streak=0;
  if(Q.tries===1&&Q.q.t!=='tf'){Q.phase='hint';tone(false);render();focusBad();}
  else reveal();
}
function reveal(){
  const q=Q.q;Q.phase='reveal';Q.firstOk=false;streak=0;
  if(q.t==='gap')Q.vals=q.a.map(a=>a[0]);
  if(q.t==='forms')Q.vals=q.m.map(p=>p[1]);
  if(q.t==='match')q.m.forEach((_,i)=>Q.matched[i]=true);
  tone(false);render();autoSay(plain(q.s));
}
function finish(){
  Q.firstOk=Q.tries===0;Q.phase='done';if(Q.firstOk)streak++;
  tone(true);render();autoSay(plain(Q.q.s));
}
function focusBad(){
  setTimeout(()=>{const el=document.querySelector('.gapin.bad, textarea.bad, .gapin');if(el&&Q&&['gap','forms','write'].includes(Q.q.t))try{el.focus();}catch(e){}},50);
}
function qLabel(q){
  const p=q.p||DEF_P[q.t];
  if(q.t==='match')return p+' '+q.m.map(x=>x[0]+' – '+x[1]).join('; ');
  if(q.t==='forms')return p+' '+q.m.map(x=>x[0]).join(', ');
  if(q.t==='order')return p+' '+q.w.join(' / ');
  if(q.t==='mc'&&!q.q)return p+' '+q.o.join(' | ');
  return p+' '+String(q.q||'').replace(/\n/g,' ');
}
function next(){
  res.push({i:qi,lvl:lvlOf(qi),ok:!!Q.firstOk,first:Q.first==null?'':String(Q.first),q:qLabel(Q.q),cor:plain(Q.q.s)});
  qi++;
  SAVE.prog={id:L.id,qi,res,streak};persist();
  hush();
  if(qi>=12){startSpeak();return;}
  if(qi===5||qi===10){view='intro';render();return;}
  initQ();view='q';render();
}

/* ---------- SPEAKING + RECORDING ---------- */
function spVal(k,n){const o=L.sp.sl[k][spIdx[k]];return Array.isArray(o)?o[+(n||0)]:o;}
function spPlain(){return plain(L.sp.tpl).replace(/\{([a-z]+)(?:\.(\d))?\}/g,(_,k,n)=>spVal(k,n));}
function spRender(mode){
  const sub=t=>t.split(/(\{[a-z]+(?:\.\d)?\})/).map(p=>{const m=p.match(/^\{([a-z]+)(?:\.(\d))?\}$/);if(!m)return tx(p);const v=tx(spVal(m[1],m[2]));return mode==='chips'?`<button class="slot" data-act="slot" data-k="${m[1]}" aria-label="Change: ${attr(spVal(m[1],m[2]))}" ${REC?'disabled':''}>${v}${UI.cycle}</button>`:v;}).join('');
  let o='',last=0,m;const s=L.sp.tpl,re=/\[(s|v|a|j|u):([^\]]*)\]/g;
  while((m=re.exec(s))){o+=sub(s.slice(last,m.index))+(mode==='chips'?sub(m[2]):`<span class="g g-${m[1]}">${sub(m[2])}</span>`);last=re.lastIndex;}
  return o+sub(s.slice(last));
}
function dropRec(){
  if(REC){try{REC.discard=true;if(REC.mr.state!=='inactive')REC.mr.stop();}catch(e){}}
  if(spRec&&spRec.url)try{URL.revokeObjectURL(spRec.url);}catch(e){}
  spRec=null;recMsg='';
}
function startSpeak(){dropRec();spIdx={};Object.keys(L.sp.sl).forEach(k=>spIdx[k]=0);own='';saveWarn=false;view='speak';render();window.scrollTo(0,0);autoSay(spPlain());}
const recOK=()=>!!(spRec&&spRec.text===spPlain());
function recBoxHTML(){
  let h='';
  if(REC){
    h=`<p class="rec-t live"><i class="rdot"></i>Recording… đọc to và rõ nhé</p><button class="recbtn on" data-act="recstop" aria-label="Stop recording">${UI.stop}</button>
    <div class="rectime" id="rtime">${fmtSec((Date.now()-REC.t0)/1000)}</div><div class="recbar"><i id="rbar"></i></div><p class="small">Đọc xong thì bấm ■ để dừng (tối đa ${MAX_REC} giây).</p>`;
  }else if(spRec){
    const stale=spRec.text!==spPlain();
    h=`<p class="rec-t">${UI.check}Your recording <span>(${fmtSec(spRec.dur)})</span></p><audio controls preload="metadata" src="${spRec.url}"></audio>
    ${stale?`<p class="err">Bạn vừa đổi câu. Hãy ghi âm lại câu mới nhé.</p>`:`<p class="small">Nghe lại bản ghi. Chưa ưng thì ghi lại, bản mới sẽ thay bản cũ.</p>`}
    <button class="btn ghost small" data-act="recstart">${UI.mic} Record again</button>`;
  }else{
    h=`<p class="rec-t">Bấm micro rồi đọc to câu ở trên</p><button class="recbtn" data-act="recstart" aria-label="Start recording">${UI.mic}</button><p class="small">Nếu bạn viết câu của riêng mình ở dưới, đọc luôn câu đó trong bản ghi.</p>`;
  }
  if(recMsg)h+=`<p class="err">${tx(recMsg)}</p>`;
  return h;
}
function speakHTML(){
  const t=spPlain();
  return `<div class="bar"><button class="iconbtn" data-act="home" aria-label="Close">${UI.close}</button><div class="prog"><i style="width:100%"></i></div><span class="streak ${streak?'hot':''}">${UI.flame}${streak}</span>${soundBtn()}<button class="iconbtn" data-act="cards-open" aria-label="Open the rule cards">${UI.book}</button></div>
  <section class="speak"><div class="qhead"><div class="qh-l"><p class="lvl">Speaking <span class="tag">Record it</span></p><h2 class="prompt">${tx(L.sp.t)}</h2></div><span class="tile qbig t5">${iconSvg('mic')}<i class="spark s1"></i><i class="spark s2"></i></span></div>
  <ol class="steps"><li>Chạm ô tím để đổi từ cho đúng với bạn.</li><li>Nghe mẫu.</li><li>Ghi âm: đọc to, chậm và rõ.</li></ol>
  <p class="sp-sentence">${spRender('chips')}</p>
  <div class="sp-colored">${spRender('color')}</div>
  ${listenBtns(t)}
  <div class="rec" id="recbox">${recBoxHTML()}</div>
  <label class="own"><b>Câu thật về bạn (nếu khác câu trên, không bắt buộc)</b><textarea data-own rows="2" placeholder="Write your own sentence…" autocapitalize="sentences" spellcheck="false">${esc(own)}</textarea></label>
  </section>
  <div class="foot"><button class="btn" data-act="tores" ${recOK()&&!REC?'':'disabled'}>${speakOnly?'Save recording':'Continue'}</button></div>`;
}
function paintRec(){
  const b=document.getElementById('recbox');if(b)b.innerHTML=recBoxHTML();
  const c=document.querySelector('[data-act="tores"]');if(c)c.disabled=!(recOK()&&!REC);
  document.querySelectorAll('.slot').forEach(s=>s.disabled=!!REC);
}
function pickMime(){
  const c=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus','audio/ogg'];
  if(!window.MediaRecorder||!MediaRecorder.isTypeSupported)return '';
  return c.find(m=>MediaRecorder.isTypeSupported(m))||'';
}
const extOf=t=>/mp4|aac|m4a/.test(t)?'m4a':/ogg/.test(t)?'ogg':/wav/.test(t)?'wav':'webm';
async function recStart(){
  if(REC)return;
  hush();recMsg='';
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!window.MediaRecorder){recMsg='Trình duyệt này không ghi âm được. Hãy mở trang bằng Chrome (Android, máy tính) hoặc Safari (iPhone, iPad).';paintRec();return;}
  let stream;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});}
  catch(e){const denied=e&&(e.name==='NotAllowedError'||e.name==='SecurityError');recMsg=denied?'Micro đang bị chặn. Bấm biểu tượng 🔒 cạnh địa chỉ trang, cho phép Micro rồi thử lại.':'Không tìm thấy micro. Kiểm tra micro hoặc tai nghe rồi thử lại.';paintRec();return;}
  if(view!=='speak'||REC){stream.getTracks().forEach(t=>t.stop());return;}
  const mime=pickMime();let mr;
  try{mr=new MediaRecorder(stream,Object.assign({audioBitsPerSecond:48000},mime?{mimeType:mime}:{}));}catch(e){mr=new MediaRecorder(stream);}
  const r={mr,stream,chunks:[],t0:Date.now(),text:spPlain(),discard:false};
  REC=r;
  mr.ondataavailable=e=>{if(e.data&&e.data.size)r.chunks.push(e.data);};
  mr.onstop=()=>recDone(r);
  mr.start(1000);
  r.timer=setInterval(()=>{const s=(Date.now()-r.t0)/1000,tm=document.getElementById('rtime'),bar=document.getElementById('rbar');if(tm)tm.textContent=fmtSec(s);if(bar)bar.style.width=Math.min(100,s/MAX_REC*100)+'%';if(s>=MAX_REC)recStop();},250);
  paintRec();
}
function recStop(){if(REC&&REC.mr.state!=='inactive')REC.mr.stop();}
function recDone(r){
  clearInterval(r.timer);
  try{r.stream.getTracks().forEach(t=>t.stop());}catch(e){}
  if(REC===r)REC=null;
  if(r.discard)return;
  const type=r.mr.mimeType||(r.chunks[0]&&r.chunks[0].type)||'audio/webm';
  const dur=Math.min(MAX_REC,(Date.now()-r.t0)/1000);
  const blob=new Blob(r.chunks,{type});
  if(blob.size<500||dur<1){recMsg='Bản ghi ngắn quá. Thử lại nhé.';paintRec();return;}
  if(spRec&&spRec.url)try{URL.revokeObjectURL(spRec.url);}catch(e){}
  spRec={blob,url:URL.createObjectURL(blob),mime:type.split(';')[0],ext:extOf(type),dur:Math.round(dur),text:r.text};
  paintRec();
}
async function toResult(){
  if(!recOK()||REC)return;
  const id=L.id,rec={mime:spRec.mime,ext:spRec.ext,dur:spRec.dur,size:spRec.blob.size};
  const stored=await saveRec(id,spRec.blob);
  if(speakOnly){
    const d=SAVE.done[id];
    if(d){d.rec=rec;d.speak=spPlain();if(own.trim())d.own=own.trim();d.at=Date.now();}
    persist();speakOnly=false;dropRec();view='home';render();window.scrollTo(0,0);return;
  }
  const s=score();
  SAVE.stars[id]=Math.max(SAVE.stars[id]||0,s.stars);
  SAVE.done[id]={at:Date.now(),stars:s.stars,total:s.t,c:s.c,speak:spPlain(),own:own.trim(),rec,
    wrong:res.filter(r=>!r.ok).map(r=>({level:LVL[r.lvl].n,q:r.q,first:r.first,correct:r.cor}))};
  SAVE.prog=null;persist();
  saveWarn=!stored;dropRec();
  view='result';render();window.scrollTo(0,0);if(s.stars===3)tone(true);
}

/* ---------- RESULT ---------- */
function score(){const c=[0,0,0];res.forEach(r=>{if(r.ok)c[r.lvl]++;});const t=c[0]+c[1]+c[2];return {c,t,stars:t>=11?3:t>=8?2:1};}
function resultHTML(){
  const s=score(),miss=res.filter(r=>!r.ok);
  return `<div class="bar"><button class="iconbtn" data-act="home" aria-label="Close">${UI.close}</button><div class="prog"><i style="width:100%"></i></div>${soundBtn()}</div>
  <section class="result"><p class="eyebrow">${tx(L.n)}: ${tx(L.t)}</p><h2>${s.stars===3?'Excellent!':s.stars===2?'Well done!':'Good effort!'}</h2><div class="bigstars">${starRow(s.stars)}</div>
  <p class="tip center">Sao tính theo số câu đúng ngay lần đầu.</p>
  <div class="lvls">${LVL.map((lv,i)=>`<div><b>${s.c[i]}/${i===2?2:5}</b><span>${lv.n}</span></div>`).join('')}</div>
  ${saveWarn?`<p class="err">Máy này không lưu được bản ghi âm. Nếu đóng trang trước khi gửi bài, bạn sẽ phải ghi âm lại.</p>`:''}
  ${miss.length?`<h3>Review these</h3><ul class="review">${miss.map(r=>{const q=L.q[r.i];return `<li><p class="sh-say">${cm(q.s)}</p><p class="small">${tx(q.e)}</p><button class="iconbtn sm" data-act="say" data-t="${attr(r.cor)}" aria-label="Listen">${UI.play}</button></li>`;}).join('')}</ul>`:`<p class="allright">Tất cả đúng ngay lần đầu!</p>`}
  <div class="submit-box">${unitBox(L.u)}</div>
  </section>
  <div class="foot two"><button class="btn ghost" data-act="again">Do it again</button><button class="btn ghost" data-act="home">Back to path</button></div>`;
}

/* ---------- render + actions ---------- */
function render(){
  const app=document.getElementById('app');
  let h='';
  if(view==='home')h=homeHTML();else if(view==='cards')h=cardsHTML();else if(view==='intro')h=introHTML();else if(view==='q')h=qHTML();else if(view==='speak')h=speakHTML();else if(view==='result')h=resultHTML();
  app.innerHTML=h;app.className='v-'+view;
}
function openLesson(id,resume){
  L=LESSONS.find(x=>x.id===id);if(!L)return;
  cardsBack=null;speakOnly=false;
  if(resume&&SAVE.prog&&SAVE.prog.id===id){qi=SAVE.prog.qi;res=SAVE.prog.res||[];streak=SAVE.prog.streak||0;if(qi>=12){startSpeak();return;}view=(qi===5||qi===10||qi===0)?'intro':'q';if(view==='q')initQ();render();window.scrollTo(0,0);return;}
  qi=0;res=[];streak=0;SAVE.prog=null;persist();view='cards';render();window.scrollTo(0,0);
}
const ACT={
  sound(){SAVE.sound=!SAVE.sound;persist();if(!SAVE.sound)hush();if(view==='speak'){const b=document.querySelector('[data-act="sound"]');if(b)b.outerHTML=soundBtn();}else render();},
  open(b){openLesson(b.dataset.id,false);},
  resume(){openLesson(SAVE.prog.id,true);},
  home(){hush();dropRec();speakOnly=false;view='home';render();window.scrollTo(0,0);},
  cstart(){view='intro';render();window.scrollTo(0,0);},
  'cards-open'(){if(REC){REC.discard=true;recStop();}cardsBack=view;view='cards';render();window.scrollTo(0,0);},
  'cards-close'(){view=cardsBack||'q';cardsBack=null;render();},
  go(){initQ();view='q';render();window.scrollTo(0,0);},
  say(b){if(!REC)say(b.dataset.t,false);},
  sayslow(b){if(!REC)say(b.dataset.t,true);},
  opt(b){const i=+b.dataset.i,q=Q.q;if(Q.first==null)Q.first=q.o[i];if(i===q.a)finish();else{Q.wrongOpts.push(i);fail();}},
  tf(b){const v=b.dataset.v==='1',q=Q.q;if(Q.first==null)Q.first=v?'Correct':'Not correct';if(v===q.a)finish();else fail();},
  tapw(b){const i=+b.dataset.i,q=Q.q,w=q.q.split(' ');if(Q.first==null)Q.first=w[i];if(i===q.a)finish();else{Q.wrongOpts.push(i);fail();}},
  ml(b){Q.pick=+b.dataset.i;Q.flash=null;render();},
  mr(b){
    const r=+b.dataset.i,q=Q.q;
    if(Q.pick==null)return;
    if(Q.pick===r){Q.matched[r]=true;Q.pick=null;Q.flash=null;if(Object.keys(Q.matched).length===q.m.length){if(Q.first==null)Q.first='(all correct)';finish();}else render();}
    else{if(Q.first==null)Q.first=q.m[Q.pick][0]+' – '+q.m[r][1];Q.flash={l:Q.pick,r};Q.pick=null;fail();}
  },
  op(b){const k=+b.dataset.k;Q.built.push(Q.pool.splice(k,1)[0]);render();},
  ob(b){const k=+b.dataset.k;Q.pool.push(Q.built.splice(k,1)[0]);render();},
  check(){if(!canCheck())return;const r=evaluate();if(Q.first==null)Q.first=r.ans;Q.bad=r.bad||[];if(r.ok)finish();else fail();},
  retry(){Q.phase='ask';Q.flash=null;render();focusBad();},
  next(){next();window.scrollTo(0,0);},
  slot(b){if(REC)return;const k=b.dataset.k;spIdx[k]=(spIdx[k]+1)%L.sp.sl[k].length;render();autoSay(spPlain());},
  recstart(){recStart();},
  recstop(){recStop();},
  tores(b){b.disabled=true;toResult();},
  send(b){sendUnit(+b.dataset.u);},
  resp(b){L=LESSONS.find(x=>x.id===b.dataset.id);if(!L)return;speakOnly=true;cardsBack=null;startSpeak();speakOnly=true;},
  again(){openLesson(L.id,false);}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const f=ACT[b.dataset.act];if(f)f(b);});
document.addEventListener('input',e=>{const t=e.target;if(t.matches('[data-g]')&&Q&&Q.phase==='ask'){Q.vals[+t.dataset.g]=t.value;t.classList.remove('bad');const c=document.querySelector('[data-act="check"]');if(c)c.disabled=!canCheck();}});
document.addEventListener('input',e=>{if(e.target.matches('[data-own]'))own=e.target.value;});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-g]')){e.preventDefault();if(view==='q'&&Q.phase==='ask'&&canCheck())ACT.check();}});
window.addEventListener('beforeunload',e=>{if(REC||Object.values(SEND).some(s=>s.busy)){e.preventDefault();e.returnValue='';}});
render();
