import axios from "axios";

// 1. Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// // 2. 요청 인터셉터 (ex. 토큰 추가)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // // 예: 401이면 로그인 페이지로 이동
    // if (error.response?.status === 401) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
