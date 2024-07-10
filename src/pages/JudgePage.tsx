import Background from '../assets/Background.png';
import Chatting from '../assets/Chatting.png';
import Mic from '../assets/Mic.png';
import Send from '../assets/Send.png';
const JudgePage: React.FC = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="h-screen w-screen bg-black bg-opacity-60 flex flex-col items-center justify-center">
        <div
          className="w-3/4 h-3/4 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${Chatting})` }}
        ></div>
        <div className="flex items-center bg-black bg-opacity-70 text-white rounded-3xl py-4 px-3 w-2/3 h-15  mt-4">
          <img src={Mic} alt="Mic" className="w-6 h-6 ml-2" />
          <input
            type="text"
            placeholder="이곳에 내용을 적어주세요"
            className="flex-1 bg-transparent text-white placeholder-white focus:outline-none ml-4"
          />
          <button>
            <img src={Send} alt="Send" className="w-6 h-6 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudgePage;
