import React, { useState } from 'react';
import Background from '../assets/Background.png';
import Chatting from '../assets/Chatting.png';
import Mic from '../assets/Mic.png';
import Send from '../assets/Send.png';
import Profile from '../assets/Profile.png';

const JudgePage: React.FC = () => {
  return (
    <div
      className="w-screen h-screen  bg-cover bg-center "
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-screen h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center ">
        <div className=" h-[800px] w-[1000px]   flex flex-col items-center justify-center">
          <div
            className="w-[1000px] h-[600px]  flex flex-col items-center justify-center px-20 py-20 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${Chatting})` }}
          >
            <div className="w-full h-full overflow-y-auto flex flex-col-reverse">
              <div className="w-full h-fit flex flex-col justify-center text-white pr-3">
                <div className="flex justify-end items-center my-3">
                  <div className="min-w-1/4 max-w-[75%] min-h-[10vh] flex-wrap bg-black p-3 rounded-2xl flex items-center border-2 border-white">
                    <p>
                      현재 남편이 바람펴서 이혼하는 상황이야. 재산분할은
                      어떻게재산분할은 어떻게재산분할은 어떻게재산분할은
                      어떻게재산분할은 어떻게재산분할은 어떻게재산분할은
                      어떻게재산분할은 어떻게재산분할은 어떻게재산분할은
                      어떻게재산분할은 어떻게
                      될까?어떻게재산분할은어떻게재산분할은어떻게재산분할은어떻게재산분할은어떻게재산분할은
                    </p>
                  </div>
                </div>
                <div className="flex items-center my-3">
                  <img
                    src={Profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4 mb-7"
                  />
                  <div className="w-[40%] min-h-[10vh] bg-black p-4 rounded-xl flex items-center border-2 border-white">
                    <p>
                      상황을 확인하였습니다. 다음 2가지 선택 중 1가지를
                      선택해주세요.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end items-center h-[150px]">
                  <div className="flex flex-col items-center gap-y-4">
                    <button className="bg-gray-700  text-white py-2 px-4 rounded-3xl  w-[160px]">
                      <p> 바로 결과보기</p>
                    </button>
                    <button className="bg-gray-700 text-white py-2 px-4 rounded-3xl  w-[160px]">
                      <p>재판 참여하기</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-black bg-opacity-70  text-white rounded-3xl py-4 px-3 w-[100%]  h-[60px]  ">
            <button>
              <img src={Mic} alt="Mic" className="w-4/5 h-[3vh] ml-2" />
            </button>
            <input
              type="text"
              placeholder="이곳에 내용을 적어주세요"
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none ml-[2%]"
            />
            <button>
              <img
                src={Send}
                alt="Send"
                className="w-[85%] h-[3vh] mr-[0.2%]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgePage;