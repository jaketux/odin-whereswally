export default function MapCard(props) {
  function handleMapCardClick(map) {
    console.log(map);
    props.setMapInView(map);
    props.setPageView("gameSelected");
    return;
  }

  return (
    <div className="map-card" onClick={() => handleMapCardClick(props.map)}>
      <div className="map-card-top">
        <img
          className="map-image"
          src={props.mapImage}
          alt="Image of the map"
        />
      </div>
      <div className="map-card-bottom">
        <div className="map-title">{props.name}</div>
        <div className="map-characters">
          {props.characters.map((character) => {
            return (
              <div className="map-character" key={character.id}>
                <div className="character-box">
                  <div className="character-icon">
                    <img
                      className="character-img"
                      src={character.characterImage}
                      alt="Image of Character"
                    />
                  </div>
                  <div className="character-name">{character.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
