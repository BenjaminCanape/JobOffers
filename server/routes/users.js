var mongoose = require("mongoose");
var passport = require("passport");
var settings = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/User");

router.post("/register", function(req, res) {
    if (!req.body.mail || !req.body.password) {
        res.json({ success: false, msg: "Mail ou mot de passe non rempli" });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isRecruiter: req.body.isRecruiter,
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: err });
            }
            res.json({ success: true, msg: "Utilisateur créé" });
        });
    }
});

router.post("/login", function(req, res) {
    User.findOne(
        {
            email: req.body.email,
        },
        function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).send({ success: false, msg: "Utilisateur non trouvé" });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), settings.secret);
                        // return the information including token as JSON
                        res.json({ success: true, token: "JWT " + token });
                    } else {
                        res.status(401).send({ success: false, msg: "Mauvais mot de passe" });
                    }
                });
            }
        }
    );
});

module.exports = router;
