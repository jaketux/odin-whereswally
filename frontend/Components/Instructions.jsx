import MapIcon from "../src/assets/map.png";
import Confirm from "../src/assets/confirm.png";
import Feedback from "../src/assets/feedback.png";
import Search from "../src/assets/search.png";
import Stopwatch from "../src/assets/stopwatch.png";
import Scoreboard from "../src/assets/scoreboard.png";
import Eye from "../src/assets/eye.png";
import Patience from "../src/assets/patience.png";
import Details from "../src/assets/details.png";

export default function Instructions(props) {
  function closeInstructionsView() {
    props.setInstructionsView(false);
    if (props.gameStart) {
      props.setIsRunning(true);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "145vh",
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
          height: "1050px",
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
        <div className="instructions-tagline">
          Your mission is to find each of these characters hidden in the busy
          scene:
        </div>
        <div className="instructions-characters">
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wally.png"
              alt="Wally image"
              className="instructions-char"
            />
            <div className="character-heading">Wally</div>
            <div className="character-description">
              Red and white striped shirt, bobble hat, round glasses.
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wenda.png"
              alt="Wenda image"
              className="instructions-char"
            />
            <div className="character-heading">Wenda</div>
            <div className="character-description">
              Red and white striped shirt, shoulder-length brunette hair.
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//woof.png"
              alt="Woof image"
              className="instructions-char"
            />
            <div className="character-heading">Woof</div>
            <div className="character-description">
              Wally's dog with distinctive tail and collar. Visible only by his
              tail.
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wizard.png"
              alt="Wizard image"
              className="instructions-char"
            />
            <div className="character-heading">Wizard</div>
            <div className="character-description">
              Red robes, blue pointed hat, long white beard and red, blue and
              white staff.
            </div>
          </div>
          <div className="instructions-character">
            <img
              src="https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//odlaw.png"
              alt="Odlaw image"
              className="instructions-char"
            />
            <div className="character-heading">Odlaw</div>
            <div className="character-description">
              Yellow and black striped shirt, mustache (Wally's rival).
            </div>
          </div>
        </div>
        <div className="select-characters-box">
          <div className="sub-heading select-characters">
            Selecting Characters
          </div>
          <div className="instructions-box">
            <div className="instructions-step">
              <img
                src={MapIcon}
                alt="Image of a map with a marker"
                className="instructions-icon"
              />
              <div className="instructions-subheading">Click on the Map</div>
              <div className="instructions-text">
                Carefully examine the scene and click anywhere you think a
                character might be hiding.
              </div>
            </div>
            <div className="instructions-step">
              <img
                src={Confirm}
                alt="Image of a finger with yes or no selections"
                className="instructions-icon"
              />
              <div className="instructions-subheading">
                Confirm Your Selection
              </div>
              <div className="instructions-text">
                After clicking on the map, click on the character name you
                believe you've found.
              </div>
            </div>
            <div className="instructions-step">
              <img
                src={Feedback}
                alt="Image of a thumbs up or thumbs down"
                className="instructions-icon"
              />
              <div className="instructions-subheading">Get Feedback</div>
              <div className="instructions-text">
                The game will tell you if you've found the correct character or
                need to keep looking.
              </div>
            </div>
          </div>
        </div>
        <div className="sub-heading winning-game">Winning the Game</div>
        <div className="instructions-box">
          <div className="instructions-step">
            <img
              src={Search}
              alt="Image of a magnifying glass on a map"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Find the Characters</div>
            <div className="instructions-text">
              Successfully locate the characters hidden in the current scene
              (not all 5 characters appear on every map).
            </div>
          </div>
          <div className="instructions-step">
            <img
              src={Stopwatch}
              alt="Image of a stopwatch"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Time Matters</div>
            <div className="instructions-text">
              Your score is based on how quickly you find everyone. The top 5
              scores are displayed on the scoreboard.
            </div>
          </div>
          <div className="instructions-step">
            <img
              src={Scoreboard}
              alt="Image of a scoreboard"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Enter the Scoreboard</div>
            <div className="instructions-text">
              Enter your name to see how your searching skills compare to other
              players and try to beat your own best time!
            </div>
          </div>
        </div>
        <div className="sub-heading tipsforsuccess">Tips for Success</div>
        <div className="instructions-box">
          <div className="instructions-step">
            <img
              src={Eye}
              alt="Image of an eye"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Look Carefully</div>
            <div className="instructions-text">
              Characters can be partially hidden behind objects or other people.
              Don't forget corners, backgrounds, and crowded areas
            </div>
          </div>
          <div className="instructions-step">
            <img
              src={Patience}
              alt="Image of a brain with a clock"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Take Your Time</div>
            <div className="instructions-text">
              Accuracy is important - wrong guesses might slow you down
            </div>
          </div>
          <div className="instructions-step">
            <img
              src={Details}
              alt="Image of a page with a magnifying glass"
              className="instructions-icon"
            />
            <div className="instructions-subheading">Remember the Details</div>
            <div className="instructions-text">
              Each character has unique features that make them identifiable.
            </div>
          </div>
        </div>
        <div className="instructions-final">
          <div>Good luck, and happy searching!</div>
          <button
            className="submit-btn"
            onClick={() => closeInstructionsView()}
          >
            {props.gameStart ? "Back to Game" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
