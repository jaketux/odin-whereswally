import MapCard from "../Components/MapCard";

export default function MapSelect(props) {
  const { mapStorage, setMapInView, setPageView } = props;

  return (
    <div className="map-select">
      <div className="map-select-subheading">Choose a map below to begin:</div>
      <div className="map-container">
        {mapStorage.map((map) => {
          return (
            <MapCard
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
