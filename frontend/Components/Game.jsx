import { useState, useEffect } from "react";
import gameController from "../controllers/gameController.js";
import formatTime from "../controllers/formatTime.js";
import FoundMarker from "./FoundMarker.jsx";
import PauseBtn from "../src/assets/pause-button.png";
import Stopwatch from "../src/assets/stopwatch.png";
import Resetbutton from "../src/assets/reset.png";
import GoldMedal from "../src/assets/goldmedal.png";
import SilverMedal from "../src/assets/silvermedal.png";
import BronzeMedal from "../src/assets/bronzemedal.png";
import Four from "../src/assets/four.png";
import Five from "../src/assets/five.png";

export default function Game(props) {
  const {
    isRunning,
    setIsRunning,
    mapInView,
    setCurrentError,
    setErrorInView,
    setMapStorage,
    viewScoreBoard,
    gameStart,
    setGameStart,
    foundCharacters,
    setFoundCharacters,
    setShowFoundCharacters,
    showFoundCharacters,
  } = props;

  const [gameTimer, setGameTimer] = useState(null);
  const [formattedTimer, setFormattedTimer] = useState("0m:00s");

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

  const [turnResult, setTurnResult] = useState({
    turnChar: null,
    turnRes: null,
  });

  //TODOs:
  //Instructions modal to appear once game is selected prior to game starting, showing instructions for the game. Can be toggled on or off using instructions link in header. Should pause game if running.
  // Feedback for player guesses if correct or incorrect.

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

  // Scrolls to the top left of the viewport on map select
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const gameSession = await gameController.startGameSession(mapInView);
      setCharacterSet(gameSession.characters);
      setCharactersLoaded(true);
      setIsRunning(true);
      setGameStart(true);
      setCurrentGameSessionId(gameSession.gameSessionId);
      setFoundCharacters([]);
      setShowFoundCharacters(false);
    } catch (error) {
      setCurrentError(true);
      setErrorInView(error);
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
    const mapId = mapInView.id;

    try {
      const submitScore = await gameController.handleSubmitScore(
        gameSessionId,
        formattedEndtime,
        username,
        mapId
      );
      setMapStorage(submitScore.mapData);
      handleResetGame();
      viewScoreBoard();
    } catch (error) {
      setCurrentError(true);
      setErrorInView(error);
    }
  }

  //Checks user guess against stored character coordinates.
  async function handleGuess(character) {
    let userGuessX = userGuessPosition.x;
    let userGuessY = userGuessPosition.y;

    const guessResult = await gameController.handleGuess(
      character,
      characterSet,
      mapInView,
      userGuessX,
      userGuessY,
      currentGameSessionId
    );
    setTurnResult(null);

    if (guessResult.gameResult) {
      setCharacterSet(guessResult.updatedCharacters);
      setIsRunning(false);
      setShowPostGame(true);
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
    } else if (!guessResult.gameResult) {
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
      setCharacterSet(guessResult.updatedCharacters);
      setTurnResult({
        turnChar: guessResult.turnCharacter,
        turnRes: guessResult.turnResult,
      });
      if (guessResult.turnResult === "Found") {
        const foundCharacter = {
          name: guessResult.turnCharacter,
          coordinatesLeft: guessResult.coordinatesLeft,
          coordinatesTop: guessResult.coordinatesTop,
        };

        setShowFoundCharacters(true);

        setFoundCharacters((prevFoundCharacters) => [
          ...prevFoundCharacters,
          foundCharacter,
        ]);

        return;
      }
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
    setTurnResult(null);
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
      <div className="game-heading">{mapInView.name}</div>
      <div className="game-tagline">{mapInView.mapTagline}</div>
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
          src={mapInView.mapImage}
          alt="Image of the map"
          onClick={handleClick}
        />
        {showFoundCharacters &&
          foundCharacters.length > 0 &&
          foundCharacters.map((character, index) => {
            return (
              <FoundMarker
                key={index}
                top={character.coordinatesTop}
                left={character.coordinatesLeft}
                name={character.name}
              />
            );
          })}
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
              zIndex: "500",
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
            width: "575px",
            height: "325px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            zIndex: "1000",
            boxShadow: "rgba(0, 0, 0, 0.85) 0px 5px 15px",
          }}
          className="post-game"
        >
          <div className="postgame-header">
            Well done! You found all of the characters in {formattedTimer}.
          </div>
          {mapInView.gameSessions.length === 0 && (
            <div>
              <div className="postgame-subheading-noscores">
                No scores have been recorded for{" "}
                <span style={{ fontWeight: "600" }}>{mapInView.name}</span>.
              </div>
              <div className="postgame-subheading">
                Enter your name to record your score. Leave blank to save
                anonymously.
              </div>
              <form action={handleScoreSubmission} className="score-submit">
                <div className="username-entry">
                  <label htmlFor="username">Name:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    maxLength="15"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          )}
          {mapInView.gameSessions.length > 0 && (
            <div className="scoreboard">
              <div className="scoreboard-heading">Top Scores</div>
              <div className="score-container">
                {mapInView.gameSessions.map((score, index) => {
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
      {turnResult && turnResult.turnRes === "Found" && (
        <div
          style={{
            position: "absolute",
            top: "300px",
            fontSize: "18px",
            fontWeight: "500",
            width: "350px",
            height: "75px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            zIndex: "500",
            boxShadow: "rgba(0, 0, 0, 0.85) 0px 5px 15px",
          }}
          className="turn-result"
        >
          <div className="turn-message">
            Well done, you found {turnResult.turnChar}! Keep searching for the
            remaining characters.
          </div>
          <button onClick={() => setTurnResult(null)} className="submit-btn">
            Close
          </button>
        </div>
      )}
      {turnResult && turnResult.turnRes === "Not Found" && (
        <div
          style={{
            position: "absolute",
            top: "300px",
            fontSize: "18px",
            fontWeight: "500",
            width: "350px",
            height: "75px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            zIndex: "500",
            boxShadow: "rgba(0, 0, 0, 0.85) 0px 5px 15px",
          }}
          className="turn-result"
        >
          {turnResult.turnChar === "Wally" && (
            <div className="turn-message">
              {turnResult.turnChar} has found an excellent hiding spot - try
              again!
            </div>
          )}
          {turnResult.turnChar === "Odlaw" && (
            <div className="turn-message">
              {turnResult.turnChar} the thief can't be found that easily, but
              don't give up!
            </div>
          )}
          {turnResult.turnChar === "Wenda" && (
            <div className="turn-message">
              {turnResult.turnChar} is a hide-and-seek champion. Keep up the
              search!
            </div>
          )}
          {turnResult.turnChar === "Woof" && (
            <div className="turn-message">
              {turnResult.turnChar} is well hidden. Keep up the hunt and look
              for his tail!
            </div>
          )}
          {turnResult.turnChar === "Wizard" && (
            <div className="turn-message">
              {turnResult.turnChar} has cast quite the invisibility spell - stay
              determined!
            </div>
          )}
          <button className="submit-btn" onClick={() => setTurnResult(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
