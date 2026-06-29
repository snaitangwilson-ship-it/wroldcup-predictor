const PHONE='917629048752';
const fixtures=[
['🇧🇷 Brazil','🇯🇵 Japan'],['🇩🇪 Germany','🇵🇾 Paraguay'],['🇳🇱 Netherlands','🇲🇦 Morocco'],
['🇨🇮 Ivory Coast','🇳🇴 Norway'],['🇫🇷 France','🇸🇪 Sweden'],['🇲🇽 Mexico','🇪🇨 Ecuador'],
['🏴 England','🇨🇩 DR Congo'],['🇧🇪 Belgium','🇸🇳 Senegal'],['🇺🇸 USA','🇧🇦 Bosnia & Herzegovina'],
['🇪🇸 Spain','🇦🇹 Austria'],['🇵🇹 Portugal','🇭🇷 Croatia'],['🇨🇭 Switzerland','🇩🇿 Algeria'],
['🇦🇺 Australia','🇪🇬 Egypt'],['🇦🇷 Argentina','🇨🇻 Cape Verde'],['🇨🇴 Colombia','🇬🇭 Ghana']];
const picks={};const m=document.getElementById('matches');
fixtures.forEach((f,i)=>{let d=document.createElement('div');d.className='match';
d.innerHTML=`<div class="team">${i+1}. ${f[0]} vs ${f[1]}</div><div class=row>
<button class=pick>${f[0]} Win</button><button class=pick>Draw</button><button class=pick>${f[1]} Win</button></div>`;
let bs=d.querySelectorAll('.pick');
bs.forEach((b,n)=>b.onclick=()=>{bs.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');picks[i]=n==0?f[0]:n==1?'Draw':f[1];check();});
m.appendChild(d);});
function check(){submit.disabled=!(name.value&&phone.value&&Object.keys(picks).length===15)}
name.oninput=phone.oninput=check;
submit.onclick=()=>{
let t='🏆 FIFA World Cup 2026 Prediction\n\nName: '+name.value+'\nPhone: '+phone.value+'\n\n';
fixtures.forEach((f,i)=>t+=`${f[0]} vs ${f[1]}: ${picks[i]}\n`);
open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(t),'_blank');
}
const target=new Date('2026-07-02T19:00:00');
setInterval(()=>{let d=target-new Date();if(d<0){countdown.innerHTML='Predictions Closed';return;}
let days=Math.floor(d/86400000),h=Math.floor(d%86400000/3600000),m=Math.floor(d%3600000/60000);
countdown.innerHTML=`⏳ ${days}d ${h}h ${m}m remaining`;},1000);
