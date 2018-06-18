import React, { Component } from 'react';
import axios from 'axios';
import FlashMessage from '../JobOffer/Components/FlashMessage';

class EditProfile extends Component {
  constructor() {
    super();

    let user = JSON.parse(localStorage.getItem('user'));

    this.state = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isRecruiter: user.isRecruiter,
      user: user,
      successMessage: '',
      errorMessage: '',
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  //on form submit, the backend will try to create the user
  onSubmit = e => {
    e.preventDefault();

    const { email, firstName, lastName, isRecruiter } = this.state;

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios
      .put('/users/edit/' + this.state.user._id, {
        email,
        firstName,
        lastName,
        isRecruiter,
      })
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.data.user));
        this.setState({ user: result.data.user, successMessage: 'Profil modifié' });
      });
  };

  //registration form
  render() {
    return (
      <div className="container">
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Modifier mon profil</h2>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <br />
          Je suis un &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              required
              name="isRecruiter"
              defaultChecked={!this.state.isRecruiter}
              value={false}
              onChange={this.onChange}
            />&nbsp; Candidat
          </label>
          &nbsp;&nbsp;
          <label>
            <input
              type="radio"
              required
              name="isRecruiter"
              defaultChecked={this.state.isRecruiter}
              value={true}
              onChange={this.onChange}
            />&nbsp; Recruteur
          </label>
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Modifier
          </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
