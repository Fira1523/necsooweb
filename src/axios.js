import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the port if your backend runs on a different port
});

export default instance;