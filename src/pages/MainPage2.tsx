import { useNavigate } from 'react-router-dom';
import MainPageWhiteButton from '../components/MainPageWhiteButton';
import MainPageBlackButton from '../components/MainPageBlackButton';

const MainPage2: React.FC = () => {
  const navigate = useNavigate();

  const startButtonClick = () => {
    navigate('/');
  };
  const forumButtonClick = () => {
    navigate('/');
  };
  const myTrialButtonClick = () => {
    navigate('/');
  };
  const logoutButtonClick = () => {
    navigate('/');
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
