import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Très important pour envoyer les cookies de session
});

export default api;