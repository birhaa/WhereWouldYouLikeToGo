import * as THREE from 'three';
import * as Camera from './camera'
import * as Timeline from './timeline'


const init = function(){
  console.log("Hello world")
  var scene = new THREE.Scene();

  const color = 0xFFFFFF;  // white
  const near = 10;
  const far = 20;
  scene.fog = new THREE.Fog(color, near, far);

  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 1);
  document.body.appendChild( renderer.domElement );

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();


  Timeline.init(scene)
  Camera.init(renderer, scene)


let prevLookAt = new THREE.Vector3(0,0,0);

  function animate() {
    Camera.update();

    raycaster.setFromCamera( mouse, Camera.camera );
    //console.log(scene.children[0].children)
    var intersects = raycaster.intersectObjects( scene.children[0].children );
    //console.log(intersects)



    /*for ( var i = 0; i < scene.children[0].children.length; i++ ) {
      scene.children[0].children[ i ].material.color.set( 0xffffff );
    }

    for ( var i = 0; i < intersects.length; i++ ) {

      intersects[ i ].object.material.color.set( 0xff0000 );
      console.log(intersects[ i].object.position )

	   }

     if(intersects.length > 0  && intersects[ 0 ].distance < 20 && intersects[ 0 ].distance > 0.1){
       //let newLookAt= prevLookAt + intersects[0].object.position * 0.000 ;
       let newLookAt = prevLookAt;
       //pos.multiplyScalar(0.002)
       let pos = new THREE.Vector3(intersects[0].object.position.x, intersects[0].object.position.y,intersects[0].object.position.z).multiplyScalar(0.003);
       console.log("post",pos);
       Camera.camera.lookAt( newLookAt  );
       prevLookAt = newLookAt;
       console.log("test")
     }else{
       Camera.camera.lookAt(prevLookAt);
     }*/




  	requestAnimationFrame( animate );
  	renderer.render( scene, Camera.camera );
    //console.log(camera.position.z)


  }

  function onMouseMove( event ) {
	   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  //window.addEventListener( 'mousemove', onMouseMove, false );
  animate();
}



export default init;
