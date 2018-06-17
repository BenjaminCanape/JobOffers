import React, { Component } from "react";
import JobOfferPreview from "../Components/JobOfferPreview";
import FlashMessage from "../Components/FlashMessage";
import axios from "axios";

//Job offer list page : This is the page where we can the job offers created by the connected user
class RecuiterOffers extends Component {
  constructor() {
    super();
    this.state = {
      jobOfferList: [],
      successMessage: "",
      errorMessage: "",
      currentUser: JSON.parse(localStorage.getItem("user"))
    };
  }

  //when the component is mount, we call the api to get the list of job offers and update the local state
  componentDidMount() {
    axios
      .get("/jobOffers/user/"+ this.state.currentUser._id)
      .then(response => this.setState({ jobOfferList: response.data }))
      .catch(err => console.log(err));
  }

  //when we click on the trash button of the preview, we delete this job offer thanks to the api
  deleteJobOffer = id => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken");

    axios.delete("/jobOffers/" + id).then(response => {
      if (response.data.message) {
        this.setState({ errorMessage: response.data.message });
      } else {
        let jobOfferList = this.state.jobOfferList.slice();
        jobOfferList = jobOfferList.filter(jobOffer => jobOffer._id !== id);
        this.setState({ jobOfferList: jobOfferList, successMessage: "L'offre d'emploi vient d'être supprimée" });
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
            <JobOfferPreview key={jobOffer._id} jobOffer={jobOffer} deleteJobOffer={this.deleteJobOffer} currentUser={currentUser} />
          ))
        ) : (
          <span> Aucune offre</span>
        )}
      </div>
    );
  }
}

export default RecuiterOffers;
