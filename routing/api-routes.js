//this file offers a set of routes for displaying and saving data to the db
var db = require("../models");

//routes
module.exports = function(app) {
  app.post("/api/newUser/:uid", function(req, res) {
    db.User.findAll({
      where: {
        uid: req.params.uid
      }
    }).then(function(res) {
      if (res.length === 0) {
        db.User.create({
          uid: req.params.uid
        });
      } else {
        //do nothing;
      }
    });
  });
  // Vague Search
  app.get("/api/search", function(req, res) {
    console.log(req.query);
    let type = req.query.type;
    let brewID = req.query.brewery;
    let hood = req.query.hood;


    var results = [];

    // sequelize logic

    db.Brewery.findAll({
      where: {
        id: brewID,
      }
    }).then(function(brewResults) {
      results = results.concat(brewResults);
      db.Beer.findAll({
        where: {
          simple_style: type,
          BreweryId: brewID
        }
      }).then(function(typeResults) {
        results = results.concat(typeResults);
        res.json(results);
      });
    });
  });
};

var findAll = function(model, colName1, colVal1, colName2, colVal2) {
  db.model
    .findAll({
      where: {
        colName1: colVal1,
        colName2: colVal2
      }
    })
    .then(function(results) {});
};
