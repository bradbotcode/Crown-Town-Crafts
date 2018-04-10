//this file offers a set of routes for displaying and saving data to the db
var db = require("../models");

//routes
module.exports = function(app) {
  app.post("/api/newUser/:uid", function(req, res) {
    db.User.findAll({
      where: {
        uid: req.params.uid
      }
    });
    if (res === 0) {
    } else {
    }
  });
};
