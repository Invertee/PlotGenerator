const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const S={mode:'image',img:null,url:'',name:'Sample landscape',doc:{w:297,h:210,passes:[]},timer:0,cols:['#181a15','#d14a3b','#247a8d','#d29a2e','#7650a8']};
const num=(id,d=0)=>{const e=$(id),v=e?+e.value:NaN;return Number.isFinite(v)?v:d},chk=id=>!!$(id)?.checked,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),plen=p=>p.slice(1).reduce((t,q,i)=>t+dist(p[i],q),