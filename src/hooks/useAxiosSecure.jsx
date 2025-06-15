import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logout } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // === Request Interceptor ===
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user && user.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // === Response Interceptor ===
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If unauthorized or token expired
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error("Unauthorized, logging out...");
          await logout(); // your logout function from context
          navigate("/login"); // redirect to login
        }

        return Promise.reject(error);
      }
    );

    // Clean up interceptors when component unmounts or user changes
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
