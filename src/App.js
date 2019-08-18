import React from "react";
import './App.css';
import Scene from './3d/scene'

function App() {

  Scene();

  return (
    <div>
    <div className="header">
      <div className="logo"><div>Where do you want to go?</div>
          <div className="search" ></div>
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
