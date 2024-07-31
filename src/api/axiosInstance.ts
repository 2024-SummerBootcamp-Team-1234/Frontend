import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const response = await axiosInstance.post('/users/refresh', {
          refresh: refreshToken,
        });
        const newToken = response.data.access;
        localStorage.setItem('token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 중 에러 발생:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        const navigate = useNavigate();
        navigate('/login'); // 필요에 따라 로그인 페이지로 리다이렉트
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
