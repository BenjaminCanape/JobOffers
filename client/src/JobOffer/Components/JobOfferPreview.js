import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";

//component to print a job offer preview, used in the job offer list
class JobOfferPreview extends Component {
  //when we click on the trash button of the preview, we delete this job offer thanks to the api
  deleteJobOffer = id => {
    fetch("/jobOffers/" + id, {
      method: "DELETE",
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {});
  };

  //Get the short version of the job description
  //param description: String
  //return String
  getShortDescription(description) {
    return description.substring(0, 50);
  }

  render() {
    const { _id, title, company, city, jobDescription } = this.props.jobOffer;

    return (
      <div className="jobOffer">
        <a href={`/edit/${_id}`} className="jobOfferTitle">
          {title}
        </a>
        <FontAwesomeIcon icon={faTrashAlt} onClick={() => this.deleteJobOffer(_id)} />
        <br />
        <span>
          {company},{city}
        </span>
        <br />
        <span>{this.getShortDescription(jobDescription)}</span>
      </div>
    );
  }
}

export default JobOfferPreview;
