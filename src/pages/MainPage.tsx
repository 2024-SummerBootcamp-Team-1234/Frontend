
import { useNavigate } from 'react-router-dom';
import MainPageButton from '../components/MainPageButton';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-black bg-custom-image bg-cover bg-center-bottom min-h-screen">
      <div style={{ position: 'absolute', top: '37%', left: '5%' }} className="text-white font-sans font-bold text-6xl">Welcome to</div>
      <div style={{ position: 'absolute', top: '45%', left: '5%' }} className="text-white font-sans font-extrabold text-8xl">SOLOMON</div>
      <div style={{ position: 'absolute', top: '33%', left: '75%' }} className="text-gray-500 font-sans font-normal text-2xl mr-16">
        Unlock the power of AI-driven justice with our cutting-edge AI judge. Streamline your legal processes, make informed decisions, and achieve unparalleled accuracy.
      </div>
      <div style={{ position: 'absolute', top: '56%', left: '75%' }}> 
        <MainPageButton text='Login' onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default MainPage;

