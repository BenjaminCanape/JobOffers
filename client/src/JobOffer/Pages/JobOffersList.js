import React, { Component } from 'react';
import JobOfferPreview from '../Components/JobOfferPreview';
import FlashMessage from '../Components/FlashMessage';
import axios from 'axios';

import AuthentificationStore from '../../Authentification/stores/AuthentificationStore';

//Job offer list page : This is the page where we can see all the job offers
class JobOffersList extends Component {
  constructor() {
    super();
    this.state = {
      jobOfferList: [],
      successMessage: '',
      errorMessage: '',
      currentUser: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
      userLoggedIn: AuthentificationStore.isLoggedIn(),
    };
  }

  //when the component is mount, we call the api to get the list of job offers and update the local state
  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));

    axios
      .get('/jobOffers')
      .then(response => this.setState({ jobOfferList: response.data }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    AuthentificationStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      userLoggedIn: AuthentificationStore.isLoggedIn(),
      currentUser: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
    });
  }

  //when we click on the trash button of the preview, we delete this job offer thanks to the api
  deleteJobOffer = id => {
    axios.defaults.headers.common['Authorization'] = this.state.jwt;

    axios.delete('/jobOffers/' + id).then(response => {
      if (response.data.message) {
        this.setState({ errorMessage: response.data.message });
      } else {
        let jobOfferList = this.state.jobOfferList.slice();
        jobOfferList = jobOfferList.filter(jobOffer => jobOffer._id !== id);
        this.setState({
          jobOfferList: jobOfferList,
          successMessage: "L'offre d'emploi vient d'être supprimée",
        });
      }
    });
  };

  //For each job offer, we create a JobOfferPreview component
  render() {
    const { jobOfferList, currentUser } = this.state;
    return (
      <div>
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        {jobOfferList.length ? (
          jobOfferList.map(jobOffer => (
            <JobOfferPreview
              key={jobOffer._id}
              jobOffer={jobOffer}
              deleteJobOffer={this.deleteJobOffer}
              currentUser={currentUser}
            />
          ))
        ) : (
          <span> Aucune offre</span>
        )}
      </div>
    );
  }
}

export default JobOffersList;
