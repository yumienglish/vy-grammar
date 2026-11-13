/* Vy's Grammar Path – illustrations.
   Everything is drawn inline as SVG (no outside images). Style: cartoon stickers with a soft
   outline, a shaded side, and a white shine. Each icon uses a 64×64 viewBox. */
const INK='#3a3160', OL='#4a3f78', WH='#ffffff', GY='#c3c5d6', GYD='#9a9cb3',
  SK='#ffd9bd', SKD='#f0b48c', BLUSH='#ff8fa8',
  PU='#8f74ff', PUD='#6a4fe0', PL='#d9cfff',
  BL='#5b9cff', BLD='#3a78e0', BLL='#cfe1ff',
  RD='#ff6f6a', RDD='#d94a45',
  GR='#4cc488', GRD='#2f9c66', GRL='#c9f0db',
  YE='#ffd04d', YED='#eea620',
  PK='#ff9ec0', PKD='#e8749c',
  OR='#ffab5e', ORD='#e8832f',
  WD='#e6ad74', WDD='#b97a43', WDL='#f4cfa2',
  HAIR='#6b4434';

/* small helpers */
const ol=(w=1.5,c=OL)=>`stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const shade=(d,o=.13)=>`<path d="${d}" fill="#1b1040" opacity="${o}"/>`;
const shine=(d,w=2,o=.6)=>`<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
const dot=(x,y,r,f,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o<1?` opacity="${o}"`:''}/>`;

/* ---------- people ---------- */
function face(o={}){
  const hc=o.hc||HAIR;
  const eye=x=>`<ellipse cx="${x}" cy="27.4" rx="2" ry="2.5" fill="${INK}"/>${dot(x+.65,26.5,.8,'#fff')}${dot(x-.6,28.4,.4,'#fff',.8)}`;
  const brow=o.brow===false?'':`<path d="M25.3 23.2q2.2-1.4 4.4-.2M34.3 23q2.2-1.2 4.4.2" fill="none" stroke="${hc}" stroke-width="1.3" stroke-linecap="round"/>`;
  return `${eye(27.6)}${eye(36.4)}${brow}
  <ellipse cx="24.2" cy="31.2" rx="2.5" ry="1.5" fill="${BLUSH}" opacity=".5"/><ellipse cx="39.8" cy="31.2" rx="2.5" ry="1.5" fill="${BLUSH}" opacity=".5"/>
  <path d="M31.3 30.2q.7.7 1.4 0" fill="none" stroke="${SKD}" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M29.2 32.4q2.8 3.2 5.6 0z" fill="#d9536b" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/><path d="M30.4 33.6q1.6 1 3.2 0" fill="none" stroke="#ff9db0" stroke-width=".9"/>`;
}
const HAIRS={
  short:(c)=>({front:`<path d="M19.6 27c-1.4-10.4 4.6-15.8 12.4-15.8 8.4 0 13.6 5.4 12.4 15.6-1.4-4.6-4-7.2-7.6-8-2.4 2.6-8.4 3.6-13.6 3.4-1.8 1.2-3 2.8-3.6 4.8z" fill="${c}" ${ol(1.2,INK)}/>${shine('M26 15.2q5.2-2.6 10.4-.4',1.8,.4)}`,back:''}),
  spiky:(c)=>({front:`<path d="M19.8 27c-2-8 1-13 5-15l-.4-3 3.6 2 2.6-3.4 2 3.2 3.4-2.6.4 3.6 3.8-1-.8 3.6c3 2.4 4.8 6.6 3.6 12.6-1.2-4.4-4-7-7.4-7.8-3 2.6-8.6 3-13.4 3.4-1.6 1.2-2.6 2.6-3.2 4.4z" fill="${c}" ${ol(1.2,INK)}/>${shine('M26 16q5-2.4 10-.6',1.6,.35)}`,back:''}),
  long:(c)=>({back:`<path d="M18 28c0-12 5.8-17.6 14-17.6S46 16 46 28v18.5q-3.6 2.4-7.4 0V31H25.4v15.5q-3.8 2.4-7.4 0z" fill="${c}" ${ol(1.2,INK)}/>`,
    front:`<path d="M20 27.4c0-10.6 5-15.6 12-15.6s12 5 12 15.6c-2.6-5.4-6.6-7.6-10.8-7.8-2 2.6-6 3.8-10.4 3.8-1.2 1.2-2.2 2.4-2.8 4z" fill="${c}" ${ol(1.2,INK)}/>${shine('M25.6 15.6q5.6-2.6 11.2 0',1.8,.4)}`}),
  bun:(c)=>({back:`<circle cx="32" cy="9.6" r="5.6" fill="${c}" ${ol(1.2,INK)}/>${shine('M29.4 7.6q2.4-1.8 4.8-.6',1.4,.4)}`,
    front:`<path d="M20 27c0-9.8 5.2-14.6 12-14.6S44 17.2 44 27c-3.6-5.6-8.4-7-12-7s-8.4 1.4-12 7z" fill="${c}" ${ol(1.2,INK)}/><path d="M28.8 13.4h6.4" stroke="${PK}" stroke-width="2.4" stroke-linecap="round"/>`}),
  none:()=>({back:'',front:''})
};
/* person(shirt, hair style, hair colour, extra drawn on top, extra drawn behind) */
function person(sh=PU,hair='short',hc=HAIR,extra='',back=''){
  const H=(HAIRS[hair]||HAIRS.short)(hc);
  return `${back}${H.back}
  <path d="M11 64c0-12.6 8.6-19.6 21-19.6S53 51.4 53 64z" fill="${sh}" ${ol(1.3,INK)}/>
  ${shade('M42 46.4c6.4 2.6 11 8.6 11 17.6h-8.6c.4-6.8-.6-12.6-2.4-17.6z',.12)}
  <path d="M19.4 51v13M44.6 51v13" stroke="#1b1040" stroke-opacity=".14" stroke-width="1.4"/>
  <rect x="27.6" y="35" width="8.8" height="11" rx="3.4" fill="${SK}" ${ol(1.1,INK)}/>
  ${shade('M27.8 39h8.4v3.4q-4.2 2.4-8.4 0z',.16)}
  <path d="M26.4 44.8l5.6 5.4 5.6-5.4" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="20.2" cy="27.6" r="2.7" fill="${SK}" ${ol(1.1,INK)}/><circle cx="43.8" cy="27.6" r="2.7" fill="${SK}" ${ol(1.1,INK)}/>
  <circle cx="20.4" cy="27.8" r="1.1" fill="${SKD}"/><circle cx="43.6" cy="27.8" r="1.1" fill="${SKD}"/>
  <ellipse cx="32" cy="25.8" rx="12.2" ry="12.4" fill="${SK}" ${ol(1.2,INK)}/>
  ${H.front}${face({hc})}${extra}`;
}
const glassesOn=`<g fill="#fff" fill-opacity=".25" stroke="${INK}" stroke-width="1.4"><circle cx="27.6" cy="27.4" r="3.9"/><circle cx="36.4" cy="27.4" r="3.9"/></g><path d="M31.5 27.2h1" stroke="${INK}" stroke-width="1.4"/>`;
const coat=`<path d="M11 64c0-12.6 8.6-19.6 21-19.6S53 51.4 53 64z" fill="#fff" ${ol(1.3,INK)}/><path d="M27 45l5 19 5-19" fill="${BLL}" ${ol(1,INK)}/><path d="M24.6 45.6l4.6 9.6-3.2 1.8 3.2 2.2M39.4 45.6l-4.6 9.6 3.2 1.8-3.2 2.2" fill="none" stroke="${GY}" stroke-width="1.4" stroke-linejoin="round"/>`;
function mini(x,y,s,inner){return `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`}

