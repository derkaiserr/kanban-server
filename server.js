const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/task"); // Change to task router
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", tasksRouter); // Update route prefix to /tasks

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
