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
        
for (var i = 0;i<map_textures.length;i++)
        {
          map_textures[i].wall = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall.hasAlpha = true;
          map_textures[i].wallr = new BABYLON.Texture(map_textures[i].img, scene);
          map_textures[i].wall2r = new BABYLON.Texture(map_textures[i].img, scene);
       	  map_textures[i].wallr.wAng = Math.PI / 2;
          map_textures[i].wall2r.wAng = Math.PI;
        }

var npcs = [{id:1, 
              name: 'tusker01', 
              width: 80, 
              height: 111, 
              cellid: 21, 
              speed: 3, 
              displayed: 0, // je již zobrazen?
              imgs:[{stand:['tusker02.png'],move:['tusker01.png','tusker02.png'],attack:['tusker03','tusker02']}],health: 10, attack: 3, deff: 3, items: [{id:1}],              
              sounds: [ {attack:['tusker2.mp3']} ],
              sprite: {id: 1, name: 'tusker01', img: "images/tusker164x164.png", pics: 1, size: 164, scale: 3.75, blockcell: 1, defcellindex: 0, x: 0, y: -0.5, z: -3.75, },
            },{id:2, 
              name: 'tusker02', 
              width: 80, 
              height: 111, 
              cellid: 3, 
              speed: 3, 
              displayed: 0, // je již zobrazen?
              imgs:[{stand:['tusker02.png'],move:['tusker01.png','tusker02.png'],attack:['tusker03','tusker02']}],health: 10, attack: 3, deff: 3, items: [{id:1}],              
              sounds: {attack:['tusker2.mp3']},
              sprite: {id: 1, name: 'tusker01', img: "images/tusker164x164.png", pics: 1, size: 164, scale: 3.75, blockcell: 1, defcellindex: 0, x: 0, y: -0.5, z: -3.75, },
            }];
        
