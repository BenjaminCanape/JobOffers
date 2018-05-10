import React, { Component } from "react";
import JobOfferPreview from "../Components/JobOfferPreview";

//Job offer list page : This is the page where we can see all the job offers
class JobOffersList extends Component {
  constructor() {
    super();
    this.state = {
      jobOfferList: [],
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

  //For each job offer, we create a JobOfferPreview component
  render() {
    const { jobOfferList } = this.state;
    return (
      <div>
        {jobOfferList.length ? (
          jobOfferList.map(jobOffer => <JobOfferPreview key={jobOffer._id} jobOffer={jobOffer} />)
        ) : (
          <span> Aucune offre</span>
        )}
      </div>
    );
  }
}

export default JobOffersList;
