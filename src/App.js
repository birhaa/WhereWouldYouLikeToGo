import React, { useEffect, useState } from 'react';
import './App.css';
import Scene from './3d/scene'

function App() {

  Scene.init();



  useEffect(() => {
    document.getElementById("searchBox").focus();
    document.getElementById("searchBox").addEventListener("input", function(e) {
      //console.log("input event fired", e);
      Scene.moveToPlace(document.getElementById("searchBox").textContent)
    }, false);
  }, []);




  return (
    <div>
    <div className="header">
      <div className="logo"><div>Where do you want to go?</div>
          <div className="search" >
          {/* <input type="text" id="searchBox" name="searchBox" size="1"> */}
          <span contentEditable="true" id="searchBox" className="searchBox" ></span>
          {/* </input> */}
          </div>
      </div>
      <div className="menu">
      <a href="menu"> -MENU-</a>
      </div>
    </div>
      <div id="SalarDeUyuni">
        Mer kommer her....
      </div>
      <div id="css"></div>
      <div id="webgl"></div>
    </div>
  );
}

export default App;
