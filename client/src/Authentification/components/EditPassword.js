import React, { Component } from "react";
import axios from "axios";
import FlashMessage from "../../JobOffer/Components/FlashMessage";

import AuthentificationStore from "../stores/AuthentificationStore";

class EditPassword extends Component {
  constructor() {
    super();

    this.state = {
      currentPassword: "",
      newPassword: "",
      repeatedNewPassword: "",
      user: AuthentificationStore.user,
      jwt: AuthentificationStore.jwt,
      userLoggedIn: AuthentificationStore.isLoggedIn(),
      successMessage: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthentificationStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ jwt: AuthentificationStore.jwt });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  //on form submit, the backend will try to create the user
  onSubmit = e => {
    e.preventDefault();

    const { currentPassword, newPassword, repeatedNewPassword } = this.state;

    if (newPassword === repeatedNewPassword) {
      axios.defaults.headers.common["Authorization"] = this.state.jwt;
      axios
        .put("/users/edit/" + this.state.user._id + "/password", {
          currentPassword,
          newPassword
        })
        .then(result => {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          this.setState({
            user: result.data.user,
            successMessage: "Mot de passe modifié"
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.response.data.msg });
        });
    } else {
      this.setState({
        errorMessage: "Les nouveaux mots de passe saisis ne sont pas identiques"
      });
    }
  };

  //registration form
  render() {
    return (
      <div className="container">
        <FlashMessage
          successMessage={this.state.successMessage}
          errorMessage={this.state.errorMessage}
        />
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Modifier mon mot de passe</h2>
          <label htmlFor="email">Mot de passe actuel</label>
          <input
            type="password"
            className="form-control"
            name="currentPassword"
            value={this.state.currentPassword}
            onChange={this.onChange}
            required
          />
          <label htmlFor="email">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="newPassword"
            value={this.state.newPassword}
            onChange={this.onChange}
            required
          />

          <label htmlFor="email">Répéter le nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="repeatedNewPassword"
            value={this.state.repeatedNewPassword}
            onChange={this.onChange}
            required
          />
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

export default EditPassword;
