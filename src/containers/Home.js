import React from "react";
import "./Home.css";

//renders homepage - when user is currently not signed in

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    </div>
  );
}