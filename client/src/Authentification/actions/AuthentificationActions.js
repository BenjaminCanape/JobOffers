import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  loginUser: (jwt, user) => {
    var isUserAuthentificated = localStorage.getItem('jwtToken');

    if (isUserAuthentificated === 'undefined' || !isUserAuthentificated) {
      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      jwt = isUserAuthentificated;
      user = JSON.parse(localStorage.getItem('user'));
    }

    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      jwt: jwt,
      user: user,
    });
  },
  logoutUser: () => {
    return new Promise(function(resolve, reject){
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');

      AppDispatcher.dispatch({
        actionType: 'LOGOUT_USER',
      });
      resolve();
    });
  },
};
