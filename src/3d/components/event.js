import * as THREE from 'three';
import TextSprite from 'three.textsprite';
import TextBox from './textbox';
import TextBox2 from "./textbox0"
import { show } from '../places/salardeuyuni/salardeuyuni';

const createSprite = function(spriteMap, x, y, opacity){
  let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  if(opacity){
    spriteMaterial.opacity = 0.15;
    spriteMaterial.transparent = true;
  }
  spriteMaterial.map.minFilter = THREE.LinearFilter
  let sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(x, y, 1)
  return sprite;
}

const createPlane = function(texture, x, y, opacity){
  let geometry = new THREE.PlaneGeometry( x, y, 1 );
  let material = new THREE.MeshBasicMaterial( { map: texture } );
  material.map.minFilter = THREE.LinearFilter
  if(opacity){
    material.opacity(0.05);
    material.transparent = true;
  }
  let plane = new THREE.Mesh( geometry, material );
  return plane;
}


export default class Event{

  constructor(text, color, firstPosition, secondPosition){
    let sprite = new TextSprite({
      material: {
        color: color,
        fog: true,
      },
      redrawInterval: 250,
      textSize: 1,
      texture: {
        fontFamily: 'Fredericka the Great',
        text: text,
      },
    });


    sprite.translateX(firstPosition.x);
    sprite.translateY(firstPosition.y);
    sprite.translateZ(firstPosition.z);

    this.firstPositions = []
    this.secondPositions = []
    this.firstPositions.push(firstPosition);
    this.secondPositions.push(secondPosition);

    this.event = new THREE.Object3D();
    this.event.add(sprite);

  }

  addImage(image, firstPosition, size, secondPosition){
    let sprite = createPlane(image, size.x,size.y);

    sprite.translateX(firstPosition.x);
    sprite.translateY(firstPosition.y);
    sprite.translateZ(firstPosition.z);

    this.firstPositions.push(firstPosition);
    this.secondPositions.push(secondPosition);

    this.event.add(sprite);
  }

  addTextBox(text, firstPosition,secondPosition){
    let textBox = new TextBox(text, firstPosition)

    this.firstPositions.push(firstPosition);
    this.secondPositions.push(secondPosition);

    this.event.add(textBox);
  }

  addTextBox2(id, firstPosition,secondPosition){
    let textBox = new TextBox2(id, firstPosition)

    this.firstPositions.push(firstPosition);
    this.secondPositions.push(secondPosition);

    this.event.add(textBox);
  }

  addCross(color){
    let sprite = new TextSprite({
      material: {
        color: color,
        fog: true,
      },
      name : "cross",
      redrawInterval: 250,
      textSize: 2,
      texture: {
        fontFamily: 'Fredericka the Great',
        text: "X",
      },
    });


    sprite.translateX(10.0);
    sprite.translateY(5.0);
    sprite.translateZ(0.0);

    this.event.add(sprite);
  }

  updatePos(object, finalDestination){
    let delta = 0.05;//TODO use time
    let pos = object.position.clone()
    let dir = pos.sub(finalDestination);
    object.position.sub(dir.multiplyScalar(delta));
    if(dir.length() < 0.01){
      return true;
    }
    return false;
  }

  updateScale(object, scale){
    if( object.scale.x > scale){
      object.scale.multiplyScalar(scale);
    }
  }

  update(showPlace){
    if(showPlace){
      let isUpdated = false;
      for(let i = 0; i < this.event.children.length-2; i++){
        isUpdated = this.updatePos(this.event.children[i], this.secondPositions[i]);
      }
      this.updatePos(this.event.children[5].domObject,this.secondPositions[5]);


      this.updateScale(this.event.children[4],0.666);
      this.event.children[5].element.style.width = '50px';
   
      if(isUpdated){
      this.event.children[6].element.style.color = 'black'; 
      }
    }else{
      this.event.children[6].element.style.color = 'white';

      for(let i = 0; i < this.event.children.length-2; i++){
        this.updatePos(this.event.children[i], this.firstPositions[i]);
      }
      this.updatePos(this.event.children[5].domObject,this.firstPositions[5]);
  
     this.event.children[5].element.style.width = '20px';
    }


  }



};
