import axios from "axios";

const API = axios.create({
  baseURL: "https://income-management.onrender.com/"
});

export default API;
