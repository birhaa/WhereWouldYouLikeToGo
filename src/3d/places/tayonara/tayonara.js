import * as THREE from 'three';
import TextSprite from 'three.textsprite';
import itest from "./tnp-21.jpg"
import itest2 from "./tnp-34.jpg"
import itest3 from "./tnp-39.jpg"
import itest4 from "./tnp-27.jpg"
import {myBlue} from "../../components/colors"


let memory1;

const createSprite = function(image, x, y, opacity){
  let spriteMap = new THREE.TextureLoader().load( image );
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

const createPlane = function(image, x, y, opacity){
  let geometry = new THREE.PlaneGeometry( x, y, 1 );
  let texture = new THREE.TextureLoader().load( image );
  let material = new THREE.MeshBasicMaterial( { map: texture } );
  if(opacity){
    material.opacity(0.05);
    material.transparent = true;
  }
  let plane = new THREE.Mesh( geometry, material );
  return plane;
}

const init = function(){
  let test1 = createSprite(itest, 3,2);
  let test2 = createSprite(itest2,3,2);
  let test3 = createSprite(itest3, 2,3);
  let test4 = createSprite(itest4,3,2);
  memory1 = new THREE.Object3D();
  memory1.add(test1);
  memory1.add(test2);
  memory1.add(test3);
  memory1.add(test4);

  memory1.translateZ(20);

  test1.translateX(2);
  test1.translateY(0);
  test1.translateZ(2);

  test2.translateX(-0.5);
  test2.translateY(4);
  test2.translateZ(-2);

  test3.translateX(-4);
  test3.translateY(1);
  test3.translateZ(0);

  test4.translateY(-2.5);
  test4.translateX(-0.5);
  test4.translateZ(-4);


  let storTest = createSprite(itest, 30,20, 0.05);
  //storTest.materials[0].transparent = true;
  //storTest.materials[0].opacity = 0.05;
  //memory1.add(storTest)

  let sprite = new TextSprite({
  material: {
    color: myBlue,
    fog: true,
  },
  redrawInterval: 250,
  textSize: 1,
  texture: {
    fontFamily: 'Fredericka the Great',
    text: 'Tayonara national park',
  },
});

sprite.translateZ(4);
sprite.translateX(1);
sprite.translateY(1);
memory1.add(sprite);

//memory1.translateX(-20);
  return memory1;

/*  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  return cube;*/
}

const update = function(){
}

export {
  init,
  update
};
