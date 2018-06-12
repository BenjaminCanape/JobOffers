import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";

//page where we can view a job offer
class ViewJobOfferPage extends Component {
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

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem("jwtToken");
    return !!token;
  }

  render() {
    const { jobOffer } = this.state;
    let loggedIn = this.loggedIn();

    const currentUser = JSON.parse(localStorage.getItem("user"));
    let isCurrentUser = false;

    if(currentUser){
      isCurrentUser = currentUser._id === jobOffer.author;
    }

    return (
      <div className="container">
        <a href="/"> Retour à la liste</a>
        <br />
        <br />
        <span className="jobOfferTitle">{jobOffer.title}</span>
        <span className="float-right">
          <a href={`/edit/${this.props.match.params.id}`}>
            {loggedIn && isCurrentUser && <FontAwesomeIcon icon={faEdit} className="editJobOfferIcon" size="2x" />}
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
      </div>
    );
  }
}

export default ViewJobOfferPage;
