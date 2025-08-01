import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";

// Default values shown

export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        height: "135vh",
        width: "99vw",
        fontSize: "18px",
        fontWeight: "700",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        zIndex: "1000",
        backdropFilter: "blur(5px)",
      }}
      className="instructions-background"
    >
      <div
        className="instructions-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "350px",
          fontSize: "18px",
          fontWeight: "700",
          padding: "20px",
          zIndex: "1000",
        }}
      >
        <Spiral size="110" speed="0.9" color="lightblue" />
      </div>
    </div>
  );
}
