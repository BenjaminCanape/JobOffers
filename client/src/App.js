import React, { Component } from 'react';
import './App.css';

import AuthentificateActions from './Authentification/actions/AuthentificationActions';

class App extends Component {
	render() {
		let jwt = localStorage.getItem('jwtToken');
		if (jwt) {
			AuthentificateActions.loginUser(jwt);
		}

		return (
			<div/>
		);
	}
}

export default App;
