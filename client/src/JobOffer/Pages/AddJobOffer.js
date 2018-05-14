import React, { Component } from "react";
import JobOfferForm from "../Forms/JobOfferForm";
import FlashMessage from "../Components/FlashMessage";

//page where we can add a new job offer
class AddJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: "", errorMessage: "" };
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

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
        if (body.message) {
          this.setState({ errorMessage: body.message });
        } else {
          this.setState({ successMessage: "L'offre d'emploi vient d'être créée" });
        }
      });
  };

  render() {
    return (
      <div className="container">
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        <h2>Ajouter une offre d'emploi</h2>
        <JobOfferForm onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default AddJobOfferPage;