const ICONS={
  girl:()=>person(PK,'long',HAIR,`<path d="M38.6 15.4l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.3 1.3.4-2.6-1.9-1.9 2.6-.4z" fill="${YE}" ${ol(.8,YED)}/><path d="M24 55h16" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="1 3" stroke-linecap="round"/>`),
  boy:()=>person(BL,'spiky','#4a2f22',`<path d="M14.5 54h35M13 59h38" stroke="#fff" stroke-opacity=".45" stroke-width="2.2"/>`),
  woman:()=>person(PU,'bun','#7a4428',`<circle cx="20.2" cy="31.4" r="1.4" fill="${YE}" ${ol(.7,YED)}/><circle cx="43.8" cy="31.4" r="1.4" fill="${YE}" ${ol(.7,YED)}/><circle cx="32" cy="56" r="1.3" fill="#fff" opacity=".8"/><circle cx="32" cy="61" r="1.3" fill="#fff" opacity=".8"/>`),
  man:()=>person(GR,'short','#2a2230',`<path d="M27 45l5 6 5-6" fill="#fff" ${ol(.9,INK)}/><path d="M32 50.4l-2 3 2 10.6 2-10.6z" fill="${RD}" ${ol(.9,INK)}/><path d="M24.6 34.6q7.4 5.4 14.8 0" fill="none" stroke="#2a2230" stroke-opacity=".18" stroke-width="2.4" stroke-linecap="round"/>`),
  teacher:()=>person('#a58bff','bun','#5a3420',glassesOn+`<g transform="rotate(-8 44 54)"><rect x="37" y="48" width="15" height="12" rx="1.6" fill="${YE}" ${ol(1.1,INK)}/><path d="M44.5 48v12" stroke="${YED}" stroke-width="1.4"/><path d="M39.5 52h3.4M39.5 55h3.4M46.5 52h3.4" stroke="#fff" stroke-width="1" opacity=".8"/></g>`),
  doctor:()=>person(BLL,'short','#2a2230',`<path d="M24 46.6q-1 9.6 8 10.4 9-.8 8-10.4" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="32" cy="57.4" r="2.6" fill="${GY}" ${ol(1,INK)}/><rect x="40" y="55" width="7" height="6" rx="1" fill="#fff" ${ol(.9,GYD)}/><path d="M42 53.6v4" stroke="${BL}" stroke-width="1.4" stroke-linecap="round"/>`,coat),
  nurse:()=>person('#9fd3ff','long','#7a4428',`<path d="M24.6 15.2q7.4-3.6 14.8 0l-1 4.6q-6.4-2-12.8 0z" fill="#fff" ${ol(1.1,INK)}/><path d="M32 14.4v4M30 16.4h4" stroke="${RD}" stroke-width="1.7" stroke-linecap="round"/><rect x="37.6" y="52" width="7" height="6.4" rx="1.2" fill="#fff" opacity=".7"/>`),
  chef:()=>person('#fff','none','#000',`<path d="M21.6 21.4c-4.6-1.4-5-8.2.4-9.4 1-5.4 8.4-6.6 10-2.2 1.8-4.4 9.2-3.2 10 2.2 5.4 1.2 5 8-.4 9.4z" fill="#fff" ${ol(1.2,INK)}/><path d="M22 18.4h20" stroke="${GY}" stroke-width="1.2"/><path d="M27 45.4l5 4.6 5-4.6-2.4 6.6h-5.2z" fill="${RD}" ${ol(1,INK)}/><g fill="${GY}"><circle cx="28" cy="55" r="1.2"/><circle cx="36" cy="55" r="1.2"/><circle cx="28" cy="60" r="1.2"/><circle cx="36" cy="60" r="1.2"/></g>`,`<path d="M20.4 24c-.6-3 .2-5 1.6-6h20c1.4 1 2.2 3 1.6 6z" fill="#3a2a22"/>`),
  student:()=>person(YE,'short','#3a2a22',`<path d="M21.6 47.4v16.6M42.4 47.4v16.6" stroke="${PU}" stroke-width="4" stroke-linecap="round"/><path d="M21.6 47.4v16.6M42.4 47.4v16.6" stroke="${PUD}" stroke-width="1" stroke-linecap="round" opacity=".5"/><rect x="26" y="54" width="12" height="7" rx="2" fill="#fff" opacity=".55"/>`),
  family:()=>mini(-7,3,.62,person(GR,'short','#2a2230'))+mini(28,3,.62,person(PK,'long',HAIR))+mini(13.5,25,.52,person(YE,'spiky','#4a2f22'))+`<path d="M29 9.6c-1.4-1.6-4-.4-3 1.6l3 2.8 3-2.8c1-2-1.6-3.2-3-1.6z" fill="${RD}" transform="translate(3 -4)"/>`,

  /* things */
  book:()=>`<path d="M8 15.5h20.5a4.5 4.5 0 0 1 4.5 4.5v34a3.5 3.5 0 0 0-3.5-3.5H8z" fill="${PU}" ${ol()}/><path d="M56 15.5H35.5A4.5 4.5 0 0 0 31 20v34a3.5 3.5 0 0 1 3.5-3.5H56z" fill="${PL}" ${ol()}/>
   <path d="M8 50.5h21.5a3.5 3.5 0 0 1 2.5 1.2 3.5 3.5 0 0 1 2.5-1.2H56v3H34.5a3 3 0 0 0-2.5 1.5 3 3 0 0 0-2.5-1.5H8z" fill="#fff" ${ol(1.2)}/>
   <path d="M13 23h12M13 28.5h12M13 34h8M37 23h14M37 28.5h14M37 34h9" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M37 23h14M37 28.5h14M37 34h9" stroke="${PUD}" stroke-width="2" stroke-linecap="round" opacity=".35"/>
   <path d="M47 15.5v12l2.6-2 2.6 2v-12" fill="${RD}" ${ol(1.1)}/>`,
  pen:()=>`<g transform="rotate(38 32 32)"><rect x="26.5" y="5" width="11" height="40" rx="3.4" fill="${BL}" ${ol()}/>${shade('M32 6h4.2a1.6 1.6 0 0 1 1.3 1.6V43a1.6 1.6 0 0 1-1.3 1.6H32z',.14)}<rect x="26.5" y="5" width="11" height="9" rx="3.4" fill="${INK}"/><path d="M37.5 8h2.4v14" fill="none" stroke="${GY}" stroke-width="2" stroke-linecap="round"/><path d="M27 45h10l-5 12z" fill="${SK}" ${ol(1.3)}/><path d="M30.4 53l1.6 4 1.6-4z" fill="${INK}"/>${shine('M29.4 17v22',1.6,.5)}</g>`,
  bag:()=>`<path d="M23 20a9 9 0 0 1 18 0" stroke="${RDD}" stroke-width="3.4" fill="none" stroke-linecap="round"/><rect x="12.5" y="18" width="39" height="40" rx="10" fill="${RD}" ${ol()}/>${shade('M42 18.6c5.4 1 9.4 5 9.4 10v19.4c0 5-4 9.4-9.4 10z',.12)}
   <rect x="19.5" y="35" width="25" height="16" rx="5" fill="#ff8d87" ${ol(1.3)}/><path d="M19.5 41.6h25" stroke="${RDD}" stroke-width="1.3"/><rect x="29.5" y="39" width="5" height="5" rx="1.2" fill="${YE}" ${ol(1)}/>${shine('M17.5 25q2-3.6 6-4.4',2,.55)}`,
  phone:()=>`<rect x="18.5" y="5" width="27" height="54" rx="6.5" fill="${INK}" ${ol(1.3,'#251d45')}/><rect x="21.5" y="11" width="21" height="40" rx="2.5" fill="${BLL}"/><path d="M21.5 13.5a2.5 2.5 0 0 1 2.5-2.5h18.5L21.5 37z" fill="#fff" opacity=".45"/>
   <rect x="24.5" y="16" width="6" height="6" rx="1.6" fill="${PU}"/><rect x="33.5" y="16" width="6" height="6" rx="1.6" fill="${GR}"/><rect x="24.5" y="25" width="6" height="6" rx="1.6" fill="${YE}"/><rect x="33.5" y="25" width="6" height="6" rx="1.6" fill="${RD}"/>
   <rect x="28" y="7.4" width="8" height="1.6" rx=".8" fill="#5d5487"/><circle cx="32" cy="55" r="1.9" fill="#5d5487"/>`,
  laptop:()=>`<rect x="12" y="12" width="40" height="29" rx="3.4" fill="${INK}" ${ol(1.3,'#251d45')}/><rect x="15.5" y="15.5" width="33" height="22" rx="1.2" fill="${BLL}"/><path d="M15.5 15.5h17l-17 15z" fill="#fff" opacity=".45"/><rect x="19" y="20" width="12" height="2.4" rx="1" fill="${PU}"/><rect x="19" y="25" width="20" height="2" rx="1" fill="${PUD}" opacity=".35"/><rect x="19" y="29" width="16" height="2" rx="1" fill="${PUD}" opacity=".35"/>
   <path d="M5 43.5h54l-4.6 8.5H9.6z" fill="${GY}" ${ol()}/><path d="M26 43.5h12l-1 2.4H27z" fill="${GYD}"/>`,
  chair:()=>`<path d="M20 8h24a3 3 0 0 1 3 3v21H17V11a3 3 0 0 1 3-3z" fill="${WD}" ${ol()}/><path d="M22 13h20M22 19h20M22 25h20" stroke="${WDD}" stroke-width="1.3" opacity=".6"/>
   <path d="M14 32h36l-2 7.5H16z" fill="${WDD}" ${ol()}/><path d="M19 39.5v18M45 39.5v18" stroke="${OL}" stroke-width="5.2" stroke-linecap="round"/><path d="M19 39.5v18M45 39.5v18" stroke="${WDD}" stroke-width="3" stroke-linecap="round"/>${shine('M20.5 11.5h8',1.8,.55)}`,
  sofa:()=>`<rect x="11" y="15" width="42" height="22" rx="8" fill="${PU}" ${ol()}/><path d="M32 17v18" stroke="${PUD}" stroke-width="1.4"/>
   <rect x="15" y="32" width="34" height="14" rx="4" fill="${PL}" ${ol()}/><path d="M32 32v14" stroke="${PU}" stroke-width="1.3"/>
   <rect x="4.5" y="27" width="13" height="22" rx="6" fill="${PUD}" ${ol()}/><rect x="46.5" y="27" width="13" height="22" rx="6" fill="${PUD}" ${ol()}/>
   <path d="M11 49v6M53 49v6" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/><rect x="36" y="21" width="12" height="10" rx="3" fill="${YE}" ${ol(1.2)} transform="rotate(8 42 26)"/>${shine('M16 20q4-3 9-3',2,.5)}`,
  bed:()=>`<rect x="5" y="17" width="9" height="38" rx="2.4" fill="${WD}" ${ol()}/><rect x="52" y="31" width="7" height="24" rx="2" fill="${WD}" ${ol()}/>
   <rect x="10" y="38" width="46" height="9" rx="2" fill="${WDD}" ${ol()}/><rect x="11" y="31" width="44" height="9" rx="3" fill="#fff" ${ol()}/>
   <rect x="13" y="24.5" width="14" height="9" rx="3.6" fill="#fff" ${ol()}/><path d="M24 31h31v9H25q-3-4-1-9z" fill="${PU}" ${ol()}/><path d="M33 31v9M42 31v9" stroke="${PL}" stroke-width="1.6"/>${shine('M8 21v8',1.6,.6)}`,
  table:()=>`<path d="M5 22h54l-3 7.5H8z" fill="${WD}" ${ol()}/><path d="M7 29.5h50" stroke="${WDD}" stroke-width="2.4"/><path d="M12 31v24M52 31v24" stroke="${OL}" stroke-width="5.4" stroke-linecap="round"/><path d="M12 31v24M52 31v24" stroke="${WDD}" stroke-width="3.2" stroke-linecap="round"/><path d="M17 31v16M47 31v16" stroke="${WDD}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
   <path d="M26 21.6v-6.6q6-3 12 0v6.6" fill="${BLL}" ${ol(1.2)}/><path d="M28 12q4-4 8 0" fill="${GR}" ${ol(1)}/>${shine('M10 24.6h16',1.6,.6)}`,
  lamp:()=>`<path d="M19 30.5l6.5-21h13l6.5 21z" fill="${YE}" ${ol()}/>${shade('M35 9.5h3.5l6.5 21h-6z',.1)}<path d="M23 23h18" stroke="${YED}" stroke-width="1.3" opacity=".7"/>
   <path d="M32 30.5v19" stroke="${OL}" stroke-width="3.6"/><path d="M32 30.5v19" stroke="${GY}" stroke-width="1.8"/><path d="M21 49.5h22l-2 6.5H23z" fill="${INK}" ${ol(1.2,'#251d45')}/>
   <path d="M17 36l-4 3M47 36l4 3M32 35v4" stroke="${YE}" stroke-width="2" stroke-linecap="round"/><path d="M38.4 30.6v5" stroke="${OL}" stroke-width="1"/><circle cx="38.4" cy="36.4" r="1.4" fill="${OR}"/>`,
  tv:()=>`<path d="M24 11.5l8 6 8-6" fill="none" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/><rect x="6.5" y="17" width="51" height="33" rx="5" fill="${INK}" ${ol(1.3,'#251d45')}/><rect x="11" y="21" width="36" height="25" rx="2.4" fill="${BLL}"/>
   <path d="M11 39q8-7 14-2t12-4 10 3v10H11z" fill="${GR}" opacity=".8"/>${dot(40,27,3.4,YE)}<path d="M11 23.4a2.4 2.4 0 0 1 2.4-2.4h12L11 34z" fill="#fff" opacity=".4"/>
   <circle cx="52" cy="26" r="2" fill="${RD}"/><circle cx="52" cy="33" r="2" fill="${GY}"/><circle cx="52" cy="40" r="2" fill="${GY}"/><path d="M17 50l-3 7M47 50l3 7" stroke="${OL}" stroke-width="2.6" stroke-linecap="round"/>`,
  cat:()=>`<path d="M44 52c8 0 13-4 13-10" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M44 52c8 0 13-4 13-10" fill="none" stroke="${OR}" stroke-width="3" stroke-linecap="round"/>
   <path d="M13 27l3.6-17.5 11 9.5h8l11-9.5L50.4 27v14c0 10.4-8.2 16-18.4 16S13.6 51.4 13.6 41z" fill="${OR}" ${ol()}/><path d="M18 14.4l1.6 8M46 14.4l-1.6 8" stroke="${PK}" stroke-width="3" stroke-linecap="round"/>
   <path d="M27.4 19.6q4.6 3 9.2 0M29 13.8l3 5 3-5" fill="none" stroke="${ORD}" stroke-width="1.8" stroke-linecap="round"/>
   <ellipse cx="25" cy="34" rx="2.4" ry="3" fill="${INK}"/><ellipse cx="39" cy="34" rx="2.4" ry="3" fill="${INK}"/>${dot(25.8,33,.9,'#fff')}${dot(39.8,33,.9,'#fff')}
   <path d="M30 39.6h4l-2 2.4z" fill="${PKD}"/><path d="M32 42q-1.6 2.6-4.4 1.6M32 42q1.6 2.6 4.4 1.6" stroke="${INK}" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M8 36.5l10 1.5M8.5 42.5l9.5-1.5M56 36.5l-10 1.5M55.5 42.5l-9.5-1.5" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
   <ellipse cx="22" cy="40.6" rx="2.4" ry="1.4" fill="${BLUSH}" opacity=".55"/><ellipse cx="42" cy="40.6" rx="2.4" ry="1.4" fill="${BLUSH}" opacity=".55"/>`,
  dog:()=>`<ellipse cx="32" cy="34" rx="17" ry="18" fill="${WDL}" ${ol()}/><path d="M32 16c-5 0-7 4-7 9 0 4 3 6 7 6s7-2 7-6c0-5-2-9-7-9z" fill="#fff" opacity=".55"/>
   <path d="M16.2 21.4c-7.4 3.6-8.4 17.8-3.2 23.6l7.6-5.6z" fill="${WDD}" ${ol()}/><path d="M47.8 21.4c7.4 3.6 8.4 17.8 3.2 23.6l-7.6-5.6z" fill="${WDD}" ${ol()}/><path d="M38 23c3-2 6-1 7 2-2 1-5 1-7-2z" fill="${WDD}" opacity=".6"/>
   <ellipse cx="25" cy="31" rx="2.4" ry="2.9" fill="${INK}"/><ellipse cx="39" cy="31" rx="2.4" ry="2.9" fill="${INK}"/>${dot(25.8,30,.9,'#fff')}${dot(39.8,30,.9,'#fff')}
   <ellipse cx="32" cy="40.5" rx="9" ry="7" fill="#fff" ${ol(1.2)}/><ellipse cx="32" cy="38" rx="4.4" ry="3.2" fill="${INK}"/>${dot(30.6,37.2,1,'#fff',.7)}
   <path d="M32 41.2v3M28.4 44.6q3.6 2.6 7.2 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M30.4 45.6q1.6 4.4 3.2 0" fill="${PK}" ${ol(1)}/>`,
  house:()=>`<rect x="40" y="10" width="7" height="12" fill="${WDD}" ${ol()}/><rect x="12.5" y="27" width="39" height="30" fill="${YE}" ${ol()}/>${shade('M41 27h10.5v30H41z',.08)}
   <path d="M6 31.5L32 8.5l26 23" fill="${RD}" ${ol(1.6)}/><path d="M6 31.5L32 8.5l26 23-3 2.4L32 14 9 33.9z" fill="${RDD}"/>
   <rect x="27" y="39" width="10.5" height="18" rx="1.6" fill="${WD}" ${ol()}/><circle cx="35" cy="48.5" r="1" fill="${INK}"/>
   <rect x="16" y="34" width="8.5" height="8.5" rx="1" fill="${BLL}" ${ol(1.2)}/><path d="M20.2 34v8.5M16 38.2h8.5" stroke="${OL}" stroke-width="1"/>
   <rect x="40" y="34" width="8.5" height="8.5" rx="1" fill="${BLL}" ${ol(1.2)}/><path d="M44.2 34v8.5M40 38.2h8.5" stroke="${OL}" stroke-width="1"/><path d="M8 57h48" stroke="${GR}" stroke-width="3" stroke-linecap="round"/>`,
  apple:()=>`<path d="M32 20.5c-4.6-4.6-19-4-19 12 0 14 10.4 24.6 19 20.4 8.6 4.2 19-6.4 19-20.4 0-16-14.4-16.6-19-12z" fill="${RD}" ${ol()}/>${shade('M42 18.4c6 1.6 9 6.6 9 14.2 0 12-7.6 21.6-15 21.4 7-4.6 10-12.4 10-20 0-6.8-1.6-11.6-4-15.6z',.12)}
   <path d="M32 20.5c-.2-6 1.8-9.4 5-11.5" stroke="${WDD}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M34.6 14c4.4-4.4 9.6-3.2 11.6-1-3.2 3.4-8.6 4.4-11.6 1z" fill="${GR}" ${ol(1.2)}/>${shine('M19.5 28q2-5 7-5.6',2.4,.65)}`,
  pizza:()=>`<path d="M32 58.5L8.5 14.5q23.5-10 47 0z" fill="${YE}" ${ol()}/><path d="M8.5 14.5q23.5-10 47 0l-3.4 6.4q-20.1-8.6-40.2 0z" fill="#e3a052" ${ol()}/>
   <circle cx="25" cy="26.5" r="4.4" fill="${RD}" ${ol(1.1)}/><circle cx="38.5" cy="28" r="4.4" fill="${RD}" ${ol(1.1)}/><circle cx="32" cy="42" r="3.8" fill="${RD}" ${ol(1.1)}/>
   <path d="M30 33l3 2M20 18.4l2-1M41 39l2 1" stroke="${GRD}" stroke-width="2" stroke-linecap="round"/><path d="M36 48q2 3 0 6" stroke="${YED}" stroke-width="2" fill="none" stroke-linecap="round"/>${dot(23.6,25.2,1,'#fff',.6)}${dot(37,26.6,1,'#fff',.6)}`,
  coffee:()=>`<ellipse cx="29" cy="54.5" rx="20" ry="4.4" fill="#fff" ${ol()}/><path d="M13.5 24h31v16a13 13 0 0 1-13 13h-5a13 13 0 0 1-13-13z" fill="#fff" ${ol()}/>${shade('M36.5 24h8v16a13 13 0 0 1-8.6 12.2c2.6-3.4 3.6-7 3.6-12.2V24z',.07)}
   <path d="M44.5 28.5h4a6.5 6.5 0 0 1 0 13h-4" stroke="${OL}" stroke-width="2.8" fill="none"/><ellipse cx="29" cy="24.4" rx="15.5" ry="2.8" fill="#8a5a30" ${ol(1.2)}/><path d="M20 36q9 3 18 0" stroke="${RD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
   <path d="M23 18q-3-3.6 0-7.4M30 17q-3-4.2 0-8.6M37 18q-3-3.6 0-7.4" stroke="${GY}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  tea:()=>`<ellipse cx="29" cy="54.5" rx="20" ry="4.4" fill="${GRL}" ${ol()}/><path d="M13.5 25h31v15a13 13 0 0 1-13 13h-5a13 13 0 0 1-13-13z" fill="${GR}" ${ol()}/>${shade('M36.5 25h8v15a13 13 0 0 1-8.6 12.2c2.6-3.4 3.6-7 3.6-12.2V25z',.12)}
   <path d="M44.5 29h4a6.5 6.5 0 0 1 0 13h-4" stroke="${OL}" stroke-width="2.8" fill="none"/><path d="M30 25V13" stroke="${OL}" stroke-width="1.2"/><rect x="25.5" y="30" width="9" height="8" rx="1.2" fill="${YE}" ${ol(1)}/><path d="M28 34h4" stroke="${YED}" stroke-width="1.2"/>${shine('M17.5 30v8',2.2,.5)}
   <path d="M38 19q-3-3 0-6" stroke="${GY}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  breakfast:()=>`<ellipse cx="32" cy="40" rx="27" ry="16" fill="#fff" ${ol()}/><ellipse cx="32" cy="38.5" rx="20" ry="11" fill="#f3f0ff"/>
   <path d="M15.6 37c0-7 7-11 13-9 7-3.2 13.2 3 11.4 9.2 2 6-6 10.2-12 8-6 3-13.2-1-12.4-8.2z" fill="#fff" ${ol(1.2)}/><circle cx="28.4" cy="36.6" r="6" fill="${YE}" ${ol(1.2,YED)}/>${dot(26.4,34.6,1.6,'#fff',.8)}
   <rect x="40" y="31" width="12" height="4.6" rx="2.3" fill="#c2603b" ${ol(1)} transform="rotate(-18 46 33)"/><rect x="40" y="38" width="12" height="4.6" rx="2.3" fill="#c2603b" ${ol(1)} transform="rotate(-10 46 40)"/>`,
  cake:()=>`<ellipse cx="32" cy="53.5" rx="25" ry="4.4" fill="#fff" ${ol()}/><path d="M11 31h42v20a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3z" fill="${PK}" ${ol()}/><path d="M11 40h42v4H11z" fill="#fff" opacity=".7"/>
   <path d="M11 31q0-4 4-4h34q4 0 4 4v3q-3.6 4-7 0-3.6 4-7 0-3.6 4-7 0-3.6 4-7 0-3.6 4-7 0-3.6 4-7 0-3.6 4-6 0z" fill="#fff" ${ol(1.2)}/>
   <g ${ol(1)}><rect x="21.8" y="15" width="4.4" height="12" rx="1.2" fill="${BL}"/><rect x="29.8" y="15" width="4.4" height="12" rx="1.2" fill="${YE}"/><rect x="37.8" y="15" width="4.4" height="12" rx="1.2" fill="${GR}"/></g>
   <g fill="${OR}"><path d="M24 7.6q3 3.6 0 6.4-3-2.8 0-6.4z"/><path d="M32 7.6q3 3.6 0 6.4-3-2.8 0-6.4z"/><path d="M40 7.6q3 3.6 0 6.4-3-2.8 0-6.4z"/></g><g fill="${YE}"><circle cx="24" cy="12" r="1.2"/><circle cx="32" cy="12" r="1.2"/><circle cx="40" cy="12" r="1.2"/></g>
   <g fill="${RD}"><circle cx="17" cy="47.5" r="1.4"/><circle cx="27" cy="48.5" r="1.4"/><circle cx="37" cy="47.5" r="1.4"/><circle cx="47" cy="48.5" r="1.4"/></g>`,
  fish:()=>`<path d="M44.6 32l12.4-11v22z" fill="${BLD}" ${ol()}/><path d="M7 32q16-19.4 38.4 0Q23 51.4 7 32z" fill="${BL}" ${ol()}/><path d="M22 18.6q5-6 11 .4" fill="${BLD}" ${ol(1.2)}/>
   <path d="M26 24q4 8 0 16M32 23.6q4 8.4 0 16.8" stroke="${BLD}" stroke-width="1.4" fill="none" opacity=".6"/><circle cx="16.4" cy="29.6" r="3" fill="#fff" ${ol(1)}/><circle cx="16.8" cy="29.6" r="1.6" fill="${INK}"/>${shine('M13 36q6 4 14 3',1.8,.5)}
   <circle cx="10" cy="17" r="2" fill="none" stroke="${BL}" stroke-width="1.2"/><circle cx="6" cy="11" r="1.3" fill="none" stroke="${BL}" stroke-width="1.2"/>`,
  bus:()=>`<rect x="7" y="10" width="50" height="40" rx="7" fill="${YE}" ${ol()}/>${shade('M7 37h50v6a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7z',.1)}
   <rect x="11.5" y="15" width="18.5" height="14" rx="2.4" fill="${BLL}" ${ol(1.2)}/><rect x="34" y="15" width="18.5" height="14" rx="2.4" fill="${BLL}" ${ol(1.2)}/><path d="M13.5 26l7-9M36 26l7-9" stroke="#fff" stroke-width="2" opacity=".7"/>
   <rect x="7" y="33" width="50" height="4" fill="${ORD}"/><rect x="10" y="40" width="7" height="4" rx="1.6" fill="#fff" ${ol(1)}/><rect x="47" y="40" width="7" height="4" rx="1.6" fill="#fff" ${ol(1)}/><rect x="26" y="41" width="12" height="3" rx="1.2" fill="${OL}" opacity=".5"/>
   <circle cx="19" cy="50.5" r="6" fill="${INK}"/><circle cx="19" cy="50.5" r="2.4" fill="${GY}"/><circle cx="45" cy="50.5" r="6" fill="${INK}"/><circle cx="45" cy="50.5" r="2.4" fill="${GY}"/>`,
  bike:()=>`<circle cx="15.5" cy="42" r="10.5" fill="none" stroke="${INK}" stroke-width="3.2"/><circle cx="48.5" cy="42" r="10.5" fill="none" stroke="${INK}" stroke-width="3.2"/><circle cx="15.5" cy="42" r="7" fill="none" stroke="${GY}" stroke-width="1" stroke-dasharray="2 2.4"/><circle cx="48.5" cy="42" r="7" fill="none" stroke="${GY}" stroke-width="1" stroke-dasharray="2 2.4"/>
   <path d="M15.5 42l10-16h17l6 16M25.5 26l8 16H15.5M42.5 26l-2.4-7.4" stroke="${PU}" stroke-width="3.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
   <path d="M36 18.6h8.4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M20 21.6h9.4q1 2.6-1.6 3H21z" fill="${INK}"/><circle cx="33.5" cy="42" r="3" fill="${YE}" ${ol(1)}/><circle cx="15.5" cy="42" r="2" fill="${INK}"/><circle cx="48.5" cy="42" r="2" fill="${INK}"/>`,
  car:()=>`<path d="M6.5 43.5v-9a4 4 0 0 1 3-3.8l5.6-1.6 7.6-10.6a5 5 0 0 1 4-2h15.6a5 5 0 0 1 3.8 1.8l7.4 9.6 3.4.6a4 4 0 0 1 3.3 3.9v11.1z" fill="${RD}" ${ol()}/>${shade('M6.5 38h51v5.5h-51z',.12)}
   <path d="M19.6 29.6l5.4-8.2a2 2 0 0 1 1.7-.9h4.8v9.1zM35.4 20.5h6.4a2 2 0 0 1 1.6.8l6 8.3H35.4z" fill="${BLL}" ${ol(1.2)}/><path d="M26 28l4-6" stroke="#fff" stroke-width="1.6" opacity=".7"/>
   <rect x="52" y="34" width="5" height="3.4" rx="1.4" fill="${YE}"/><rect x="31" y="33" width="5" height="1.8" rx=".9" fill="${OL}" opacity=".5"/>
   <circle cx="19" cy="44.5" r="6.6" fill="${INK}"/><circle cx="19" cy="44.5" r="2.6" fill="${GY}"/><circle cx="46" cy="44.5" r="6.6" fill="${INK}"/><circle cx="46" cy="44.5" r="2.6" fill="${GY}"/>`,
  football:()=>`<circle cx="32" cy="32" r="22.5" fill="#fff" ${ol(1.8)}/><path d="M32 22.5l8.4 6.1-3.2 9.9H26.8l-3.2-9.9z" fill="${INK}"/>
   <path d="M32 22.5V11M40.4 28.6l10.8-3.6M37.2 38.5l6.6 9.4M26.8 38.5l-6.6 9.4M23.6 28.6L12.8 25" stroke="${INK}" stroke-width="1.6"/>
   <path d="M26.6 10.4L32 11l5.4-.6M51.2 25l1.8 5.6-.6 3.6M43.8 47.9l-5 3.2-3.4.4M20.2 47.9l5 3.2 3.4.4M12.8 25l-1.8 5.6.6 3.6" stroke="${INK}" stroke-width="1.6" fill="none"/><path d="M18 18q4-5 10-6.4" stroke="#fff" stroke-width="0" fill="none"/>${shade('M44.6 15.4A22.5 22.5 0 0 1 32 54.5a22.5 22.5 0 0 0 12.6-39.1z',.08)}`,
  ball:()=>`<circle cx="32" cy="34" r="19" fill="#d6f25b" ${ol()}/>${shade('M42 18.4A19 19 0 0 1 32 53a19 19 0 0 0 10-34.6z',.1)}<path d="M15.4 25q16.6 8 33.2 0M15.4 43q16.6-8 33.2 0" stroke="#fff" stroke-width="2.6" fill="none"/>${shine('M20 22q3-4 8-5',2.4,.7)}`,
  guitar:()=>`<g transform="rotate(-35 32 32)"><rect x="29" y="4" width="6" height="30" rx="1.6" fill="#7a4428" ${ol(1.2)}/><path d="M30.5 8v24M33.5 8v24" stroke="${YE}" stroke-width=".7" opacity=".8"/><rect x="26.6" y="-1" width="10.8" height="8" rx="2.4" fill="${INK}"/><g fill="${GY}"><circle cx="25.6" cy="1.4" r="1.3"/><circle cx="25.6" cy="5" r="1.3"/><circle cx="38.4" cy="1.4" r="1.3"/><circle cx="38.4" cy="5" r="1.3"/></g>
   <path d="M32 26.6c-10.4 0-14.6 6.4-12.4 12.4-6.4 4.2-4.2 19 12.4 19s18.8-14.8 12.4-19c2.2-6-2-12.4-12.4-12.4z" fill="${OR}" ${ol()}/>${shade('M38 28c6 2 8.6 6.4 6.4 11 6 4 4.4 18-12.4 19 9-3.2 12-10 9.6-17 1.4-5.6-.4-10-3.6-13z',.12)}
   <circle cx="32" cy="41" r="4.4" fill="#5a3420"/><rect x="27.6" y="49" width="8.8" height="2.6" rx="1" fill="#5a3420"/><path d="M31 34v15M33 34v15" stroke="#fff" stroke-width=".6" opacity=".7"/></g>`,
  music:()=>`<path d="M23.5 45.5V16.5l27-6.5v29" stroke="${OL}" stroke-width="5.6" fill="none" stroke-linejoin="round"/><path d="M23.5 45.5V16.5l27-6.5v29" stroke="${PU}" stroke-width="3.4" fill="none" stroke-linejoin="round"/>
   <path d="M23.5 23l27-6.5" stroke="${OL}" stroke-width="5.6"/><path d="M23.5 23l27-6.5" stroke="${PU}" stroke-width="3.4"/>
   <ellipse cx="17" cy="46.5" rx="7.6" ry="6" fill="${PU}" ${ol()} transform="rotate(-18 17 46.5)"/><ellipse cx="44" cy="40" rx="7.6" ry="6" fill="${PU}" ${ol()} transform="rotate(-18 44 40)"/>${shine('M13.6 44.6q2-2.4 5-2.6',1.8,.6)}${shine('M40.6 38q2-2.4 5-2.6',1.8,.6)}`,
  game:()=>`<path d="M14 20.5h36a10 10 0 0 1 10 10l-2.2 16a6.6 6.6 0 0 1-12 2.6l-4.4-6.6H22.6l-4.4 6.6a6.6 6.6 0 0 1-12-2.6L4 30.5a10 10 0 0 1 10-10z" fill="${INK}" ${ol(1.3,'#251d45')}/>
   <path d="M17 29v9M12.5 33.5h9" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="43.5" cy="29.6" r="2.7" fill="${RD}"/><circle cx="49.5" cy="34.6" r="2.7" fill="${YE}"/><circle cx="37.5" cy="34.6" r="2.7" fill="${BL}"/><circle cx="43.5" cy="39.6" r="2.7" fill="${GR}"/>
   <rect x="27" y="28" width="4" height="2" rx="1" fill="${GY}"/><rect x="33" y="28" width="4" height="2" rx="1" fill="${GY}"/>${shine('M10 25q3-2.4 7-2.4',1.8,.35)}`,
  swim:()=>`<path d="M4 34q7-6 14 0t14 0 14 0 14 0v26H4z" fill="${BLL}"/><circle cx="23" cy="23" r="8.6" fill="${SK}" ${ol(1.2,INK)}/><path d="M14.4 22.4a8.6 8.6 0 0 1 17.2 0z" fill="${RD}" ${ol(1.2,INK)}/>
   <rect x="16.5" y="20.4" width="13" height="4.4" rx="2.2" fill="${BL}" ${ol(1,INK)}/><circle cx="20" cy="22.6" r="1.4" fill="#fff"/><circle cx="26.4" cy="22.6" r="1.4" fill="#fff"/><path d="M21 28q2 1.4 4 0" stroke="${INK}" stroke-width="1" fill="none"/>
   <path d="M31 27.6l15-8.6" stroke="${INK}" stroke-width="7.4" stroke-linecap="round"/><path d="M31 27.6l15-8.6" stroke="${SK}" stroke-width="5" stroke-linecap="round"/>
   <path d="M4 37q7-6 14 0t14 0 14 0 14 0M4 47q7-6 14 0t14 0 14 0 14 0" stroke="${BL}" stroke-width="3.6" fill="none" stroke-linecap="round"/><circle cx="50" cy="10" r="2" fill="none" stroke="${BL}" stroke-width="1.2"/><circle cx="55" cy="16" r="1.3" fill="none" stroke="${BL}" stroke-width="1.2"/>`,
  paint:()=>`<path d="M32 7.5C15.6 7.5 5.5 19.6 5.5 32S15.6 54.5 28 54.5c4.4 0 5.4-3.4 3.2-6.4s0-6.6 4.4-6.6h8.4C52.8 41.5 58.5 35 58.5 27 58.5 16.4 46.6 7.5 32 7.5z" fill="${WDL}" ${ol()}/><circle cx="42.5" cy="36.6" r="3.4" fill="#fff" ${ol(1.1)}/>
   <circle cx="19.5" cy="25.5" r="4.4" fill="${RD}" ${ol(1)}/><circle cx="31.5" cy="18" r="4.4" fill="${YE}" ${ol(1)}/><circle cx="44.5" cy="21" r="4.4" fill="${BL}" ${ol(1)}/><circle cx="16.5" cy="38" r="4.4" fill="${GR}" ${ol(1)}/>
   <g transform="rotate(35 50 46)"><rect x="47.5" y="34" width="5" height="22" rx="2" fill="${WDD}" ${ol(1.1)}/><path d="M47.5 34h5l-.6-6q-1.9-3-3.8 0z" fill="${PU}" ${ol(1.1)}/></g>`,
  camera:()=>`<path d="M21 19.5l3.6-6.5h14.8l3.6 6.5z" fill="${INK}"/><rect x="7" y="19" width="50" height="34" rx="7" fill="${INK}" ${ol(1.3,'#251d45')}/><rect x="7" y="29" width="50" height="14" fill="#5d5487"/>
   <circle cx="32" cy="36" r="12" fill="#fff" ${ol(1.2,'#251d45')}/><circle cx="32" cy="36" r="8.6" fill="${BLD}"/><circle cx="32" cy="36" r="4.6" fill="${INK}"/>${dot(29,33,2.2,'#fff',.85)}
   <rect x="45" y="23" width="7" height="4.4" rx="1.4" fill="${YE}"/><circle cx="13.5" cy="25" r="2" fill="${RD}"/>`,
  watch:()=>`<path d="M24 4h16l-1.6 13H25.6zM24 60h16l-1.6-13H25.6z" fill="${PU}" ${ol()}/><path d="M28 7v8M32 7v8M36 7v8M28 49v8M32 49v8M36 49v8" stroke="${PUD}" stroke-width="1" opacity=".5"/>
   <circle cx="32" cy="32" r="16" fill="${GY}" ${ol()}/><circle cx="32" cy="32" r="12.6" fill="#fff" ${ol(1.2)}/><rect x="47.4" y="29.6" width="3.4" height="4.8" rx="1" fill="${GY}" ${ol(1)}/>
   <g stroke="${INK}" stroke-width="1.4" stroke-linecap="round"><path d="M32 21.6v2M32 40.4v2M21.6 32h2M40.4 32h2"/></g><path d="M32 32v-7.4M32 32l5.4 3" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="32" r="1.6" fill="${RD}"/>${shine('M24 26q2-4 6-5',1.8,.5)}`,
  umbrella:()=>`<path d="M32 31.5v18a5.4 5.4 0 0 1-10.8 0" stroke="${OL}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
   <path d="M5.5 32a26.5 23 0 0 1 53 0q-6.6-5.2-13.2 0-6.6-5.2-13.3 0-6.6-5.2-13.3 0-6.6-5.2-13.2 0z" fill="${PU}" ${ol()}/><path d="M32 9q-6.6 9-6.6 23M32 9q6.6 9 6.6 23" stroke="${PUD}" stroke-width="1.4" fill="none"/>
   <path d="M18.8 32q2-13 13.2-23-11 4-13.2 23z" fill="${PL}" opacity=".7"/><path d="M45.2 32q-2-13-13.2-23 11 4 13.2 23z" fill="${PL}" opacity=".7"/><circle cx="32" cy="8" r="2" fill="${INK}"/>`,
  shoes:()=>`<path d="M3.5 44V29.5l10 2 6 6 13 4a7 7 0 0 1 5 6.6v2H3.5z" fill="${RD}" ${ol()}/><path d="M3.5 46h34.5v4H3.5z" fill="#fff" ${ol(1.2)}/><path d="M14.5 33l3-2M17.5 36.4l3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
   <path d="M26.5 50V35.5l10 2 6 6 13 4a7 7 0 0 1 5 6.6v2H26.5z" fill="${BL}" ${ol()}/><path d="M26.5 52h34.5v4H26.5z" fill="#fff" ${ol(1.2)}/><path d="M37.5 39l3-2M40.5 42.4l3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`,
  keys:()=>`<circle cx="32" cy="9" r="5" fill="none" stroke="${GY}" stroke-width="3"/><circle cx="21" cy="24" r="10.5" fill="${YE}" ${ol()}/><circle cx="21" cy="24" r="4" fill="#fff" ${ol(1.2)}/>
   <path d="M28.5 31.5l21 21" stroke="${OL}" stroke-width="7.4" stroke-linecap="round"/><path d="M28.5 31.5l21 21" stroke="${YE}" stroke-width="5" stroke-linecap="round"/><path d="M42 45l5-5M47.4 50.4l4-4" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M42 45l5-5M47.4 50.4l4-4" stroke="${YE}" stroke-width="4.6" stroke-linecap="round"/>
   <rect x="35" y="13" width="9" height="14" rx="3" fill="${PK}" ${ol(1.2)} transform="rotate(20 39 20)"/>`,
  glasses:()=>`<path d="M7 30L3 21M57 30l4-9" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M29 33q3-3.4 6 0" stroke="${INK}" stroke-width="3.4" fill="none"/>
   <circle cx="18" cy="35" r="11.5" fill="${BLL}" fill-opacity=".7" stroke="${INK}" stroke-width="3.4"/><circle cx="46" cy="35" r="11.5" fill="${BLL}" fill-opacity=".7" stroke="${INK}" stroke-width="3.4"/>${shine('M12 31q2-4 6-5',2.2,.9)}${shine('M40 31q2-4 6-5',2.2,.9)}`,
  box:()=>`<rect x="10" y="25" width="44" height="31" rx="3" fill="${PU}" ${ol()}/>${shade('M40 25h11a3 3 0 0 1 3 3v25a3 3 0 0 1-3 3H40z',.12)}<rect x="7" y="17" width="50" height="10" rx="3" fill="${PL}" ${ol()}/>
   <path d="M29 17h6v39h-6z" fill="${YE}" ${ol(1.1)}/><path d="M32 17c-6-11-17-6.4-10.4.4M32 17c6-11 17-6.4 10.4.4" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M32 17c-6-11-17-6.4-10.4.4M32 17c6-11 17-6.4 10.4.4" stroke="${YE}" stroke-width="3" fill="none" stroke-linecap="round"/>
   ${dot(17,40,1.6,'#fff',.7)}${dot(46,46,1.6,'#fff',.5)}${dot(21,49,1.2,'#fff',.6)}`,
  school:()=>`<rect x="9" y="25" width="46" height="31" fill="${PL}" ${ol()}/><path d="M5 27.5L32 12l27 15.5z" fill="${PU}" ${ol()}/><circle cx="32" cy="21.5" r="3.6" fill="#fff" ${ol(1)}/><path d="M32 19.6v2l1.4 1" stroke="${INK}" stroke-width=".9" fill="none"/>
   <path d="M32 12V2.5" stroke="${OL}" stroke-width="1.8"/><path d="M32 3h10l-2.4 3 2.4 3H32z" fill="${RD}" ${ol(1)}/>
   <path d="M26 56V44a6 6 0 0 1 12 0v12z" fill="${INK}"/><path d="M32 38v18" stroke="#5d5487" stroke-width="1"/>
   <g ${ol(1)} fill="${BLL}"><rect x="13.5" y="31" width="8" height="7"/><rect x="42.5" y="31" width="8" height="7"/><rect x="13.5" y="43" width="8" height="7"/><rect x="42.5" y="43" width="8" height="7"/></g><path d="M5 56h54" stroke="${GR}" stroke-width="3" stroke-linecap="round"/>`,
  calendar:()=>`<rect x="7.5" y="11.5" width="49" height="45" rx="6" fill="#fff" ${ol()}/><path d="M7.5 17.5a6 6 0 0 1 6-6h37a6 6 0 0 1 6 6v6h-49z" fill="${PU}" ${ol()}/>
   <path d="M19.5 7v9M44.5 7v9" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/><g fill="${PL}"><rect x="13.5" y="29" width="8" height="7" rx="1.6"/><rect x="28" y="29" width="8" height="7" rx="1.6"/><rect x="13.5" y="41" width="8" height="7" rx="1.6"/><rect x="28" y="41" width="8" height="7" rx="1.6"/><rect x="42.5" y="41" width="8" height="7" rx="1.6"/></g>
   <rect x="42.5" y="29" width="8" height="7" rx="1.6" fill="${RD}"/><path d="M44 32.6l1.6 1.6 3-3" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  moon:()=>`<path d="M40 7.5a24.5 24.5 0 1 0 16.4 36.4A20.5 20.5 0 0 1 40 7.5z" fill="${YE}" ${ol()}/><circle cx="23" cy="30" r="3" fill="${YED}" opacity=".5"/><circle cx="30" cy="44" r="2" fill="${YED}" opacity=".5"/>
   <path d="M21 36q2 2 4 0" stroke="${INK}" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M28.4 36q2 2 4 0" stroke="${INK}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
   <path d="M50 11l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="${YE}"/><circle cx="56" cy="25" r="1.6" fill="${YE}"/>`,
  sun:()=>`<g stroke="${OR}" stroke-width="3.8" stroke-linecap="round"><path d="M32 4.5v7M32 52.5v7M4.5 32h7M52.5 32h7M12.6 12.6l5 5M46.4 46.4l5 5M12.6 51.4l5-5M46.4 17.6l5-5"/></g><circle cx="32" cy="32" r="14" fill="${YE}" ${ol()}/>
   <path d="M26 30.4q1.6-1.6 3.2 0M34.8 30.4q1.6-1.6 3.2 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M28 35q4 3.6 8 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="25.4" cy="34.6" rx="2" ry="1.2" fill="${BLUSH}" opacity=".6"/><ellipse cx="38.6" cy="34.6" rx="2" ry="1.2" fill="${BLUSH}" opacity=".6"/>`,
  star:()=>`<path d="M32 5.5l7.8 16.4 18 2.2-13.2 12.4 3.4 17.8L32 45.5l-16 8.8 3.4-17.8L6.2 24.1l18-2.2z" fill="${YE}" ${ol(1.6)}/><path d="M32 13l-5 11-11.6 1.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>`,
  mic:()=>`<path d="M15.5 30a16.5 16.5 0 0 0 33 0" stroke="${OL}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M32 46.5v9.5M23.5 56.5h17" stroke="${OL}" stroke-width="3.6" stroke-linecap="round"/>
   <rect x="23" y="5" width="18" height="32" rx="9" fill="${PU}" ${ol()}/>${shade('M34 5.6a9 9 0 0 1 7 8.4v14a9 9 0 0 1-7 8.4z',.15)}<path d="M23.6 14h9M23.6 19h9M23.6 24h9" stroke="${PL}" stroke-width="1.8" stroke-linecap="round"/>${shine('M27 9.6q1.4-1.4 3.4-1.8',1.8,.6)}`,
  bulb:()=>`<g stroke="${YED}" stroke-width="2.6" stroke-linecap="round"><path d="M32 1.5v3M12 9l2.4 2.4M52 9l-2.4 2.4M6 25h3M55 25h3"/></g><path d="M32 7a17 17 0 0 0-10 30.8c2 1.6 3 3.8 3 6.2h14c0-2.4 1-4.6 3-6.2A17 17 0 0 0 32 7z" fill="${YE}" ${ol()}/>
   <path d="M28 44V33l4 3.4 4-3.4v11" stroke="${ORD}" stroke-width="1.8" fill="none" stroke-linejoin="round"/>${shine('M22 21q2-6 8-7.4',2.4,.7)}
   <rect x="24.5" y="44" width="15" height="5.4" rx="2" fill="${GY}" ${ol(1.2)}/><rect x="26" y="49.4" width="12" height="5" rx="2" fill="${GYD}" ${ol(1.2)}/><path d="M29 57h6" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>`,
  pencil:()=>`<g transform="rotate(45 32 32)"><rect x="25.5" y="1" width="13" height="45" rx="2" fill="${YE}" ${ol()}/>${shade('M34.2 1h2.3a2 2 0 0 1 2 2v41a2 2 0 0 1-2 2h-2.3z',.12)}<path d="M29.8 3v41" stroke="${YED}" stroke-width="1"/>
   <rect x="25.5" y="1" width="13" height="7" rx="2" fill="${PK}" ${ol(1.2)}/><rect x="25.5" y="7.4" width="13" height="3.4" fill="${GY}" ${ol(1)}/><path d="M25.5 46h13L32 61z" fill="${SK}" ${ol()}/><path d="M29.6 55.4L32 61l2.4-5.6z" fill="${INK}"/></g>`,
  trophy:()=>`<path d="M18.5 12H9.5a9 9 0 0 0 11 14M45.5 12h9a9 9 0 0 1-11 14" stroke="${OL}" stroke-width="5.2" fill="none"/><path d="M18.5 12H9.5a9 9 0 0 0 11 14M45.5 12h9a9 9 0 0 1-11 14" stroke="${YE}" stroke-width="3" fill="none"/>
   <path d="M17.5 7.5h29v14a14.5 14.5 0 0 1-29 0z" fill="${YE}" ${ol()}/>${shade('M38 7.5h8.5v14a14.5 14.5 0 0 1-10 13.8c1.6-3.4 1.6-8 1.6-13.8z',.1)}<path d="M28.5 35h7v9h-7z" fill="${YED}" ${ol(1.2)}/>
   <rect x="17.5" y="44" width="29" height="11" rx="2.4" fill="${PU}" ${ol()}/><rect x="25" y="47.4" width="14" height="4" rx="1" fill="${YE}"/><path d="M32 13l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="#fff" opacity=".85"/>${shine('M21.5 12v9',2,.6)}`,
  match:()=>`<rect x="5.5" y="10.5" width="21" height="15" rx="4.6" fill="${PL}" ${ol()}/><rect x="37.5" y="38.5" width="21" height="15" rx="4.6" fill="${PL}" ${ol()}/><rect x="5.5" y="38.5" width="21" height="15" rx="4.6" fill="${PU}" ${ol()}/><rect x="37.5" y="10.5" width="21" height="15" rx="4.6" fill="${PU}" ${ol()}/>
   <path d="M26.5 18l11 28M26.5 46l11-28" stroke="${INK}" stroke-width="2.4" stroke-dasharray="3 3"/><circle cx="26.5" cy="18" r="2.6" fill="${YE}" ${ol(1)}/><circle cx="37.5" cy="46" r="2.6" fill="${YE}" ${ol(1)}/><circle cx="26.5" cy="46" r="2.6" fill="${GR}" ${ol(1)}/><circle cx="37.5" cy="18" r="2.6" fill="${GR}" ${ol(1)}/>`
};

