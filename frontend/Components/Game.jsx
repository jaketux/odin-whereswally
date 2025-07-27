import { useState, useEffect } from "react";

export default function Game(props) {
  const [gameStart, setGameStart] = useState(false);
  const [gameTimer, setGameTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [characterSet, setCharacterSet] = useState(null);
  const [windowZoom, setWindowZoom] = useState(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [userGuessPosition, setUserGuessPosition] = useState({ x: 0, y: 0 });

  const [selectionIsVisible, setSelectionIsVisible] = useState(false);

  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  const [gameFinishsed, setGameFinished] = useState(false);

  //instructions modal appears once game is selected showing instructions for the game.

  // once start game is selected, gamesession fetch post request is launched to create new game session on backend.

  // the gametimer state is incremented by 1 each second until the game is ended.

  //this timer is displayed on the screen next to the characters box.

  //if a character is found, increment charactersFound by 1

  //once charactersFound === characters.length, all characters have been found and game concludes

  //handle ending of game session with fetch put request.

  if (!characterSet && !charactersLoaded) {
    const characters = props.mapInView.characters.map((character) => {
      return { ...character, isFound: false };
    });
    setCharacterSet(characters);
    setCharactersLoaded(true);
  }

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

  function handleStartGame() {
    fetch(
      `http://wheres-wally-node-backend-production.up.railway.app/game/${props.mapInView.id}`,
      {
        method: "POST",
      }
    )
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
        console.log({ ...data });
      })
      .catch((error) => {
        props.setCurrentError(true);
        props.setErrorInView(error);
      });
  }

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
  }

  function checkWinner(array) {
    // find out if all characters have been found
    const filteredArray = array.filter((character) => !character.isFound);

    console.log(filteredArray);
    if (filteredArray.length === 0) {
      // stop timer
      setIsRunning(false);
      //show winner modal including final time, form to enter name for score.

      // then once submitted show updated leaderboard, top 5 entries.
    }

    // if all characters found:

    //show winner modal, including final time, opportunity for person to enter in their name for score
  }

  function handleSubmit(character) {
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

    console.log(character.name);
    console.log(coordinates);
    let leftSideBox = userGuessPosition.x - 25;
    let rightSideBox = userGuessPosition.x + 25;
    let topSideBox = userGuessPosition.y - 25;
    let bottomSideBox = userGuessPosition.y + 25;

    console.log(leftSideBox);

    console.log(rightSideBox);

    console.log(topSideBox);

    console.log(bottomSideBox);

    if (
      leftSideBox < coordinates[1] &&
      rightSideBox > coordinates[0] &&
      topSideBox < coordinates[3] &&
      bottomSideBox > coordinates[2]
    ) {
      console.log("Character found!");

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

  return (
    <div className="game-box">
      <div>Device pixel ratio is currently {windowZoom}</div>
      <div className="game-heading">{props.mapInView.name}</div>
      <div className="game-tagline">{props.mapInView.mapTagline}</div>
      {!gameStart && (
        <button className="start-btn" onClick={() => handleStartGame()}>
          Start Game
        </button>
      )}
      {gameStart && (
        <div className="game-characters">
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
      )}

      <div className="game-main">
        <img
          className="game-map"
          src={props.mapInView.mapImage}
          alt="Image of the map"
          onClick={handleClick}
        />
      </div>
      {selectionIsVisible && (
        <>
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
              height: "20px;",
            }}
          >
            Who did you find?
          </div>
          {characterSet.map((character, index) => {
            if (!character.isFound) {
              return (
                <div
                  className="character-selection"
                  onMouseEnter={() => setHoveredCharacter(character.id)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                  onClick={() => handleSubmit(character)}
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
        </>
      )}
    </div>
  );
}
