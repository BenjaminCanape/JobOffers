import React, { Component } from "react";
import JobOfferForm from "../Forms/JobOfferForm";
import FlashMessage from "../Components/FlashMessage";
import axios from "axios";

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
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken");

    axios.post("/jobOffers", jobOffer).then(response => {
      if (response.data.message) {
        this.setState({ errorMessage: response.data.message });
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
