
import * as THREE from 'three';
import itest from "./rainbowmountain-167.jpg"
import itest2 from "./rainbowmountain-166.jpg"
import itest3 from "./rainbowmountain-262.jpg"
import itest4 from "./rainbowmountain-182.jpg"
import {sunsetOrange} from "../../components/colors"
import Event from "../../components/event"


let ingress = "Wake up early to hike and enjoy one of the most colorfull mountains in the world."

const init = function(timelinePos){

  let event = new Event("Rainbow mountain", sunsetOrange, new THREE.Vector3(-2,2,2));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(1.5,0.5,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(-0.5,4,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-3,0,-2), new THREE.Vector2(2,3));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(-0.5,-2.5,-4), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(1,1,-4), new THREE.Vector2(3,2));
  event.addTextBox(ingress,new THREE.Vector3(-6,-6,-6 + timelinePos));

  event.event.translateZ(timelinePos);

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
