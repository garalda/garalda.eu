      var directions = {south: 0, west: 1, north: 2, east: 3, up: 4, down: 5};
      var sCurrentMap = 'GladstoneKeep'; // 'NorthlandForest'; // 
      var sCurrentLng = 'cz';    
      
        var players = [{id: 1, name: 'Ak Shell', img: imgpath + 'face_akshell.png', width: 62, height: 64,  type: 'lizard', health: 30, magicka: 30, maxhealth: 30, maxmagicka: 30, warrior: 1, rogue: 1, mage: 3, attack: 3, deff: 3, wearing: [{id: 1, pos: 'chest' }, {id: 2, pos: 'foot' }, {id: 3, pos: 'rhand' }]}];
    
/*        document.body.addEventListener('touchmove', function(e){
          document.getElementById('idTextArea').innerHTML = e.changedTouches[0].pageX;
        }, false);*/
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
       	var scene=new BABYLON.Scene(engine);
       	var camera=new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,0,0),scene);
        var money = 41;
        var camdir = 2;
        var bAnimMove = 1;
        var bAnimRotate = 0;
        var bSoundEnable = 1;
        var nSleep = 0;
        var nAttacked = 0;
        var isMoving = false;
        var selplayerid = 1;

        loadjscssfile(mappath + sCurrentMap + '.js', 'js');
        loadjscssfile(lngpath + sCurrentLng + '.js', 'js');

        var inventory = [{id: 1, name: "aloe_leaf", itemid: 4 }, {id: 2, name: "herbal", itemid: 11 }, {id: 3, name: "life_elixir", itemid: 12 } ];
          
        var door01btn = undefined;
                  
        var createScene=function(){
        	//scene and background color
        	scene.clearColor=new BABYLON.Color3(1,1,1);
        	scene.collisionsEnabled = true;
        	//create camera
        	camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);
          //camera.speed = 7.5;
        	camera.checkCollisions = true;
          camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        	//var camera=new BABYLON.ArcRotateCamera("camera",-3.0,1.0,-5.0,BABYLON.Vector3.Zero(),scene);
        	//attach camera to canvas
        	//camera.attachControl(canvas,false);
          // disable panning (controls)
          //camera.panningSensibility = 0;
        	//add a light
          var light=new BABYLON.HemisphericLight("hemi",new BABYLON.Vector3(0,1,0),scene);
          // var light = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, 1, 0), 0.8, 10, scene);
          // light.diffuse = new BABYLON.Color3(1, 1, 0);
          light.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
        	//reflect the light off the ground to light the mesh bottom
        	light.groundColor=new BABYLON.Color3(.5,.5,.5);
          InitItems();
          DrawInventory();

        	return scene;
        };
        
        
        var OnPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
          var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {return true; });
          var blockelm = GetElement(pickInfo.pickedMesh.name);
          if (blockelm != undefined)
          {
            WriteText(blockelm.desc); // document.getElementById('idTextArea').innerHTML = blockelm.desc;
            switch (blockelm.type)
            {
              case 'table':
                if (blockelm.snd != undefined)
                  PlaySound(blockelm.snd);
                WriteText(decodeURI(lng[blockelm.desc]));
                break;
              case 'item':            
               inventory.push({id: blockelm.itemid, name: items[blockelm.itemid - 1].name, itemid: blockelm.itemid });
               var j = blockelm.parent.blockobjs.indexOf(blockelm);
               blockelm.parent.blockobjs.splice(j, 1);
               blockelm.plane.dispose();
               DrawInventory();
               break;
                case 'button':
                  try {
                    for (var j = 0;j < blockelm.actions.length;j++)
                    {
                      switch (blockelm.actions[j].type)
                      {
                        case 'openclose':
                          // door = GetElement('objplane_' + blockelm.actions[j].object.block + '_' + blockelm.actions[j].object.blockobj);
                          switch (blockelm.actions[j].object.action)
                          {
                            case 'updown':   
                                  //sndopengate.play();
                                  PlaySound('open_gate');
                                  if (map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].state == 1)
                                    BABYLON.Animation.CreateAndStartAnimation('opendoor_' + blockelm.actions[j].object.block + "_" + blockelm.actions[j].object.blockobj, map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].plane, 'position.y', 30, 45, 0, 5, 0);
                                  else 
                                    BABYLON.Animation.CreateAndStartAnimation('closedoor_' + blockelm.actions[j].object.block + "_" + blockelm.actions[j].object.blockobj, map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].plane, 'position.y', 30, 45, 5, 0, 0);
                                  map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].state = Math.abs(map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].state - 1);
                                  WriteText(map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].state);
                                  //wallplane.position.z += 0.0001;
                              break;
                            case 'leftright':
                              break;
                          }
                          break;
                          case 'shop':
                            setTimeout('ShowShop("' + map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].img + '")', 2000);
/*                            document.getElementById('imgCanvas').style.display = '';
                            document.getElementById('imgCanvas').style.backgroundImage = 'url(' + map[blockelm.actions[j].object.block - 1].blockobjs[blockelm.actions[j].object.blockobj - 1].img + ')';
                            document.getElementById('renderCanvas').style.display = 'none';*/
