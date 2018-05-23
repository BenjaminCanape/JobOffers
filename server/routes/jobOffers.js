var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var JobOffer = require("../models/JobOffer.js");
var passport = require("passport");
require("../config/passport")(passport);

/* GET jobOffers listing. */
router.get("/", function(req, res, next) {
  JobOffer.find(function(err, jobOffers) {
    if (err) return next(err);
    res.json(jobOffers);
  });
});

/* GET One jobOffer by id */
router.get("/:id", function(req, res, next) {
  JobOffer.findById(req.params.id, function(err, jobOffer) {
    if (err) return next(err);
    res.json(jobOffer);
  });
});

/* POST jobOffer */
router.post("/", passport.authenticate("jwt", { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.create(req.body, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Non autorisé" });
  }
});

/* PUT jobOffer */
router.put("/:id", passport.authenticate("jwt", { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Non autorisé" });
  }
});

/* DELETE jobOffer */
router.delete("/:id", passport.authenticate("jwt", { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.findByIdAndRemove(req.params.id, req.body, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Non autorisé" });
  }
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
