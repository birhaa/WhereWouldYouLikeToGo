
import * as THREE from 'three';
import itest from "./saltflats-31.jpg"
import itest2 from "./saltflats-88.jpg"
import itest3 from "./saltflats-144.jpg"
import itest4 from "./IMG_0153.jpg"
import {myBlue} from "../../components/colors"
import Event from "../../components/event"


const init = function(timelinePos){

  let event = new Event("Salar de Uyuni", myBlue, new THREE.Vector3(4,0,4));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(-1.5,1.5,-2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(3.5,3,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-1.5,-2,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(3.5,-3.5,-4), new THREE.Vector2(3,4));

  event.event.translateZ(timelinePos);

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
