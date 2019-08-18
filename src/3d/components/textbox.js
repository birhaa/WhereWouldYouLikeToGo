
import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';



class TextBox extends THREE.Object3D{

  constructor(text, position){

    super();

    this.element = document.createElement( 'div' );
    this.element.style.width = '20px';
    this.element.style.height = '20px';
    this.element.style.opacity = 0.999;
    this.element.style.background = 'transparent';
    this.element.style.color = 'black';
    this.element.style.fontSize = '1px';
    this.element.textContent = text;
    this.element.setAttribute('contenteditable', '')

    this.domObject = new CSS3DObject( this.element );
    this.domObject.position.z = position.z;
    this.domObject.position.x = position.x;
    this.domObject.position.y = position.y;
    this.domObject.scale.set(0.2, 0.2, 0.2);
    this.element.style.transform += ' scale(0.2)';
    //  this.add(this.domObject);

    //this.add(this.element);

    var material = new THREE.MeshBasicMaterial({
      opacity	: 0.0,
      color	: new THREE.Color('grey'),
      blending: THREE.NoBlending,
      side	: THREE.DoubleSide,
    });
    var geometry = new THREE.PlaneGeometry( 10, 10 );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.copy( this.domObject.position );
    this.mesh.scale.copy( this.domObject.scale );
    this.mesh.castShadow = false;
    //mesh.receiveShadow = true;
    //this.add( mesh );
  }
}

export default TextBox;
