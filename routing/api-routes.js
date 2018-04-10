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
    let paramArr = req.params.filters.split("&");
    let type;
    let hood;

    for(let i=0; i < paramArr.length; i++) {
      if(paramArr[i].indexOf("type=")) {
        let typeArr = paramArr[i].split("=");
        type = typeArr[1]
        console.log(typeArr[1]);
      }
      if(paramArr[i].indexOf("hood=")) {
        let hoodArr = paramArr[i].split("="); 
        hood = hood[1];
        console.log(hood);
      }
    }
  });
};
