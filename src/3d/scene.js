import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import * as Camera from './camera'
import * as Timeline from './timeline'
import GlobalState from '../globalState'



let intersectedObject;
var scene = new THREE.Scene();
let cssScene = new THREE.Scene();

let cssObjects = []

const color = 0xFFFFFF;  // white
const near = 10;
const far = 20;

const init = function(){
  console.log("Hello world")


  scene.fog = new THREE.Fog(color, near, far);
  cssScene.fog = new THREE.Fog(color, near, far);

  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor( 0xffffff, 0 );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //document.querySelector('#webgl').appendChild( renderer.domElement );
  document.body.appendChild( renderer.domElement );
  //console.log(document.getElementById('css'));

  // create a CSS3DRenderer
  let cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  //document.querySelector('#css').appendChild( cssRenderer.domElement );
  cssRenderer.domElement.className = "cssRenderer";
  document.body.appendChild(cssRenderer.domElement);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  Timeline.init(scene)
  Camera.init(renderer, scene)

  addTextBoxes()


  function animate() {
    Camera.update();
    Timeline.update();

    applyFogTotextBoxed();

 


    requestAnimationFrame( animate );
    renderer.render( scene, Camera.camera );
    cssRenderer.render(cssScene, Camera.camera);


  }

  function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  function onMouseClick(event){
    console.log("intersectedObject");

    raycaster.setFromCamera( mouse, Camera.camera );

    let mindis = 100;
    let evens = scene.children.filter(object => object.type == "Object3D")
    console.log("evens", evens)

      var intersects = raycaster.intersectObjects( evens,true );

      if(intersects.length > 0)
        console.log("intersects", intersects)
      for(var j = 0; j < intersects.length ; j++){
        if(!GlobalState.showPlace ){
          if(intersects[j].distance < mindis){
            intersectedObject = intersects[j].object;
            mindis = intersects[j].distance;
           console.log(intersectedObject.parent, intersects[j].distance)
          }
          console.log("Intersect", intersectedObject.parent.name)
        }else{
        }
      }

    
    if(!GlobalState.showPlace){
      GlobalState.showPlace = true;
      //console.log(document.getElementsByClassName("header"))
      document.getElementsByClassName("header")[0].style.opacity = 0.0;
      Timeline.showEvent(intersectedObject.parent)
      Camera.move(intersectedObject.parent.position.z + 7.0);
    }
    else{
      GlobalState.showPlace = false;
      //intersectedObject.material.color.set( 0xffffff );
      Timeline.closeEvent()
      Camera.move(intersectedObject.parent.position.z + 7.0);
    }
  }

  function addTextBoxes(){
    for ( var i = 0; i < scene.children.length; i++ ) {
      for ( var j = 0; j < scene.children[i].children.length; j++ ) {
        let child = scene.children[i].children[j]
        //console.log(child.constructor.name);
        if(child.constructor.name == 'TextBox' || child.constructor.name == 'TextBox2'){
          //console.log("child", child);
          cssObjects.push(child);
          cssScene.add(child.domObject);
        }

      }
    }
  }

  function applyFogTotextBoxed(){
    for(var i = 0; i < cssObjects.length ; i++) {
      let cssObject = cssObjects[i];
      let distance = Camera.camera.position.z - cssObject.domObject.position.z;
      let delta = far -near;
      //console.log(distance);
      if(distance > far)
      cssObject.element.style.opacity = 0.0;
      else if(distance > near)
      cssObject.element.style.opacity = 1.0 -(distance -delta)/delta;
      else
      cssObject.element.style.opacity = 1.0;
    }
  }

  window.addEventListener( 'click', onMouseClick, false );
  animate();
}

function moveToPlace(name){
  //console.log(name)
  //console.log(scene.children)
  let place = scene.children.filter(object => object.name == name)
  console.log("place", place)
  if(place.length > 0){
    Camera.move(place[0].position.z + 7.0);
  }


}



export default {
  init : init,
  moveToPlace : moveToPlace
};
