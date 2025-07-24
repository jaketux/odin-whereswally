import { useState, useEffect } from "react";
import "./App.css";
import WheresWallyHeader from "./assets/header-img.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="header">
      <div className="left-nav">
        <div>Home</div>
        <div>Instructions</div>
      </div>
      <img src={WheresWallyHeader} className="header-img" />
      <div className="right-nav">
        <div>Scoreboard</div>
      </div>
    </div>
  );
}

export default App;
