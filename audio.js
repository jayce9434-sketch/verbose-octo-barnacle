(() => {
  const music=new Audio();music.loop=true;music.preload='auto';
  const boss=new Audio();boss.loop=true;boss.preload='auto';
  let settings={master:100,music:100,sfx:100,normalMusic:true};let currentNormal='',currentBoss='';
  const sfx={};const sfxNames=['bite','hit','dash','gem','repair','level','boss','special','death','candy','wave','night','haunt','victory'];
  for(const n of sfxNames){const a=new Audio(`sfx-${n}.wav`);a.preload='auto';sfx[n]=a}
  const vol=(kind='music')=>Math.max(0,Math.min(20,(settings.master/100)*(settings[kind]/100)));
  function apply(){music.volume=Math.min(1,vol('music'));boss.volume=Math.min(1,vol('music'))}
  function update(next={}){settings={...settings,...next};apply();if(!settings.normalMusic)music.pause();else if(!currentBoss&&currentNormal&&music.paused)music.play().catch(()=>{})}
  function normalFile(mode,index){
    if(mode==='hard')return `hard-night-${1+((index-1)%2)}.mp3`;
    if(mode==='halloween')return `halloween-biome-${Math.max(1,Math.min(3,index))}.mp3`;
    if(mode==='autumn')return `autumn-${1+((index-1)%2)}.mp3`;
    return `update1-normal-${Math.max(1,Math.min(5,index))}.mp3`;
  }
  function playNormal(mode='normal',index=1){if(currentBoss)return;const file=normalFile(mode,index);if(currentNormal!==file){currentNormal=file;music.src=file;music.currentTime=0}if(settings.normalMusic)music.play().catch(()=>{})}
  function playBoss(file){if(!file)return;currentBoss=file;music.pause();if(!boss.src.endsWith(file)){boss.src=file;boss.currentTime=0}boss.play().catch(()=>{})}
  function stopBoss(mode='normal',index=1){boss.pause();boss.currentTime=0;currentBoss='';playNormal(mode,index)}
  function stopAll(){music.pause();boss.pause();currentBoss=''}
  function oneShot(name,scale=1){const base=sfx[name];if(!base)return;const a=base.cloneNode();a.volume=Math.min(1,vol('sfx')*scale);a.playbackRate=.965+Math.random()*.07;a.play().catch(()=>{})}
  function ui(){oneShot('gem',.25)}
  function prewarm(){for(const a of [music,boss,...Object.values(sfx)])try{a.load()}catch{}}
  apply();window.AudioSys={update,playNormal,playBoss,stopBoss,stopAll,sfx:oneShot,ui,prewarm,get currentBoss(){return currentBoss}};
})();
