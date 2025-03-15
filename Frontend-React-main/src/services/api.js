import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: apiUrl,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
