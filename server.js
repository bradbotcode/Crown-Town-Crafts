// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

// sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// requiring our models for syncing
const db = require("./models");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// static directory
app.use(express.static("./public"));

const routes = require("./controllers/controller.js");
app.use("/", routes);

// syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  .sync({
    force: false
  })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
