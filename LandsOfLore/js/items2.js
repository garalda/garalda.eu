// Items
var items = [
          {id: 1, name: 'shirt', wearing_pos: 'chest', texture: 2, value: 1, type: 'cloth', },
          {id: 2, name: 'sandals', wearing_pos: 'foot', texture: 3, value: 1, type: 'cloth' },
          {id: 3, name: 'dagger', wearing_pos: 'rhand', attack: 4, texture: 25, value: 1, type: 'weapon', },
          {id: 4, name: 'aloe_leaf', heal: 5, texture: 22, value: 1, type: 'herbal', },
          {id: 5, name: 'cord', wearing_pos: 'rhand', attack: 3, texture: 5, value: 3, type: 'weapon', },
          {id: 6, name: 'goblet', texture: 6, value: 10, type: 'treasure', },
          {id: 7, name: 'key', texture: 7, value: 0, unlock: 'lock_1', type: 'unique',  },
          {id: 8, name: 'mace', wearing_pos: 'rhand', attack: 3, texture: 8, value: 5, req_warrior: 3, type: 'weapon', },
          {id: 9, name: 'spark_spell', texture: 9, type: 'spell', effect: 'lightning', req_mage: 1, value: 1,
            effects: [
              {level: 1, attack: 1, magicka: 1},
              {level: 2, attack: 3, magicka: 3},
              {level: 3, attack: 5, magicka: 5},
              {level: 4, attack: 10, magicka: 10},
              ],  },
          {id: 10, name: 'heal_spell', texture: 9, type: 'spell', effect: 'heal', req_mage: 1, value: 1, 
            effects: [
              {level: 1, heal: 1, magicka: 1},
              {level: 2, heal: 3, magicka: 3},
              {level: 3, heal: 5, magicka: 5},
              {level: 4, heal: 10, magicka: 10},
              ],  },
          ];
          
        var item_textures = [
            {id: 1, desc: 'aloe', img: "images/aloe_leaf2.png", texture:undefined },
            {id: 2, desc: 'shirt', img: "images/shirt2.png", },
            {id: 3, desc: 'sandals', img: "images/sandals2.png",  },
            {id: 4, desc: 'dagger', img: "images/dagger2.png", },
            {id: 5, desc: 'cord', img: "images/cord2.png", },
            {id: 6, desc: 'goblet', img: "images/goblet2.png", },
            {id: 7, desc: 'key', img: "images/key2.png", },
            {id: 8, desc: 'mace', img: "images/mace2.png", },
            {id: 9, desc: 'scroll', img: "images/papyrus2.png", },  
          ];
      
      function InitItems()
      {
     /*   for (var i = 0;i<item_textures.length;i++)
        {
          item_textures[i].texture = new BABYLON.Texture(item_textures[i].img, scene);
          item_textures[i].texture.hasAlpha = true;
        } */
      }