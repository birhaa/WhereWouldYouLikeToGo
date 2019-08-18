import * as THREE from 'three';
import { PointerLockControls }  from './components/pointerlockcontrols'



let camera, controls, obj;

var PI_2 = Math.PI / 2;

const getLookAt = function(){
  var vector = new THREE.Vector3( 0, 0, - 1 );
  return vector.applyQuaternion( camera.quaternion );
}

const init = function(renderer,scene){
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 30 );
  camera.position.z = 70;

  controls = new PointerLockControls( camera );


  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  obj = cube;
  obj.position.z = camera.position.z;
  //scene.add(obj);

  scene.add(controls.getObject());//TODO: flyttt logikk


  document.addEventListener( 'wheel', onMouseMove, {passive: false} );

}

const update = function(){
  //console.log(camera.position.z, getLookAt);
  if((camera.position.z < 70 && camera.position.z > 58) ||
     (camera.position.z < 50 && camera.position.z > 38) ||
     (camera.position.z < 30 && camera.position.z > 18) ||
     (camera.position.z < 10 && camera.position.z > -10) ){
    controls.lock();
  }
  else {
    camera.lookAt(new THREE.Vector3(0,0,-1));
    controls.unlock();
  }

  let lookAt = getLookAt().multiplyScalar(10.0);
  //console.log(camera.position, lookAt);
  obj.position.z = camera.position.z + lookAt.z
  obj.position.x = lookAt.x
  obj.position.y = lookAt.y

}

function onMouseMove( event ) {

		event.preventDefault();

    let time = Date.now();
    let looptime = 20 * 1000;
    let t = ( time % looptime ) / looptime;

    let delta = Math.min(1, 0.02 * event.deltaY);

  if(camera.position.z > 5 || event.deltaY < 0)
    camera.position.z -= delta;
}


export {
  init,
  update,
  camera,
  controls
};
