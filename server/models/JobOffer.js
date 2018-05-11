var mongoose = require("mongoose");

var JobOfferSchema = new mongoose.Schema({
	title: { type: String, required: true },
	contractType: { type: String, enum: ["", "CDI", "CDD", "Stage", "Alternance", "Apprentissage"] },
	city: { type: String, required: true },
	company: { type: String, required: true },
	companyDescription: { type: String },
	jobDescription: { type: String, required: true },
	wage: { type: Number },
	creationDate: { type: Date, default: Date.now },
	updateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobOffer", JobOfferSchema);
