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
  app.get("/api/search/:filters", function(req, res) {
    console.log(req.params);
    console.log(req.params.filters);
    let paramArr = req.params.filters.split("&");
    let type;
    let brewName;
    let results;

    for (let i = 0; i < paramArr.length; i++) {
      if (paramArr[i].indexOf("type=")) {
        let typeArr = paramArr[i].split("=");
        type = typeArr[1];
        console.log(type);
      }
      if (paramArr[i].indexOf("brewery=")) {
        let breweryArr = paramArr[i].split("=");
        brewName = breweryArr[1].replace("%20", " ");
        console.log(brewName);
      }
    }
    // sequelize logic
  
      db.Brewery.findAll("Brewery", {
        where:{
          brewery_name: brewName
        } 
      }).then(function(brewResults) {
        
        results += brewResults;
        db.Beer.findAll("Beer" ,{
          where: {
            style: type
          }
        }).then(function(typeResults) {
          results += typeResults;
          res.json(results);
        });
      });
    
  });
};
