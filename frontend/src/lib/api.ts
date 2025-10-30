import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
