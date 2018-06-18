import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './JobOfferPreview.css';

//component to print a job offer preview, used in the job offer list
class JobOfferPreview extends Component {
  static defaultProps = {
    jobOffer: {
      _id: '',
      title: '',
      company: '',
      city: '',
      jobDescription: '',
    },
  };

  static propTypes = {
    deleteJobOffer: PropTypes.func.isRequired,
    jobOffer: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      jobDescription: PropTypes.string.isRequired,
    }),
  };

  //Get the short version of the job description
  //param description: String
  //return String
  getShortDescription(description) {
    return description ? description.substring(0, 100) + (description.length > 100 ? '...' : '') : '';
  }

  deleteJobOffer = id => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer cette offre ?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => this.props.deleteJobOffer(id),
        },
        {
          label: 'Non',
        },
      ],
    });
  };

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  render() {
    const { currentUser } = this.props;
    const { _id, title, company, city, jobDescription, author } = this.props.jobOffer;

    let isCurrentUser = false;

    if (currentUser) {
      isCurrentUser = currentUser._id === author;
    }

    let loggedIn = this.loggedIn();
    return (
      <div className="jobOffer">
        <a href={`/view/${_id}`} className="jobOfferTitle">
          {title}
        </a>
        {loggedIn &&
          isCurrentUser && (
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="red"
              className="float-right deleteJobOfferIcon"
              onClick={() => this.deleteJobOffer(_id)}
            />
          )}
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
