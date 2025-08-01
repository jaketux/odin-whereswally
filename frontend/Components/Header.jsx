import WheresWallyHeader from "../src/assets/header-img.png";

export default function Header(props) {
  return (
    <div className="header">
      <ul className="header-nav-left">
        <li onClick={() => props.returnHome()}>Home</li>
        <li onClick={() => props.viewInstructions()}>Instructions</li>
      </ul>
      <img src={WheresWallyHeader} className="header-img" />
      <ul className="header-nav-right">
        <li onClick={() => props.viewScoreBoard()}>Scoreboard</li>
      </ul>
    </div>
  );
}
