import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ChoicePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 이전 페이지에서 전달된 데이터를 가져옵니다.
  const { combinedMessages, channelId, categoryIds } = location.state || {
    combinedMessages: '',
    channelId: '',
    categoryIds: [],
  };

  const handleResultClick = () => {
    navigate('/ResultPage', {
      state: {
        combinedMessages,
        channelId,
        categoryIds,
      },
    });
  };

  const handleParticipationClick = () => {
    navigate('/JudgePageCopy2', {
      state: {
        combinedMessages,
        channelId,
        categoryIds,
      },
    });
  };

  return (
    <div className="flex w-screen h-screen bg-cover bg-center bg-summary-image items-center">
      <div className="flex-col w-[27%] h-[100%] p-4"></div>
      <div className="flex-col  w-[60%] h-[80%]   bg-contain bg-judge-image  items-center  justify-center bg-center bg-no-repeat ">
        <div className="flex-col w-[100%] h-[55%]"></div>
        <div className="flex-col w-full h-[30%]  bg-black rounded-2xl opacity-90 border-solid justify-center items-center   border-white border-2 ">
          <div className="text-white text-2xl flex justify-center items-center h-full">
            상황을 확인하였습니다. 다음 2가지 선택 중 1가지를 선택해주세요.
          </div>
        </div>
        <div className="flex flex-row w-[100%] h-[18%] content-center items-center space-x-[47px]">
          <button
            className="flex items-center justify-center w-[50%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white border-2 font-sans hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner  text-2xl text-white  space-x-2"
            onClick={handleResultClick}
          >
            바로 결과보기
          </button>
          <button
            className="flex items-center justify-center w-[50%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white border-2 font-sans  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner text-2xl text-white"
            onClick={handleParticipationClick}
          >
            재판 참여하기
          </button>
        </div>
      </div>
      <div className="flex-col w-[27%] h-[100%] p-4"></div>
    </div>
  );
}

export default ChoicePage;
