var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var JobOffer = require('../models/JobOffer.js');
var passport = require('passport');
require('../config/passport')(passport);

/* POST jobOffers listing. */
router.post('/list', function(req, res, next) {
  var limit = 2;
  var page = req.body.page || 1;
  var sortData = req.body.sortData;

  let sortObject = creatingSortObject(sortData);

  JobOffer.find()
  .skip(limit * (page - 1))
  .limit(limit)
  .sort(sortObject)
  .exec(function(err, jobOffers) {
    JobOffer.countDocuments().exec(function(err, count) {
      if (err) return next(err);
      res.json({
        jobOffers: jobOffers,
        items: count
      });
    });
  });
});

/* POST jobOffers by author. */
router.post('/user', function(req, res, next) {
  var limit = 2;
  var page = req.body.page || 1;
  var sortData = req.body.sortData;
  var author = req.body.author;

  let sortObject = creatingSortObject(sortData);

  JobOffer.find({ author: author })
  .skip(limit * (page - 1))
  .limit(limit)
  .sort(sortObject)
  .exec(function(err, jobOffers) {
    JobOffer.countDocuments().exec(function(err, count) {
      if (err) return next(err);
      res.json({
        jobOffers: jobOffers,
        items: count
      });
    });
  });
});

/* GET One jobOffer by id */
router.get('/offer/:id', function(req, res, next) {
  JobOffer.findById(req.params.id, function(err, jobOffer) {
    if (err) return next(err);
    res.json(jobOffer);
  });
});

/* GET Search jobOffer by params */
router.post('/search', function(req, res, next) {
  var limit = 2;
  var page = req.body.page || 1;
  var sortData = req.body.sortData;

  let sortObject = creatingSortObject(sortData);

  delete req.body.page;
  delete req.body.sortData;

  JobOffer.search(req.body, function(json) {
      res.json(json);
    }, page, limit, sortObject);
});

/* POST jobOffer */
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.create(req.body, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Non autorisé' });
  }
});

/* PUT jobOffer */
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Non autorisé' });
  }
});

/* DELETE jobOffer */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    JobOffer.findByIdAndRemove(req.params.id, req.body, function(err, jobOffer) {
      if (err) return res.json(err);
      res.json(jobOffer);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Non autorisé' });
  }
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

creatingSortObject = function(sortData){
  var sortObject = {};

  if(sortData !== null){
    if(sortData.creatingDate !== ""){
      sortObject.creationDate = sortData.creatingDate;
    }

    if(sortData.wage !== ""){
      sortObject.wage = sortData.wage;
    }
  }

  return sortObject;
};

module.exports = router;
