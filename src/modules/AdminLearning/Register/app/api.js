import axios from "axios";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
  },
});

// interceptor
requester.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    req.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return req;
});

export default requester;
