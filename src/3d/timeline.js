import * as THREE from 'three';
import * as LostCityTrek from './places/lostcitytrek/lostcitytrek'
import * as Tayonara from './places/tayonara/tayonara'
import * as Memory3 from './places/rainbowmountain/rainbowmountain'
import * as SalarDeUyuni from './places/salardeuyuni/salardeuyuni'
import * as Paracas from './places/paracas/paracas'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


const timeLineInterval = 20;
let lastPlace = 0;
const nextPlace = () => lastPlace+= timeLineInterval

let element, mesh, domObject;

const init = function(scene){


  var lct = LostCityTrek.init(lastPlace);
  scene.add( lct );
  var tayonara = Tayonara.init(nextPlace());
  scene.add( tayonara );
  scene.add( Memory3.init(nextPlace()) );
  scene.add( SalarDeUyuni.init(nextPlace()));
  scene.add(Paracas.init(nextPlace()));

  var helper = new THREE.BoundingBoxHelper(tayonara, 0xff0000);
  helper.update();
  // If you want a visible bounding box
  //scene.add(helper);

  var helper2 = new THREE.BoundingBoxHelper(lct, 0xff0000);
  helper2.update();
  // If you want a visible bounding box
  //scene.add(helper2);

}

const update = function(){

//SalarDeUyuni.update();
  //console.log(mesh.material);
  //element.style.opacity = mesh.material.opacity;
}

const showEvent = function(clicketObject){
  //console.log("CLicked objeect",clicketObject);
  //SalarDeUyuni.show();
}

const closeEvent = function(){
  //SalarDeUyuni.close();
}

export {
  init,
  update,
  showEvent,
  closeEvent
};
