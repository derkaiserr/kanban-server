const express = require("express");
const bodyParser = require("body-parser");
const moodsRouter = require("./routes/mood");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/moods", moodsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});