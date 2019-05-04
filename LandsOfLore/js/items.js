// Items
var items = [
          {id: 1, name: 'shirt', wearing_pos: 'chest', textureid: 2, value: 1, type: 'cloth' },
          {id: 2, name: 'sandals', wearing_pos: 'foot', textureid: 3, value: 1, type: 'cloth' },
          {id: 3, name: 'dagger', wearing_pos: 'rhand', attack: 4, textureid: 4, value: 1, type: 'weapon' },
          {id: 4, name: 'aloe_leaf', heal: 5, textureid: 1, value: 1, type: 'herbal' },
          {id: 5, name: 'cord', wearing_pos: 'rhand', attack: 3, textureid: 5, value: 3, type: 'weapon' },
          {id: 6, name: 'goblet', textureid: 6, value: 10, type: 'treasure' },
          {id: 7, name: 'key', textureid: 7, value: 0, unlock: 'lock_1', type: 'unique'  },
          {id: 8, name: 'mace', wearing_pos: 'rhand', attack: 3, textureid: 8, value: 5, req_warrior: 3, type: 'weapon' },
          {id: 9, name: 'spark_spell', textureid: 9, type: 'spell', effect: 'lightning', req_mage: 1, value: 1,
            effects: [
              {level: 1, attack: 1, magicka: 1},
              {level: 2, attack: 3, magicka: 3},
              {level: 3, attack: 5, magicka: 5},
              {level: 4, attack: 10, magicka: 10}]},
          {id: 10, name: 'heal_spell', textureid: 9, type: 'spell', effect: 'heal', req_mage: 1, value: 1, 
            effects: [
              {level: 1, heal: 1, magicka: 1},
              {level: 2, heal: 3, magicka: 3},
              {level: 3, heal: 5, magicka: 5},
              {level: 4, heal: 10, magicka: 10}]},
          {id: 11, name: 'ginseng', poison: -10, textureid: 10, value: 3, type: 'herbal' },
          {id: 12, name: 'life_elixir', heal: 20, textureid: 11, value: 5, type: 'herbal' },
          {id: 13, name: 'gold_bag', textureid: 12, value: 5, type: 'gold' }];
          
        var item_textures = [
            {id: 1, desc: 'aloe', img: imgpath + "aloe_leaf2.png", texture:undefined },
            {id: 2, desc: 'shirt', img: imgpath + "shirt2.png" },
            {id: 3, desc: 'sandals', img: imgpath + "sandals2.png"  },
            {id: 4, desc: 'dagger', img: imgpath + "dagger2.png" },
            {id: 5, desc: 'cord', img: imgpath + "cord2.png" },
            {id: 6, desc: 'goblet', img: imgpath + "goblet2.png" },
            {id: 7, desc: 'key', img: imgpath + "key2.png" },
            {id: 8, desc: 'mace', img: imgpath + "mace2.png" },
            {id: 9, desc: 'scroll', img: imgpath + "papyrus2.png" },  
            {id: 10, desc: 'ginseng', img: imgpath + "ginseng.png" },
            {id: 11, desc: 'life_elixir', img: imgpath + "life_elixir2.png" },
            {id: 12, desc: 'gold_bag', img: imgpath + "gold_bag.png" },
          ];
      
      function InitItems()
      {
         InitItemTextures();
        for (var i = 0;i<items.length;i++)
        {
          items[i].texture = GetTextureForItem(items[i].textureid)
        }
      }

      function InitItemTextures()
      {
        for (let i = 0;i<item_textures.length;i++)
        {
          item_textures[i].texture = new BABYLON.Texture(item_textures[i].img, scene);
          item_textures[i].texture.hasAlpha = true;
        }
      }

      function GetTextureForItem(textureid)
      {
        for (let i = 0;i<item_textures.length;i++)
        {
          if (item_textures[i].id == textureid)
              return item_textures[i];
        }
        return undefined;
      }
