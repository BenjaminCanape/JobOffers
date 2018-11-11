import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';
import {withRouter} from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

import AuthentificationStore from '../Authentification/stores/AuthentificationStore';
import AuthentificationService from '../Authentification/services/AuthentificationService';

// Header component
export default withRouter( class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      userLoggedIn: AuthentificationStore.isLoggedIn(),
      user: AuthentificationStore.user,
    };
  }

  componentDidMount() {
    AuthentificationStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthentificationStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ userLoggedIn: AuthentificationStore.isLoggedIn(), user: AuthentificationStore.user });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  getConnectedUser() {
    return this.state.user;
  }

  isRecruiter() {
    if (this.state.userLoggedIn) {
      let user = this.getConnectedUser();
      return user.isRecruiter;
    }

    return false;
  }

  async logout() {
    var logout = await AuthentificationService.logout();
    this.props.history.push('/');
  }

  render() {
    let isRecruiter = this.isRecruiter();

    return (
      <div>
        <Navbar expand="md">
          <NavbarBrand href="/">
            {this.getConnectedUser() && <span>Bonjour {this.getConnectedUser().firstName}, </span>}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar />
            {isRecruiter && <NavLink href="/myOffers">Mes offres</NavLink>}
            {isRecruiter && <NavLink href="/add">Ajouter</NavLink>}
            {this.state.userLoggedIn && <NavLink href="/myprofile">Mon profil</NavLink>}
            {!this.state.userLoggedIn && (
              <NavLink href="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
              </NavLink>
            )}
            {this.state.userLoggedIn && <FontAwesomeIcon icon={faSignOutAlt} onClick={() => this.logout()} />}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
)