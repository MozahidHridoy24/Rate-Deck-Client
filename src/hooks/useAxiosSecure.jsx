import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { getIdToken } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const setToken = async () => {
      if (user) {
        const token = user.accessToken;
        axiosInstance.interceptors.request.use((config) => {
          config.headers.authorization = `Bearer ${token}`;
          return config;
        });
      }
    };

    setToken();
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
