import React, { Component } from 'react';
import JobOfferPreview from '../Components/JobOfferPreview';
import FlashMessage from '../Components/FlashMessage';
import axios from 'axios';
import SearchJobOffersForm from '../Forms/SearchJobOffersForm';
import Pagination from "react-js-pagination";

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
      activePage: 1,
      jobOffersCount: 0
    };
  }

  //when the component is mount, we call the api to get the list of job offers and update the local state
  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
    this.getJobOffers();
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

  handlePageChange = pageNumber => {
    this.setState({activePage: pageNumber}, this.getJobOffers);
  }

  getJobOffers = () => {
    axios
    .get('/jobOffers/' + this.state.activePage)
    .then(response => this.setState({ 
      jobOfferList: response.data.jobOffers,
      jobOffersCount: response.data.items 
    }))
    .catch(err => console.log(err));
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

    //when the search form is submitted, we call the api to search the job offers corresponding to the text
  onFormSubmit = search => {
    axios.post('/jobOffers/search', search).then(response => {
      this.setState({ jobOfferList: response.data });
    });
  };

  //For each job offer, we create a JobOfferPreview component
  render() {
    const { jobOfferList, currentUser, activePage, jobOffersCount } = this.state;
    return (
      <div>
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} /> 
        <br/>
        <SearchJobOffersForm onFormSubmit={this.onFormSubmit} />
        <br/><br/>
        {jobOfferList.length > 0  && (<h4> Voici les offres d'emploi disponibles :<br/><br/></h4>) }       
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
          <h4> Aucune offre d'emploi disponible.</h4>
        )}

        {jobOfferList.length > 0 && (
          <Pagination
          activePage={activePage}
          itemsCountPerPage={1}
          totalItemsCount={jobOffersCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          />
         )}
      </div>
    );
  }
}

export default JobOffersList;
