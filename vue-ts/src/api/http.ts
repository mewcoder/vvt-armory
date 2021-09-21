import axios from "axios";

const http = axios.create({
  timeout: 300,
});

export default http;
