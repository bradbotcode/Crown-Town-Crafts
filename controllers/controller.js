var express = require("express");
var path = require("path");
var db = require("../models");

//instance of router
var router = express.Router();

router.use(function (req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

//routes
router.post("/api/newUser/:uid", function (req, res) {
  db.User.findAll({
    where: {
      uid: req.params.uid
    }
  }).then(function (res) {
    if (res.length === 0) {
      db.User.create({
        uid: req.params.uid
      });
    } else {
      //do nothing;
    }
  });
});

router.post("/api/addbeer", function (req, res) {
  console.log(req.body);
  var brewId = parseInt(req.body.brewery);
  db.Beer.create({
    beer_name: req.body.beer_name,
    abv: req.body.abv,
    ibu: req.body.ibu,
    style: req.body.style,
    simple_style: req.body.simple_style,
    hood: req.body.hood,
    BreweryId: req.body.brewery
  }).then(function (results) {
    res.json(results);
  });
});

router.get("/api/brewery", function (req, res) {
  console.log(req.query);
  let brewID = req.query.brewery;

  // sequelize logic
  db.Brewery.findAll({
    where: {
      id: brewID
    },
    include: [db.Beer]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/api/type", function (req, res) {
  console.log(req.query);
  let type = req.query.type;
  let hood = req.query.hood;

  // sequelize logic
  db.Brewery.findAll({
    where: {
      $or: [{
          neighborhood: "West End"
        },
        {
          neighborhood: "South End"
        },
        {
          neighborhood: "Plaza Midwood"
        },
        {
          neighborhood: "Noda"
        }
      ]
    },
    include: [{
      model: db.Beer,
      where: {
        simple_style: type
      }
    }]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/api/hood", function (req, res) {
  console.log(req.query);
  let hood = req.query.hood;

  // sequelize logic
  db.Brewery.findAll({
    where: {
      neighborhood: hood
    },
    include: [db.Beer]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/api/typeAndbrewery", function (req, res) {
  console.log(req.query);
  let type = req.query.type;
  let brewID = req.query.brewery;

  // sequelize logic
  db.Brewery.findAll({
    where: {
      id: brewID
    },
    include: [{
      model: db.Beer,
      where: {
        simple_style: type
      }
    }]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/api/typeAndhood", function (req, res) {
  console.log(req.query);
  let type = req.query.type;
  let hood = req.query.hood;

  // sequelize logic
  db.Brewery.findAll({
    where: {
      neighborhood: hood
    },
    include: [{
      model: db.Beer,
      where: {
        simple_style: type
      }
    }]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/api/all", function (req, res) {
  console.log(req.query);

  // sequelize logic
  db.Brewery.findAll({
    where: {
      $or: [{
          neighborhood: "West End"
        },
        {
          neighborhood: "South End"
        },
        {
          neighborhood: "Plaza Midwood"
        },
        {
          neighborhood: "Noda"
        }
      ]
    },
    include: [{
      model: db.Beer
    }]
  }).then(function (typeResults) {
    res.json(typeResults);
  });
});

router.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
});
module.exports = router;