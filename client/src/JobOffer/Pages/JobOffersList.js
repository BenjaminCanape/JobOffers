import React, { Component } from "react";
import JobOfferPreview from "../Components/JobOfferPreview";
import FlashMessage from "../Components/FlashMessage";

//Job offer list page : This is the page where we can see all the job offers
class JobOffersList extends Component {
  constructor() {
    super();
    this.state = {
      jobOfferList: [],
      successMessage: "",
      errorMessage: "",
    };
  }

  //when the component is mount, we call the api to get the list of job offers and update the local state
  componentDidMount() {
    this.getJobOfferList()
      .then(jobOfferList => this.setState({ jobOfferList: jobOfferList }))
      .catch(err => console.log(err));
  }

  //function which call the api to get the list of job offers
  getJobOfferList = async () => {
    const response = await fetch("/jobOffers");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  //when we click on the trash button of the preview, we delete this job offer thanks to the api
  deleteJobOffer = id => {
    fetch("/jobOffers/" + id, {
      method: "DELETE",
    })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        if (body.message) {
          this.setState({ errorMessage: body.message });
        } else {
          let jobOfferList = this.state.jobOfferList.slice();
          jobOfferList = jobOfferList.filter(jobOffer => jobOffer._id !== id);
          this.setState({ jobOfferList: jobOfferList, successMessage: "L'offre d'emploi vient d'être supprimée" });
        }
      });
  };

  //For each job offer, we create a JobOfferPreview component
  render() {
    const { jobOfferList } = this.state;
    return (
      <div>
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        {jobOfferList.length ? (
          jobOfferList.map(jobOffer => (
            <JobOfferPreview key={jobOffer._id} jobOffer={jobOffer} deleteJobOffer={this.deleteJobOffer} />
          ))
        ) : (
          <span> Aucune offre</span>
        )}
      </div>
    );
  }
}

export default JobOffersList;
