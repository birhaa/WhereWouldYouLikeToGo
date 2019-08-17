import * as THREE from 'three';
import itest from "./tnp-21.jpg"
import itest2 from "./tnp-34.jpg"
import itest3 from "./tnp-39.jpg"
import itest4 from "./tnp-27.jpg"
import {myBlue} from "../../components/colors"
import Event from "../../components/event"

const init = function(timelinePos){

  let event = new Event("Tayonara national par", myBlue, new THREE.Vector3(1,1,4));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(2,0,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(-0.5,4,-2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-4,1,0), new THREE.Vector2(2,3));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(-2.5,-0.5,-4), new THREE.Vector2(3,2));

  event.event.translateZ(timelinePos);

  return event.event;

}

const update = function(){
}

export {
  init,
  update
};
