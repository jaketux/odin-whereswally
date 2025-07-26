import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Components/Header";

function App() {
  const [count, setCount] = useState(0);

  const [refreshCounter, setRefreshCounter] = useState(0);

  const [mapStorage, setMapStorage] = useState([]);

  const [currentError, setCurrentError] = useState(false);

  const [errorInView, setErrorInView] = useState(null);

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
  }, [refreshCounter]);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
