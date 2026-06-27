import axios from "axios";

// const API_URL = "https://project9-mern-28635bbac960.herokuapp.com/api/user";
const API_URL = "http://localhost:8080/api/user";
// const API_URL = "http://172.30.1.16:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    //"http://localhost:8080/api/user/register"是我們後端所製作出來的route
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();

export default authService;
