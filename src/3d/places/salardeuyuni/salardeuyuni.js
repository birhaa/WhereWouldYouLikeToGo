
import * as THREE from 'three';
import itest from "./saltflats-31.jpg"
import itest2 from "./saltflats-88.jpg"
import itest3 from "./saltflats-144.jpg"
import itest4 from "./saltflats-91.jpg"
import {myBlue} from "../../components/colors"
import Event from "../../components/event"

let ingress = "Salar de Uyuni is the world's largest salt flat, at 10,582 square kilometers (4,086 sq mi). It is in the Daniel Campos Province in Potosí in southwest Bolivia, near the crest of the Andes and is at an elevation of 3,656 meters (11,995 ft) above sea level."

const init = function(timelinePos){

  let event = new Event("Salar de Uyuni", myBlue, new THREE.Vector3(2,0,4));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(-3.5,1.5,-2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(1.5,3,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-2.5,-2,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(1.5,-3.5,-4), new THREE.Vector2(2,3));
  event.addTextBox(ingress,new THREE.Vector3(6,-4,timelinePos));


  event.event.translateZ(timelinePos);

  return event.event;
}

const update = function(){
}

export {
  init,
  update
};
