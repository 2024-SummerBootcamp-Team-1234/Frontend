import { useNavigate } from 'react-router-dom';
import MainPageWhiteButton from '../components/MainPageWhiteButton';
import MainPageBlackButton from '../components/MainPageBlackButton';

import axiosInstance from '../components/axiosInstance';

const MainPage2: React.FC = () => {
  const navigate = useNavigate();

  const startButtonClick = () => {
    navigate('/CategoryPage');
  };
  const forumButtonClick = () => {
    navigate('/LatestPostPage');
  };
  const myTrialButtonClick = () => {
    navigate('/');
  };

  const logoutButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // 토큰 확인용 로그

      if (token) {
        await axiosInstance.delete(
          'http://localhost:8000/api/v1/users/logout', // 로그아웃 엔드포인트
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Logout successful');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      // 토큰 삭제 및 리디렉션
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    }
  };

  return (
    <div className="flex-col items-center space-y-72 bg-black bg-custom-image bg-center-bottom bg-solomon-size bg-contain bg-no-repeat min-h-screen">
      <div className="flex justify-end pt-6 pr-24 space-x-4">
        <MainPageBlackButton text="My trial" onClick={myTrialButtonClick} />
        <MainPageBlackButton text="Logout" onClick={logoutButtonClick} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-col pl-8">
          <div className="text-white font-sans font-bold text-6xl">
            Welcome to
          </div>
          <div className="text-white font-sans font-extrabold text-8xl">
            SOLOMON
          </div>
        </div>

        <div className="flex-col justify-between mr-10 w-1/4">
          <div className="text-gray-500 font-sans font-normal text-2xl mr-10">
            If you want Solomon’s Judgment, press the Start button. If you want
            to see others' judgments, press the Forum button.
          </div>
          <div className="flex mt-4 mr-10 space-x-4">
            <MainPageWhiteButton text="Start" onClick={startButtonClick} />
            <MainPageWhiteButton text="Forum" onClick={forumButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
