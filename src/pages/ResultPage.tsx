import { Link, useNavigate } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/MainPage2');
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-cover bg-result.back-image">
      <Link to="/MainPage2" className="absolute top-[73px] left-[59px]">
        <div className="w-12 h-12 bg-home-image bg-cover bg-center"></div>
      </Link>

      <div className=" flex  w-[87%] h-[87%] bg-result-image bg-contain bg-no-repeat bg-center flex flex-col justify-between ">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex w-[58%] h-[68%] bg-texture-image bg-contain bg-no-repeat bg-right items-end justify-end  mt-20 ">
            <div className="flex justify-center space-x-5 mb-7 mr-20">
              <button
                type="button"
                className="w-[280px] h-[58px] bg-[#585858] text-white rounded-[30px] focus:outline-none shadow-inner font-bold text-2xl shadow-xl"
                onClick={handleButtonClick}
              >
                메인 페이지
              </button>
              <button
                type="button"
                className="   w-[280px] h-[58px] bg-[#585858] text-white rounded-[30px] focus:outline-none shadow-inner font-bold text-2xl"
                onClick={handleButtonClick}
              >
                게시판 공유하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
