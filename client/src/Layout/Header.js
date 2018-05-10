import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from "reactstrap";

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
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
