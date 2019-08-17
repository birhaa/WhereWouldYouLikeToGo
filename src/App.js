import React from "react";
import './App.css';
import Scene from './3d/scene'

function App() {

  Scene();

  return (
    <div className="header">
      <div className="logo">Where do you want to go?</div>
      <div className="menu">
      <a href="menu"> -MENU-</a>
      </div>
    </div>
    /*<div className="page">
      <div className="header">Header</div>
      <div className="content">Content</div>
      </div>*/
  );
}

export default App;
