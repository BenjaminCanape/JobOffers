import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';

import AuthentificationStore from '../../Authentification/stores/AuthentificationStore';

//page where we can view a job offer
class ViewJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: '',
      errorMessage: '',
      jobOffer: {},
      user: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
      userLoggedIn: AuthentificationStore.isLoggedIn(),
    };
  }

  //when the component is mount, we call the api toget the previously saved infos about this job offer
  //and update the local state to update the form
  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
    fetch('/jobOffers/' + this.props.match.params.id)
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
    this.setState({
      userLoggedIn: AuthentificationStore.isLoggedIn(),
      user: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
    });
  }

  isCandidate() {
    if (this.state.userLoggedIn) {
      let user = this.state.user;
      return !user.isRecruiter;
    }

    return false;
  }

  applyToThisJobOffer() {}

  render() {
    const { jobOffer, user } = this.state;

    let isCurrentUser = false;

    if (user) {
      isCurrentUser = this.state.user._id === jobOffer.author;
    }

    return (
      <div className="container">
        <a href="/"> Retour à la liste</a>
        <br />
        <br />
        <span className="jobOfferTitle">{jobOffer.title}</span>
        <span className="float-right">
          <a href={`/edit/${this.props.match.params.id}`}>
            {this.state.userLoggedIn &&
              isCurrentUser && <FontAwesomeIcon icon={faEdit} className="editJobOfferIcon" size="2x" />}
          </a>
        </span>
        <br />
        <span className="subtitle">
          {jobOffer.company},{jobOffer.city}
        </span>
        <br />
        <br />
        {jobOffer.contractType && <span> Type de contract : {jobOffer.contractType}</span>} <br />
        {jobOffer.wage && <span> Salaire : {jobOffer.wage} €</span>} <br />
        <br />
        {jobOffer.companyDescription && (
          <span>
            Description de l'entreprise : <br />
            {jobOffer.companyDescription}
          </span>
        )}
        <br />
        <br />
        <span>
          Description de l'emploi : <br />
          {jobOffer.jobDescription}
        </span>
        <br />
        <br />
        {this.isCandidate() && (
          <button className="btn btn-default apply" onClick={this.applyToThisJobOffer()}>
            Postuler
          </button>
        )}
      </div>
    );
  }
}

export default ViewJobOfferPage;
