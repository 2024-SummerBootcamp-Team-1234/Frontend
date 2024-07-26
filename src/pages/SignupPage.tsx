import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';
const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/register',
        {
          id,
          password,
          name,
        },
      );
      console.log(response.data);
      alert('회원가입 성공');
    } catch (error) {
      console.error('error');
      alert('회원가입 실패');
    }
  };

  return (
    <>
      <LoadingPage></LoadingPage>
      <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-login-image">
        <Link to="/login" className="absolute top-[73px] left-[59px]">
          <div className="w-12 h-12 bg-arrow-image bg-cover bg-center"></div>
        </Link>

        <div className="relative w-[692px] h-[694px] bg-white bg-opacity-25 rounded-3xl shadow backdrop-blur-md flex flex-col items-center justify-center p-6">
          <div
            className="text-black font-semibold mb-6 font-sans"
            style={{ fontSize: '50pt' }}
          >
            SIGN UP
          </div>

          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-full max-w-md flex flex-col items-center"
          >
            <div className="mb-6 relative w-[517px]">
              <FaUser className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ID"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full h-[53px] px-4 py-2 pl-[74px] border rounded-[30px] focus:outline-none focus:ring-2 bg-[#E2DFD8] focus:ring-gray-600 shadow-inner"
              />
            </div>
            <div className="mb-6 relative w-[517px]">
              <FaLock className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[517px] h-[53px] px-4 py-2 pl-[74px] border rounded-[30px] focus:outline-none focus:ring-2 bg-WhiteCoffeeColor focus:ring-slate-600 shadow-inner"
              />
            </div>
            <div className="mb-6 relative w-[517px]">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[517px] h-[53px] px-4 py-2 pl-[40px] border rounded-[30px] focus:outline-none focus:ring-2 bg-WhiteCoffeeColor focus:ring-slate-600 shadow-inner"
              />
            </div>

            <div className="mb-6 relative w-[517px]">
              <input
                type="text"
                placeholder="User Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[517px] h-[53px] px-4 py-2 pl-[40px] border rounded-[30px] focus:outline-none focus:ring-2 bg-WhiteCoffeeColor focus:ring-slate-600 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-[517px] h-[53px] bg-black text-white rounded-[30px] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner font-bold text-2xl "
            >
              sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
