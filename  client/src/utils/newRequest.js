import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://earnup.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
