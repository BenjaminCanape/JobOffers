import React, { Component } from "react";
import { Link } from "react-router-dom";
import FlashMessage from "../JobOffer/Components/FlashMessage";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  }

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  //on submit, the backend will tell us if the user credentials are good or not
  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    axios
      .post("/users/login", { email, password })
      .then(result => {
        //save the token
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ successMessage: "Bienvenue" });
        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ errorMessage: "Email ou Mot de passe invalide" });
        }
      });
  };

  //login form
  render() {
    return (
      <div className="container">
        <FlashMessage successMessage={this.state.successMessage} errorMessage={this.state.errorMessage} />
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Connectez vous</h2>
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
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
          <br />
          <br />
          <p>
            <Link to="/register"> Créer un compte</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
