import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from "reactstrap";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSignInAlt from "@fortawesome/fontawesome-free-solid/faSignInAlt";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";

// Header component
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  getConnectedUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem("jwtToken");
    return !!token;
  }

  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    window.location.reload();
  }

  render() {
    let loggedIn = this.loggedIn();

    return (
      <div>
        <Navbar expand="md">
          <NavbarBrand href="/">
            { this.getConnectedUser() && <span>Bonjour {this.getConnectedUser().firstName}, </span>}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar />
            {loggedIn &&
              <NavLink href="/add">Ajouter</NavLink>
            }
            {!loggedIn && (
              <NavLink href="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
              </NavLink>
            )}
            {loggedIn && <FontAwesomeIcon icon={faSignOutAlt} onClick={() => this.logout()} />}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
