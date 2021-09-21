import axios from "axios";

const http = axios.create({
  timeout: 1000,
});

export default http;
