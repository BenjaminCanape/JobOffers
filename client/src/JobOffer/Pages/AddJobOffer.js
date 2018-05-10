import React, { Component } from "react";
import JobOfferForm from "../Forms/JobOfferForm";

//page where we can add a new job offer
class AddJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: "", errorMessage: "" };
  }

  //when the form is submitted, we call the api to create the new job offer
  onFormSubmit = jobOffer => {
    fetch("/jobOffers", {
      method: "POST",
      body: JSON.stringify(jobOffer),
      headers: { "Content-Type": "application/json" },
    })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ successMessage: "L'offre d'emploi vient d'être créée" });
      });
  };

  render() {
    return (
      <div className="container">
        {this.state.successMessage && (
          <div className="alert alert-success" role="alert">
            {this.state.successMessage}{" "}
          </div>
        )}
        {this.state.errorMessage && (
          <div className="alert alert-error" role="alert">
            {this.state.errorMessage}{" "}
          </div>
        )}
        <h2>Ajouter une offre d'emploi</h2>
        <JobOfferForm onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default AddJobOfferPage;
