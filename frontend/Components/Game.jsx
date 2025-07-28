import { useState, useEffect } from "react";
import PauseBtn from "../src/assets/pause-button.png";
import Stopwatch from "../src/assets/stopwatch.png";
import Resetbutton from "../src/assets/reset.png";
import GoldMedal from "../src/assets/goldmedal.png";
import SilverMedal from "../src/assets/silvermedal.png";
import BronzeMedal from "../src/assets/bronzemedal.png";

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

  //Handles loading of characters.
  if (!characterSet && !charactersLoaded) {
    const characters = props.mapInView.characters.map((character) => {
      return { ...character, isFound: false };
    });
    setCharacterSet(characters);
    setCharactersLoaded(true);
  }

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

  //Handles formatting of raw seconds to minutes and seconds
  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}m:${formattedSeconds}s`;
  }

  //Handles formatting of game clock whilst clock is running.
  useEffect(() => {
    if (isRunning) {
      const time = formatTime(gameTimer);

      setFormattedTimer(time);
    }
  }, [gameTimer]);

  //Handles start of the game
  function handleStartGame() {
    const mapId = props.mapInView.id;

    fetch("https://wheres-wally-node-backend-production.up.railway.app/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mapId: mapId,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          props.setCurrentError(true);
          props.setErrorInView(data.message);
          console.log("Error received when fetching data: " + data.message);
          return;
        }
        setIsRunning(true);
        setGameStart(true);
        setCurrentGameSessionId(data.id);
        console.log({ ...data });
      })
      .catch((error) => {
        props.setCurrentError(true);
        props.setErrorInView(error);
      });
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

  // submits score and then obtains updated map data including game sessions.
  function handleScoreSubmission(formData) {
    const username = formData.get("username");

    fetch("https://wheres-wally-node-backend-production.up.railway.app/game", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameSessionId: currentGameSessionId,
        endTime: gameTimer,
        username: username,
        mapId: props.mapInView.id,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          props.setCurrentError(true);
          props.setErrorInView(data.message);
          console.log(
            "Error received when updating existing score: " + data.message
          );
          return;
        }
        props.setMapStorage(data);
        // view scoreboard
        props.viewScoreBoard();
        console.log({ ...data });
      })
      .catch((error) => {
        props.setCurrentError(true);
        props.setErrorInView(error);
      });
  }

  //Checks whether user has found all characters and handles game ending
  function checkWinner(array) {
    // find out if all characters have been found
    const filteredArray = array.filter((character) => !character.isFound);

    console.log(filteredArray);
    if (filteredArray.length === 0) {
      // stop timer
      setIsRunning(false);
      //show winner modal including final time, form to enter name for score.
      setShowPostGame(true);
      // then once submitted show updated leaderboard, top 5 entries.
    }
  }

  //Checks user guess against stored character coordinates.
  function handleGuess(character) {
    let coordinates;

    if (character.name === "Wally") {
      coordinates = props.mapInView.coordinatesWally;
    } else if (character.name === "Woof") {
      coordinates = props.mapInView.coordinatesWoof;
    } else if (character.name === "Wizard") {
      coordinates = props.mapInView.coordinatesWizard;
    } else if (character.name === "Odlaw") {
      coordinates = props.mapInView.coordinatesOdlaw;
    } else if (character.name === "Wenda") {
      coordinates = props.mapInView.coordinatesWenda;
      //[left, right, top, bottom]
    }

    let leftSideBox = userGuessPosition.x - 25;
    let rightSideBox = userGuessPosition.x + 25;
    let topSideBox = userGuessPosition.y - 25;
    let bottomSideBox = userGuessPosition.y + 25;

    if (
      leftSideBox < coordinates[1] &&
      rightSideBox > coordinates[0] &&
      topSideBox < coordinates[3] &&
      bottomSideBox > coordinates[2]
    ) {
      const updatedCharacters = characterSet.map((char) =>
        char.id === character.id ? { ...char, isFound: true } : char
      );
      setCharacterSet(updatedCharacters);
      console.log(updatedCharacters);
      setCursorPosition(null);
      setUserGuessPosition(null);
      setSelectionIsVisible(false);
      checkWinner(updatedCharacters);
    } else {
      console.log("No hit!");
    }
  }

  //Pauses game
  function toggleGamePause() {
    setIsRunning((prevRunning) => !prevRunning);
    setCursorPosition(null);
    setUserGuessPosition(null);
    setSelectionIsVisible(false);
  }

  //Resets game
  function handleResetGame() {
    setIsRunning(false);
    setCursorPosition(null);
    setGameTimer(null);
    setUserGuessPosition(null);
    setSelectionIsVisible(false);
    setCurrentGameSessionId(null);
    setGameStart(false);
    setFormattedTimer("0:00");
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
              <div>
                No scores have been recorded for {props.mapInView.name}.
              </div>
              <div>
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
              <div className="scoreboard-heading">Scoreboard</div>
              <div className="score-container">
                <div className="score">
                  <div className="trophy"></div>
                  <div className="user"></div>
                  <div className="time"></div>
                </div>
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
                      </div>
                      <div className="user">{score.username}</div>
                      <div className="time">{formatTime(score.endTime)}</div>
                    </div>
                  );
                })}
              </div>
              <div>
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
        </div>
      )}
    </div>
  );
}
