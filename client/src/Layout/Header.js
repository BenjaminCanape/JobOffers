import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';
import { withRouter} from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import userCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import list from '@fortawesome/fontawesome-free-solid/faList';
import plusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import home from '@fortawesome/fontawesome-free-solid/faHome';

import AuthentificationStore from '../Authentification/stores/AuthentificationStore';
import AuthentificationService from '../Authentification/services/AuthentificationService';

import './Header.css';

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
    await AuthentificationService.logout();
    this.props.history.push('/');
  }

  render() {
    let isRecruiter = this.isRecruiter();

    return (
      <div>
        <Navbar expand="md">
          <NavbarBrand href="/">
            <FontAwesomeIcon icon={home} /> &nbsp;&nbsp;
            {this.getConnectedUser() ? <span>Bonjour {this.getConnectedUser().firstName}, </span> : <span>Site d'offres d'emploi</span>}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="navbar-dark"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
            {isRecruiter && <NavLink href="/myOffers"><FontAwesomeIcon icon={list} /> Mes offres</NavLink>}
            {isRecruiter && <NavLink href="/add"><FontAwesomeIcon icon={plusSquare} /> Ajouter</NavLink>}
            {this.state.userLoggedIn && <NavLink href="/myprofile"><FontAwesomeIcon icon={userCircle} /> Mon profil</NavLink>}
            {!this.state.userLoggedIn && (
              <NavLink href="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Se connecter
              </NavLink>
            )}
            {this.state.userLoggedIn && <NavLink onClick={() => this.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Se déconnecter</NavLink>}
            </ Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
)