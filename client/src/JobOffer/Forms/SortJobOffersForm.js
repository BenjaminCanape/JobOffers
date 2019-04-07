import React, { Component } from 'react';

//Sort Job offers Form : This is the form to sort job offers
class SortJobOffersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wage: '',
      creatingDate: ''
    };
  }

  //on input change, the local state is updated
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    }, function(){
      this.props.onSortChange({
        wage: this.state.wage,
        creatingDate: this.state.creatingDate
      });
    });

  };

  render() {
    return (
      <div>
        <form className="form-inline">
        <div className="form-group">
            <select
              className="form-control"
              id="creatingDate"
              name="creatingDate"
              value={this.state.creatingDate}
              onChange={this.handleChange}
            >
              <option value="" disabled>Date de création</option>
              <option value="desc">offres récentes</option>
              <option value="asc">offres anciennes</option>
            </select>
          </div>           
          <div className="form-group">
            <select
              className="form-control"
              id="wage"
              name="wage"
              value={this.state.wage}
              onChange={this.handleChange}
            >
              <option value="" disabled>Salaire</option>
              <option value="desc">salaire élevé</option>
              <option value="asc">salaire faible</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default SortJobOffersForm;
