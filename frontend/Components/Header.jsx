import WheresWallyHeader from "../src/assets/header-img.png";

export default function Header(props) {
  return (
    <div className="header">
      <ul className="header-nav-left">
        <li onClick={() => props.returnHome()}>Home</li>
        <li>Instructions</li>
      </ul>
      <img src={WheresWallyHeader} className="header-img" />
      <ul className="header-nav-right">
        <li>Scoreboard</li>
      </ul>
    </div>
  );
}
