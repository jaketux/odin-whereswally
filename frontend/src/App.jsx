import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Components/Header";
import MapSelect from "../Components/MapSelect";
import Game from "../Components/Game";
import Scoreboard from "../Components/Scoreboard";
import Instructions from "../Components/Instructions";
import Loading from "../Components/Loading";
import Errors from "../Components/Errors";

function App() {
  const [mapStorage, setMapStorage] = useState([]);

  const [currentError, setCurrentError] = useState(false);

  const [errorInView, setErrorInView] = useState(null);

  const [pageView, setPageView] = useState("mapSelection");

  const [mapInView, setMapInView] = useState(null);

  const [instructionsView, setInstructionsView] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const [gameStart, setGameStart] = useState(false);

  const [foundCharacters, setFoundCharacters] = useState([]);

  const [showFoundCharacters, setShowFoundCharacters] = useState(false);

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    fetch("https://wheres-wally-node-backend-production.up.railway.app/map", {
      method: "GET",
      headers: {},
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setCurrentError(true);
          setErrorInView(data.message);
          console.log("Error received when fetching data: " + data.message);
          return;
        }
        setMapStorage(data);
        console.log({ ...data });
      })
      .catch((error) => {
        setCurrentError(true);
        setErrorInView(error);
      })
      .finally(() => {
        setTimeout(() => setShowLoading(false), 1500);
      });
  }, []);

  function returnHome() {
    setPageView("mapSelection");
    setMapInView(null);
    setInstructionsView(false);
    setIsRunning(false);
    setGameStart(false);
    setFoundCharacters([]);
    setShowFoundCharacters(false);
  }

  function viewScoreBoard() {
    setPageView("scoreBoardSelected");
    setMapInView(null);
    setFoundCharacters([]);
    setShowFoundCharacters(false);
    setInstructionsView(false);
  }

  function viewInstructions() {
    setInstructionsView(true);
    setIsRunning(false);
    setFoundCharacters([]);
    setShowFoundCharacters(false);
  }

  return (
    <>
      <Header
        returnHome={returnHome}
        viewScoreBoard={viewScoreBoard}
        viewInstructions={viewInstructions}
      />
      {currentError && <Errors errorInView={errorInView} />}
      {pageView === "mapSelection" && (
        <MapSelect
          mapStorage={mapStorage}
          setMapInView={setMapInView}
          setPageView={setPageView}
          setShowLoading={setShowLoading}
        />
      )}
      {pageView === "gameSelected" && (
        <Game
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          mapInView={mapInView}
          setCurrentError={setCurrentError}
          setErrorInView={setErrorInView}
          setMapStorage={setMapStorage}
          viewScoreBoard={viewScoreBoard}
          gameStart={gameStart}
          setGameStart={setGameStart}
          foundCharacters={foundCharacters}
          setFoundCharacters={setFoundCharacters}
          showFoundCharacters={showFoundCharacters}
          setShowFoundCharacters={setShowFoundCharacters}
        />
      )}
      {pageView === "scoreBoardSelected" && (
        <Scoreboard mapStorage={mapStorage} />
      )}
      {instructionsView && (
        <Instructions
          setInstructionsView={setInstructionsView}
          gameStart={gameStart}
          setIsRunning={setIsRunning}
        />
      )}
      {showLoading && <Loading />}
    </>
  );
}

export default App;