var map = [
          {id: 1, materials: '4;1;0;1;3;2', x: 0, y: 0, z: 15,
            blockobjs: [{id: 1, type: 'picture', state: 1, material: 4, x: 0, y: 0, z: -0.1, size:5, scalex: 1.5, desc: 'gladstone_keep',
              actions: [{id: 1, type: 'changemap', map: 'GladstoneKeep', camdir: 2, }] 
            },] 
          },
          {id: 2, materials: '0;1;0;0;3;2', x: 0, y: 0, z: 7.5, },
          {id: 3, materials: '1;0;1;0;3;2', x: 7.5, y: 0, z: 7.5},
          {id: 4, materials: '1;0;0;0;3;2', x: 15, y: 0, z: 7.5,},
          {id: 5, materials: '0;0;0;1;3;2', x: 22.5, y: 0, z: 7.5,},
          {id: 6, materials: '0;1;0;1;3;2', x: 22.5, y: 0, z: 15,},
          {id: 7, materials: '7;1;0;1;3;2', x: 22.5, y: 0, z: 22.5,},
          {id: 8, materials: '0;0;1;0;3;2', x: 22.5, y: 0, z: 0,},
          {id: 9, materials: '0;1;1;0;3;2', x: 15, y: 0, z: 0,},
          {id: 10, materials: '1;0;0;0;3;2', x: 30, y: 0, z: 0,},
          {id: 11, materials: '1;0;1;1;3;2', x: 37.5, y: 0, z: 0,},
          {id: 12, materials: '0;1;0;1;3;2', x: 30, y: 0, z: -7.5,},
          {id: 13, materials: '0;0;1;1;3;2', x: 30, y: 0, z: -15,},
          {id: 14, materials: '1;0;1;0;3;2', x: 22.5, y: 0, z: -15,},
          {id: 15, materials: '1;0;0;0;3;2', x: 15, y: 0, z: -15,},
          {id: 16, materials: '0;1;0;1;3;2', x: 15, y: 0, z: -22.5,},
          {id: 17, materials: '0;1;1;8;3;2', x: 15, y: 0, z: -30,},
          {id: 18, materials: '0;1;1;0;3;2', x: 7.5, y: 0, z: -15,},
          {id: 19, materials: '1;0;0;1;3;2', x: 7.5, y: 0, z: -7.5,},
          {id: 20, materials: '0;0;1;0;3;2', x: 0, y: 0, z: -7.5,},
          {id: 21, materials: '0;0;0;1;3;2', x: 0, y: 0, z: 0,},
          {id: 22, materials: '1;0;0;0;3;2', x: -7.5, y: 0, z: 0,},
          {id: 23, materials: '0;1;0;0;3;2', x: -7.5, y: 0, z: -7.5,},
          {id: 24, materials: '0;1;1;0;3;2', x: -15, y: 0, z: 0,},
          {id: 25, materials: '1;0;0;1;3;2', x: -15, y: 0, z: 7.5,
              blockobjs: [{id: 1, type: 'item', itemid: 3, desc: 'dagger', material: 4, size: 1, rotx: Math.PI / 2, x: 0, y: -2.45, z: -3.75}],              
            },
          {id: 26, materials: '0;0;1;0;3;2', x: -22.5, y: 0, z: 7.5,},
          {id: 27, materials: '1;0;0;1;3;2', x: -22.5, y: 0, z: 15,},
          {id: 28, materials: '0;1;0;0;3;2', x: -30, y: 0, z: 15,},
          {id: 29, materials: '1;0;0;1;3;2', x: -30, y: 0, z: 22.5,},
          {id: 30, materials: '1;1;1;0;3;2', x: -37.5, y: 0, z: 22.5,},
          {id: 31, materials: '0;1;0;0;3;2', x: -30, y: 0, z: 7.5,},
          {id: 32, materials: '0;0;0;1;3;2', x: -30, y: 0, z: 0,},
          {id: 33, materials: '0;1;0;1;3;2', x: -30, y: 0, z: -7.5,},
          {id: 34, materials: '0;1;0;0;3;2', x: -30, y: 0, z: -15,},
          {id: 35, materials: '0;0;1;1;3;2', x: -30, y: 0, z: -22.5,},
          {id: 36, materials: '0;0;1;1;3;2', x: -7.5, y: 0, z: -15,},
          {id: 37, materials: '1;0;0;0;3;2', x: -15, y: 0, z: -15,},
          {id: 38, materials: '0;1;0;1;3;2', x: -15, y: 0, z: -22.5,},
          {id: 39, materials: '0;1;0;1;3;2', x: -15, y: 0, z: -30,},
          {id: 40, materials: '0;1;6;1;3;2', x: -15, y: 0, z: -37.5,},
          {id: 41, materials: '1;0;1;0;3;2', x: -22.5, y: 0, z: -15,},
          {id: 42, materials: '1;0;1;0;3;2', x: -37.5, y: 0, z: -22.5,},
          {id: 43, materials: '0;1;1;0;3;2', x: -45, y: 0, z: -22.5,},
          {id: 44, materials: '1;0;0;1;3;2', x: -45, y: 0, z: -15,},
          {id: 45, materials: '0;1;1;0;3;2', x: -52.5, y: 0, z: -15,},
          {id: 46, materials: '0;0;0;1;3;2', x: -52.5, y: 0, z: -7.5,},
          {id: 47, materials: '1;1;1;0;3;2', x: -60, y: 0, z: -7.5,},
          {id: 48, materials: '0;1;0;0;3;2', x: -52.5, y: 0, z: 0,},
          {id: 49, materials: '1;0;1;0;3;2', x: -45, y: 0, z: 0,},
          {id: 50, materials: '1;0;1;0;3;2', x: -37.5, y: 0, z: 0,},
          {id: 51, materials: '0;1;0;1;3;2', x: -52.5, y: 0, z: 7.5,},
          {id: 52, materials: '1;0;0;1;3;2', x: -52.5, y: 0, z: 15,},
          {id: 53, materials: '1;0;1;0;3;2', x: -60, y: 0, z: 15,},
          {id: 54, materials: '1;5;1;0;3;2', x: -67.5, y: 0, z: 15,},
          ];
        
        for (var i = 0;i<map.length;i++)
        {
          map[i].arrwalls = map[i].materials.split(';')
        }
        
        var curblock = map[0];
         
          for (var i = 0;i<map.length;i++)
          {
            DrawBlock2(map[i]);            
          }        
        
