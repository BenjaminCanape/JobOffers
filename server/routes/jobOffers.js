var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var JobOffer = require("../models/JobOffer.js");

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
router.post("/", function(req, res, next) {
  JobOffer.create(req.body, function(err, jobOffer) {
    if (err) return res.json(err);
    res.json(jobOffer);
  });
});

/* PUT jobOffer */
router.put("/:id", function(req, res, next) {
  JobOffer.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, jobOffer) {
    if (err) return res.json(err);
    res.json(jobOffer);
  });
});

/* DELETE jobOffer */
router.delete("/:id", function(req, res, next) {
  JobOffer.findByIdAndRemove(req.params.id, req.body, function(err, jobOffer) {
    if (err) return res.json(err);
    res.json(jobOffer);
  });
});

module.exports = router;
