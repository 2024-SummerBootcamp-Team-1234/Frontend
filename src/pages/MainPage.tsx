import { useNavigate } from 'react-router-dom';
import MainPageWhiteButton from '../components/MainPageWhiteButton';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
<<<<<<< Updated upstream
    navigate('/Login');
=======
    navigate('/login');
>>>>>>> Stashed changes
  };

  return (
    <div className="flex items-center bg-black bg-custom-image bg-center-bottom bg-solomon-size bg-contain bg-no-repeat min-h-screen">
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
            Unlock the power of AI-driven justice with our cutting-edge AI
            judge. Streamline your legal processes, make informed decisions, and
            achieve unparalleled accuracy.
          </div>
          <div className="mt-4">
            <MainPageWhiteButton text="Login" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
