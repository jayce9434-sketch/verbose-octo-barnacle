(() => {
  const P=(id,name,subtitle,color,stats,ability,desc,opts={})=>({id,name,subtitle,color,stats,ability,desc,...opts});
  const E=(id,name,color,hp,speed,damage,reward,xp,ai='walker',size=18,from=1,opts={})=>({id,name,color,hp,speed,damage,reward,xp,ai,size,from,...opts});
  const B=(id,name,color,hp,speed,damage,reward,xp,theme,wave,ai='boss',size=50,tag='APEX PREDATOR',opts={})=>({id,name,color,hp,speed,damage,reward,xp,theme,wave,ai,size,tag,...opts});

  window.BUGBREAK_DATA={
    version:'UPDATE 1 · NIGHTFALL & HAUNT',
    campaignWaves:50,
    eventDates:{
      halloweenStart:'2026-10-01T04:00:00Z',
      halloweenEnd:'2026-11-03T05:00:00Z',
      autumnStart:'2026-10-10T04:00:00Z',
      autumnEnd:'2026-12-02T05:00:00Z'
    },
    modes:[
      {id:'normal',name:'COLONY SIEGE',kicker:'NORMAL · 50 WAVES',desc:'The rebuilt backyard campaign. 20 predator species, 5 Boss-class enemies and 10 Apex bosses.',waves:50,badge:'DAY'},
      {id:'hard',name:'NIGHTFALL',kicker:'HARD MODE · 50 WAVES',desc:'Permanent night. Every predator has a Nightmare redesign, stronger stats, denser waves and deadlier bosses.',waves:50,badge:'HARD'},
      {id:'halloween',name:'HALLOWEEN HAUNT',kicker:'EVENT · 20 WAVES',desc:'Three haunted biomes, Candy Corn, seasonal upgrades, two Halloween bosses and one final boss. Beat it to unlock Ghost Moth.',waves:20,badge:'EVENT',seasonal:'halloween'},
      {id:'autumn',name:'HARVEST RUSH',kicker:'EVENT · 25 WAVES',desc:'Leaf-storm combat, golden predator variants and a Harvest Stag finale. Completion pays a giant Gem bonus.',waves:25,badge:'EVENT',seasonal:'autumn'}
    ],
    players:[
      P('ant','Ant','Balanced leader','#c9563d',{hp:205,speed:228,damage:27,cooldown:8.4,crit:.08},'Rally Bite','Shockwave bite and a temporary movement surge.'),
      P('termite','Termite','Fortress builder','#e4c896',{hp:280,speed:183,damage:24,cooldown:10.2,crit:.05},'Mud Bastion','Repairs the nest and raises a temporary damage-reducing bastion.'),
      P('ladybug','Ladybug','Armored guardian','#e33a36',{hp:255,speed:198,damage:25,cooldown:9,crit:.06},'Shell Guard','Massive temporary armor and a close-range knockback burst.'),
      P('fly','Fly','Burst speedster','#6e788b',{hp:170,speed:285,damage:23,cooldown:6,crit:.12},'Afterimage','Long phasing dash that cuts every enemy crossed.'),
      P('mosquito','Mosquito','Lifesteal assassin','#7b334a',{hp:165,speed:252,damage:29,cooldown:7.2,crit:.15},'Blood Rush','Teleports into a piercing strike and heals from the impact.'),
      P('dragonfly','Dragonfly','Ranged precision','#4f9d9b',{hp:180,speed:245,damage:26,cooldown:7.8,crit:.14},'Wing Lance','Piercing wind line with long range.'),
      P('bee','Bee','Stinger striker','#d9a91e',{hp:190,speed:252,damage:31,cooldown:7,crit:.13},'Royal Sting','Dive strike that marks a target for amplified follow-up damage.'),
      P('stinkbug','Stinkbug','Area controller','#7b9b51',{hp:225,speed:205,damage:26,cooldown:8.2,crit:.08},'Noxious Cloud','Creates a lingering toxic zone that slows and damages predators.'),
      P('spider','Spider','Apex hunter','#6f4f75',{hp:215,speed:240,damage:35,cooldown:6.6,crit:.18},'Web Execution','Webs nearby targets, then heavily executes low-health enemies.',{best:true}),
      P('firefly','Firefly','Radiant duelist','#f4c94a',{hp:195,speed:250,damage:32,cooldown:6.8,crit:.14},'Solar Flash','UPDATE 1. Detonates a radiant flash: high damage, long stun, and a short attack-speed boost.',{newBug:true}),
      P('ghost-moth','Ghost Moth','Haunted reward','#c9b8ff',{hp:205,speed:262,damage:34,cooldown:6.4,crit:.17},'Phantom Bloom','EVENT REWARD. Phase through danger and unleash spectral moths that seek several targets.',{eventUnlock:'halloweenWin',eventBug:true})
    ],
    enemies:[
      E('garden-ant','Garden Ant','#56312c',48,58,8,3,8,'walker',15,1),
      E('fire-ant','Fire Ant','#b74529',54,71,9,4,9,'swarm',14,2),
      E('flea','Flea','#74594a',43,92,11,4,10,'leaper',12,3),
      E('spider-mite','Spider Mite','#6d2c49',62,77,10,5,11,'skitter',13,4),
      E('earwig','Earwig','#7f4a2c',95,49,14,6,15,'bruiser',19,6),
      E('rove-beetle','Rove Beetle','#30323b',125,43,16,7,18,'tank',21,8),
      E('centipede','House Centipede','#b79a70',88,89,15,7,18,'charger',23,10),
      E('wasp','Paper Wasp','#e1ad32',76,83,16,8,20,'flier',19,12),
      E('robber-fly','Robber Fly','#758487',91,98,18,8,22,'dive',18,14),
      E('wolf-spider','Wolf Spider','#604739',142,67,21,10,28,'hunter',25,16),
      E('assassin-bug','Assassin Bug','#8c4327',119,62,24,11,31,'bleed',23,18),
      E('bombardier','Bombardier Beetle','#353b28',165,45,22,12,34,'artillery',24,20),
      E('hornet','Hornet','#df8c1f',132,93,27,13,38,'elite-flier',23,24),
      E('mantis-nymph','Mantis Nymph','#689b51',185,66,31,15,43,'slasher',28,28),
      E('water-bug','Giant Water Bug','#4b5c54',245,41,34,18,52,'heavy',31,32),
      E('scorpion','Scorpion','#9f6d3e',220,54,38,19,56,'venom',30,36),
      E('stag-beetle','Stag Beetle','#60402f',295,43,42,22,64,'rammer',34,40),
      E('hunter-dragonfly','Hunter Dragonfly','#448e97',190,104,40,22,66,'sniper',26,44),
      E('dobsonfly','Dobsonfly','#5d423a',235,70,44,24,70,'dobson',33,34,{newEnemy:true}),
      E('mole-cricket','Mole Cricket','#846239',330,48,47,25,76,'burrow',35,38,{newEnemy:true})
    ],
    miniBosses:[
      E('boss1','Boss1 · Iron Earwig','#a85d37',580,58,38,35,95,'boss1',39,8,{bossClass:true,rank:'BOSS1'}),
      E('boss2','Boss2 · Razor Mantis','#75ad50',820,72,46,45,125,'boss2',44,18,{bossClass:true,rank:'BOSS2'}),
      E('boss3','Boss3 · Widow Stalker','#7f365c',1120,80,55,58,155,'boss3',47,28,{bossClass:true,rank:'BOSS3'}),
      E('boss4','Boss4 · Hornet Bruiser','#ec9c24',1460,90,64,72,190,'boss4',52,38,{bossClass:true,rank:'BOSS4'}),
      E('boss5','Boss5 · Centipede Reaper','#c2a067',1880,82,75,92,240,'boss5',60,48,{bossClass:true,rank:'BOSS5'})
    ],
    bosses:[
      B('mantis','Garden Mantis','#68a64f',820,64,30,34,105,'boss-1.mp3',5,'mantis',56,'GARDEN EXECUTIONER'),
      B('widow','Black Widow','#46213a',1160,72,36,43,132,'boss-2.mp3',10,'widow',52,'WEB TYRANT'),
      B('wasp-queen','Paper Wasp Queen','#dfa72b',1540,80,43,52,166,'boss-3.mp3',15,'waspqueen',58,'SKY MATRIARCH'),
      B('centipede-king','Centipede King','#b89a68',1940,79,49,64,198,'boss-4.mp3',20,'centiking',68,'HUNDRED-LEGGED KING'),
      B('rhino','Rhinoceros Beetle','#57412b',2420,50,58,79,242,'boss-5.mp3',25,'rhino',70,'ARMORED COLOSSUS'),
      B('assassin-king','Assassin King','#8c3f2a',2790,70,63,90,276,'boss-6.mp3',30,'assassinboss',64,'RED BLADE'),
      B('hornet-queen','Hornet Queen','#e48a1b',3340,96,69,104,318,'boss-7.mp3',35,'hornetboss',66,'AIRBORNE QUEEN'),
      B('scorpion-matriarch','Scorpion Matriarch','#996338',3860,60,78,118,362,'boss-8.mp3',40,'scorpionboss',75,'VENOM MATRIARCH'),
      B('water-titan','Water Bug Titan','#3e5651',4490,51,87,136,414,'boss-9.mp3',45,'watertitan',80,'POND TITAN'),
      B('mantis-overlord','Mantis Overlord','#75be4a',5650,77,99,195,550,'boss-10.mp3',50,'overlord',86,'FINAL APEX')
    ],
    halloweenBosses:[
      B('pumpkin-widow','Pumpkin Widow','#ef7f28',1450,74,45,70,190,'halloween-boss-1.mp3',7,'pumpkinwidow',62,'HAUNTED BOSS'),
      B('grave-mantis','Graveyard Mantis','#8ad56d',2450,72,61,100,275,'halloween-boss-2.mp3',14,'gravemantis',74,'HAUNTED BOSS'),
      B('hollow-queen','Hollow Queen','#c697ff',4100,88,82,180,460,'halloween-final.mp3',20,'hollowqueen',88,'HALLOWEEN FINAL BOSS')
    ],
    autumnBosses:[
      B('harvest-stag','Harvest Stag','#d4862f',3850,61,78,150,390,'autumn-boss.mp3',25,'harveststag',82,'HARVEST FINAL BOSS')
    ],
    upgrades:[
      {id:'bite',name:'Mandible Power',icon:'✦',desc:'+10% attack damage per rank',base:24,max:12},
      {id:'health',name:'Carapace',icon:'⬢',desc:'+9% max health per rank',base:22,max:12},
      {id:'speed',name:'Leg Strength',icon:'➤',desc:'+4.5% move speed per rank',base:20,max:10},
      {id:'cooldown',name:'Reflex Nerves',icon:'⌁',desc:'Abilities recharge 5% faster',base:26,max:10},
      {id:'nest',name:'Nest Reinforcement',icon:'⌂',desc:'+11% nest health per rank',base:28,max:12},
      {id:'repair',name:'Worker Crew',icon:'⚒',desc:'+12% repair amount per rank',base:24,max:10},
      {id:'gem',name:'Gem Sense',icon:'◇',desc:'+5% Gem rewards per rank',base:30,max:10},
      {id:'crit',name:'Predator Eyes',icon:'◎',desc:'+1.8% crit chance per rank',base:27,max:10},
      {id:'critdmg',name:'Critical Bite',icon:'⚡',desc:'+10% crit damage per rank',base:29,max:10},
      {id:'magnet',name:'Forager Range',icon:'◉',desc:'+13% pickup radius per rank',base:18,max:8},
      {id:'lifesteal',name:'Hemolymph Return',icon:'♥',desc:'+1% lifesteal per rank',base:34,max:8},
      {id:'crumbs',name:'Emergency Stores',icon:'▣',desc:'+12 starting crumbs per rank',base:21,max:10},
      {id:'bossbreak',name:'Boss Breaker',icon:'♜',desc:'+6% damage to Boss1–Boss5 and Apex bosses per rank',base:38,max:10,newUpgrade:true}
    ],
    halloweenUpgrades:[
      {id:'candyfang',name:'Candy Fang',icon:'◈',desc:'+8% damage in every mode while Halloween is active',base:35,max:5},
      {id:'lanternshell',name:'Lantern Shell',icon:'⬣',desc:'+10% max HP while Halloween is active',base:40,max:5},
      {id:'witchwing',name:'Witch Wing',icon:'↟',desc:'+5% move speed and +3% crit per rank while active',base:45,max:5},
      {id:'graveward',name:'Grave Ward',icon:'†',desc:'+12% nest HP per rank while Halloween is active',base:48,max:5}
    ],
    mutations:[
      {id:'feral',name:'Feral Mandibles',desc:'+18% attack damage',apply:s=>s.damage*=1.18},
      {id:'shell',name:'Layered Shell',desc:'+22% max health and heal 22%',apply:s=>{s.maxHp*=1.22;s.hp=Math.min(s.maxHp,s.hp+s.maxHp*.22)}},
      {id:'runner',name:'Spring Legs',desc:'+13% move speed',apply:s=>s.speed*=1.13},
      {id:'nerve',name:'Hyper Nerves',desc:'Special cooldown -16%',apply:s=>s.cooldown*=.84},
      {id:'fang',name:'Serrated Bite',desc:'+12% crit chance',apply:s=>s.crit+=.12},
      {id:'heavycrit',name:'Crushing Criticals',desc:'+45% critical damage',apply:s=>s.critMult+=.45},
      {id:'vamp',name:'Hemolymph Feast',desc:'+6% lifesteal',apply:s=>s.lifesteal+=.06},
      {id:'repair',name:'Colony Instinct',desc:'Repairs are 35% stronger',apply:s=>s.repairPower*=1.35},
      {id:'fort',name:'Nest Bond',desc:'Nest max health +18% this run',apply:s=>s.nestBoost*=1.18},
      {id:'reach',name:'Extended Lunge',desc:'+24% bite range',apply:s=>s.range*=1.24},
      {id:'double',name:'Double Mandible',desc:'18% chance to bite twice',apply:s=>s.doubleHit+=.18},
      {id:'gem',name:'Crystal Nose',desc:'+18% Gem drops',apply:s=>s.gemMult*=1.18},
      {id:'crumb',name:'Efficient Forager',desc:'+24% crumb drops',apply:s=>s.crumbMult*=1.24},
      {id:'shock',name:'Impact Glands',desc:'Bites create a small splash hit',apply:s=>s.splash+=.28},
      {id:'dash',name:'Piston Legs',desc:'Dash damage +70%',apply:s=>s.dashPower*=1.7},
      {id:'armor',name:'Dense Chitin',desc:'Take 12% less damage',apply:s=>s.armor=Math.min(.58,s.armor+.12)},
      {id:'regen',name:'Quiet Regeneration',desc:'Regenerate 0.6% HP/sec',apply:s=>s.regen+=.006},
      {id:'boss',name:'Apex Hunter',desc:'+25% damage to all bosses',apply:s=>s.bossDamage*=1.25},
      {id:'execute',name:'Execution Instinct',desc:'+30% damage to enemies under 25% HP',apply:s=>s.execute*=1.30},
      {id:'stun',name:'Nerve Shock',desc:'Bites have 8% chance to stun',apply:s=>s.stun+=.08},
      {id:'razor',name:'Razor Crown',desc:'+12% damage · +7% crit · grows visible crown-fangs',apply:s=>{s.damage*=1.12;s.crit+=.07}},
      {id:'prism',name:'Prism Chitin',desc:'+16% max HP · +8% armor · adds reflective armor bands',apply:s=>{s.maxHp*=1.16;s.hp*=1.16;s.armor=Math.min(.62,s.armor+.08)}},
      {id:'phase',name:'Phase Legs',desc:'+18% speed · +35% dash damage · leaves energy fins',apply:s=>{s.speed*=1.18;s.dashPower*=1.35}},
      {id:'hunter',name:'Hunter Crest',desc:'+20% boss damage · +12% execute damage',apply:s=>{s.bossDamage*=1.2;s.execute*=1.12}},
      {id:'twin',name:'Twin Fang Gene',desc:'+12% double bite chance · +6% crit',apply:s=>{s.doubleHit+=.12;s.crit+=.06}},
      {id:'bloodcarapace',name:'Blood Carapace',desc:'+4% lifesteal · +5% armor · crimson body core',apply:s=>{s.lifesteal+=.04;s.armor=Math.min(.62,s.armor+.05)}},
      {id:'colonycore',name:'Colony Core',desc:'+22% nest max HP · +12 crumbs every wave',apply:s=>{s.nestBoost*=1.22;s.waveCrumbs+=12}},
      {id:'rapid',name:'Rapid Mandibles',desc:'Bite 18% faster for the rest of the run',apply:s=>s.biteRate*=1.18}
    ],
    relics:[
      {id:'amber',name:'Amber Heart',desc:'+35% HP · regenerate 1% HP/sec',apply:s=>{s.maxHp*=1.35;s.hp=s.maxHp;s.regen+=.01}},
      {id:'fang',name:'Ancient Fang',desc:'+42% damage · +10% crit',apply:s=>{s.damage*=1.42;s.crit+=.10}},
      {id:'wing',name:'Prismatic Wing',desc:'+28% speed · cooldown -20%',apply:s=>{s.speed*=1.28;s.cooldown*=.8}},
      {id:'queen',name:'Queen Pheromone',desc:'Nest +30% max HP and full heal',apply:s=>s.nestBoost*=1.30},
      {id:'void',name:'Void Carapace',desc:'18% armor · +50% crit damage',apply:s=>{s.armor=Math.min(.65,s.armor+.18);s.critMult+=.5}},
      {id:'blood',name:'Crimson Proboscis',desc:'10% lifesteal · +20% boss damage',apply:s=>{s.lifesteal+=.10;s.bossDamage*=1.2}},
      {id:'hive',name:'Hive Crystal',desc:'+60 starting crumbs every wave',apply:s=>s.waveCrumbs+=60},
      {id:'storm',name:'Storm Thorax',desc:'Every 5th bite chains lightning',apply:s=>s.chain=true},
      {id:'moonstone',name:'Moonstone Crown',desc:'+30% damage · +12% speed · blue lunar aura',apply:s=>{s.damage*=1.30;s.speed*=1.12}},
      {id:'thornidol',name:'Thorn Idol',desc:'+12% armor · +35% splash damage',apply:s=>{s.armor=Math.min(.68,s.armor+.12);s.splash+=.35}},
      {id:'fireprism',name:'Firefly Prism',desc:'Chain lightning enabled · special cooldown -15%',apply:s=>{s.chain=true;s.cooldown*=.85}},
      {id:'hollowbell',name:'Hollow Bell',desc:'Regenerate 1.2% HP/sec · +20% execute damage',apply:s=>{s.regen+=.012;s.execute*=1.20}},
      {id:'royalmandible',name:'Royal Mandible',desc:'+25% double bite chance · +30% critical damage',apply:s=>{s.doubleHit+=.25;s.critMult+=.30}},
      {id:'broodcore',name:'Brood Core',desc:'+35 crumbs every wave · +50% repair power · +20% nest HP',apply:s=>{s.waveCrumbs+=35;s.repairPower*=1.5;s.nestBoost*=1.20}}
    ],
    biomes:[
      {name:'Clover Meadow',from:1,to:10,ground:'#153a24',ground2:'#2a6537',path:'#716f41',accent:'#9ed260',sky:'#98d99f'},
      {name:'Flower Bed',from:11,to:20,ground:'#243529',ground2:'#553f35',path:'#7c5940',accent:'#dd8ad4',sky:'#edb271'},
      {name:'Moon Garden',from:21,to:30,ground:'#0d2030',ground2:'#17384c',path:'#354c60',accent:'#98b0ff',sky:'#35457f'},
      {name:'Compost Yard',from:31,to:40,ground:'#382e20',ground2:'#5c442c',path:'#84663c',accent:'#efb456',sky:'#d17a49'},
      {name:'Porch Raid',from:41,to:50,ground:'#252a27',ground2:'#4d5041',path:'#786f59',accent:'#f6d87a',sky:'#92a9ac'}
    ],
    halloweenBiomes:[
      {name:'Pumpkin Patch',from:1,to:6,ground:'#231613',ground2:'#4b2516',path:'#7f4b25',accent:'#ff9a38',sky:'#5e2846',haunted:true},
      {name:'Graveyard Garden',from:7,to:13,ground:'#121c18',ground2:'#26352d',path:'#4b4d47',accent:'#9ee879',sky:'#292e56',haunted:true},
      {name:'Haunted Greenhouse',from:14,to:20,ground:'#161321',ground2:'#31224a',path:'#57406c',accent:'#c79cff',sky:'#25183d',haunted:true}
    ],
    autumnBiomes:[
      {name:'Amber Lawn',from:1,to:8,ground:'#3d2a17',ground2:'#714321',path:'#8a6638',accent:'#f1b24f',sky:'#cf7445',autumn:true},
      {name:'Leafstorm Grove',from:9,to:17,ground:'#342719',ground2:'#624025',path:'#765337',accent:'#e88d37',sky:'#944d3c',autumn:true},
      {name:'Harvest Porch',from:18,to:25,ground:'#2d261f',ground2:'#594232',path:'#856b4d',accent:'#f4cb6a',sky:'#6e4a49',autumn:true}
    ]
  };
})();
