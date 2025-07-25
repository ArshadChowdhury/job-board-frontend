import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const adminAuthDataString = localStorage.getItem("adminAuthData");

    if (adminAuthDataString) {
      try {
        const adminAuthData = JSON.parse(adminAuthDataString); // Parsing the string back into an object
        const token = adminAuthData.access_token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Error parsing adminAuthData from localStorage:", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminAuthData");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
