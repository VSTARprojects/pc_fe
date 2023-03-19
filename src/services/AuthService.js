import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

class AuthService {
  // Login method to authenticate the user and retrieve a token
  login(username, password) {
    return axios
      .post(API_URL + '/token/login/', {
        "username": username,
        "password": password,
      })
      .then((response) => {
        if (response.data.auth_token) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // Logout method to remove the user token from local storage
  logout() {
    sessionStorage.removeItem('user');
  }

  // Check if the user is logged in and has a token
  isLoggedIn() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.auth_token) {
      return true;
    }

    return false;
  }

  // Get the user token
  getToken() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.auth_token) {
      return user.auth_token;
    }

    return null;
  }

  // Get the user information from the token
  getUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.auth_token) {
      return user;
    }

    return null;
  }
}

export default new AuthService();