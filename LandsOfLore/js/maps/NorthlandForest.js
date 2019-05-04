// Northland Forest
var map_textures = [
     	      {id: 1, desc: 'wall', img:"images/forest01.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 2, desc: 'wall', img:"images/forest_ceiling02.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 3, desc: 'wall', img:"images/forest_top02.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 4, desc: 'wall', img:"images/gladstone_keep.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 5, desc: 'wall', img:"images/thugs_cave.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 6, desc: 'wall', img:"images/marina.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 7, desc: 'wall', img:"images/draracle_cave.png", wall: undefined, wallr: undefined, wall2r: undefined },
     	      {id: 8, desc: 'wall', img:"images/lake_dread.png", wall: undefined, wallr: undefined, wall2r: undefined },
        ];
        
var npcs = [{id:1, 
              name: 'tusker01', 
              width: 80, 
              height: 111, 
              cellid: 7, 
              speed: 3, 
              canmove: true,
              displayed: 0, // je již zobrazen?
              socialstate: 1, // 0 - neutral, 1 - enemy, 2 - friendly
              cellgroup: 0.5, // určuje kolik zabírá místa v jedné buňce. Tedy v tomto případě by mohli být vedle sebe dva
              imgs:[{stand:['tusker02.png'],move:['tusker01.png','tusker02.png'],attack:['tusker03','tusker02']}],health: 10, attack: 3, deff: 3, items: [{id:1}],              
              sounds: [ {attack:['tusker2.mp3']} ],
              sprite: {id: 1, name: 'tusker01', img: "images/boar_phases_4600x326b.png", pics: 10, size: 460, scale: 3.75, blockcell: 1, defcellindex: 0, x: 0, y: -1.75, z: -3.75, },
} /*,{id:2, 
              name: 'tusker02', 
              width: 80, 
              height: 111, 
              cellid: 3, 
              speed: 3, 
              canmove: true,
              displayed: 0, // je již zobrazen?
              socialstate: 1, // 0 - neutral, 1 - enemy, 2 - friendly
              cellgroup: 0.5,
              imgs:[{stand:['tusker02.png'],move:['tusker01.png','tusker02.png'],attack:['tusker03','tusker02']}],health: 10, attack: 3, deff: 3, items: [{id:1}],              
              sounds: {attack:['tusker2.mp3']},
              sprite: {id: 1, name: 'tusker01', img: "images/tusker512x128.png", pics: 4, size: 128, scale: 3.75, blockcell: 1, defcellindex: 0, x: 0, y: -0.5, z: -3.75, },
            } */
          ];
        
        // directions[jih,západ,sever,východ,nahoru,dolů]