/* ---------- flags: waving flag on a pole ---------- */
function flag(c){
  const r=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
  const st=(cx,cy,s,f)=>`<path transform="translate(${cx} ${cy}) scale(${s})" d="M0-10l2.9 6 6.6.9-4.8 4.6 1.2 6.5L0 4.9-5.9 8l1.2-6.5L-9.5-3.1l6.6-.9z" fill="${f}"/>`;
  let b='';
  switch(c){
    case 'jp': b=r(6,14,52,36,WH)+`<circle cx="32" cy="32" r="10" fill="#d4213d"/>`;break;
    case 'vn': b=r(6,14,52,36,'#da251d')+st(32,32,1.1,'#ffde00');break;
    case 'it': b=r(6,14,18,36,'#009246')+r(24,14,17,36,WH)+r(41,14,17,36,'#ce2b37');break;
    case 'fr': b=r(6,14,18,36,'#0055a4')+r(24,14,17,36,WH)+r(41,14,17,36,'#ef4135');break;
    case 'cn': b=r(6,14,52,36,'#de2910')+st(17,24,.75,'#ffde00')+st(27,19,.22,'#ffde00')+st(30,24,.22,'#ffde00')+st(30,30,.22,'#ffde00')+st(27,34,.22,'#ffde00');break;
    case 'us': {let s='';for(let i=0;i<7;i++)s+=r(6,14+i*5.14,52,2.57,'#b22234');b=r(6,14,52,36,WH)+s+r(6,14,24,18,'#3c3b6e');for(let y=0;y<3;y++)for(let x=0;x<4;x++)b+=`<circle cx="${10+x*5.5}" cy="${18+y*5.5}" r="1" fill="${WH}"/>`;break;}
    case 'kr': b=r(6,14,52,36,WH)+`<path d="M24 32a8 8 0 0 1 16 0z" fill="#cd2e3a"/><path d="M24 32a8 8 0 0 0 16 0z" fill="#0047a0"/><g stroke="${INK}" stroke-width="2"><path d="M11 20l5-4M12 23l5-4M13 26l5-4M46 38l5-4M47 41l5-4M45 35l5-4M46 20l5 4M45 23l5 4M11 44l5-4M12 47l5-4"/></g>`;break;
    case 'br': b=r(6,14,52,36,'#009c3b')+`<path d="M32 17l22 15-22 15-22-15z" fill="#ffdf00"/><circle cx="32" cy="32" r="8" fill="#002776"/><path d="M24.4 30q8-3 15.4 2" stroke="#fff" stroke-width="1.4" fill="none"/>`;break;
    default: b=r(6,14,52,36,GY);
  }
  const id='fc'+c+Math.random().toString(36).slice(2,7);
  const wave='M6 14q13-4 26 0t26 0v36q-13 4-26 0t-26 0z';
  return `<defs><clipPath id="${id}"><path d="${wave}"/></clipPath></defs>
  <path d="M5.2 8v51" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/><path d="M5.2 8v51" stroke="${GY}" stroke-width="1.6" stroke-linecap="round"/><circle cx="5.2" cy="7" r="2.6" fill="${YE}" ${ol(1)}/>
  <g transform="translate(2.6 0) scale(.94 1)"><g clip-path="url(#${id})">${b}<path d="M6 14q13-4 26 0v36q-13-4-26 0z" fill="#fff" opacity=".14"/><path d="M32 14q13 4 26 0v36q-13 4-26 0z" fill="#000" opacity=".07"/></g><path d="${wave}" fill="none" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/></g>`;
}

