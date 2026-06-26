import axios from "axios";

const api = axios.create({
  baseURL: "https://clea.hercialabs.com",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export default api;
