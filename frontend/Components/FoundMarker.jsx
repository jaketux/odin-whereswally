import Tick from "../src/assets/tick.png";

export default function FoundMarker(props) {
  const { top, left, name } = props;

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        border: "5px solid lightgreen",
        backgroundColor: "lightgreen",
        height: "17.5px",
        width: "80px",
        zIndex: "1000",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "10px",
        padding: "2px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 15px",
      }}
    >
      <img
        src={Tick}
        alt="Image of a green tick"
        style={{
          height: "25px",
        }}
      />
      <div
        className="found-text"
        style={{
          color: "black",
          width: "70px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {name}
      </div>
    </div>
  );
}
