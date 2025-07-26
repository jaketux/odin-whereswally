import { useState } from "react";

export default function Game(props) {
  const characters = props.mapInView.characters.map((character) => {
    return { ...character, isFound: false };
  });

  const [gameStart, setGameStart] = useState(false);
  const [gameTimer, setGameTimer] = useState(null);
  const [charactersFound, setCharactersFound] = useState(0);

  //instructions modal appears once game is selected showing instructions for the game.

  // once start game is selected, gamesession fetch post request is launched to create new game session on backend.

  // the gametimer state is incremented by 1 each second until the game is ended.

  //this timer is displayed on the screen next to the characters box.

  //if a character is found, increment charactersFound by 1

  //once charactersFound === characters.length, all characters have been found and game concludes

  //handle endiing of game session with fetch put request.

  //build logic for finding correct moves. handle whether timer is stopped while move is considered, how this is conveyed to user.

  function handleStartGame() {}

  console.log(characters);

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
        <div className="game-characters">
          {characters.map((character) => {
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
        />
      </div>
    </div>
  );
}