/* ---------- alarm clock ---------- */
function clock(h,m){
  const ha=((h%12)+m/60)*30, ma=m*6;
  const end=(a,l)=>[32+l*Math.sin(a*Math.PI/180),34-l*Math.cos(a*Math.PI/180)].map(v=>v.toFixed(1));
  const [hx,hy]=end(ha,10.5),[mx,my]=end(ma,16.5);
  let ticks='';for(let i=0;i<12;i++){const [x1,y1]=end(i*30,18.6),[x2,y2]=end(i*30,i%3?20:17);ticks+=`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${INK}" stroke-width="${i%3?1.2:2.4}" stroke-linecap="round"/>`}
  return `<path d="M17 52l-4 6M47 52l4 6" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M10 15a8 8 0 0 1 12-5z" fill="${YE}" ${ol(1.3)}/><path d="M54 15a8 8 0 0 0-12-5z" fill="${YE}" ${ol(1.3)}/><path d="M32 7v4" stroke="${OL}" stroke-width="2.6"/><circle cx="32" cy="6" r="2" fill="${YE}" ${ol(1)}/>
  <circle cx="32" cy="34" r="24" fill="${PU}" ${ol(1.6)}/>${shade('M44 13.4A24 24 0 0 1 32 58a24 24 0 0 0 12-44.6z',.14)}<circle cx="32" cy="34" r="20" fill="#fff" ${ol(1.3)}/>
  ${ticks}<path d="M32 34L${hx} ${hy}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/><path d="M32 34L${mx} ${my}" stroke="${PUD}" stroke-width="2.6" stroke-linecap="round"/><circle cx="32" cy="34" r="2.6" fill="${RD}" ${ol(1)}/>
  ${shine('M18 26q3-6 9-8.4',2.2,.9)}`;
}

