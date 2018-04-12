var express = require("express");
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

router.get("/api/typeAndbrewery", function (req, res) {
    console.log(req.query);
    let type = req.query.type;
    let brewID = req.query.brewery;
    // let hood = req.query.hood;
    let results = [];

    // sequelize logic
    db.Brewery.findAll({
        where: {
            id: brewID
        }
    }).then(function (brewResults) {
        results = results.concat(brewResults);
        db.Beer.findAll({
            where: {
                simple_style: type,
                BreweryId: brewID
            }
        }).then(function (typeResults) {
            results = results.concat(typeResults);
            res.json(results);
        });
    });
});

router.get("/api/typeAndhood", function (req, res) {
    console.log(req.query);
    let type = req.query.type;
    // let brewID = req.query.brewery;
    let hood = req.query.hood;
    console.log(req.query.hood);
    let results = [];

    // sequelize logic
    db.Brewery.findAll({
        where: {
            neighborhood: hood
        }
    }).then(function (brewResults) {
        results = results.concat(brewResults);
        db.Beer.findAll({
            where: {
                simple_style: type,
                hood: hood
            }
        }).then(function (typeResults) {
            results = results.concat(typeResults);
            res.json(results);
        });
    });
});

router.get("/api/hood", function (req, res) {
    console.log(req.query);
    let type = req.query.type;
    let brewID = req.query.brewery;
    var hood = req.query.hood;
    console.log(req.query.hood);
    //let results = [];

    // sequelize logic
    db.Brewery.findAll({
        where: {
            neighborhood: hood
        }
    }).then(function (brewResults) {
        console.log(brewResults)
        res.json(brewResults);
    });
});

router.get("/api/brewery", function (req, res) {
    console.log(req.query);
    var type = req.query.type;
    let brewID = req.query.brewery;
    var hood = req.query.hood;
    console.log(req.query.brewID);
    let results = [];

    // sequelize logic
    db.Brewery.findAll({
        where: {
            id: brewID
        }
    }).then(function (brewResults) {
        results = results.concat(brewResults);
        db.Beer.findAll({
            where: {
                BreweryId: brewID
            }
        }).then(function (typeResults) {
            results = results.concat(typeResults);
            res.json(results);
        });
    });
});

router.get("/api/type", function (req, res) {
    console.log(req.query);
    let type = req.query.type;
    let brewID = req.query.brewery;
    var hood = req.query.hood;
    console.log(req.query.type);
    //let results = [];

    // sequelize logic
    db.Beer.findAll({
        where: {
            simple_style: type
        }
    }).then(function (brewResults) {
        console.log(brewResults)
        res.json(brewResults);
    });
});
module.exports = router;