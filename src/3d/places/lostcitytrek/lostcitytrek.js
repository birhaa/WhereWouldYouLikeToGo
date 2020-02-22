import * as THREE from 'three';
import TextSprite from 'three.textsprite';
import itest from "./lostcitytrek-155.jpg"
import itest2 from "./lostcitytrek-174.jpg"
import itest3 from "./lostcitytrek-196.jpg"
import itest4 from "./lostcitytrek-132.jpg"
import {myBlue} from "../../components/colors"
import Event from "../../components/event"



const init = function(timelinePos){


  let event = new Event("Ciudad Perdida", myBlue, new THREE.Vector3(-3,2,-1));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(0,0,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(3,2.2,-4), new THREE.Vector2(2,3));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-5,1,-6), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(-3.5,-2,-3), new THREE.Vector2(3,2));

  event.event.translateZ(timelinePos);
  event.event.name="The lost city trek";

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
