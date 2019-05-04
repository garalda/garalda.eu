// Gladstone Keep map
var map_textures = [
     	      {id: 1, desc: 'wall', img:"images/wall01.png", wall: undefined, wallr: undefined, wall2r: undefined },
            {id: 2, desc: 'floor', img: imgpath + "floor1.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 3, desc: 'ceiling', img: imgpath + "ceiling1.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 4, desc: 'wall with curtain', img: imgpath + "wallcurt01.png", wall:undefined, wallr: undefined, wall2r:undefined  },
     	      {id: 5, desc: 'doorwall', img: imgpath + "doorwallL.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 6, desc: 'wall with window', img: imgpath + "wallwindow01.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 7, desc: 'wall with design', img: imgpath + "walldesign01.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 8, desc: 'castle_door', img: imgpath + "castle_door.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 9, desc: 'castle_door_btn', img: imgpath + "castle_door_button.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 10, desc: 'doorwall', img: imgpath + "doorwallR.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 11, desc: 'Nathaniel herbs', img: imgpath + "nathaniel_herbs.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 12, desc: 'Geron office', img: imgpath + "geron_office.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 13, desc: 'Victor arms', img: imgpath + "victor_arms.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 14, desc: 'wall with eagle', img: imgpath + "walleagle01.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 15, desc: 'gold table', img: imgpath + "gold_table01.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 16, desc: 'lock', img: imgpath + "lock01.png", wall:undefined, wallr: undefined, wall2r: undefined },     	      
            {id: 17, desc: 'wall with weapons', img: imgpath + "wallswords01.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 18, desc: 'wall with curtain', img: imgpath + "wallcurt02.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 19, desc: 'wall with curtain', img: imgpath + "wallcurt03.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 20, desc: 'wall with curtain', img: imgpath + "wallcurt04.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 21, desc: 'Throne room', img: imgpath + "throne_room.png", wall:undefined, wallr: undefined, wall2r: undefined },
          ];
          
        for (var i = 0;i<map_textures.length;i++)
        {
          map_textures[i].wall = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall.hasAlpha = true;
          map_textures[i].wallr = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall2r = new BABYLON.Texture(map_textures[i].img, scene);
       	  map_textures[i].wallr.wAng = Math.PI / 2;
          map_textures[i].wall2r.wAng = Math.PI;
        }
        
        // directions[jih,západ,sever,východ,nahoru,dolů]
        var map = [
          {id: 01, materials: [0,1,0,1,3,2], directions: [0,9,0,2,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.5, size:0.8,
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 1, blockobj: 3, action: 'updown'}},
                                      ]} 
            ] },
          {id: 02, materials: [0,0,0,0,3,2], directions: [4,1,3,5,0,0]},
          {id: 03, materials: [0,0,4,7,3,2], directions: [2,0,0,6,0,0],
            sprites: [{id: 1, name: 'guard01', img: imgpath + "guard164x164.png", pics: 2, size: 164, scale: 3.75, blockcell: 1, defcellindex: 1, x: 0, y: -0.5, z: -3.75}]},
          {id: 4, materials: [0,6,4,0,3,2], directions: [0,0,2,7,0,0],
            blockobjs: [{id: 1, itemid: 4, type: 'item', desc: 'aloe', material: 1, size: 1, rotx: Math.PI / 2, x: 0, y: -2.45, z: -3.75}],
          },
          {id: 5, materials: [0,0,0,0,3,2], directions: [7,2,6,8,0,0]},
          {id: 6, materials: [1,0,0,6,3,2], directions: [5,3,0,0,0,0]},
          {id: 7, materials: [1,7,0,0,3,2], directions: [0,4,5,0,0,0]},
          {id: 8, materials: [0,1,0,1,3,2], directions: [0,5,0,0,0,0],
            sprites: [{id: 1, name: 'guard02', img: imgpath + "guard164x164.png", pics: 2, size: 164, scale: 3.75, blockcell: 1, defcellindex: 1, x: 0, y: -0.5, z: -5.625}]},
          {id: 9, materials: [0,0,0,0,3,2], directions: [11,14,10,1,0,0]},
          {id: 10, materials: [7,0,0,14,3,2], directions: [9,15,0,0,0,0]},
          {id: 11, materials: [7,0,0,0,3,2], directions: [12,18,9,0,0,0]},
          {id: 12, materials: [1,0,7,0,3,2], directions: [13,0,11,0,0,0],
            blockobjs: [{id: 1, type: 'table', snd: 'royal_harborian', material: 15, x: 0, y: 0, z: -0.1, size:1, scalex: 1.5, desc: 'royalharborian' },]
          },
          {id: 13, materials: [1,0,1,0,3,2], directions: [0,0,12,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0.5, y: 0.3, z: -0.4, roty: Math.PI / 2, size:0.8,
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 13, blockobj: 3, action: 'updown'}},
                                    {id: 2, type: 'shop', money: 90,
                                      object: { type: 'picture', block: 13, blockobj: 5,}, 
                                      items: [{id: 1, name: 'aloe_leaf', value: 5, amount: 5, x: -3.75, y: 0.5, z: -3.75, },
                                        {id: 10, name: 'ginseng', value: 7, amount: 1, x: -3.75, y: 0.5, z: -2.75,  },
                                        {id: 11, name: 'life_elixir', value: 15, amount: 1, x: -3.75, y: 0.5, z: 0.75,  },
                                      ]}]}, 
                        {id: 5, type: 'picture', img: imgpath + "nathaniel_herbs.png", material: 11, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 14, materials: [0,0,17,0,3,2], directions: [18,0,15,9,0,0],
            blockobjs: [{id: 1, type: 'fountain', x: 0, y: -1, z: -3.5, state: 1, },
            ]},
          {id: 15, materials: [0,0,0,0,3,2], directions: [14,22,16,10,0,0], desc: 'před fontánou'},
          {id: 16, materials: [7,0,1,0,3,2], directions: [15,0,17,0,0,0],
            blockobjs: [{id: 1, type: 'picture', material: 15, x: 0, y: 0, z: -7.4, size:1, scalex: 1.5, desc: 'Geron, královský rádce' },]
            },
          {id: 17, materials: [1,0,1,0,3,2], directions: [16,0,0,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8,
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 17, blockobj: 3, action: 'updown'}},
                                    ]},  
                        {id: 5, type: 'picture', material: 12, x: 3.75, y: 0, z: -3.75, roty: Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 18, materials: [0,20,0,0,3,2], directions: [0,19,14,11,0,0]},
          {id: 19, materials: [0,0,1,17,3,2], directions: [20,0,0,18,0,0]},
          {id: 20, materials: [1,0,1,0,3,2], directions: [21,0,19,0,0,0],
            blockobjs: [{id: 1, type: 'table', material: 15, x: 0, y: 0, z: -0.1, size:1, scalex: 1.5, desc: 'Viktorovo zbrojířství' },]
          },
          {id: 21, materials: [1,0,1,0,3,2], directions: [0,0,20,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0.1, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 21, blockobj: 3, action: 'updown'}},
                                    {id: 2, type: 'shop', money: 150, 
                                      object: { type: 'picture', block: 21, blockobj: 5,}, 
                                      items: [{id: 3, name: 'dagger', value: 10, amount: 2, x: -3.75, y: 0.5, z: -3.75, },
                                        {id: 5, name: 'cord', value: 15, amount: 1, x: -3.75, y: 0.5, z: -2.75,  },
                                        {id: 8, name: 'mace', value: 20, amount: 1, x: -3.75, y: 0.5, z: 0.75,  },
                                      ]}]}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
                        {id: 5, type: 'picture', img: imgpath + "victor_arms.png", material: 13, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 22, materials: [0,1,0,7,3,2], directions: [0,23,0,15,0,0]},
          {id: 23, materials: [0,1,0,1,3,2], directions: [0,24,0,22,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.75, size:0.8,
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 23, blockobj: 3, action: 'updown'}},]}, 
            ] },
          {id: 24, materials: [0,0,19,0,3,2], directions: [26,0,25,23,0,0]},
          {id: 25, materials: [1,0,1,0,3,2], directions: [24,0,33,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 25, blockobj: 3, action: 'updown'}},]}, 
            ] },
          {id: 26, materials: [1,6,0,0,3,2], directions: [0,27,24,0,0,0]},
          {id: 27, materials: [0,0,6,1,3,2], directions: [28,0,0,26,0,0]},
          {id: 28, materials: [18,0,18,0,3,2], directions: [29,0,27,0,0,0]},
          {id: 29, materials: [0,0,0,0,3,2], directions: [32,31,28,30,0,0]},
          {id: 30, materials: [1,1,0,1,3,2], directions: [0,29,0,0,0,0]},
          {id: 31, materials: [0,1,1,1,3,2], directions: [0,0,0,29,0,0]},
          {id: 32, materials: [1,0,1,0,3,2], directions: [0,0,29,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 32, blockobj: 3, action: 'updown'}},]}, 
                        {id: 5, type: 'picture', material: 21, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 33, materials: [0,0,0,1,3,2], directions: [25,36,0,34,0,0]},
          {id: 34, materials: [1,1,0,0,3,2], directions: [0,33,35,0,0,0]},
          {id: 35, materials: [1,0,1,0,3,2], directions: [34,0,41,0,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 35, blockobj: 3, action: 'updown'}},]}, 
            ] },
          {id: 36, materials: [0,1,0,1,3,2], directions: [0,37,0,33,0,0], arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.75, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 36, blockobj: 3, action: 'updown'}},]}, 
            ] },
          {id: 37, materials: [0,1,0,0,3,2], directions: [0,38,40,36,0,0]},
          {id: 38, materials: [0,1,1,0,3,2], directions: [0,0,39,37,0,0]},
          {id: 39, materials: [0,0,1,1,3,2], directions: [38,0,0,40,0,0]},
          {id: 40, materials: [1,0,0,1,3,2], directions: [37,39,0,0,0,0]},
          {id: 41, materials: [0,0,1,0,3,2], directions: [35,0,42,44,0,0]},
          {id: 42, materials: [0,0,1,1,3,2], directions: [41,0,0,43,0,0]},
          {id: 43, materials: [1,0,0,1,3,2], directions: [44,42,0,0,0,0]},
          {id: 44, materials: [1,1,0,0,3,2], directions: [0,41,43,0,0,0]},
        ];
        
        for (var i = 0;i<map.length;i++)
        {
          map[i].arrwalls = map[i].materials;
        }
        
        for (let i = 0;i<map.length;i++)
        {
          map[i].arrwalls = map[i].materials;
        }
        
        var curblock = map[1];
         

    DrawMap(map);
