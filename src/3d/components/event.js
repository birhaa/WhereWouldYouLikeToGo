import * as THREE from 'three';
import TextSprite from 'three.textsprite';
import TextBox from './textbox';
import TextBox2 from "./textbox0"

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

  constructor(text, color, position){
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


    sprite.translateX(position.x);
    sprite.translateY(position.y);
    sprite.translateZ(position.z);

    this.event = new THREE.Object3D();
    this.event.add(sprite);

  }

  addImage(image, position, size){
    let sprite = createPlane(image, size.x,size.y);

    sprite.translateX(position.x);
    sprite.translateY(position.y);
    sprite.translateZ(position.z);

    this.event.add(sprite);
  }

  addTextBox(text, position){
    let textBox = new TextBox(text, position)
      this.event.add(textBox);
  }

  addTextBox2(id, position){
    let textBox = new TextBox2(id, position)
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

  update(){

  }
};
