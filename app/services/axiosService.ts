// axiosService.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 2000, // Adjust as needed
});

export default instance;