/* ---------- prepositions: a wooden crate and a red ball ---------- */
function crate(x,y,w,h){
  const d=Math.min(7,w*.28);
  return `<path d="M${x} ${y}l${d} ${-d}h${w}l${-d} ${d}z" fill="${WDL}" ${ol(1.3)}/><path d="M${x+w} ${y}l${d} ${-d}v${h}l${-d} ${d}z" fill="${WDD}" ${ol(1.3)}/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${WD}" ${ol(1.3)}/><path d="M${x} ${y+h/2}h${w}M${x+3} ${y+3}l${w-6} ${h-6}" stroke="${WDD}" stroke-width="1.3" opacity=".7"/>`;
}
function rball(x,y,r=6.5){return `<ellipse cx="${x}" cy="${y+r+.8}" rx="${r*.9}" ry="1.4" fill="#1b1040" opacity=".15"/><circle cx="${x}" cy="${y}" r="${r}" fill="${RD}" ${ol(1.3)}/><path d="M${x-r} ${y}q${r} ${r*.7} ${r*2} 0" stroke="#fff" stroke-width="1.3" fill="none" opacity=".75"/><circle cx="${x-r*.35}" cy="${y-r*.4}" r="${r*.25}" fill="#fff" opacity=".8"/>`;}
function prep(k){
  const floor=`<path d="M3 55.5h58" stroke="${GY}" stroke-width="2.2" stroke-linecap="round"/>`;
  switch(k){
    case 'in': return floor+`<path d="M18 28l7-7h24l-7 7z" fill="#8a5a30" ${ol(1.3)}/><path d="M42 28l7-7v27.5l-7 7z" fill="${WDD}" ${ol(1.3)}/>`+rball(31,33.5,6.5)+`<path d="M18 38h24v17.5H18z" fill="${WD}" ${ol(1.3)}/><path d="M18 46.7h24M21 41l18 11.5" stroke="${WDD}" stroke-width="1.3" opacity=".7"/>`;
    case 'on': return floor+crate(17,34,24,21.5)+rball(30,24,6.5);
    case 'under': return floor+`<path d="M10 22l5-5h40l-5 5z" fill="${WDL}" ${ol(1.3)}/><rect x="10" y="22" width="40" height="5" fill="${WD}" ${ol(1.3)}/><path d="M14 27v28.5M46 27v28.5" stroke="${OL}" stroke-width="4.6" stroke-linecap="round"/><path d="M14 27v28.5M46 27v28.5" stroke="${WDD}" stroke-width="2.6" stroke-linecap="round"/>`+rball(30,48.2,6.5);
    case 'next': return floor+crate(7,33,22,22.5)+rball(46,48.2,6.5);
    case 'behind': return floor+rball(39,26,6.5)+crate(15,33,24,22.5);
    case 'front': return `<path d="M3 47.5h58" stroke="${GY}" stroke-width="2.2" stroke-linecap="round"/>`+crate(18,22,24,25.5)+rball(30,52,8.4);
    case 'between': return floor+crate(3,35,16,20.5)+crate(40,35,16,20.5)+rball(30.5,48.2,6.5);
    case 'near': return floor+crate(4,35,18,20.5)+rball(33,48.6,6);
  }
  return '';
}

