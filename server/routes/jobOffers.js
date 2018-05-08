var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET jobOffers listing. */
router.get('/jobOffers', function(req, res, next) {
	// Comment out this line:
  res.send('respond with a resource');
});

module.exports = router;