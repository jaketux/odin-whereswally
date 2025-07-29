const gameController = {
  async startGameSession(mapData) {
    const res = await fetch(
      "https://wheres-wally-node-backend-production.up.railway.app/game",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mapId: mapData.id,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return {
      characters: mapData.characters.map((character) => ({
        ...character,
        isFound: false,
      })),
      gameSessionId: data.id,
    };
  },

  checkWinner(characters) {
    const filteredArray = characters.filter((character) => !character.isFound);
    if (filteredArray.length === 0) {
      return true;
    } else {
      return false;
    }
  },

  handleGuess(
    character,
    characters,
    map,
    userGuessX,
    userGuessY,
    currentGameSessionId
  ) {
    let coordinates;

    if (character.name === "Wally") {
      coordinates = map.coordinatesWally;
    } else if (character.name === "Woof") {
      coordinates = map.coordinatesWoof;
    } else if (character.name === "Wizard") {
      coordinates = map.coordinatesWizard;
    } else if (character.name === "Odlaw") {
      coordinates = map.coordinatesOdlaw;
    } else if (character.name === "Wenda") {
      coordinates = map.coordinatesWenda;
    }

    let leftSideBox = userGuessX - 25;
    let rightSideBox = userGuessX + 25;
    let topSideBox = userGuessY - 25;
    let bottomSideBox = userGuessY + 25;
    let updatedCharacters;

    if (
      leftSideBox < coordinates[1] &&
      rightSideBox > coordinates[0] &&
      topSideBox < coordinates[3] &&
      bottomSideBox > coordinates[2]
    ) {
      updatedCharacters = characters.map((char) =>
        char.id === character.id ? { ...char, isFound: true } : char
      );
    } else {
      console.log("No hit!");
    }

    return {
      updatedCharacters: updatedCharacters,
      gameSessionId: currentGameSessionId,
      gameResult: this.checkWinner(updatedCharacters),
    };
  },

  async handleSubmitScore(gameSessionId, endTime, username, mapId) {
    console.log("Game session ID: " + gameSessionId);
    console.log("End Time: " + endTime);
    console.log("User name: " + username);
    console.log("Map ID: " + mapId);

    const res = await fetch(
      "https://wheres-wally-node-backend-production.up.railway.app/game",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameSessionId: gameSessionId,
          endTime: endTime,
          username: username,
          mapId: parseInt(mapId),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return {
      mapData: data,
    };
  },
};

export default gameController;
