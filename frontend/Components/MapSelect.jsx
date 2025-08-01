import MapCard from "../Components/MapCard";
import { useEffect } from "react";

export default function MapSelect(props) {
  const { mapStorage, setMapInView, setPageView, setShowLoading } = props;

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
