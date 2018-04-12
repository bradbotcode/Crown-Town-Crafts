// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// requiring our models for syncing
var db = require("./models");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// static directory
app.use(express.static("./public"));

//handlebars engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var routes = require("./controllers/controller.js");
app.use("/", routes);

// syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  .sync({
    force: true
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  });