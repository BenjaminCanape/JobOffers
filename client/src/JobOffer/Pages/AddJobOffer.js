import React, { Component } from 'react';
import JobOfferForm from '../Forms/JobOfferForm';
import FlashMessage from '../Components/FlashMessage';
import axios from 'axios';

import AuthentificationStore from '../../Authentification/stores/AuthentificationStore';

//page where we can add a new job offer
class AddJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: '',
      errorMessage: '',
      jwt: AuthentificationStore.jwt,
    };
  }

  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
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

  //when the form is submitted, we call the api to create the new job offer
  onFormSubmit = jobOffer => {
    axios.defaults.headers.common['Authorization'] = this.state.jwt;

    axios.post('/jobOffers', jobOffer).then(response => {
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
