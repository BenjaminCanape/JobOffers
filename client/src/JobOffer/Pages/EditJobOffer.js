import React, { Component } from "react";
import JobOfferForm from "../Forms/JobOfferForm";
import FlashMessage from "../Components/FlashMessage";
import axios from "axios";

import AuthentificationStore from "../../Authentification/stores/AuthentificationStore";

//page where we can edit a job offer
class EditJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      jobOffer: {},
      jwt: AuthentificationStore.jwt
    };
  }

  //when the component is mount, we call the api toget the previously saved infos about this job offer
  //and update the local state to update the form
  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));

    fetch("/jobOffers/offer/" + this.props.match.params.id)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ jobOffer: body });
      });
  }

  componentWillUnmount() {
    AuthentificationStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ jwt: AuthentificationStore.jwt });
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  //when the form is submitted, we update the previously saved job offer with the new infos
  onFormSubmit = jobOffer => {
    axios.defaults.headers.common["Authorization"] = this.state.jwt;

    axios
      .put("/jobOffers/" + this.state.jobOffer._id, jobOffer)
      .then(response => {
        if (response.data.message) {
          this.setState({ errorMessage: response.data.message });
        } else {
          this.setState({
            successMessage: "L'offre d'emploi vient d'être mise à jour"
          });

          this.props.history.push("/view/" + this.state.jobOffer._id);
        }
      });
  };

  render() {
    return (
      <div className="container">
        <FlashMessage
          successMessage={this.state.successMessage}
          errorMessage={this.state.errorMessage}
        />
        <h2>Modifier l'offre d'emploi</h2>
        <JobOfferForm
          defaultJobOffer={this.state.jobOffer}
          onFormSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

export default EditJobOfferPage;
