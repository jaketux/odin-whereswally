export default function Instructions(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "125vh",
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
          marginTop: "30px",
          fontSize: "18px",
          fontWeight: "700",
          width: "1000px",
          height: "1100px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          zIndex: "1000",
          boxShadow: "rgba(0, 0, 0, 0.85) 0px 5px 15px",
        }}
      >
        <div className="instructions-heading">
          Where's Wally - Game Instructions
        </div>
        <div className="sub-heading">
          Your mission is to find each of the characters hidden in the busy
          scene:{" "}
        </div>
        <div className="instructions-characters">
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wally.png"
              alt="Wally image"
              className="instructions-char"
            />
            <div className="character-description">
              Wally{" "}
              <span style={{ fontWeight: 400 }}>
                - Red and white striped shirt, bobble hat, round glasses.{" "}
              </span>
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wenda.png"
              alt="Wenda image"
              className="instructions-char"
            />
            <div className="character-description">
              Wenda{" "}
              <span style={{ fontWeight: 400 }}>
                - Red and white striped shirt, shoulder-length brunette hair.
              </span>
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//woof.png"
              alt="Woof image"
              className="instructions-char"
            />
            <div className="character-description">
              Woof{" "}
              <span style={{ fontWeight: 400 }}>
                - Wally's dog with distinctive tail and collar. Visible only by
                his tail.
              </span>
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wizard.png"
              alt="Wizard image"
              className="instructions-char"
            />
            <div className="character-description">
              Wizard{" "}
              <span style={{ fontWeight: 400 }}>
                - Red robes, blue pointed hat, long white beard and red, blue
                and white staff.
              </span>
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//odlaw.png"
              alt="Odlaw image"
              className="instructions-char"
            />
            <div className="character-description">
              Odlaw{" "}
              <span style={{ fontWeight: 400 }}>
                - Yellow and black striped shirt, mustache (Wally's rival)
              </span>
              .
            </div>
          </div>
        </div>
        <div className="sub-heading select-characters">
          How to Select Characters
        </div>
        <div className="instructions-text">
          <div className="select-characters-step">
            Click on the Map:{" "}
            <span style={{ fontWeight: 400 }}>
              Carefully examine the scene and click anywhere you think a
              character might be hiding.
            </span>
          </div>
          <div className="select-characters-step">
            Confirm Your Selection:{" "}
            <span style={{ fontWeight: 400 }}>
              After clicking on the map, click on the character name button you
              believe you've found.
            </span>
          </div>
          <div className="select-characters-step">
            Get Feedback:{" "}
            <span style={{ fontWeight: 400 }}>
              The game will tell you if you found the correct character or need
              to keep looking.
            </span>
          </div>
        </div>
        <div className="sub-heading winning-game">Winning the Game</div>
        <div className="instructions-text">
          {" "}
          <div className="winning-game-step">
            Find Characters:{" "}
            <span style={{ fontWeight: 400 }}>
              Successfully locate the characters hidden in the current scene
              (not all 5 characters appear on every map)
            </span>
          </div>
          <div className="winning-game-step">
            Time Matters:
            <span style={{ fontWeight: 400 }}>
              Your score is based on how quickly you find everyone.
            </span>
          </div>
          <div className="winning-game-step">
            Enter the Scoreboard:
            <span style={{ fontWeight: 400 }}>
              Once you've found all characters on the map, enter your name to
              compete for a top 5 position
            </span>
          </div>
        </div>
        <div className="sub-heading scoreboard-step">Scoreboard</div>
        <div className="instructions-text" style={{ fontWeight: 400 }}>
          View the Top 5 fastest completion times for each map on the Scoreboard
        </div>
        <div className="instructions-text" style={{ fontWeight: 400 }}>
          See how your searching skills compare to other players
        </div>
        <div className="instructions-text" style={{ fontWeight: 400 }}>
          Try to beat your own best time!
        </div>
        <div className="sub-heading tipsforsuccess">Tips for Success</div>
        <div className="tipsforsuccess-step">
          Look Carefully:
          <span style={{ fontWeight: 400 }}>
            Characters can be partially hidden behind objects or other people
          </span>
        </div>
        <div className="tipsforsuccess-step">
          Check Everywhere:
          <span style={{ fontWeight: 400 }}>
            Don't forget corners, backgrounds, and crowded areas
          </span>
        </div>
        <div className="tipsforsuccess-step">
          Take Your Time:
          <span style={{ fontWeight: 400 }}>
            Accuracy is important - wrong guesses might slow you down
          </span>
        </div>
        <div className="tipsforsuccess-step">
          Remember the Details:
          <span style={{ fontWeight: 400 }}>
            Each character has unique features that make them identifiable.
          </span>
        </div>
        Good luck, and happy searching!
      </div>
    </div>
  );
}
