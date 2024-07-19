// src/api.ts
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// axios 인스턴스를 생성합니다.
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // 기본 URL 설정
});

// 요청 인터셉터를 설정합니다.
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, // 토큰을 요청 헤더에 추가합니다.
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
