import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from "reactstrap";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSignInAlt from "@fortawesome/fontawesome-free-solid/faSignInAlt";

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
  render() {
    return (
      <div>
        <Navbar expand="md">
          <NavbarBrand href="/">Job offers App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar />

            <NavLink href="/add">Ajouter</NavLink>
            <NavLink href="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </NavLink>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
