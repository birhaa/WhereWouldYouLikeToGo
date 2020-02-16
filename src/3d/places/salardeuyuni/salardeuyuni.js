
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

  event = new Event("Salar de Uyuni", myBlue, new THREE.Vector3(2,0,4));
  event.addImage( new THREE.TextureLoader().load( itest ), new THREE.Vector3(-3.5,1.5,-2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest2 ), new THREE.Vector3(1.5,3,0), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest3 ), new THREE.Vector3(-2.5,-2,2), new THREE.Vector2(3,2));
  event.addImage( new THREE.TextureLoader().load( itest4 ), new THREE.Vector3(1.5,-3.5,-4), new THREE.Vector2(2,3));
  event.addTextBox(ingress,new THREE.Vector3(6,-4,timelinePos));


   event.addTextBox2(new THREE.Vector3(0,-4,timelinePos+4.0));
  //event.event.children[6].element.style.opacity = 0.00;


  event.event.translateZ(timelinePos);

  return event.event;
}

const update = function(){

  if (showPlace){
    
    updatePos(event.event.children[0],new THREE.Vector3(-0.0,3.0,4));
    updatePos(event.event.children[1],new THREE.Vector3(-3.6,-0.0,4));
    updatePos(event.event.children[2],new THREE.Vector3(-0.6,0.0,4));
    updatePos(event.event.children[3],new THREE.Vector3(2.4,-0.0,4));
    updatePos(event.event.children[4],new THREE.Vector3(4.57,-0.0,4));
    let isUpdated= updatePos(event.event.children[5].domObject,new THREE.Vector3(0,0,4+timelinePos));

    updateScale(event.event.children[4],0.666);
   event.event.children[5].element.style.width = '50px';

    //TODO: add crossing out text
    //if(!showX){
     // event.addCross(myBlue);
     // showX = true;
    //}

    if(isUpdated)
    event.event.children[6].element.style.color = 'black'; 

  }else{
    event.event.children[6].element.style.color = 'white';

    updatePos(event.event.children[0],new THREE.Vector3(2,0,4));
    updatePos(event.event.children[1],new THREE.Vector3(-3.5,1.5,-2));
    updatePos(event.event.children[2],new THREE.Vector3(1.5,3,0));
    updatePos(event.event.children[3],new THREE.Vector3(-2.5,-2,2));
    updatePos(event.event.children[4],new THREE.Vector3(1.5,-3.5,-4));
    updatePos(event.event.children[5].domObject,new THREE.Vector3(6,-4,timelinePos));

   event.event.children[5].element.style.width = '20px';

  }
}

function updatePos(object, finalDestination){
  let delta = 0.05;//TODO use time
  //console.log(event.event.children)
  //console.log("show place");
  let pos = object.position.clone()
  //console.log(pos, finalDestination);
  let dir = pos.sub(finalDestination);
//    console.log(dir.length());
  object.position.sub(dir.multiplyScalar(delta));
  if(dir.length() < 0.01){
    return true;
  }
  return false;

  
}

function updateScale(object, scale){
  if( object.scale.x > scale){
    object.scale.multiplyScalar(scale);
  }
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
