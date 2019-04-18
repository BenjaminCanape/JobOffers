import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import { Link } from "react-router-dom";

import AuthentificationStore from "../../Authentification/stores/AuthentificationStore";

//page where we can view a job offer
class ViewJobOfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      jobOffer: {},
      user: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
      userLoggedIn: AuthentificationStore.isLoggedIn()
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
    this.setState({
      userLoggedIn: AuthentificationStore.isLoggedIn(),
      user: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt
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
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    let isCurrentUser = false;

    if (user) {
      isCurrentUser = this.state.user._id === jobOffer.author;
    }

    return (
      <div className="container">
        <Link to="/">Retour à la liste</Link>
        <br />
        <br />
        <span className="jobOfferTitle">{jobOffer.title}</span>
        <span className="float-right">
          <Link to={`/edit/${this.props.match.params.id}`}>
            {this.state.userLoggedIn && isCurrentUser && (
              <FontAwesomeIcon
                icon={faEdit}
                className="editJobOfferIcon"
                size="2x"
              />
            )}
          </Link>
        </span>
        <br />
        <span className="subtitle">
          {jobOffer.company}, {jobOffer.city}
        </span>
        <span className="float-right">
          Mis en ligne le{" "}
          {new Date(jobOffer.creationDate).toLocaleDateString(
            "fr-FR",
            dateOptions
          )}
        </span>
        <br />
        <br />
        {jobOffer.contractType && (
          <span class="badge badge-pill badge-secondary">
            {jobOffer.contractType}
          </span>
        )}{" "}
        <br />
        {jobOffer.wage && <span> Salaire : {jobOffer.wage} €</span>} <br />
        <br />
        {jobOffer.companyDescription && (
          <div class="card">
            <div class="card-header">Description de l'entreprise</div>
            <div class="card-body">
              <p class="card-text">{jobOffer.companyDescription}</p>
            </div>
          </div>
        )}
        <br />
        <br />
        <div class="card">
          <div class="card-header">Description de l'emploi</div>
          <div class="card-body">
            <p class="card-text"> {jobOffer.jobDescription}</p>
          </div>
        </div>
        <br />
        <br />
        {this.isCandidate() && (
          <button
            className="btn btn-default apply"
            onClick={this.applyToThisJobOffer()}
          >
            Postuler
          </button>
        )}
      </div>
    );
  }
}

export default ViewJobOfferPage;
