import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import * as Camera from './camera'
import * as Timeline from './timeline'


const init = function(){
  console.log("Hello world")

  let intersectedObject;
  var scene = new THREE.Scene();
  let cssScene = new THREE.Scene();

  let cssObjects = []

  const color = 0xFFFFFF;  // white
  const near = 10;
  const far = 20;
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

    raycaster.setFromCamera( mouse, Camera.camera );

    //  console.log("HEYYO");
    for ( var i = 0; i < scene.children[0].children.length; i++ ) {
      var intersects = raycaster.intersectObjects( scene.children[i].children );
      for(var j = 0; j < intersects.length ; j++){
        if(intersects[j].distance < 10 && intersects[j].object.type == 'Sprite' ){
        //console.log(i, intersects[j])
        //intersects[j].object.material.color.set( 0xffffff );
        intersectedObject = intersects[j].object;

        }
      }

    }


    requestAnimationFrame( animate );
    cssRenderer.render(cssScene, Camera.camera);
    renderer.render( scene, Camera.camera );

  }

  function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  function onMouseClick(event){
    console.log("intersectedObject");
    Timeline.showEvent(intersectedObject.parent)
  }

  function addTextBoxes(){
    for ( var i = 0; i < scene.children.length; i++ ) {
      for ( var j = 0; j < scene.children[i].children.length; j++ ) {
        let child = scene.children[i].children[j]
        //console.log(child.constructor.name);
        if(child.constructor.name == 'TextBox' || child.constructor.name == 'TextBox2'){
          console.log("childe", child);
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



export default init;
