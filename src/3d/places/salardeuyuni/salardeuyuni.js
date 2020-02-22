
import * as THREE from 'three';
import itest from "./saltflats-31.jpg"
import itest2 from "./saltflats-88.jpg"
import itest3 from "./saltflats-144.jpg"
import itest4 from "./saltflats-91.jpg"
import {myBlue} from "../../components/colors"
import Event from "../../components/event"

let ingress = "Salar de Uyuni is the world's largest salt flat, at 10,582 square kilometers (4,086 sq mi). It is in the Daniel Campos Province in Potosí in southwest Bolivia, near the crest of the Andes and is at an elevation of 3,656 meters (11,995 ft) above sea level."
let showPlace = false;
let showX = false;
let event, timelinePos;

const init = function(inTimelinePos){

  timelinePos = inTimelinePos;

  event = new Event("Salar de Uyuni", myBlue, new THREE.Vector3(2,0,0),new THREE.Vector3(-0.0,3.0,0));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(-3.5,1.5,-2), new THREE.Vector2(3,2),new THREE.Vector3(-3.6,-0.0,4));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(1.5,3,0), new THREE.Vector2(3,2),new THREE.Vector3(-0.6,0.0,4));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-2.5,-2,2), new THREE.Vector2(3,2),new THREE.Vector3(2.4,-0.0,4));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(1.5,-3.5,-4), new THREE.Vector2(2,3),new THREE.Vector3(4.57,-0.0,4));
  event.addTextBox(ingress,new THREE.Vector3(6,-4,timelinePos),new THREE.Vector3(0,0,4+timelinePos));

  event.addTextBox2(new THREE.Vector3(0,-4,timelinePos+4.0));
  //event.event.children[6].element.style.opacity = 0.00;
  event.event.translateZ(timelinePos);
  event.event.name="Saral de Uyuni"

  return event.event;
}

const update = function(){
  event.update(showPlace)
}

const show = function(){
  showPlace = true;
}

const close = function(){
  showPlace = false;
}

export {
  init,
  update,
  show,
  close
};