/*                            for (var k = 0;k<block.blockobjs[i].actions[j].items.length;k++)
                            {
                              item_textures[items[block.blockobjs[i].actions[j].items[k].id-1].textureid-1].img
                            }*/                            
                            break;
                      }
                    }
                  }
                  catch (err)
                  {
                    WriteText(err);
                  }
                  break;                
              case 'picture':
                if (blockelm.actions != undefined)
                {
                  for (var j = 0;j<blockelm.actions.length;j++)
                  {
                    switch (blockelm.actions[j].type)
                    {
                      case 'changemap':
                        removejscssfile(mappath + sCurrentMap + '.js', 'js');
                        scene.dispose();
                        scene=new BABYLON.Scene(engine);
       	                camera=new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,0,11.5),scene);
                        scene = createScene();
                        scene.onPointerDown = OnPointerDown;
                        loadjscssfile(mappath + blockelm.actions[j].map + '.js', 'js');
                        sCurrentMap = blockelm.actions[j].map;
                        camdir = blockelm.actions[j].camdir;
                        break;
                    }
                  }
                }
                break;            
            }                            
           }
          // document.getElementById('idTextArea').innerHTML = pickInfo.pickedMesh.name;
        } else
          WriteText('');
            // document.getElementById('idTextArea').innerHTML = '';          
        };
        
        scene.onPointerDown = OnPointerDown;
        
        function ShowShop(sImg)
        {
            document.getElementById('imgCanvas').style.display = '';
            document.getElementById('imgCanvas').style.backgroundImage = 'url(' + sImg + ')';
            document.getElementById('renderCanvas').style.display = 'none';
        }
        
        function DrawInventory()
        {
          let invelm = document.getElementById('idInventory');
          invelm.innerHTML = '';
          for (let i = 0;i < inventory.length;i++)
          {
              if (inventory[i].item == undefined)
                  inventory[i].item = GetInventoryItem(inventory[i].itemid);
            invelm.innerHTML += "<img src='" + inventory[i].item.texture.img + "' onclick='UseInvItem(\"" + inventory[i].itemid + "\");' />";
          }
        }

        function GetInventoryItem(itemid)
        {
          for (let i = 0;i<items.length;i++)
          {
            if (items[i].id == itemid)
            {
              return items[i];
            }
          }
          return undefined;
        }

        function UseInvItem(itemid)
        {
          let inventoryitem;
          let itemindex = 0;
          for (let i = 0;i < inventory.length;i++)
          {
            if (inventory[i].itemid == itemid)
            {
                inventoryitem = inventory[i];
                itemindex = i;
                break;
            }
          }
          if (inventoryitem.item.heal != undefined)
          {
            SetPlayerLife(selplayerid, inventoryitem.item.heal);
            inventory.splice(itemindex,1);
            DrawInventory();
          }
          // alert(inventoryitem.name);
        }
        
        //  {id: 3, materials: '0;0;4;7;3;2', x: 7.5, y: 0, z: 7.5,
        //    sprites: [{id: 1, name: 'guard01', img: "images/guard164x164.png", pics: 2, size: 164, scale: 3.75, x: 0, y: -0.5, z: -3.75}]},
        function DrawSprite(sprite, posX, posY, posZ, angle)
        {
          var spriteManager = new BABYLON.SpriteManager(sprite.name + "Manager",sprite.img, sprite.pics, sprite.size, scene);
          sprite.instance = new BABYLON.Sprite(sprite.name, spriteManager);
          sprite.instance.size = sprite.scale;
          sprite.instance.position.x = posX;
          sprite.instance.position.y = posY;          
          sprite.instance.position.z = posZ;
          sprite.instance.invertU = -1;
          if (angle != undefined)
            sprite.instance.angle = angle;
          // spriteInstance.invertU = -1;
          
          sprite.instance.cellIndex = sprite.defcellindex;
        }
        
        function GetElement(elmName)
        {
          var retval = undefined;
          var names = elmName.split('_');
          var dobreak = 0;
          for (var i = 0;i<map.length;i++)
          {
            if (dobreak == 1)
              break;
            if (names[0] == 'wallplane')
            {
              if (map[i].id == names[2])
              {
                 if (map[i].desc != null)
                  retval = map[i];
                 dobreak = 1;
                 break;
              }
            }
            if (names[0] == 'objplane')
            {
              if (map[i].id == names[1])
              {
                for (var j = 0;j<map[i].blockobjs.length;j++)
                {
                  if (map[i].blockobjs[j].id == names[2])
                  {
                    //if (blocks[i].blockobjs[j].desc != null)
                      retval = map[i].blockobjs[j];
                  }
                }
                dobreak = 1;
                break;
              }
            }
          }
          return retval;
        }                

      function DrawBlock(block, x, y, z)
      {
        block.x = x;
        block.y = y; 
        block.z = z;
        DrawBlock2(block);
      }

      function DrawBlock2(block)
      {
          // 'box' + blocks[i].id, blocks[i].materials, blocks[i].x, blocks[i].y, blocks[i].z
          // blockname, blockwalls, xshift, yshift, zshift
          // vykreslí jeden blok
          // F - foreground,R - right,B - back,L - left,U - up,D - down
          // 0 - transparentní
          // 1 - x číslo textury
          //create a builtin shape
          let arrwalls = block.materials;
          let wallplane = undefined;
          let material = undefined;
          for (let i = 0;i<arrwalls.length;i++)
          {
                if (arrwalls[i] != 0)
                {
              	   wallplane = BABYLON.Mesh.CreatePlane("wallplane_" + i + "_" + block.id, 5, scene);
              	   wallplane.checkCollisions = true;
              	   //Define a material        	
              	   material=new BABYLON.StandardMaterial("material_" + i + "_" + block.id, scene);
                   switch (i)
                   {
                      case directions.south: // south              	   
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wall;
           	            wallplane.scaling.x = 1.5;
                        wallplane.position.x = block.x;
                        wallplane.position.y = block.y;
                        wallplane.position.z = block.z;
                        break;
                      case directions.west: // right       	   
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wall;
           	            wallplane.scaling.x = 1.5;
                        wallplane.position.x = block.x-3.75;
                        wallplane.position.y = block.y;
                        wallplane.position.z = block.z-3.75;
                        wallplane.rotation.y = Math.PI / 2;
                        break;
                      case directions.north: // back
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wall;
           	            wallplane.scaling.x = 1.5;
                        wallplane.position.x = block.x;
                        wallplane.position.y = block.y;
                        wallplane.position.z = block.z - 7.5;
                        break;
                      case directions.east: // left      	   
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wall;
           	            wallplane.scaling.x = 1.5;
                        wallplane.position.x = block.x+3.75;
                        wallplane.position.y = block.y;
                        wallplane.position.z = block.z-3.75;
                        wallplane.rotation.y = Math.PI / 2;
                        break;
                      case directions.up: // top      	   
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wallr;
           	            wallplane.scaling.x = 1.5;
           	            wallplane.scaling.y = 1.5;
                        wallplane.position.x = block.x;
                        wallplane.position.y = block.y + 2.5;
                        wallplane.position.z = block.z-3.75;
                        wallplane.rotation.x = Math.PI / 2;
                        break;
                      case directions.down: // bottom      	   
                        material.diffuseTexture = map_textures[arrwalls[i]-1].wallr;
           	            wallplane.scaling.x = 1.5;
           	            wallplane.scaling.y = 1.5;
                        wallplane.position.x = block.x;
                        wallplane.position.y = block.y-2.5;
                        wallplane.position.z = block.z-3.75;
                        wallplane.rotation.x = Math.PI / 2;
                        break;
                   }
              	   material.backFaceCulling = false;
              	   
      	           wallplane.material = material;
                   //wallplane.position.z = 0.1;
                }
          }
          if (block.blockobjs != undefined)
          {
            let door = undefined;
            let actions = undefined;
            for (let i = 0;i<block.blockobjs.length;i++)       // block.blockobjs.length
            {
              block.blockobjs[i].parent = block;
              if (block.blockobjs[i].type == 'fountain')
              {
                CreateFountain(block.x + block.blockobjs[i].x, block.y + block.blockobjs[i].y, block.z + block.blockobjs[i].z);
                continue;
              }
           	  wallplane = BABYLON.Mesh.CreatePlane("objplane_" + block.id + "_" + (i+1), block.blockobjs[i].size, scene);
           	  wallplane.checkCollisions = true;
              	   //Define a material        	
              material=new BABYLON.StandardMaterial("objmaterial_" + block.blockobjs[i].type + "_" + block.id + '_' + (i+1),scene);
              if (block.blockobjs[i].type == 'item')
                material.diffuseTexture = item_textures[block.blockobjs[i].material - 1].texture;
              else
                material.diffuseTexture = map_textures[block.blockobjs[i].material - 1].wall;
              material.backFaceCulling = false;
              
              wallplane.material = material;
              if (block.blockobjs[i].scalex != undefined)
                wallplane.scaling.x = block.blockobjs[i].scalex;
              if (block.blockobjs[i].rotx != undefined)
                wallplane.rotation.x = block.blockobjs[i].rotx;
              if (block.blockobjs[i].roty != undefined)
                wallplane.rotation.y = block.blockobjs[i].roty;
              if (block.blockobjs[i].rotz != undefined)
                wallplane.rotation.z = block.blockobjs[i].rotz;
              wallplane.position.x = block.x + block.blockobjs[i].x;
              wallplane.position.y = block.y + block.blockobjs[i].y;
              wallplane.position.z = block.z + block.blockobjs[i].z;
              block.blockobjs[i].plane = wallplane;             
              switch (block.blockobjs[i].type)
              {
                case 'wall':
                  break; 
                case 'door':
                  // door = wallplane;       
                  break; 
                case 'button':
                  try {
                    wallplane.actionManager = new BABYLON.ActionManager(scene);
                    for (var j = 0;j < block.blockobjs[i].actions.length;j++)
                    {
                      switch (block.blockobjs[i].actions[j].type)
                      {
                        case 'openclose':
/*                          door = GetElement('objplane_' + block.blockobjs[i].actions[j].object.block + '_' + block.blockobjs[i].actions[j].object.blockobj);
                          switch (block.blockobjs[i].actions[j].object.action)
                          {
                            case 'updown':
                              wallplane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                                function (evt) {
                                  if (door.state == 1)
                                    BABYLON.Animation.CreateAndStartAnimation('opendoor_' + block.id + "_" + i, door.plane, 'position.y', 30, 200, 0, 5, 0);
                                  else 
                                    BABYLON.Animation.CreateAndStartAnimation('closedoor_' + block.id + "_" + i, door.plane, 'position.y', 30, 200, 5, 0, 0);
                                  door.state = Math.abs(door.state - 1);
                                }));
                              wallplane.position.z += 0.0001;
                              break;
                            case 'leftright':
                              break;
                          }*/
                          break;
                          case 'shop':
/*                            document.getElementById('imgCanvas').style.display = '';
                            document.getElementById('imgCanvas').style.backgroundImage = 'url(' + block.blockobjs[i].actions[j].img + ')';
                            document.getElementById('renderCanvas').style.display = 'none';*/
/*                            for (var k = 0;k<block.blockobjs[i].actions[j].items.length;k++)
                            {
                              item_textures[items[block.blockobjs[i].actions[j].items[k].id-1].textureid-1].img
                            }*/                            
                            break;
                      }
                    }
                  }
                  catch (err)
                  {}
                  break; 
              }
            }                          
          }        	
       /*   if (block.sprites != undefined)
          {
            for (let i = 0;i<block.sprites.length;i++)
            {
              DrawSprite(block.sprites[i], block.x + block.sprites[i].x, block.y + block.sprites[i].y, block.z + block.sprites[i].z, block.sprites[i].angle);
            }
          }*/

      }
        
        var scene = createScene();

        function getMapIndexByCellId(cellid)
        {
          let retval = -1;
          for (let i=0;i<map.length;i++)
          {
            if (map[i].id == cellid)
            {
              retval = i;
              break;
            }
          }
          return retval;
        }

        engine.runRenderLoop(function () {
          // vykreslení npc na mapě
            if (typeof npcs != 'undefined')
            {
              let mapindex = -1;
              // prochází všechny npc
              for (let i=0;i<npcs.length;i++)
              {
                // pokud je mrtvý, nedělá nic
                if (npcs[i].health <= 0)
                  continue;
                // pokud npc ještě není zobrazeno, tak ho zobraz
                if (npcs[i].displayed == 0)
                {
                  mapindex = getMapIndexByCellId(npcs[i].cellid);
                  if (mapindex > -1)
                  {
                    DrawSprite(npcs[i].sprite, map[mapindex].x + npcs[i].sprite.x, map[mapindex].y + npcs[i].sprite.y, map[mapindex].z + npcs[i].sprite.z, npcs[i].sprite.angle);
                    npcs[i].displayed = 1;
                  }
                }
                  // pokud stojí hned vedle hráče, tak už se hýbat nebude!
                  if (npcs[i].targetdir != undefined && map[npcs[i].cellid-1] .directions[npcs[i].targetdir] > 0 && map[map[npcs[i].cellid-1].directions[npcs[i].targetdir]-1] == curblock)
                  {
                    npcs[i].isMoving = false;
                  }
                
                if (npcs[i].isMoving)
                {
                  // let diffnpc_x = Math.round((npcs[i].sprite.instance.position.x - map[npcs[i].cellid - 1].x) * 100) / 100;
                  // let diffnpc_z = Math.round((npcs[i].sprite.instance.position.z - map[npcs[i].cellid - 1].z) * 100) / 100;
                  if (map[npcs[i].cellid - 1].directions[npcs[i].targetdir] == 0)
                  {
                     npcs[i].isMoving = false;
                     npcs[i].sprite.instance.stopAnimation();
                     continue;
                  }                    
                  if (npcs[i].sprite.instance.position.x < map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].x)
                  {
                    npcs[i].sprite.instance.position.x += 0.1;
                  }
                  if (npcs[i].sprite.instance.position.x  >  map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].x)
                  {
                    npcs[i].sprite.instance.position.x -= 0.1;
                  }
                  if (npcs[i].sprite.instance.position.z < map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].z + npcs[i].sprite.z)
                    npcs[i].sprite.instance.position.z = Math.round((npcs[i].sprite.instance.position.z + 0.1) * 100) / 100;
                  if (npcs[i].sprite.instance.position.z > map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].z + npcs[i].sprite.z)
                    npcs[i].sprite.instance.position.z = Math.round((npcs[i].sprite.instance.position.z - 0.1) * 100) / 100;
                  if (Math.abs(npcs[i].sprite.instance.position.x - map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].x) < 0.1)
                    npcs[i].sprite.instance.position.x = map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].x;
                  if (Math.abs(npcs[i].sprite.instance.position.z - map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir].z-1]) < 0.1)
                    npcs[i].sprite.instance.position.z = map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].z;
                  if ((Math.abs(npcs[i].sprite.instance.position.x - (map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].x + npcs[i].sprite.x)) < 0.1) && (Math.abs(npcs[i].sprite.instance.position.z - (map[map[npcs[i].cellid - 1].directions[npcs[i].targetdir]-1].z + npcs[i].sprite.z)) < 0.1))
                  {
                    npcs[i].cellid = map[npcs[i].cellid - 1].directions[npcs[i].targetdir];
                    if (npcs[i].targetcell.id == npcs[i].cellid)
                      {
                        npcs[i].isMoving = false;
                        npcs[i].sprite.instance.stopAnimation();
                      }
                  }                    
                } else {
                  // npc se nepohybuje. Může se pohybovat?
                  if (npcs[i].canmove)
                  {
                    // náhodně urči, jestli se má pohybovat
                    if (Math.random() > 0.8)
                    {
                      let targetdir = -1;
                      let targetcell;
                      let tempcell;
                      let bNearPlayer = false;
                      // pokud se má pohybovat
                      if (npcs[i].socialstate==1)
                      {
                          // pokud má npc nepřátelský vztah k hráči, zjisti jestli není na dohled hráče
                          for (let ii = 0;ii < 4;ii++)
                          {
                            tempcell = map[npcs[i].cellid-1];
                            // pokud je daný směr volný
                            if (tempcell.directions[ii] != 0)
                            {
                              // pokud stojí hned vedle hráče, tak už se hýbat nebude!
                              if (map[tempcell.directions[ii]-1] == curblock)
                              {
                                  bNearPlayer = true;
                                  targetcell = undefined;
                                  break;
                              }
                              while ((tempcell != undefined) && (map[tempcell.directions[ii]-1] != curblock))
                              {
                                  tempcell = map[tempcell.directions[ii] - 1];
                              }
                              if ((tempcell != undefined) && (map[tempcell.directions[ii] - 1] == curblock))
                              {
                                // vidí hráče, jde po něm! 
                                // nastav pohyb směrem k hráči
                                targetcell = tempcell;
                                targetdir = ii;
                                break;
                              } else 
                                tempcell = undefined;
                            } else 
                                tempcell = undefined;
                          }
                      } 
                      if (tempcell == undefined && !bNearPlayer) 
                      {
                          let possiblemovements = [0,1,2,3];
                          let ij;
                          // zjisti si možné směry pohybu a náhodně vyber směr 
                          for (let ii = 0;ii < 4;ii++)
                          {
                            tempcell = map[npcs[i].cellid - 1];
                            ij = randomIntFromInterval(0,possiblemovements.length);
                            // pokud je daný směr volný
                            if (tempcell.directions[possiblemovements[ij]] != 0 && tempcell.directions[possiblemovements[ij]] != curblock)
                            {
                              tempcell = map[tempcell.directions[possiblemovements[ij]]-1];
                              while ((tempcell != undefined) && tempcell.directions[possiblemovements[ij]] != 0)
                              {
                                  tempcell = map[tempcell.directions[possiblemovements[ij]] - 1];
                              }
                              targetcell = tempcell;
                              targetdir = possiblemovements[ij];
                              break;
                            } else {
                                tempcell = undefined;
                                possiblemovements.splice(ij,1);
                            }
                          }
                      }
                      if (targetcell != undefined) 
                      {
                           npcs[i].targetcell = targetcell;
                           npcs[i].targetdir = targetdir;
                           npcs[i].isMoving = true;
                           // jdou stejným směrem, hráč uvidí zadnici
                           if (camdir == npcs[i].targetdir)                            
                           {
                              npcs[i].sprite.instance.stopAnimation();
                              npcs[i].sprite.instance.playAnimation(7, 9, true, 500);
                           }
                           else {
                              if (((camdir + 2) % 2) == (npcs[i].targetdir % 2))
                              {
                                  npcs[i].sprite.instance.stopAnimation();
                                  npcs[i].sprite.instance.playAnimation(1, 3, true, 500);
                              }
                              else {
                                  if (npcs[i].sprite.instance.invertU == -1)
                                    npcs[i].sprite.instance.invertU = 0;
                                  else 
                                    npcs[i].sprite.instance.invertU = -1;
                                  npcs[i].sprite.instance.stopAnimation();
                                  npcs[i].sprite.instance.playAnimation(5, 7, true, 500);
                              }
                           }
                      }
                    }
                  }
                }
                if (isMoving)
                  continue;
                if (nAttacked > 0)
                {
                  nAttacked = nAttacked - 10;
                } else {
                if ((curblock.south != undefined && npcs[i].cellid == curblock.south.id) ||
                  (curblock.east != undefined && npcs[i].cellid == curblock.east.id) ||
                  (curblock.north != undefined && npcs[i].cellid == curblock.north.id) ||
                  (curblock.west != undefined && npcs[i].cellid == curblock.west.id))
                {
                  if (npcs[i].isMoving)
                  {
                    // jde kolem hráče. Zastaví se
                    npcs[i].isMoving = false;
                    npcs[i].targetcell = npcs[i].cellid;
                    npcs[i].targetdir = undefined;
                    npcs[i].sprite.instance.stopAnimation();
                  }
                  for (let j = 0;j<players.length;j++)
                  {
                    // pokud není hráč naživu
                    if (players[j].health <= 0)
                      continue;
                    // pokud má hráč menší obranu, než je útok npc
                     hurt = randomIntFromInterval(1, npcs[i].attack) - randomIntFromInterval(1, players[j].deff);
                     npcs[i].sprite.instance.playAnimation(3, 4, false, 500);                     
                     setTimeout(function() {npcs[i].sprite.instance.cellIndex = 0;},750);
                    if (hurt > 0)
                    {
                      document.getElementById('imgPlayer' + players[j].id).style.left ='-186px';
                      SetPlayerLife(players[j].id, -hurt);
                      setTimeout(function() {document.getElementById('imgPlayer' + players[j].id).style.left ='0px';},1000);
                      nSleep = 0; // pod útokem nelze spát
                      nAttacked = 3000;
                    }
                  }
                }
              }
              }
            }
            // pokud družina spí a není pod útokem, tak se uzdravuje
            if (nSleep > 0)
            {
              nSleep = nSleep - 10;
              if (nSleep <= 0)
                SleepParty();
            }
            scene.render();
        });        

        OnResize();
        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

        function neighbourCells()
        {
          return false;
        }
        
  function turn(direction)
  {
      var camstep = 0; //7.5;
      switch (direction)
      {
        case 'left':
          if (bAnimRotate)
            RotateView(-Math.PI/2);
          else 
            camera.rotation.y -= Math.PI/2;
          camdir = (camdir + 3) % 4;
        break;
        case 'right':
          if (bAnimRotate)
            RotateView(Math.PI/2);
          else 
            camera.rotation.y += Math.PI/2;
          camdir = (camdir + 1) % 4;
        break;
      }
    // WriteText("camdir=" + camdir);
  }
  
  function move(direction)
  {
    // další pohyb až po dokončení aktuálního
    if (isMoving)
      return;
    isMoving = true;
    var camstep = 7.5;
    var newblock = undefined;
    let movedir = 0;
    switch (direction)
    {
      case 'fwd':
        movedir = 0;
        break;
      case 'back':
        movedir = 2;
        break;
      case 'left':
        movedir = 3;
        break;
      case 'right':
        movedir = 1;
        break;
    }

    switch ((camdir + movedir) % 4)
    {
      case directions.south:
        if (BlockedWay2(curblock.south))
        {
          if (bAnimMove)              
            BlockedMoveView(0, camstep);
          return;
        }
        if (bAnimMove)              
        {
          MoveView(curblock.south.x - curblock.x, curblock.south.z - curblock.z);
        } else {          
          camera.position.z += curblock.south.z;
          camera.position.x += curblock.south.x;
        }
        curblock = curblock.south;
        // WriteText('xf=' + xf.toString() + ', zf=' + zf.toString() + ', x=' + (curblock.south.x - curblock.x).toString() + ', z=' + (curblock.south.z - curblock.z).toString());
        break;
      case directions.east:
        if (BlockedWay2(curblock.east))
        {
          if (bAnimMove)              
            BlockedMoveView(-camstep, 0);
          return;
        }
        if (bAnimMove)              {
          MoveView(curblock.east.x - curblock.x, curblock.east.z - curblock.z);
        } else {          
          camera.position.z += curblock.east.z;
          camera.position.x += curblock.east.x;
        }
        curblock = curblock.east;
        break;
      case directions.north:
        if (BlockedWay2(curblock.north))
        {
          if (bAnimMove)              
            BlockedMoveView(0, -camstep);
          return;
        }
        if (bAnimMove)              {
          MoveView(curblock.north.x - curblock.x, curblock.north.z - curblock.z);
        } else {          
          camera.position.z += curblock.north.z;
          camera.position.x += curblock.north.x;
        }
        curblock = curblock.north;
        // WriteText('xf=' + xf.toString() + ', zf=' + zf.toString() + ', x=' + (curblock.south.x - curblock.x).toString() + ', z=' + (curblock.south.z - curblock.z).toString());
        break;
      case directions.west:
        if (BlockedWay2(curblock.west))
        {
          if (bAnimMove)              
            BlockedMoveView(camstep, 0);
          return;
        }
        if (bAnimMove)              {
          MoveView(curblock.west.x - curblock.x, curblock.west.z - curblock.z);
        } else {          
          camera.position.z += curblock.west.z;
          camera.position.x += curblock.west.x;
        }
        curblock = curblock.west;
        break;
    }
      // https://blogs.msdn.microsoft.com/davrous/2014/02/19/coding4fun-tutorial-creating-a-3d-webgl-procedural-qrcode-maze-with-babylon-js/
     // document.getElementById('idTextArea').innerHTML = camera.position.x + ',' + camera.position.z;
    if (!bAnimMove)     
      isMoving = false;
  }

  function setCurrentCell()
  {
    for (let i = 0;i < map.length;i++)
    {
      if ((map[i].x == camera.position.x) && (map[i].z == camera.position.z + 3.5))
      {
        curblock = map[i];
        break;
      }
    }    
  }

  function BlockedWay2(targetblock)
  {
    // pro daný směr není definovaný blok
    if (targetblock == undefined)
      return true;
    let result = false;
    // procházím všechny postavy na mapě, jestli se některá nenachází na bloku, do kterého chci přejít
    for (let i=0;i<npcs.length;i++)
    {
      // minimálně jedna se nachází, neprojdu!
      if (targetblock.id == npcs[i].cellid)
      {
        result = true;
        break;
      }
    }
    return result;
  }
  
  function BlockedWay(x, z)
  {
    if ((x > 0) && (curblock.arrwalls[3] != 0))
      return 1;
    if ((x < 0) && (curblock.arrwalls[1] != 0))
      return 1;
    if ((z < 0) && (curblock.arrwalls[2] != 0))
      return 1;
    if ((z > 0) && (curblock.arrwalls[0] != 0))
      return 1;
    for (var i = 0;i < map.length;i++)
    {
      if ((map[i].x == camera.position.x + x) && (map[i].z == camera.position.z + z + 3.5))
      {
        newblock = map[i];
        break;
      }
    }
    if (newblock.blockobjs != undefined)
    {
      for (var i = 0; i < newblock.blockobjs.length;i++)
      {
        if (newblock.blockobjs[i].state == 1)
          return 1;
      }
    }
    if (newblock.sprites != undefined)
    {
      for (var i = 0; i < newblock.sprites.length;i++)
      {
        if (newblock.sprites[i].blockcell == 1)
          return 1;
      }
    }
    return 0;
  }
  
  function CreateFountain(posX, posY, posZ)
  {
  	var fountain = BABYLON.Mesh.CreateCylinder("cylinder", 1, 0.25, 1, 36, null, scene, true); // CreateTorus("torus", 0.25, 0, 10, scene, false);
  	fountain.material = new BABYLON.StandardMaterial("fmat", scene);
  	fountain.material.diffuseColor = BABYLON.Color3.Gray();
    fountain.position.x = posX;
    fountain.position.y = posY;
    fountain.position.z = posZ;
    
    var fountainmaterial = new BABYLON.StandardMaterial("fmat", scene);
    fountainmaterial.diffuseTexture = new BABYLON.Texture(imgpath + "fountaint.png", scene);
    fountainmaterial.diffuseTexture.uScale = 15;
    fountainmaterial.diffuseTexture.vScale = 1;
    fountainmaterial.backFaceCulling = false;
    
  	
  	var fountain2 = BABYLON.Mesh.CreateTorus("torus", 4.5, 0.5, 10, scene, true,
													   true, BABYLON.Texture.BILINEAR_SAMPLINGMODE,
													   null, null);
  	fountain2.material = fountainmaterial; // new BABYLON.StandardMaterial("fmat", scene);
  	// fountain2.material.diffuseColor = BABYLON.Color3.Gray();
    fountain2.position.x = posX;
    fountain2.position.y = posY-0.75;
    fountain2.position.z = posZ;
	  fountain2.scaling.y = 3;
  	// Create a particle system
  	var ps1 = new BABYLON.ParticleSystem("particles", 20000, scene);
  
  	//Texture of each particle
  	ps1.particleTexture = new BABYLON.Texture(imgpath + "flare.png", scene);
  
  	// Where the particles come from
  	ps1.emitter = fountain; // the starting object, the emitter
  	ps1.minEmitBox = new BABYLON.Vector3(.1, 0, 0); // Starting all from
  	ps1.maxEmitBox = new BABYLON.Vector3(-.1, 0, 0); // To...
  
  	// Colors of all particles
  	ps1.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
  	ps1.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
  	ps1.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
  
  	// Size of each particle (random between...
  	ps1.minSize = 0.05;
  	ps1.maxSize = 0.1;
  
  	// Life time of each particle (random between...
  	ps1.minLifeTime = 2;
  	ps1.maxLifeTime = 2.5;
  
  	// Emission rate
  	// ps1.emitRate = 100;
  	//ps1.manualEmitCount = 1500;
  
  	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  	ps1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
  
  	// Set the gravity of all particles
  	ps1.gravity = new BABYLON.Vector3(0, -3, 0);
  
  	// Direction of each particle after it has been emitted
  	ps1.direction1 = new BABYLON.Vector3(-1, 4, 1);
  	ps1.direction2 = new BABYLON.Vector3(1, 4, -1);
  
  	// Angular speed, in radians
  	ps1.minAngularSpeed = Math.PI /4;
  	ps1.maxAngularSpeed = Math.PI;
  
  	// Speed
  	ps1.minEmitPower = .5;
  	ps1.maxEmitPower = .75;
  
  	ps1.updateSpeed = 0.05;
  	ps1.emitRate = 200;
  
  	// Start the particle system
  	ps1.start();
  	ps1.disposeOnStop = true;
  	
	  var fountainBottomMesh = BABYLON.Mesh.CreateDisc("bottom", 2.25, 0, scene); // BABYLON.Mesh.CreateGround("waterMesh", 4.0, 4.0, 1, scene, false);
	  fountainBottomMesh.rotation.x = Math.PI / 2;
	  
    fountainBottomMesh.position.x = posX;
    fountainBottomMesh.position.y = posY-1;
    fountainBottomMesh.position.z = posZ;
	  
  	var waterMesh = BABYLON.Mesh.CreateDisc("hladina", 2.25, 0, scene); // BABYLON.Mesh.CreateGround("waterMesh", 4.0, 4.0, 1, scene, false);
  	waterMesh.rotation.x = Math.PI / 2;
  	var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(256, 256));
  	water.backFaceCulling = true;
  	water.bumpTexture = new BABYLON.Texture(imgpath + "waterbump.png", scene);
  	water.windForce = -5;
  	water.waveHeight = 0;
  	water.bumpHeight = 0.05;
  	water.waterColor = new BABYLON.Color3(0.047, 0.23, 0.515);
  	water.colorBlendFactor = 0.5;
  	//water.addToRenderList(ground);
 	  water.addToRenderList(fountainBottomMesh);
	  water.addToRenderList(fountain);
	  water.addToRenderList(fountain2);
 	  waterMesh.material = water;
    waterMesh.position.x = posX;
    waterMesh.position.y = posY-0.5;
    waterMesh.position.z = posZ;
    
    if (bSoundEnable == 1)
    {
      // zvuk
      var fountainsound = new BABYLON.Sound("fountainsound", "sound/fountain.mp3",
      scene, null, {
          loop: true, autoplay: true, spatialSound: true,distanceModel: "exponential", rolloffFactor: 1.5
      });
      fountainsound.attachToMesh(fountain);
    }
  }
  
  function RotateView(yAngle)
  {
    var animCamRotation = new BABYLON.Animation("animCam", "rotation", 30,
                              BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keysRotation = [];
    keysRotation.push({
      frame: 0,
      value: camera.rotation
    });
    keysRotation.push({
      frame: 100,
      value: new BABYLON.Vector3(camera.rotation.x, camera.rotation.y + yAngle, camera.rotation.z)
    });

    animCamRotation.setKeys(keysRotation);
    camera.animations.push(animCamRotation);

    scene.beginAnimation(camera, 0, 100, false);
  }    
  
  function MoveView(xDir, zDir)
  {
    /*var vector = new BABYLON.Vector3(camera.position.x + xDir, camera.position.y, camera.position.z + zDir);
    camera.moveWithCollisions(vector);*/
      var animCamPosition = new BABYLON.Animation("animCam", "position", 30,
                              BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

      var keysPosition = [];
          keysPosition.push({
          frame: 0,
          value: camera.position
        });
        keysPosition.push({
          frame: 100,
          value: new BABYLON.Vector3(camera.position.x + xDir, camera.position.y, camera.position.z + zDir)
      });

      animCamPosition.setKeys(keysPosition);
      camera.animations.push(animCamPosition);

      let anim = scene.beginAnimation(camera, 0, 100, false);
      anim.onAnimationEnd = function () {
        isMoving = false;
      }
  }

  function MoveView2(xDir, zDir)
  {
    /*var vector = new BABYLON.Vector3(camera.position.x + xDir, camera.position.y, camera.position.z + zDir);
    camera.moveWithCollisions(vector);*/
      var animCamPosition = new BABYLON.Animation("animCam", "position", 30,
                              BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

      var keysPosition = [];
          keysPosition.push({
          frame: 0,
          value: camera.position
        });
        keysPosition.push({
          frame: 100,
          value: new BABYLON.Vector3(xDir, camera.position.y, zDir)
      });

      animCamPosition.setKeys(keysPosition);
      camera.animations.push(animCamPosition);

      scene.beginAnimation(camera, 0, 100, false);
  }

  function BlockedMoveView(xDir, zDir)
  {
    /*var vector = new BABYLON.Vector3(camera.position.x + xDir, camera.position.y, camera.position.z + zDir);
    camera.moveWithCollisions(vector);*/
      var animCamPosition = new BABYLON.Animation("animCam", "position", 30,
                              BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

      var keysPosition = [];
          keysPosition.push({
          frame: 0,
          value: camera.position
        });
        var xpos = camera.position.x;
        var zpos = camera.position.z; 
        keysPosition.push({
          frame: 25,
          value: new BABYLON.Vector3(camera.position.x + xDir / 4, camera.position.y, camera.position.z + zDir / 4)
      });
      keysPosition.push({
          frame: 50,
          value: new BABYLON.Vector3(xpos, camera.position.y, zpos)
      });

      animCamPosition.setKeys(keysPosition);
      camera.animations.push(animCamPosition);

      WriteText('Tudy cesta nevede!');
      PlaySound('no_tresspassing.mp3');
      let anim = scene.beginAnimation(camera, 0, 100, false);
      anim.onAnimationEnd = function () {
        isMoving = false;
      }
  }

  function OnResize()
  {
    var pw = document.body.clientWidth;
    var ph = document.body.clientHeight;

    renderCanvas.height = (ph-175);
    renderCanvas.width = (pw-295);
    document.getElementById('renderCanvas').style.height = (ph - 175) + "px";
    document.getElementById('renderCanvas').style.width = (pw - 295) + "px";
    document.getElementById('imgCanvas').style.height = (ph - 175) + "px";
    document.getElementById('imgCanvas').style.width = (pw - 295) + "px";
    
    document.getElementById('idMoney').style.left = (pw - 70) + "px";
    document.getElementById('idMoney').style.top = (ph - 225) + "px";
    document.getElementById('idTextArea').style.width = (pw - 175) + "px";
    document.getElementById('idTextArea').style.top = (ph - 170) + "px";
    document.getElementById('idButtons').style.top = (ph - 300) + "px";
    document.getElementById('idSettings').style.top = (ph - 51) + "px";
    //document.getElementById('idInventory').style.top = (ph - 51) + "px";
    //document.getElementById('idInventory').style.width = (pw - 165) + "px";
    document.getElementById('idPlayers').style.top = (ph - 125) + "px";
    document.getElementById('idPlayers').style.width = (pw - 295) + "px";
    //document.getElementById('idTextArea').innerText = room.desc;
    document.getElementById('idMoneyAmount').innerText = money;
  }
  
  // loadjscssfile("myscript.js", "js") //dynamically load and add this .js file
  function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

// removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// útok hráče na npc
function attack(nPlayer)
{
    var newblock = undefined;
    // kontrola, jestli před hráčem vůbec někdo je!
    switch (camdir)
    {
        case directions.south:
          newblock = curblock.south;
          break;
        case directions.east:
          newblock = curblock.east;
          break;
        case directions.north:
          newblock = curblock.north;
          break;
        case directions.west:
          newblock = curblock.west;
          break;
    }
    // mlátí do zdi?
    if (newblock == undefined)
      return;
      let hurt = -1;
      for (let i=0;i<npcs.length;i++)
      {
        if (newblock.id == npcs[i].cellid)
        {
            hurt = randomIntFromInterval(1, getPlayerById(nPlayer).attack) - randomIntFromInterval(1, npcs[i].deff);
            if (hurt > 0)
            {
                if (npcs[i].sounds.attack != undefined)
                  PlaySound(npcs[i].sounds.attack);
                let bloodsprite = {id: 100, name: 'red_blot', img: 'images/red_blot01.png', pics: 1, size: 160, defcellindex: npcs[i].sprite.defcellindex, scale: 1,};
                DrawSprite(bloodsprite, npcs[i].sprite.instance.position.x - Math.sign(newblock.x - curblock.x), npcs[i].sprite.instance.position.y, npcs[i].sprite.instance.position.z - Math.sign(newblock.z - curblock.z), npcs[i].sprite.angle);
                WriteText("xf = " + (newblock.x - curblock.x) + ", zf = " + (newblock.z - curblock.z));
                npcs[i].health -= 5;
                if (npcs[i].health < 1)
                {
                  // npcs[i].instance.dispose();
                  npcs[i].sprite.instance.dispose();
                  npcs[i].cellid = -1;
                  // npcs.splice(i);
                }
                setTimeout(function() {bloodsprite.instance.dispose();},1000);
            }
        }
      }        
}

function getPlayerById(playerId)
{
  let retval;
  for (let i=0;i<players.length;i++)
  {
    if (players[i].id == playerId)
    {
      retval = players[i];
      break;
    }
  }
  return retval;
}

function SetPlayerLife(nPlr, nVal)
{
  let plr;
  for (let i=0;i<players.length;i++)
    if (players[i].id === nPlr)
    {
      plr = players[i];
      plr.health = plr.health + nVal;      
      break;
    }
  if (plr == undefined)
    return;
  if (plr.health > plr.maxhealth)
    plr.health = plr.maxhealth;
  let plrLives = document.getElementById('plr' + nPlr + 'lives');
  if (plr.health <= 0)
  {
    plr.health = 0;
    plrLives.style.marginTop = '60px';
    plrLives.style.height = '0px';  
  } else {
    plrLives.style.marginTop = (60 - Math.trunc(60 * plr.health / plr.maxhealth)) + 'px';
    plrLives.style.height = Math.trunc(60 * plr.health / plr.maxhealth) + 'px';  
  }
}

function SetPlayerMana(nPlr, nVal)
{
  for (let i=0;i<players.length;i++)
    if (players[i].id === nPlr)
      players[i].mana = players[i].mana + nVal;
  var plrMana = document.getElementById('plr' + nPlr + 'mana');
  plrLives.style.marginTop = parseInt(plrMana.style.marginTop.replace('px','')) + nVal + 'px';
  plrLives.style.height = plrMana.clientHeight + nVal + 'px';  
}

function SleepParty()
{
  let nVal;
  let nChange = false;
  for (let i=0;i<players.length;i++)
  {    
    // zobrazit hráče se zavřenýma očima  
    document.getElementById('imgPlayer' + players[i].id).style.left ='-62px';
    if (players[i].health < players[i].maxhealth)
    {
      if ((players[i].maxhealth - players[i].health) > 1)
        nVal = 1;
      else  
        nVal = players[i].maxhealth - players[i].health;
      SetPlayerLife(players[i].id, nVal);
      nChange = (players[i].health < players[i].maxhealth);
    }
    if (players[i].mana < players[i].maxmana)
    {
      if ((players[i].maxmana - players[i].mana) > 10)
        nVal = 10;
      else  
        nVal = players[i].maxmana - players[i].mana;
      SetPlayerMana(players[i].id, nVal);
      nChange = (players[i].mana < players[i].maxmana);
    }
  }  
  if (nChange)
    nSleep = 1000;
    // setTimeout(function() {SleepParty();}, 1000);
  else
    for (let i=0;i<players.length;i++)
      document.getElementById('imgPlayer' + players[i].id).style.left ='0px';
}

function WriteText(sText)
{
  document.getElementById('idTextArea').innerHTML = sText;
}

function PlaySound(sFileName)
{
   var audio = new Audio('sound/' + sFileName); // + '.mp3');
   audio.play();                         
}
    

    function DrawMap(map)
    {
        map[0].x = 0;
        map[0].y = 0;
        map[0].z = 0;
        let tmpmap;
        // let i=0;
        for (let i=0;i<map.length;i++)
         {          
            if (map[i].done != 1)
            {
                DrawBlock2(map[i]);
                map[i].done = 1;
            }
            if (map[i].directions[directions.north] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.north]);
              tmpmap.x = map[i].x;
              tmpmap.y = map[i].y;
              tmpmap.z = map[i].z - 7.5;
              map[i].north = tmpmap;
              tmpmap.south = map[i];
            }
            if (map[i].directions[directions.east] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.east]);
              tmpmap.x = map[i].x - 7.5;
              tmpmap.y = map[i].y;
              tmpmap.z = map[i].z;
              map[i].east = tmpmap;
              tmpmap.west = map[i];
            }
            if (map[i].directions[directions.south] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.south]);
              tmpmap.x = map[i].x;
              tmpmap.y = map[i].y;
              tmpmap.z = map[i].z + 7.5;
              map[i].south = tmpmap;
              tmpmap.north = map[i];
            }
            if (map[i].directions[directions.west] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.west]);
              tmpmap.x = map[i].x + 7.5;
              tmpmap.y = map[i].y;
              tmpmap.z = map[i].z;
              map[i].west = tmpmap;
              tmpmap.east = map[i];
            }
            if (map[i].directions[directions.up] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.up]);
              tmpmap.x = map[i].x;
              tmpmap.y = map[i].y + 7.5;
              tmpmap.z = map[i].z;
              map[i].up = tmpmap;
              tmpmap.down = map[i];
            }
            if (map[i].directions[directions.down] > 0)
            {
              tmpmap = GetMapById(map[i].directions[directions.down]);
              tmpmap.x = map[i].x;
              tmpmap.y = map[i].y - 7.5;
              tmpmap.z = map[i].z;
              map[i].down = tmpmap;
              tmpmap.up = map[i];
            }
         }
    }

    function GetMapById(id)
    {
      for (let i=0;i < map.length;i++)
      {
        if (map[i].id == id)
          return map[i];
      }
      return map[0];
    }
