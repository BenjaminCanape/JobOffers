import React, { Component } from 'react';
import './App.css';
import Header from './Layout/Header';

import AuthentificateActions from './Authentification/actions/AuthentificationActions';

class App extends Component {
	render() {
		let jwt = localStorage.getItem('jwtToken');
		if (jwt) {
			AuthentificateActions.loginUser(jwt);
		}

		return (
			<div>
				<Header />
			</div>
		);
	}
}

export default App;
