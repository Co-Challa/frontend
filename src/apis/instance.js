import axios from "axios";

// 1. Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. 요청 인터셉터 (ex. 토큰 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem('token');
      const from = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login=${from}`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
