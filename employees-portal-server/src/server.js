const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/", (_req, res) => {
  res.send("Landing url!");
});

const start = async (port) => {
  app.listen(3002, () => {
    console.log(`REST API on http://localhost:${port}/api`);
  });
};

start(port);

require("./controllers/employeesController")(app);

module.exports = app;
