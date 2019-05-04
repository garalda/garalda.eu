// Gladstone Keep map
var map_textures = [
     	      {id: 1, desc: 'wall', img:"images/wall01.png", wall: undefined, wallr: undefined, wall2r: undefined },
            {id: 2, desc: 'floor', img: "images/floor1.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 3, desc: 'ceiling', img: "images/ceiling1.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 4, desc: 'wall with curtain', img: "images/wallcurt01.png", wall:undefined, wallr: undefined, wall2r:undefined  },
     	      {id: 5, desc: 'doorwall', img: "images/doorwallL.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 6, desc: 'wall with window', img: "images/wallwindow01.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 7, desc: 'wall with design', img: "images/walldesign01.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 8, desc: 'castle_door', img: "images/castle_door.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 9, desc: 'castle_door_btn', img: "images/castle_door_button.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 10, desc: 'doorwall', img: "images/doorwallR.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 11, desc: 'Nathaniel herbs', img: "images/nathaniel_herbs.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 12, desc: 'Geron office', img: "images/geron_office.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 13, desc: 'Victor arms', img: "images/victor_arms.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 14, desc: 'wall with eagle', img: "images/walleagle01.png", wall:undefined, wallr: undefined, wall2r: undefined },
     	      {id: 15, desc: 'gold table', img: "images/gold_table01.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 16, desc: 'lock', img: "images/lock01.png", wall:undefined, wallr: undefined, wall2r: undefined },     	      
            {id: 17, desc: 'wall with weapons', img: "images/wallswords01.png", wall:undefined, wallr: undefined, wall2r: undefined },
            {id: 18, desc: 'wall with curtain', img: "images/wallcurt02.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 19, desc: 'wall with curtain', img: "images/wallcurt03.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 20, desc: 'wall with curtain', img: "images/wallcurt04.png", wall:undefined, wallr: undefined, wall2r:undefined  },
            {id: 21, desc: 'Throne room', img: "images/throne_room.png", wall:undefined, wallr: undefined, wall2r: undefined },
          ];
          
        for (var i = 0;i<map_textures.length;i++)
        {
        /*
          map_textures[i].wall = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall.hasAlpha = true;
          map_textures[i].wallr = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall2r = new BABYLON.Texture(map_textures[i].img, scene);
       	  map_textures[i].wallr.wAng = Math.PI / 2;
          map_textures[i].wall2r.wAng = Math.PI;
          */
        }
        
        // x = -22.5 (3), z = -60 (8)
        // ^
        // | x
        // |
        // |
        // |
        // |
        // |
        // |__________________\ z
        //                    /
        //
        //              | 0
        //              |
        //              |
        //              |
        // 270 ---------+------------- 90
        //              |
        //              |
        //              |
        //              |
        //             180
        var map = [
          {id: 1, materials: '0;1;0;1;3;2', x: 5, y: 0, z: 6, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.75, size:0.8, action: 'oc_door;1;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
            ] },
          {id: 2, materials: '0;0;0;0;3;2', x: 4, y: 0, z: 6},
          {id: 3, materials: '0;0;4;7;3;2', x: 4, y: 0, z: 5,
            sprites: [{id: 1, name: 'guard01', img: "images/guard164x164.png", pics: 2, size: 164, scale: 3.75, blockcell: 1, defcellindex: 1, x: 0, y: -0.5, z: -3.75}]},
          {id: 4, materials: '0;6;4;0;3;2', x: 4, y: 0, z: 7,
            blockobjs: [{id: 1, type: 'item', desc: 'aloe', material: 1, size: 1, rotx: Math.PI / 2, x: 0, y: -2.45, z: -3.75}],
          },
          {id: 5, materials: '0;0;0;0;3;2', x: 3, y: 0, z: 6},
          {id: 6, materials: '1;0;0;6;3;2', x: 3, y: 0, z: 5},
          {id: 7, materials: '1;7;0;0;3;2', x: 3, y: 0, z: 7},
          {id: 8, materials: '0;1;0;1;3;2', x: 2, y: 0, z: 6,
            sprites: [{id: 1, name: 'guard02', img: "images/guard164x164.png", pics: 2, size: 164, scale: 3.75, blockcell: 1, defcellindex: 1, x: 0, y: -0.5, z: -5.625}]},
          {id: 9, materials: '0;0;0;0;3;2', x: 6, y: 0, z: 6},
          {id: 10, materials: '7;0;0;14;3;2', x: 6, y: 0, z: 5},
          {id: 11, materials: '7;0;0;0;3;2', x: 6, y: 0, z: 7},
          {id: 12, materials: '1;0;7;0;3;2', x: 6, y: 0, z: 8,
            blockobjs: [{id: 1, type: 'table', material: 15, x: 0, y: 0, z: -0.1, size:1, scalex: 1.5, desc: 'Nathanielovy bylinky' },]
          },
          {id: 13, materials: '1;0;1;0;3;2', x: 6, y: 0, z: 9, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.4, roty: Math.PI / 2, size:0.8, action: 'oc_door;13;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
                        {id: 5, type: 'picture', material: 11, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 14, materials: '0;0;17;0;3;2', x: 7, y: 0, z: 6,
            blockobjs: [{id: 1, type: 'fountain', x: 0, y: -1, z: -3.5, state: 1, },
            ]},
          {id: 15, materials: '0;0;0;0;3;2', x: 7, y: 0, z: 5, desc: 'před fontánou'},
          {id: 16, materials: '7;0;1;0;3;2', x: 7, y: 0, z: 4,
            blockobjs: [{id: 1, type: 'picture', material: 15, x: 0, y: 0, z: -7.4, size:1, scalex: 1.5, desc: 'Geron, královský rádce' },]
            },
          {id: 17, materials: '1;0;1;0;3;2', x: 7, y: 0, z: 3, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, action: 'oc_door;17;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
                        {id: 5, type: 'picture', material: 12, x: 3.75, y: 0, z: -3.75, roty: Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 18, materials: '0;20;0;0;3;2', x: 7, y: 0, z: 7},
          {id: 19, materials: '0;0;1;17;3;2', x: 8, y: 0, z: 7},
          {id: 20, materials: '1;0;1;0;3;2', x: 8, y: 0, z: 8,
            blockobjs: [{id: 1, type: 'table', material: 15, x: 0, y: 0, z: -0.1, size:1, scalex: 1.5, desc: 'Viktorovo zbrojířství' },]
          },
          {id: 21, materials: '1;0;1;0;3;2', x: 8, y: 0, z: 9, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0.1, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, 
                          actions: [{id: 1, type: 'openclose', object: { type: 'door', block: 21, blockobj: 3, action: 'updown'}},
                                    {id: 2, type: 'shop', texture: 13, money: 150, 
                                      items: [{id: 3, value: 10, amount: 2, },]}]}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
                        {id: 5, type: 'picture', material: 13, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 22, materials: '0;1;0;7;3;2', x: 8, y: 0, z: 5},
          {id: 23, materials: '0;1;0;1;3;2', x: 9, y: 0, z: 5, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.75, size:0.8, action: 'oc_door;23;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
            ] },
          {id: 24, materials: '0;0;19;0;3;2', x: 10, y: 0, z: 5},
          {id: 25, materials: '1;0;1;0;3;2', x: 10, y: 0, z: 4, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, action: 'oc_door;21;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
            ] },
          {id: 26, materials: '1;6;0;0;3;2', x: 10, y: 0, z: 6},
          {id: 27, materials: '0;0;6;1;3;2', x: 12, y: 0, z: 6},
          {id: 28, materials: '18;0;18;0;3;2', x: 12, y: 0, z: 7},
          {id: 29, materials: '0;0;0;0;3;2', x: 12, y: 0, z: 8},
          {id: 30, materials: '1;1;0;1;3;2', x: 11, y: 0, z: 8},
          {id: 31, materials: '0;1;1;1;3;2', x: 13, y: 0, z: 8},
          {id: 32, materials: '1;0;1;0;3;2', x: 12, y: 0, z: 9, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, action: 'oc_door;32;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
                        {id: 5, type: 'picture', material: 21, x: -3.75, y: 0, z: -3.75, roty: -Math.PI / 2, size:5, scalex: 1.5, },
            ] },
          {id: 33, materials: '0;0;0;1;3;2', x: 10, y: 0, z: 3},
          {id: 34, materials: '1;1;0;0;3;2', x: 9, y: 0, z: 3},
          {id: 35, materials: '1;0;1;0;3;2', x: 9, y: 0, z: 2, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: 0, y: 0, z: -0.65, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 0, y: 0, z: -6.8, roty: Math.PI / 2, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, roty: Math.PI / 2, size:5, },
                        {id: 4, type: 'button', material: 9, x: 0, y: 0.3, z: -0.5, roty: Math.PI / 2, size:0.8, action: 'oc_door;32;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
            ] },
          {id: 36, materials: '0;1;0;1;3;2', x: 11, y: 0, z: 3, arrwals: undefined, 
            blockobjs: [{id: 1, type: 'wall', material: 5, x: -3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 2, type: 'wall', material: 10, x: 3, y: 0, z: -3.75, size:5, scalex: 0.25, },
                        {id: 3, type: 'door', state: 1, material: 8, x: 0, y: 0, z: -3.75, size:5, },
                        {id: 4, type: 'button', material: 9, x: -3.2, y: 0.3, z: -3.75, size:0.8, action: 'oc_door;36;3;updown'}, // oc_door - open, close door, 1 - block 1, 3 - blockobj 3, updown - open door animation up, close door animation down
            ] },
          {id: 37, materials: '0;1;0;0;3;2', x: 12, y: 0, z: 3},
          {id: 38, materials: '0;1;1;0;3;2', x: 13, y: 0, z: 3},
          {id: 39, materials: '0;0;1;1;3;2', x: 13, y: 0, z: 2},
          {id: 40, materials: '1;0;0;1;3;2', x: 12, y: 0, z: 2},
          {id: 41, materials: '0;0;1;0;3;2', x: 9, y: 0, z: 1},
          {id: 42, materials: '0;0;1;1;3;2', x: 9, y: 0, z: 0},
          {id: 43, materials: '1;0;0;1;3;2', x: 8, y: 0, z: 0},
          {id: 44, materials: '1;1;0;0;3;2', x: 8, y: 0, z: 1},
          {id: 45, materials: '1;1;0;0;3;2', x: 11, y: 0, z: 6},
        ];

        for (var i = 0;i<map.length;i++)
        {
          map[i].arrwalls = map[i].materials.split(';')
        }
                
        var helpermap = new Array(14);
        for (var x = 0; x < 14; x++) {
          helpermap[x] = new Array(11);
        }
        helpermap[2][6] = map[7];
        helpermap[3][5] = map[5];
        helpermap[3][6] = map[4];
        helpermap[3][7] = map[6];
        helpermap[4][5] = map[2];
        helpermap[4][6] = map[1];
        helpermap[4][7] = map[3];
        helpermap[5][6] = map[0];
        helpermap[6][5] = map[9];
        helpermap[6][6] = map[8];
        helpermap[6][7] = map[10];
        helpermap[6][8] = map[11];
        helpermap[6][9] = map[12];
        helpermap[7][3] = map[16];
        helpermap[7][4] = map[15];
        helpermap[7][5] = map[14];
        helpermap[7][6] = map[13];
        helpermap[7][7] = map[17];
        helpermap[8][0] = map[42];
        helpermap[8][1] = map[43];
        helpermap[8][5] = map[21];
        helpermap[8][7] = map[18];
        helpermap[8][8] = map[19];
        helpermap[8][9] = map[20];
        helpermap[9][0] = map[41];
        helpermap[9][1] = map[40];
        helpermap[9][2] = map[34];
        helpermap[9][3] = map[33];
        helpermap[9][5] = map[22];
        helpermap[10][3] = map[32];
        helpermap[10][4] = map[24];
        helpermap[10][5] = map[23];
        helpermap[10][6] = map[25];
        helpermap[11][3] = map[35];
        helpermap[11][6] = map[44];
        helpermap[11][8] = map[29];
        helpermap[12][2] = map[39];
        helpermap[12][3] = map[36];
        helpermap[12][6] = map[26];
        helpermap[12][7] = map[27];
        helpermap[12][8] = map[28];
        helpermap[12][9] = map[31];
        helpermap[13][2] = map[38];
        helpermap[13][3] = map[37];
        helpermap[13][8] = map[30];
        
        var curblock = map[1];
         
          for (var i = 0;i<map.length;i++)
          {
            DrawBlock2(map[i]);
            //DrawBlock('box' + blocks[i].id, blocks[i].materials, blocks[i].x, blocks[i].y, blocks[i].z);
          }
                 