var map = [
          {id: 01, materials: [4,1,0,1,3,2], directions: [0,0,2,0,0,0],blockobjs: [{id: 1, type: 'picture', state: 1, material: 4, x: 0, y: 0, z: -0.1, size:5, scalex: 1.5, desc: 'gladstone_keep', actions: [{id: 1, type: 'changemap', map: 'GladstoneKeep', camdir: 2, }] },] },
          {id: 02, materials: [0,1,0,0,3,2], directions: [1,3,21,0,0,0], },
          {id: 03, materials: [1,0,1,0,3,2], directions: [0,4,0,2,0,0], },
          {id: 04, materials: [1,0,0,0,3,2], directions: [0,5,9,3,0,0], },
          {id: 05, materials: [0,0,0,1,3,2], directions: [6,0,8,4,0,0], },
          {id: 06, materials: [0,1,0,1,3,2], directions: [7,0,5,0,0,0], },
          {id: 07, materials: [7,1,0,1,3,2], directions: [0,0,6,0,0,0], },
          {id: 08, materials: [0,0,1,0,3,2], directions: [5,10,0,9,0,0], },
          {id: 09, materials: [0,1,1,0,3,2], directions: [4,8,0,0,0,0], },
          {id: 10, materials: [1,0,0,0,3,2], directions: [0,11,12,8,0,0], },
          {id: 11, materials: [1,0,1,1,3,2], directions: [0,0,0,10,0,0], },
          {id: 12, materials: [0,1,0,1,3,2], directions: [10,0,13,0,0,0], },
          {id: 13, materials: [0,0,1,1,3,2], directions: [12,0,0,14,0,0], },
          {id: 14, materials: [1,0,1,0,3,2], directions: [0,13,0,15,0,0], },
          {id: 15, materials: [1,0,0,0,3,2], directions: [0,14,16,18,0,0], },
          {id: 16, materials: [0,1,0,1,3,2], directions: [15,0,17,0,0,0], },
          {id: 17, materials: [0,1,1,8,3,2], directions: [16,0,0,0,0,0], },
          {id: 18, materials: [0,1,1,0,3,2], directions: [19,15,0,0,0,0], },
          {id: 19, materials: [1,0,0,1,3,2], directions: [0,0,18,20,0,0], },
          {id: 20, materials: [0,0,1,0,3,2], directions: [21,19,0,23,0,0], },
          {id: 21, materials: [0,0,0,1,3,2], directions: [2,0,20,22,0,0],},
          {id: 22, materials: [1,0,0,0,3,2], directions: [0,21,23,24,0,0],},
          {id: 23, materials: [0,1,0,0,3,2], directions: [22,20,36,0,0,0],},
          {id: 24, materials: [0,1,1,0,3,2], directions: [25,22,0,0,0,0],},
          {id: 25, materials: [1,0,0,1,3,2], directions: [0,0,24,26,0,0], blockobjs: [{id: 1, type: 'item', itemid: 3, desc: 'dagger', material: 4, size: 1, rotx: Math.PI / 2, x: 0, y: -2.45, z: -3.75}],},
          {id: 26, materials: [0,0,1,0,3,2], directions: [27,25,0,31,0,0],},
          {id: 27, materials: [1,0,0,1,3,2], directions: [0,0,26,28,0,0],},
          {id: 28, materials: [0,1,0,0,3,2], directions: [29,27,31,0,0,0],},
          {id: 29, materials: [1,0,0,1,3,2], directions: [0,0,28,30,0,0],},
          {id: 30, materials: [1,1,1,0,3,2], directions: [0,29,0,0,0,0],},
          {id: 31, materials: [0,1,0,0,3,2], directions: [28,26,32,0,0,0],},
          {id: 32, materials: [0,0,0,1,3,2], directions: [31,0,33,50,0,0],},
          {id: 33, materials: [0,1,0,1,3,2], directions: [32,0,34,0,0,0],},
          {id: 34, materials: [0,1,0,0,3,2], directions: [33,41,35,0,0,0],},
          {id: 35, materials: [0,0,1,1,3,2], directions: [34,0,0,42,0,0],},
          {id: 36, materials: [0,0,1,1,3,2], directions: [23,0,0,37,0,0],},
          {id: 37, materials: [1,0,0,0,3,2], directions: [0,36,38,41,0,0],},
          {id: 38, materials: [0,1,0,1,3,2], directions: [37,0,39,0,0,0],},
          {id: 39, materials: [0,1,0,1,3,2], directions: [38,0,40,0,0,0],},
          {id: 40, materials: [0,1,6,1,3,2], directions: [39,0,0,0,0,0],},
          {id: 41, materials: [1,0,1,0,3,2], directions: [0,37,0,34,0,0],},
          {id: 42, materials: [1,0,1,0,3,2], directions: [0,35,0,43,0,0],},
          {id: 43, materials: [0,1,1,0,3,2], directions: [44,42,0,0,0,0],},
          {id: 44, materials: [1,0,0,1,3,2], directions: [0,0,43,45,0,0],},
          {id: 45, materials: [0,1,1,0,3,2], directions: [46,44,0,0,0,0],},
          {id: 46, materials: [0,0,0,1,3,2], directions: [48,0,45,47,0,0],},
          {id: 47, materials: [1,1,1,0,3,2], directions: [0,46,0,0,0,0],},
          {id: 48, materials: [0,1,0,0,3,2], directions: [51,49,46,0,0,0],},
          {id: 49, materials: [1,0,1,0,3,2], directions: [0,50,0,48,0,0],},
          {id: 50, materials: [1,0,1,0,3,2], directions: [0,32,0,49,0,0],},
          {id: 51, materials: [0,1,0,1,3,2], directions: [52,0,48,0,0,0],},
          {id: 52, materials: [1,0,0,1,3,2], directions: [0,0,51,53,0,0],},
          {id: 53, materials: [1,0,1,0,3,2], directions: [0,52,0,54,0,0],},
          {id: 54, materials: [1,5,1,0,3,2], directions: [0,53,0,0,0,0],},
          ];

for (let i = 0;i<map_textures.length;i++)
        {
          map_textures[i].wall = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall.hasAlpha = true;
          map_textures[i].wallr = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall2r = new BABYLON.Texture(map_textures[i].img, scene);
       	  map_textures[i].wallr.wAng = Math.PI / 2;
          map_textures[i].wall2r.wAng = Math.PI;
        }

        
        for (let i = 0;i<map.length;i++)
        {
          map[i].arrwalls = map[i].materials;
        }
        
        var curblock = map[0];
         

    DrawMap(map);
         /*
          for (let i = 0;i<map.length;i++)
          {
            DrawBlock2(map[i]);
          }
          */        
        
