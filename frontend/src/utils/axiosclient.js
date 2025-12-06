import axios from "axios";

const axiosclient = axios.create({
  baseURL: 'https://quehub-for-exam-purpose-1.onrender.com/',
  withCredentials:true,
  headers: {'content-type': 'application/json'}
});

export default axiosclient ;