import React, { Component } from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBriefcase from "@fortawesome/fontawesome-free-solid/faBriefcase";
import faMapMarkedAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";

//Search Job offers Form : This is the form tosearch job offers
class SearchJobOffersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
      city: ""
    };
  }

  //on input change, the local state is updated
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  //when the form is submitted, we create a jobOffer object and pass it to the function passed via props
  onFormSubmit = e => {
    e.preventDefault();
    let search = {};

    if (this.state.job !== "") {
      search.title = this.state.job;
    }

    if (this.state.city !== "") {
      search.city = this.state.city;
    }

    if (Object.entries(search).length) {
      this.props.onFormSubmit(search);
    }
  };

  render() {
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.onFormSubmit}>
          <div className="form-group col-md-3 col-sm-12">
            <div className="input-group">
              <div className="input-group addon">
                <span className="input-group-addon" id="basic-addon1">
                  <FontAwesomeIcon icon={faBriefcase} size="2x" />
                  &nbsp;
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="job"
                  name="job"
                  placeholder="Quel Métier ?"
                  value={this.state.job}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-md-3 col-sm-12">
            <div className="input-group">
              <div className="input-group addon">
                <span className="input-group-addon" id="basic-addon1">
                  <FontAwesomeIcon icon={faMapMarkedAlt} size="2x" />
                  &nbsp;
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Où ?"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          &nbsp;&nbsp;
          <div className="col-md-3 col-sm-12">
            <button className="btn btn-primary"> Rechercher </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchJobOffersForm;