/* ---------- scenes used on the rule cards ---------- */
function nearFar(){
  return `<svg viewBox="0 0 240 104" class="ill-wide" role="img" aria-label="this (near), that (far)">
  <path d="M0 92h240" stroke="${GY}" stroke-width="2"/><path d="M150 92l40-34h46" stroke="${GY}" stroke-width="1.4" stroke-dasharray="3 4" fill="none"/>
  <rect x="160" y="16" width="60" height="38" rx="5" fill="${BLL}" ${ol(1.3)}/><path d="M190 16v38M160 35h60" stroke="${OL}" stroke-width="1.2"/><circle cx="208" cy="27" r="5" fill="${YE}"/>
  <g transform="translate(4 26) scale(1.04)">${person(PK,'long')}</g>
  <path d="M56 70q10-6 20-2" stroke="${OL}" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M56 70q10-6 20-2" stroke="${SK}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <g transform="translate(76 52) scale(.5)">${ICONS.book()}</g>
  <g transform="translate(190 70) scale(.3)">${ICONS.book()}</g>
  <path d="M112 64q38-22 74 4" stroke="${PU}" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
  <rect x="80" y="4" width="34" height="18" rx="9" fill="${PU}"/><text x="97" y="17" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="Nunito,sans-serif">this</text>
  <rect x="178" y="86" width="36" height="16" rx="8" fill="${PUD}"/><text x="196" y="98" font-size="11" font-weight="800" fill="#fff" text-anchor="middle" font-family="Nunito,sans-serif">that</text>
  <text x="97" y="36" font-size="10" fill="#7b7499" text-anchor="middle" font-family="Nunito,sans-serif">gần</text><text x="150" y="50" font-size="10" fill="#7b7499" text-anchor="middle" font-family="Nunito,sans-serif">xa →</text></svg>`;
}
function prepGrid(){
  const ks=[['in','in'],['on','on'],['under','under'],['next','next to'],['behind','behind'],['front','in front of'],['between','between'],['near','near']];
  return `<div class="prepgrid">${ks.map(([k,l],n)=>`<figure class="${TONES[n%6]}"><svg viewBox="0 0 64 64" aria-hidden="true">${prep(k)}</svg><figcaption>${l}</figcaption></figure>`).join('')}</div>`;
}
function freqScale(){
  const rows=[['always',5],['usually',4],['often',3],['sometimes',2],['never',0]];
  return `<div class="freq">${rows.map(([w,n])=>`<div class="freq-row"><span class="g g-a">${w}</span><span class="fdots">${[0,1,2,3,4].map(i=>`<i class="${i<n?'on':''}"></i>`).join('')}</span><span class="pct">${n*20}%</span></div>`).join('')}</div>`;
}
function swapIll(){
  return `<div class="swap"><div><span class="g g-s">She</span> <span class="g g-v">is</span> from Japan.</div><svg viewBox="0 0 120 30" aria-hidden="true"><defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="${PU}"/></marker></defs><path d="M30 4q30 28 60 0" stroke="${PU}" stroke-width="2.5" fill="none" marker-end="url(#ah)"/></svg><div><span class="g g-v">Is</span> <span class="g g-s">she</span> from Japan?</div></div>`;
}

