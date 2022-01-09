import axios from "axios";

const setAuthToken = token => {
  if (token) {
    console.log("🚀 ~ file: setAuthToken.js ~ line 5 ~ token", token)
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["Action"] = 'default';
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;