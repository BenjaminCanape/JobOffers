var mongoose = require('mongoose');

var JobOfferSchema = new mongoose.Schema({
  title: String,
  contractType: String,
  city: String,
  company: String,
  companyDescription: String,
  jobDescription: String,
  wage: Number,
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobOffer', JobOfferSchema);