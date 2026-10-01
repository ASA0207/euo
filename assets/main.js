const canvas=document.getElementById('stars'),ctx=canvas.getContext('2d');let stars=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight;stars=Array.from({length:Math.min(150,innerWidth/8)},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.2+.2,a:Math.random()*.5+.1,s:Math.random()*.003+.001}))}function draw(t=0){ctx.clearRect(0,0,canvas.width,canvas.height);stars.forEach(p=>{ctx.globalAlpha=p.a+Math.sin(t*p.s)*.12;ctx.fillStyle='#e8d5ad';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill()});requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.getElementById('menu').onclick=()=>document.getElementById('nav').classList.toggle('open');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.getElementById('nav').classList.remove('open'));
document.getElementById('copy').onclick=async()=>{try{await navigator.clipboard.writeText('0326')}catch(e){}const t=document.getElementById('toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)};


// EUNO BGM — Memory Reboot
const bgm=document.getElementById('eunoBgm');
const musicToggle=document.getElementById('musicToggle'), musicIcon=document.getElementById('musicIcon');
const musicMute=document.getElementById('musicMute'), musicVolume=document.getElementById('musicVolume');
const musicState=document.getElementById('musicState'), musicEq=document.getElementById('musicEq');
const musicProgress=document.getElementById('musicProgress'), musicProgressFill=document.getElementById('musicProgressFill');
const bgmGate=document.getElementById('bgmGate');
const savedVol=parseFloat(localStorage.getItem('eunoBgmVolume'));
bgm.volume=Number.isFinite(savedVol)?Math.min(1,Math.max(0,savedVol)):.24;
musicVolume.value=bgm.volume;
bgm.muted=localStorage.getItem('eunoBgmMuted')==='1';
function syncMusic(){const playing=!bgm.paused;musicIcon.textContent=playing?'Ⅱ':'▶';musicState.textContent=playing?'PLAYING':'PAUSED';musicEq.classList.toggle('playing',playing);musicMute.textContent=bgm.muted?'♩':'♫';}
async function playBgm(){try{await bgm.play();bgmGate.hidden=true;syncMusic();return true}catch(e){syncMusic();return false}}
musicToggle.addEventListener('click',()=>bgm.paused?playBgm():bgm.pause());
musicMute.addEventListener('click',()=>{bgm.muted=!bgm.muted;localStorage.setItem('eunoBgmMuted',bgm.muted?'1':'0');syncMusic()});
musicVolume.addEventListener('input',()=>{bgm.volume=Number(musicVolume.value);if(bgm.volume>0&&bgm.muted){bgm.muted=false;localStorage.setItem('eunoBgmMuted','0')}localStorage.setItem('eunoBgmVolume',String(bgm.volume));syncMusic()});
bgm.addEventListener('play',syncMusic);bgm.addEventListener('pause',syncMusic);
bgm.addEventListener('timeupdate',()=>{if(bgm.duration)musicProgressFill.style.width=(bgm.currentTime/bgm.duration*100)+'%'});
musicProgress.addEventListener('click',e=>{if(!bgm.duration)return;const r=musicProgress.getBoundingClientRect();bgm.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*bgm.duration});
document.getElementById('gatePlay').addEventListener('click',playBgm);
document.getElementById('gateSilent').addEventListener('click',()=>{bgm.pause();bgmGate.hidden=true;syncMusic()});
window.addEventListener('load',()=>setTimeout(async()=>{if(!(await playBgm()))bgmGate.hidden=false},450));
syncMusic();
