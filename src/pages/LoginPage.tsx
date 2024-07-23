import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import axiosInstance from '../components/axiosInstance'; // 추가된 부분

const LoginPage: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/MainPage2');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/users/login', {
        id,
        password,
      });

      const { access, refresh } = response.data.token;
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      console.log('로그인 성공');
      navigate('/MainPage2');
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-login-image">
      <Link to="/" className="absolute top-[73px] left-[59px]">
        <div className="w-12 h-12 bg-arrow-image bg-cover bg-center"></div>
      </Link>

      <div className="relative w-[692px] h-[694px] bg-white bg-opacity-25 rounded-3xl shadow backdrop-blur-md flex flex-col items-center justify-center p-6">
        <div
          className="text-black font-semibold mb-6 font-sans"
          style={{ fontSize: '58pt' }}
        >
          LOGIN
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md flex flex-col items-center"
        >
          <div className="mb-6 relative w-[517px]">
            <FaUser className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ID"
              required
              className="w-full h-[53px] px-4 py-2 pl-[74px] border rounded-[30px] focus:outline-none focus:ring-2 bg-[#E2DFD8] focus:ring-gray-600 shadow-inner"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-6 relative w-[517px]">
            <FaLock className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-[517px] h-[53px] px-4 py-2 pl-[74px] border rounded-[30px] focus:outline-none focus:ring-2 bg-[#E2DFD8] focus:ring-slate-600 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-[517px] h-[53px] bg-black text-white rounded-[30px] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner font-bold text-2xl"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-neutral-50 text-[20px] underline mt-[31px] font-sans text-center"
          >
            SIGN UP
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
