var mongoose = require("mongoose");

var JobOfferSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  contractType: {
    type: String,
    enum: ["", "CDI", "CDD", "Stage", "Alternance", "Apprentissage"]
  },
  city: { type: String, required: true },
  company: { type: String, required: true },
  companyDescription: { type: String },
  jobDescription: { type: String, required: true },
  wage: { type: Number },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

JobOfferSchema.statics.search = function(
  params,
  callback,
  page,
  limit,
  sortData
) {
  if (params.title !== "undefined") {
    params.title = { $regex: new RegExp(params.title, "ig") };
  }
  if (params.city !== "undefined") {
    params.city = { $regex: new RegExp(params.city, "ig") };
  }
  JobOffer.find(params)
    .skip(limit * (page - 1))
    .limit(limit)
    .sort(sortData)
    .exec(function(err, jobOffers) {
      JobOffer.find(params)
        .count()
        .exec(function(err, count) {
          callback({
            jobOffers: jobOffers,
            items: count
          });
        });
    });
};

const JobOffer = mongoose.model("JobOffer", JobOfferSchema);
module.exports = JobOffer;
