import axios from "axios";

const axiosclient = axios.create({
  baseURL: "https://quehub-for-exam-purpose-2001.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosclient;