const TONES=['t0','t1','t2','t3','t4','t5'];
function tileTone(key){let h=0;for(const c of String(key||''))h=(h*31+c.charCodeAt(0))>>>0;return TONES[h%TONES.length];}
function iconSvg(key,cls='ic'){
  if(!key) key='star';
  let inner='',shadow=true;
  if(key.startsWith('flag:')){inner=flag(key.slice(5));shadow=false;}
  else if(key.startsWith('clock:')){const [,h,m]=key.split(':');inner=clock(+h,+m);}
  else if(key.startsWith('prep:')){inner=prep(key.slice(5));shadow=false;}
  else inner=(ICONS[key]||ICONS.star)();
  const sh=shadow?`<ellipse cx="32" cy="60.5" rx="20" ry="2.8" fill="#5b45b8" opacity=".13"/>`:'';
  return `<svg viewBox="0 0 64 64" class="${cls}" aria-hidden="true">${sh}${inner}</svg>`;
}
function illustration(ill){
  if(ill==='nearfar') return nearFar();
  if(ill==='prepgrid') return prepGrid();
  if(ill==='freq') return freqScale();
  if(ill==='swap') return swapIll();
  if(Array.isArray(ill)) return `<div class="ill-row">${ill.map(k=>`<span class="tile ${tileTone(k)}">${iconSvg(k)}<i class="spark s1"></i></span>`).join('')}</div>`;
  return '';
}
