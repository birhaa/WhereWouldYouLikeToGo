
import * as THREE from 'three';
import itest from "./rainbowmountain-167.jpg"
import itest2 from "./rainbowmountain-166.jpg"
import itest3 from "./rainbowmountain-262.jpg"
import itest4 from "./rainbowmountain-182.jpg"
import {sunsetOrange} from "../../components/colors"
import Event from "../../components/event"


const init = function(){

  let event = new Event("Rainbow mountain", sunsetOrange, new THREE.Vector3(-2,2,2));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(1.5,0.5,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(-0.5,4,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-3,0,-2), new THREE.Vector2(2,3));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(-0.5,-2.5,-4), new THREE.Vector2(3,2));

  event.event.translateZ(40);

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
