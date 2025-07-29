import MapScores from "../Components/MapScores";

export default function Scoreboard(props) {
  return (
    <>
      <div className="scoreboard-page-heading">Scoreboard</div>
      {props.mapStorage.map((map, index) => {
        return <MapScores map={map} key={index} />;
      })}
    </>
  );
}
