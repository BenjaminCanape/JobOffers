import axios from 'axios';
import AuthentificationAction from '../actions/AuthentificationActions';

class AuthentificationService {
	login(email, password) {
		// We call the server to log the user in.
		return axios.post('/users/login', { email, password }).then(result => {
			//call the action to log the user in
			AuthentificationAction.loginUser(result.data.token, result.data.user);
		});
	}

	logout() {
		return AuthentificationAction.logoutUser();
	}
}

export default new AuthentificationService();
