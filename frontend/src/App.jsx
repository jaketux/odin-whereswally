import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Components/Header";
import MapSelect from "../Components/MapSelect";
import Game from "../Components/Game";

function App() {
  const [count, setCount] = useState(0);

  const [refreshCounter, setRefreshCounter] = useState(0);

  const [mapStorage, setMapStorage] = useState([]);

  const [currentError, setCurrentError] = useState(false);

  const [errorInView, setErrorInView] = useState(null);

  const [pageView, setPageView] = useState("mapSelection");

  const [mapInView, setMapInView] = useState(null);

  useEffect(() => {
    fetch("http://wheres-wally-node-backend-production.up.railway.app/map", {
      method: "GET",
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
      });
  }, []);

  function returnHome() {
    setPageView("mapSelection");
    // do something here about ending the current game session / stoppping timers, all that jazz
    return;
  }

  return (
    <>
      <Header returnHome={returnHome} />
      {pageView === "mapSelection" && (
        <MapSelect
          mapStorage={mapStorage}
          setMapInView={setMapInView}
          setPageView={setPageView}
        />
      )}
      {pageView === "gameSelected" && <Game mapInView={mapInView} />}
    </>
  );
}

export default App;
