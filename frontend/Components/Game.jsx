import { useState, useEffect } from "react";
import gameController from "../controllers/gameController.js";
import formatTime from "../controllers/formatTime.js";
import PauseBtn from "../src/assets/pause-button.png";
import Stopwatch from "../src/assets/stopwatch.png";
import Resetbutton from "../src/assets/reset.png";
import GoldMedal from "../src/assets/goldmedal.png";
import SilverMedal from "../src/assets/silvermedal.png";
import BronzeMedal from "../src/assets/bronzemedal.png";
import Four from "../src/assets/four.png";
import Five from "../src/assets/five.png";

export default function Game(props) {
  const [gameStart, setGameStart] = useState(false);
  const [gameTimer, setGameTimer] = useState(null);
  const [formattedTimer, setFormattedTimer] = useState("0m:00s");

  const [isRunning, setIsRunning] = useState(false);

  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [characterSet, setCharacterSet] = useState(null);
  const [windowZoom, setWindowZoom] = useState(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [userGuessPosition, setUserGuessPosition] = useState({ x: 0, y: 0 });

  const [selectionIsVisible, setSelectionIsVisible] = useState(false);

  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  const [currentGameSessionId, setCurrentGameSessionId] = useState(null);

  //toggles between showing the game screen and the postgame
  const [showPostGame, setShowPostGame] = useState(false);

  //TODOs:

  //Check fetch 'put' of game session is working correctly and populating scoreboard.
  //Instructions modal to appear once game is selected showing instructions for the game and can be toggled on or off using instructions link in header. Should pause game if running.
  //Create scoreboard component to be displayed on conclusion of game.

  //Handles updating of game clock whilst clock is running.
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setGameTimer((prevGameTimer) => prevGameTimer + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  //Handles formatting of game clock whilst clock is running.
  useEffect(() => {
    if (isRunning) {
      const time = formatTime(gameTimer);

      setFormattedTimer(time);
    }
  }, [gameTimer]);

  //Handles start of the game
  async function handleStartGame() {
    try {
      const gameSession = await gameController.startGameSession(
        props.mapInView
      );
      setCharacterSet(gameSession.characters);
      setCharactersLoaded(true);
      setIsRunning(true);
      setGameStart(true);
      setCurrentGameSessionId(gameSession.gameSessionId);
    } catch (error) {
      props.setCurrentError(true);
      props.setErrorInView(error);
    }
  }

  //Handles zooming of window and removes placed markers if user zooms.
  useEffect(() => {
    if (!windowZoom) {
      setWindowZoom(Math.round(window.devicePixelRatio * 100) / 100);
    }

    const handleResize = () => {
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowZoom]);

  //Handles user placing guess marker
  function handleClick(event) {
    const divLocation = event.currentTarget.getBoundingClientRect();
    const xInsideDiv = Math.round(event.clientX - divLocation.left);
    const yInsideDiv = Math.round(event.clientY - divLocation.top);

    setUserGuessPosition({ x: xInsideDiv, y: yInsideDiv });

    setCursorPosition({ x: event.pageX, y: event.pageY });

    setSelectionIsVisible(true);

    console.log("The div's location is: " + divLocation);

    console.log("x inside Div is: " + xInsideDiv);

    console.log("y inside Div is: " + yInsideDiv);

    event.stopPropagation();
  }

  // submits score and then obtains updated map data including game sessions and stores in mapstorage.
  async function handleScoreSubmission(formData) {
    const gameSessionId = currentGameSessionId;
    const endTime = gameTimer;
    const formattedEndtime = formatTime(endTime);
    let username = formData.get("username");
    if (username === undefined || username === "") {
      username = "Anonymous";
    }
    const mapId = props.mapInView.id;

    try {
      const submitScore = await gameController.handleSubmitScore(
        gameSessionId,
        formattedEndtime,
        username,
        mapId
      );
      props.setMapStorage(submitScore.mapData);

      //do other stuff once score submitted

      handleResetGame();

      //show scoreboard///
      props.viewScoreBoard();
    } catch (error) {
      props.setCurrentError(true);
      props.setErrorInView(error);
    }
  }

  //Checks user guess against stored character coordinates.
  async function handleGuess(character) {
    let userGuessX = userGuessPosition.x;
    let userGuessY = userGuessPosition.y;

    const guessResult = await gameController.handleGuess(
      character,
      characterSet,
      props.mapInView,
      userGuessX,
      userGuessY,
      currentGameSessionId
    );

    if (guessResult.gameResult) {
      setCharacterSet(guessResult.updatedCharacters);
      setIsRunning(false);
      setShowPostGame(true);
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
    } else {
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
      setCharacterSet(guessResult.updatedCharacters);
    }
  }

  //Pauses game timer
  function toggleGamePause() {
    setIsRunning((prevRunning) => !prevRunning);
    setCursorPosition(null);
    setUserGuessPosition(null);
    setSelectionIsVisible(false);
  }

  //Resets game timer
  function handleResetGame() {
    setIsRunning(false);
    setCursorPosition(null);
    setGameTimer(null);
    setUserGuessPosition(null);
    setSelectionIsVisible(false);
    setCurrentGameSessionId(null);
    setGameStart(false);
    setFormattedTimer("0:00");
    setShowPostGame(false);
  }

  //Removes selection marker if user clicks outside the map
  useEffect(() => {
    function removeSelection(event) {
      if (
        event.target.closest(".character-selection") ||
        event.target.closest(".selection-box")
      ) {
        return;
      }
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
    }

    if (selectionIsVisible) {
      document.body.addEventListener("mousedown", removeSelection);
    }

    return () => {
      document.body.removeEventListener("mousedown", removeSelection);
    };
  }, [selectionIsVisible]);

  return (
    <div className="game-box">
      <div className="game-heading">{props.mapInView.name}</div>
      <div className="game-tagline">{props.mapInView.mapTagline}</div>
      {!gameStart && (
        <button className="start-btn" onClick={() => handleStartGame()}>
          Start Game
        </button>
      )}
      {gameStart && (
        <div className="game-control">
          <div className="game-characters-box">
            {charactersLoaded &&
              characterSet.map((character) => {
                return (
                  <div className="game-character" key={character.id}>
                    <div className="character-icon">
                      <img
                        className={
                          character.isFound
                            ? "character-img found"
                            : "character-img notfound"
                        }
                        src={character.characterImage}
                        alt="Image of Character"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="game-clock">
            <img src={Stopwatch} alt="Stopwatch" className="small-btn-img" />
            <div className="game-timer-time">{formattedTimer}</div>
          </div>
          <div className="game-pause">
            <img
              src={PauseBtn}
              alt="Pause Button"
              className="small-btn-img"
              onClick={() => toggleGamePause()}
            />
          </div>
          <div className="game-endgame">
            <img
              src={Resetbutton}
              alt="Reset button"
              className="small-btn-img"
              onClick={() => handleResetGame()}
            />
          </div>
        </div>
      )}

      <div className="game-main">
        <img
          className={isRunning ? "game-map" : "game-map hidden"}
          src={props.mapInView.mapImage}
          alt="Image of the map"
          onClick={handleClick}
        />
      </div>

      {selectionIsVisible && isRunning && (
        <div onClick={(event) => event.stopPropagation()}>
          <div
            style={{
              position: "absolute",
              left: cursorPosition.x - 25,
              top: cursorPosition.y - 25,
              border: "5px solid white",
              height: "50px",
              width: "50px",
              zIndex: "1000",
              pointerEvents: "none",
            }}
          ></div>
          <div
            className="selection-box"
            style={{
              position: "absolute",
              left: cursorPosition.x - 25,
              top: cursorPosition.y + 50,
              fontSize: "18px",
              fontWeight: "700",
              width: "150px",
              backgroundColor: "white",
              padding: "5px",
              height: "20px",
            }}
          >
            Who did you find?
          </div>
          {characterSet.map((character, index) => {
            if (!character.isFound) {
              return (
                <div
                  key={index}
                  className="character-selection"
                  onMouseEnter={() => setHoveredCharacter(character.id)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                  onClick={() => handleGuess(character)}
                  style={{
                    position: "absolute",
                    left: cursorPosition.x - 25,
                    top: cursorPosition.y + (40 * index) / 1.33,
                    fontSize: "18px",
                    fontWeight: "700",
                    width: "150px",
                    backgroundColor:
                      hoveredCharacter === character.id ? "lightgray" : "white",
                    marginTop: "80px",
                    padding: "5px",
                    height: "20px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  {character.name}
                </div>
              );
            }
          })}
        </div>
      )}

      {showPostGame && (
        <div
          style={{
            position: "absolute",
            fontSize: "18px",
            fontWeight: "700",
            width: "650px",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            zIndex: "1000",
          }}
        >
          <div className="postgame-header">
            Well done! You found all of the characters in {formattedTimer}.
          </div>
          {props.mapInView.gameSessions.length === 0 && (
            <div>
              <div className="postgame-subheading-noscores">
                No scores have been recorded for {props.mapInView.name}.
              </div>
              <div className="postgame-subheading">
                Enter your name to record your score. Leave blank to save
                anonymously.
              </div>
              <form action={handleScoreSubmission} className="score-submit">
                <div className="username-entry">
                  <label htmlFor="username">Name:</label>
                  <input type="text" name="username" id="username" />
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          )}
          {props.mapInView.gameSessions.length > 0 && (
            <div className="scoreboard">
              <div className="scoreboard-heading">Top Scores</div>
              <div className="score-container">
                {props.mapInView.gameSessions.map((score, index) => {
                  return (
                    <div className="score" key={index}>
                      <div className="trophy">
                        {index === 0 && (
                          <img
                            src={GoldMedal}
                            alt="Image of a gold medal"
                            className="small-btn-img"
                          />
                        )}
                        {index === 1 && (
                          <img
                            src={SilverMedal}
                            alt="Image of a silver medal"
                            className="small-btn-img"
                          />
                        )}
                        {index === 2 && (
                          <img
                            src={BronzeMedal}
                            alt="Image of a silver medal"
                            className="small-btn-img"
                          />
                        )}
                        {index === 3 && (
                          <img
                            src={Four}
                            alt="Image of a number four"
                            className="small-btn-img"
                          />
                        )}
                        {index === 4 && (
                          <img
                            src={Five}
                            alt="Image of a number five"
                            className="small-btn-img"
                          />
                        )}
                      </div>
                      <div className="user">{score.username}</div>
                      <div className="time">{score.endTime}</div>
                    </div>
                  );
                })}
              </div>
              <div className="postgame-subheading">
                Enter your name to record your score. Leave blank to save as
                "Anonymous".
              </div>
              <form action={handleScoreSubmission} className="score-submit">
                <div className="username-entry">
                  <label htmlFor="username">Name:</label>
                  <input type="text" name="username" id="username" />
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
