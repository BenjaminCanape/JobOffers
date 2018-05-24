import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isRecruiter: false,
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

    const { email, password, firstName, lastName } = this.state;

    axios.post("/users/register", { email, password, firstName, lastName }).then(result => {
      this.props.history.push("/login");
    });
  };

  //registration form
  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Création d'un compte</h2>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
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
          <br />
          <button className="btn btn-primary" type="submit">
            Création
          </button>
        </form>
      </div>
    );
  }
}

export default Create;
