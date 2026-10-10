(() => {
  const D=window.BUGBREAK_DATA;
  const SAVE_KEY='bugbreak-update1-save';
  const $=id=>document.getElementById(id);
  const now=()=>Date.now();
  const between=(a,b)=>now()>=Date.parse(a)&&now()<Date.parse(b);
  const seasonActive=id=>id==='halloween'?between(D.eventDates.halloweenStart,D.eventDates.halloweenEnd):id==='autumn'?between(D.eventDates.autumnStart,D.eventDates.autumnEnd):true;
  const defaultSave=()=>({
    version:7,gems:220,totalGems:220,candy:0,bestWave:0,bestHard:0,wins:0,hardWins:0,halloweenWins:0,autumnWins:0,
    selectedBug:'ant',selectedMode:'normal',unlocks:{halloweenWin:false},
    upgrades:Object.fromEntries(D.upgrades.map(u=>[u.id,0])),
    halloweenUpgrades:Object.fromEntries(D.halloweenUpgrades.map(u=>[u.id,0])),
    settings:{master:100,music:100,sfx:100,normalMusic:true,shake:true,perf:false},dailyDay:'',dailyStreak:0,halloweenExpiredCleaned:false
  });
  function load(){
    try{
      const raw=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');
      const d=defaultSave();
      if(!raw)return d;
      const s={...d,...raw,unlocks:{...d.unlocks,...(raw.unlocks||{})},upgrades:{...d.upgrades,...(raw.upgrades||{})},halloweenUpgrades:{...d.halloweenUpgrades,...(raw.halloweenUpgrades||{})},settings:{...d.settings,...(raw.settings||{})}};
      if(!seasonActive('halloween')&&!s.halloweenExpiredCleaned){
        s.halloweenUpgrades=Object.fromEntries(D.halloweenUpgrades.map(u=>[u.id,0]));
        s.candy=0;s.halloweenExpiredCleaned=true;
      }
      return s;
    }catch{return defaultSave()}
  }
  let save=load();
  const persist=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(save))}catch{}};
  persist();
  const screens=[...document.querySelectorAll('.screen')];
  let toastTimer=0;
  function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));}
  function toast(msg,ms=2200){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),ms)}
  function halloweenActive(){return seasonActive('halloween')}

  function cleanupExpiredSeason(){
    if(!halloweenActive()&&!save.halloweenExpiredCleaned){
      save.halloweenUpgrades=Object.fromEntries(D.halloweenUpgrades.map(u=>[u.id,0]));
      save.candy=0;save.halloweenExpiredCleaned=true;persist();
    }
  }
  function autumnActive(){return seasonActive('autumn')}
  function modeAvailable(mode){return !mode.seasonal||seasonActive(mode.seasonal)}
  function bugUnlocked(p){if(p.eventUnlock==='halloweenWin')return !!save.unlocks.halloweenWin;return true}
  function bugMini(p){return `<div class="mini-bug ${p.id}" style="--bug:${p.color}"><i class="wing w1"></i><i class="wing w2"></i><i class="leg l1"></i><i class="leg l2"></i><i class="leg l3"></i><i class="body"></i><i class="head"></i></div>`}
  function renderBugs(){
    const box=$('bugSelect');box.innerHTML='';
    for(const p of D.players){
      const ok=bugUnlocked(p),on=save.selectedBug===p.id;
      const b=document.createElement('button');b.type='button';b.className=`bug-card ${on?'selected':''} ${ok?'':'locked'} ${p.best?'best':''} ${p.eventBug?'event-bug':''}`;
      const label=p.eventBug&&!ok?'BEAT HALLOWEEN':p.newBug?'NEW':p.best?'APEX':'';
      b.innerHTML=`${label?`<span class="new-ribbon">${label}</span>`:''}${bugMini(p)}<b>${p.name}</b><small>${p.subtitle}</small>`;
      b.addEventListener('click',()=>{if(!ok)return toast('Beat Halloween Haunt Wave 20 to unlock Ghost Moth permanently.');save.selectedBug=p.id;persist();renderBugs();window.AudioSys.ui()});
      box.appendChild(b);
    }
    const p=D.players.find(x=>x.id===save.selectedBug&&bugUnlocked(x))||D.players[0];if(p.id!==save.selectedBug){save.selectedBug=p.id;persist()}
    $('bugDetail').innerHTML=`<div class="desc"><b>${p.name} · ${p.ability}</b><p>${p.desc}</p></div><div class="stat-pill"><small>HP</small><strong>${p.stats.hp}</strong></div><div class="stat-pill"><small>DAMAGE</small><strong>${p.stats.damage}</strong></div><div class="stat-pill"><small>SPEED</small><strong>${p.stats.speed}</strong></div><div class="stat-pill"><small>CRIT</small><strong>${Math.round(p.stats.crit*100)}%</strong></div>`;
    $('rosterCount').textContent=`${D.players.filter(bugUnlocked).length}/${D.players.length}`;
  }
  function renderModes(){
    const box=$('modeSelect');box.innerHTML='';
    for(const m of D.modes){
      const ok=modeAvailable(m),on=save.selectedMode===m.id;
      const b=document.createElement('button');b.type='button';b.className=`mode-card mode-${m.id} ${on?'selected':''} ${ok?'':'locked'}`;
      let meta=m.kicker;if(m.id==='halloween')meta=ok?'HALLOWEEN LIVE · 20 WAVES':'EVENT ENDED';if(m.id==='autumn')meta=ok?'AUTUMN LIVE · 25 WAVES':'EVENT ENDED';
      b.innerHTML=`<span class="mode-badge">${m.badge}</span><small>${meta}</small><b>${m.name}</b><p>${m.desc}</p>`;
      b.addEventListener('click',()=>{if(!ok)return toast(`${m.name} is not currently active.`);save.selectedMode=m.id;persist();renderModes();syncModeHero();window.AudioSys.ui()});box.appendChild(b);
    }
    if(!modeAvailable(D.modes.find(m=>m.id===save.selectedMode))){save.selectedMode='normal';persist();renderModes()}
  }
  function syncModeHero(){
    const m=D.modes.find(x=>x.id===save.selectedMode)||D.modes[0];$('playBtn').textContent=m.id==='normal'?'START EXPEDITION':m.id==='hard'?'ENTER NIGHTFALL':m.id==='halloween'?'ENTER THE HAUNT':'START HARVEST RUSH';
    $('modeSummary').textContent=m.desc;$('modeWave').textContent=`${m.waves} WAVES`;
  }
  function upCost(u,rank){return Math.round(u.base*(1+rank*.53+rank*rank*.035))}
  function candyCost(u,rank){return Math.round(u.base*(1+rank*.7))}
  function renderShop(){
    cleanupExpiredSeason();
    $('shopGems').textContent=save.gems;$('shopCandy').textContent=save.candy;
    const g=$('upgradeGrid');g.innerHTML='';
    for(const u of D.upgrades){const r=save.upgrades[u.id]||0,c=upCost(u,r),max=r>=u.max;const card=document.createElement('div');card.className=`upgrade ${u.newUpgrade?'new-upgrade':''}`;card.innerHTML=`<div class="up-top"><span class="up-icon">${u.icon}</span><span class="rank">LV ${r}/${u.max}</span></div><h4>${u.name}${u.newUpgrade?' · NEW':''}</h4><p>${u.desc}</p><button ${max||save.gems<c?'disabled':''}>${max?'MAXED':`${c} GEMS`}</button>`;card.querySelector('button').addEventListener('click',()=>{if(max||save.gems<c)return;save.gems-=c;save.upgrades[u.id]=r+1;persist();renderShop();syncMenu();window.AudioSys.sfx('gem',.35)});g.appendChild(card)}
    const seasonal=$('seasonalShop');const sg=$('halloweenUpgradeGrid');
    seasonal.classList.toggle('hidden',!halloweenActive());sg.innerHTML='';
    if(halloweenActive())for(const u of D.halloweenUpgrades){const r=save.halloweenUpgrades[u.id]||0,c=candyCost(u,r),max=r>=u.max;const card=document.createElement('div');card.className='upgrade seasonal-upgrade';card.innerHTML=`<div class="up-top"><span class="up-icon">${u.icon}</span><span class="rank">LV ${r}/${u.max}</span></div><h4>${u.name}</h4><p>${u.desc}</p><button ${max||save.candy<c?'disabled':''}>${max?'MAXED':`${c} CANDY`}</button>`;card.querySelector('button').addEventListener('click',()=>{if(max||save.candy<c)return;save.candy-=c;save.halloweenUpgrades[u.id]=r+1;persist();renderShop();syncMenu();window.AudioSys.sfx('candy',.6)});sg.appendChild(card)}
  }
  function syncMenu(){
    cleanupExpiredSeason();
    $('bestWave').textContent=save.bestWave;$('bestHard').textContent=save.bestHard;$('menuGems').textContent=save.gems;$('menuCandy').textContent=save.candy;$('candyMeta').classList.toggle('hidden',!halloweenActive());renderBugs();renderModes();renderDaily();syncModeHero();
    $('halloweenLivePill').classList.toggle('hidden',!halloweenActive());$('autumnLivePill').classList.toggle('hidden',!autumnActive());
  }
  function dayKey(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
  function renderDaily(){const today=dayKey(),claimed=save.dailyDay===today,box=$('dailyCard');box.innerHTML=`<span><b>DAILY FORAGE</b> · ${claimed?'collected today':'+35 gems and +1 streak'}</span><button ${claimed?'disabled':''}>${claimed?'CLAIMED':'CLAIM'}</button>`;box.querySelector('button').addEventListener('click',()=>{if(claimed)return;save.dailyDay=today;save.dailyStreak=(save.dailyStreak||0)+1;save.gems+=35;save.totalGems+=35;persist();syncMenu();window.AudioSys.sfx('gem');toast('Daily forage: +35 gems')})}
  function settingsUI(){
    const s=save.settings;for(const [id,out,key] of [['masterVol','masterOut','master'],['musicVol','musicOut','music'],['sfxVol','sfxOut','sfx']]){const el=$(id);el.value=s[key];$(out).textContent=s[key]+'%';el.oninput=()=>{$(out).textContent=el.value+'%';s[key]=+el.value;window.AudioSys.update(s);persist()}}
    $('normalMusicToggle').checked=s.normalMusic;$('shakeToggle').checked=s.shake;$('perfToggle').checked=s.perf;
    $('normalMusicToggle').onchange=e=>{s.normalMusic=e.target.checked;window.AudioSys.update(s);persist()};$('shakeToggle').onchange=e=>{s.shake=e.target.checked;persist()};$('perfToggle').onchange=e=>{s.perf=e.target.checked;persist()};window.AudioSys.update(s)
  }
  function addGems(n){n=Math.max(0,Math.round(n));save.gems+=n;save.totalGems+=n;persist();syncMenu()}
  function addCandy(n){if(!halloweenActive())return;save.candy+=Math.max(0,Math.round(n));persist();syncMenu()}
  function recordWave(w,mode){if(mode==='normal'&&w>save.bestWave)save.bestWave=w;if(mode==='hard'&&w>save.bestHard)save.bestHard=w;persist();syncMenu()}
  function win(mode){
    if(mode==='normal'){save.wins++;save.bestWave=50}
    if(mode==='hard'){save.hardWins++;save.bestHard=50}
    if(mode==='halloween'){save.halloweenWins++;save.unlocks.halloweenWin=true}
    if(mode==='autumn')save.autumnWins++;
    persist();syncMenu();
  }
  function reset(){save=defaultSave();persist();settingsUI();syncMenu();toast('Save reset. Starter gems restored.')}

  $('shopBtn').addEventListener('click',()=>{renderShop();show('shop');window.AudioSys.ui()});document.querySelector('[data-close="shop"]').addEventListener('click',()=>show(window.BUGBREAK_GAME?.isRunning?.()?'pause':'menu'));
  $('settingsBtn').addEventListener('click',()=>{settingsUI();show('settings');window.AudioSys.ui()});$('settingsClose').addEventListener('click',()=>show(window.BUGBREAK_GAME?.isRunning?.()?'pause':'menu'));
  $('resetBtn').addEventListener('click',()=>{if(confirm('Reset BUGBREAK progress, event rewards and upgrades?'))reset()});$('pauseShopBtn').addEventListener('click',()=>{renderShop();show('shop')});$('pauseSettingsBtn').addEventListener('click',()=>{settingsUI();show('settings')});$('roundShopBtn').addEventListener('click',()=>window.BUGBREAK_GAME?.openRoundShop?.());
  settingsUI();syncMenu();
  window.UI={show,toast,renderShop,syncMenu,addGems,addCandy,recordWave,win,persist,halloweenActive,autumnActive,seasonActive,get save(){return save},set save(v){save=v;persist()},get selectedBug(){return save.selectedBug},get selectedMode(){return save.selectedMode},get settings(){return save.settings},get upgrades(){return save.upgrades},get halloweenUpgrades(){return save.halloweenUpgrades},upCost};
})();
