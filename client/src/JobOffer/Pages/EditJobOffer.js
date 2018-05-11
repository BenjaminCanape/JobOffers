import React, { Component } from "react";
import JobOfferForm from "../Forms/JobOfferForm";
import FlashMessage from "../Components/FlashMessage";

//page where we can edit a job offer
class EditJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: "", errorMessage: "", jobOffer: {} };
  }

  //when the component is mount, we call the api toget the previously saved infos about this job offer
  //and update the local state to update the form
  componentDidMount() {
    fetch("/jobOffers/" + this.props.match.params.id)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ jobOffer: body });
      });
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  //when the form is submitted, we update the previously saved job offer with the new infos
  onFormSubmit = jobOffer => {
    fetch("/jobOffers/" + this.state.jobOffer._id, {
      method: "PUT",
      body: JSON.stringify(jobOffer),
      headers: { "Content-Type": "application/json" },
    })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ successMessage: "L'offre d'emploi vient d'être mise à jour" });
      });
  };

  render() {
    return (
      <div className="container">
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        <h2>Modifier l'offre d'emploi</h2>
        <JobOfferForm defaultJobOffer={this.state.jobOffer} onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default EditJobOfferPage;
