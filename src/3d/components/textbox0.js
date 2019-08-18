
import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import ReactDOMServer from 'react-dom/server';
import Blog from '../../blog';
import React from 'react';



class TextBox2 extends THREE.Object3D{

  constructor(position){

    super();

    this.element = document.createElement("div");
    this.element.innerHTML = ReactDOMServer.renderToString(<Blog/>);
    console.log(this.element);
    this.element.style.width = '50px';
    this.element.style.height = '20px';
    this.element.style.opacity = 0.0;
    this.element.style.background = 'transparent';
    this.element.style.color = 'white';
    this.element.style.fontSize = '1px';
    this.element.setAttribute('contenteditable', '')

    this.domObject = new CSS3DObject( this.element );
    this.domObject.position.z = position.z;
    this.domObject.position.x = position.x;
    this.domObject.position.y = position.y;
    this.domObject.scale.set(0.2, 0.2, 0.2);
    this.element.style.transform += ' scale(0.2)';
    //  this.add(this.domObject);

    //this.add(this.element);
  }
}

export default TextBox2;
