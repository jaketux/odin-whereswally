import GoldMedal from "../src/assets/goldmedal.png";
import SilverMedal from "../src/assets/silvermedal.png";
import BronzeMedal from "../src/assets/bronzemedal.png";
import Four from "../src/assets/four.png";
import Five from "../src/assets/five.png";

export default function MapScores(props) {
  return (
    <div className="scoreboard-block">
      <div className="scoreboard-block-mapheading">{props.map.name}</div>
      <div className="scoreboard-block-mapimage">
        <img
          src={props.map.mapImage}
          alt="Image of the Wheres Wally Map"
          className="scoreboard-block-image"
        />
      </div>

      {props.map.gameSessions.length > 0 && (
        <div className="scoreboard-block-scores">
          <div className="scoreboard-block-subheading">Top Scores</div>
          <div className="scoreboard-block-score-container">
            {props.map.gameSessions.map((score, index) => {
              return (
                <div className="score" key={index}>
                  <div className="trophy">
                    {index === 0 && (
                      <img
                        src={GoldMedal}
                        alt="Image of a gold medal"
                        className="small-btn-img"
                      />
                    )}
                    {index === 1 && (
                      <img
                        src={SilverMedal}
                        alt="Image of a silver medal"
                        className="small-btn-img"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src={BronzeMedal}
                        alt="Image of a silver medal"
                        className="small-btn-img"
                      />
                    )}
                    {index === 3 && (
                      <img
                        src={Four}
                        alt="Image of a number four"
                        className="small-btn-img"
                      />
                    )}
                    {index === 4 && (
                      <img
                        src={Five}
                        alt="Image of a number five"
                        className="small-btn-img"
                      />
                    )}
                  </div>
                  <div className="user">{score.username}</div>
                  <div className="time">{score.endTime}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {props.map.gameSessions.length === 0 && (
        <div className="scoreboard-block-noscores">No scores recorded.</div>
      )}
    </div>
  );
}
