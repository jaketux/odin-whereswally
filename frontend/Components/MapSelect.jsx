import MapCard from "../Components/MapCard";
import { useEffect } from "react";

export default function MapSelect(props) {
  const { mapStorage, setMapInView, setPageView, setShowLoading } = props;

  useEffect(() => {
    let loadTime;
    if (mapStorage.length > 0) {
      loadTime = setTimeout(() => {
        setShowLoading(false);
      }, 300);
    }

    return () => clearTimeout(loadTime);
  }, [mapStorage]);

  return (
    <div className="map-select">
      <div className="map-select-subheading">Choose a map below to begin:</div>
      <div className="map-container">
        {mapStorage.map((map) => {
          return (
            <MapCard
              key={map.id}
              map={map}
              setMapInView={setMapInView}
              setPageView={setPageView}
              mapImage={map.mapImage}
              name={map.name}
              characters={map.characters}
            />
          );
        })}
      </div>
    </div>
  );
}
