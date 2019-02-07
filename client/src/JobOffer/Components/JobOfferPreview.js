import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

import './JobOfferPreview.css';

import AuthentificationStore from '../../Authentification/stores/AuthentificationStore';

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

  constructor() {
    super();

    this.state = {
      currentUser: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
      userLoggedIn: AuthentificationStore.isLoggedIn(),
    };
  }

  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
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

  render() {
    const { currentUser } = this.props;
    const { _id, title, company, city, jobDescription, author } = this.props.jobOffer;

    let isCurrentUser = false;

    if (currentUser) {
      isCurrentUser = currentUser._id === author;
    }

    return (
      <div className="jobOffer">
        <Link to={`/view/${_id}`} className="jobOfferTitle">
          {title}
        </Link>
        {this.state.userLoggedIn &&
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
