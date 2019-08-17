import * as THREE from 'three';
import TextSprite from 'three.textsprite';

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

  update(){

  }
};
