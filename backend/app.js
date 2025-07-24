const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mapRouter = require("./routes/mapRouter");

const gameSessionRouter = require("./routes/gameSessionRouter");

app.use("/map", mapRouter);
app.use("/game", gameSessionRouter);

app.listen(5000, () => {
  console.log(`Express app listening on PORT 5000`);
});
