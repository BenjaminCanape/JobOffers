import React, { Component } from "react";
import PropTypes from "prop-types";

//Form component, the form to create or update a job offer
class JobOfferForm extends Component {
  static defaultProps = {
    defaultJobOffer: {
      _id: "",
      title: "",
      city: "",
      company: "",
      contractType: "",
      wage: 0,
      companyDescription: "",
      jobDescription: "",
    },
  };

  static propTypes = {
    defaultJobOffer: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
      city: PropTypes.string,
      contractType: PropTypes.string,
      wage: PropTypes.number,
      companyDescription: PropTypes.string,
      jobDescription: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      city: "",
      company: "",
      contractType: "",
      wage: 0,
      companyDescription: "",
      jobDescription: "",
    };
  }

  //when the component is re-rendered, if the defaultJobOffer prop is set the local state update
  //and the form will update with theses infos
  componentWillReceiveProps(props) {
    this.setState(props.defaultJobOffer);
  }

  //on input change, the local state is updated
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  //when the form is submitted, we create a jobOffer object and pass it to the function passed via props
  onFormSubmit = e => {
    e.preventDefault();
    let jobOffer = {
      title: this.state.title,
      city: this.state.city,
      company: this.state.company,
      jobDescription: this.state.jobDescription,
      companyDescription: this.state.companyDescription,
      contractType: this.state.contractType,
      wage: this.state.wage,
    };

    this.props.onFormSubmit(jobOffer);
  };

  //render all the inputs needed to create or update a job offer
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              required
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Société</label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              required
              value={this.state.company}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractType">Type de contrat</label>
            <select
              className="form-control"
              id="contractType"
              name="contractType"
              value={this.state.contractType}
              onChange={this.handleChange}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Stage">Stage</option>
              <option value="Apprentissage">Apprentissage</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="wage">Salaire</label>
            <input
              type="number"
              className="form-control"
              id="wage"
              name="wage"
              value={this.state.wage}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyDescription">Description de l'entreprise</label>
            <textarea
              id="companyDescription"
              className="form-control"
              name="companyDescription"
              value={this.state.companyDescription}
              onChange={this.handleChange}
              rows="5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Description de l'offre d'emploi</label>
            <textarea
              id="jobDescription"
              className="form-control"
              name="jobDescription"
              required
              value={this.state.jobDescription}
              onChange={this.handleChange}
              rows="5"
            />
          </div>
          <button className="btn btn-primary"> Envoyer </button>
        </form>
      </div>
    );
  }
}

export default JobOfferForm;
