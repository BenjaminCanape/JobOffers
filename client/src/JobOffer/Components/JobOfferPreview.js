import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";

import "./JobOfferPreview.css";

//component to print a job offer preview, used in the job offer list
class JobOfferPreview extends Component {
  //Get the short version of the job description
  //param description: String
  //return String
  getShortDescription(description) {
    return description ? description.substring(0, 100) + (description.length > 100 ? "..." : "") : "";
  }

  deleteJobOffer = id => {
    this.props.deleteJobOffer(id);
  };

  render() {
    const { _id, title, company, city, jobDescription } = this.props.jobOffer;

    return (
      <div className="jobOffer">
        <a href={`/edit/${_id}`} className="jobOfferTitle">
          {title}
        </a>
        <FontAwesomeIcon
          icon={faTrashAlt}
          color="red"
          className="float-right deleteJobOfferIcon"
          onClick={() => this.deleteJobOffer(_id)}
        />
        <br />
        <span className="subtitle">
          {company},{city}
        </span>
        <br />
        <span>{this.getShortDescription(jobDescription)}</span>
      </div>
    );
  }
}

export default JobOfferPreview;
