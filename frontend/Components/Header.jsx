import WheresWallyHeader from "../src/assets/header-img.png";

export default function Header() {
  return (
    <div className="header">
      <ul className="header-nav-left">
        <li>Home</li>
        <li>Instructions</li>
      </ul>
      <img src={WheresWallyHeader} className="header-img" />
      <ul className="header-nav-right">
        <li>Scoreboard</li>
      </ul>
    </div>
  );
}
