import React, { useState, useEffect, useRef } from 'react';
import Background2 from '../assets/Background2.png';
import Chatting from '../assets/Chatting.png';
import Mic from '../assets/Mic.png';
import Send from '../assets/Send.png';
import UserMessage from '../components/UserMessage';
import AiMessage from '../components/AiMessage';
import ChatButton from '../components/ChatButton';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  message: string;
  sender: 'user' | 'ai';
  showButtons?: boolean; // 버튼을 표시할지 여부를 나타내는 속성 추가
}

const JudgePageCopy2: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTurn, setIsAiTurn] = useState(true); // AI가 메시지를 보낼 차례인지 여부를 나타내는 상태
  const [aiResponseIndex, setAiResponseIndex] = useState(0); // AI 응답의 현재 인덱스
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  // AI의 첫 번째 메시지
  useEffect(() => {
    const initialAiMessage = '원고(소송을 제기한 사람)의 입장을 적어주세요.';
    setMessages([{ message: initialAiMessage, sender: 'ai' }]);
  }, []);

  // AI가 응답하는 함수

  const aiResponses = [
    '원고(소송을 제기한 사람)의 입장을 적어주세요.',
    '피고(소송을 당한 사람)의 입장을 적어주세요.',
    '적어주신 내용을 바탕으로 입장을 정리하도록 하겠습니다. 정리 이후에는 원고와 피고의 최후 변론이 있을 예정입니다. ',
    '원고의 최후 변론을 적어주세요',
    '피고의 최후 변론을 적어주세요',
    '주어진 주장들을 바탕으로 최종 판결을 내리겠습니다. 버튼을 클릭하여 최종 판결문으로 이동해주세요.',
  ];
  // AI의 첫 번째 메시지 설정
  useEffect(() => {
    setMessages([{ message: aiResponses[0], sender: 'ai' }]);
    setAiResponseIndex(1); // 첫 번째 응답 이후로 인덱스 설정
  }, []);

  // AI가 응답하는 함수
  const aiRespond = () => {
    if (aiResponseIndex < aiResponses.length) {
      const response = aiResponses[aiResponseIndex];
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: response,
          sender: 'ai',
          showButtons: response.includes(
            '주어진 주장들을 바탕으로 최종 판결을 내리겠습니다. 버튼을 클릭하여 최종 판결문으로 이동해주세요.',
          ),
        },
      ]);
      setAiResponseIndex(aiResponseIndex + 1);
      setIsAiTurn(false);
    }
  };

  // 메시지를 전송하고 AI 응답을 처리하는 함수
  const sendMessage = () => {
    if (!newMessage.trim()) return; // 빈 메시지 방지

    // 사용자 메시지를 화면에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, sender: 'user' },
    ]);

    setNewMessage(''); // 메시지를 보낸 후 입력 필드를 비웁니다.
    setIsAiTurn(true); // 사용자가 메시지를 보낸 후에는 AI가 응답할 차례

    // AI가 응답하도록 설정 (딜레이를 줄 수도 있음)
    setTimeout(aiRespond, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 컴포넌트가 화면에 렌더링하는 부분입니다.
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      // 배경 이미지를 설정합니다.
      style={{ backgroundImage: `url(${Background2})` }}
    >
      <div className="w-screen h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center">
        <div className="w-[1200px] h-[800px] flex flex-col items-center justify-center">
          <div
            className="w-[1200px] h-[720px] flex flex-col items-center justify-center px-20 py-20 bg-no-repeat bg-center bg-contain"
            // 채팅 배경 이미지를 설정합니다.
            style={{ backgroundImage: `url(${Chatting})` }}
          >
            <div className="w-full h-full overflow-y-auto flex flex-col p-4 scrollbar-thumb-rounded scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <div className="w-full h-fit flex flex-col justify-center gap-y-3 text-white pr-3">
                {/* 메시지 목록을 표시합니다. */}
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    {/* 사용자가 보낸 메시지인 경우 */}
                    {msg.sender === 'user' ? (
                      <UserMessage message={msg.message} />
                    ) : (
                      <AiMessage message={msg.message} />
                    )}
                    {/* AI 메시지 후 버튼을 표시해야 하는 경우 */}
                    {msg.showButtons && (
                      <div className="flex flex-col items-end">
                        <ChatButton
                          text="최종 판결문 보러가기"
                          onClick={handleButtonClick}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          {/* 메시지를 입력하는 부분입니다. */}
          <div className="flex items-center bg-black bg-opacity-70 text-white rounded-3xl py-4 px-3 w-[100%] h-[60px]">
            <button>
              <img src={Mic} alt="Mic" className="h-[2.5vh] ml-2" />{' '}
              {/* 마이크 아이콘 버튼 */}
            </button>
            <input
              type="text" // 텍스트 입력 필드입니다.
              placeholder="이곳에 내용을 적어주세요" // 안내 문구입니다.
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none ml-[2%]"
              value={newMessage} // 입력 필드의 값을 상태와 연결합니다.
              onChange={(e) => setNewMessage(e.target.value)} // 입력 필드의 값이 바뀔 때 상태를 업데이트합니다.
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // 엔터 키를 누르면 메시지를 보냅니다.
            />
            <button onClick={sendMessage}>
              {' '}
              {/* 전송 버튼을 클릭하면 메시지를 보냅니다. */}
              <img src={Send} alt="Send" className="h-[2.5vh] mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// JudgePage 컴포넌트를 내보냅니다. 다른 파일에서 이 컴포넌트를 사용할 수 있게 합니다.
export default JudgePageCopy2;