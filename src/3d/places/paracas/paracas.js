import * as THREE from 'three';
import TextSprite from 'three.textsprite';
import itest from "./paracas-7.jpg"
import itest2 from "./paracas-41.jpg"
import itest3 from "./paracas-43.jpg"
import itest4 from "./paracas-69.jpg"
import {orange} from "../../components/colors"
import Event from "../../components/event"


let ingress = "Where desert meets sea"


const init = function(timelinePos){


  let event = new Event("Paracas", orange, new THREE.Vector3(2,1,0));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(-3,2,-2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(-1,-1.5,1), new THREE.Vector2(2,3));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(7,4,-6), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2), new THREE.Vector3(4,-2,-3), new THREE.Vector2(3,2));
  event.addTextBox2(ingress,new THREE.Vector3(-6,6,-6 + timelinePos));


  event.event.translateZ(timelinePos);
  event.event.name="Paracas";

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
