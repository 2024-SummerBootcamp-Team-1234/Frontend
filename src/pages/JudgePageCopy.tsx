import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import Background from '../assets/Background.png';
import Chatting from '../assets/Chatting.png';
import Mic from '../assets/Mic.png';
import Send from '../assets/Send.png';
import UserMessageBlack from '../components/UserMessageBlack';
import AiMessageBlack from '../components/AiMessageBlack';
import ChatButton from '../components/ChatButton';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChatMessage {
  message: string;
  sender: 'user' | 'ai';
  showButtons?: boolean; // 버튼을 표시할지 여부를 나타내는 속성 추가
}

declare global {
  type SpeechRecognition = any;
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

const JudgePageCopy: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  //const [isAiTurn, setIsAiTurn] = useState(true); // AI가 메시지를 보낼 차례인지 여부를 나타내는 상태
  const [isListening, setIsListening] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [channelId, setChannelId] = useState<string | null>(null);
  const [combinedMessages, setCombinedMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messageToSendRef = useRef<string>(''); // 메시지를 저장할 ref 추가

  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const { categoryIds } = location.state || { categoryIds: [] };

    navigate('/ResultPage', {
      state: { combinedMessages, channelId, categoryIds },
    });
  };

  const handleButtonClick2 = () => {
    const { categoryIds } = location.state || { categoryIds: [] };
    navigate('/JudgePageCopy2', {
      state: { combinedMessages, channelId, categoryIds },
    });
  };

  // AI의 첫 번째 메시지
  useEffect(() => {
    const initialAiMessage =
      '안녕하세요. 솔로몬 AI입니다. 당신의 상황을 정확히 알아야합니다. 아래 프롬프트에 당신의 상황을 입력해주세요.';
    setMessages([{ message: initialAiMessage, sender: 'ai' }]);

    // 채팅이 시작되면 채널을 생성하기 위한 POST 요청
    const createChannel = async () => {
      try {
        const response = await api.post('/channels/');
        setChannelId(response.data.id); // 채널 ID 저장
        console.log('Channel created successfully:', response.data.id);
      } catch (error) {
        console.error('채널 생성 실패:');
      }
    };

    createChannel();
  }, []);

  // AI가 응답하는 함수
  const aiRespond = () => {
    const aiResponses = ['다음 2가지 선택 중 1가지를 선택해주세요.'];
    const randomResponse =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: randomResponse,
        sender: 'ai',
        showButtons: randomResponse.includes(
          '다음 2가지 선택 중 1가지를 선택해주세요.',
        ),
      },
    ]);
    //setIsAiTurn(false); // AI 응답 후에는 사용자가 메시지를 보낼 차례
  };

  // 메시지를 전송하고 AI 응답을 처리하는 함수
  const sendMessage = () => {
    if (!newMessage.trim()) return; // 빈 메시지 방지

    // newMessage를 messageToSendRef에 저장
    messageToSendRef.current = newMessage;

    // 사용자 메시지를 화면에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, sender: 'user' },
    ]);
    setCombinedMessages((prevMessages) => [...prevMessages, newMessage]);

    setNewMessage(''); // 메시지를 보낸 후 입력 필드를 비웁니다.
    //setIsAiTurn(true); // 사용자가 메시지를 보낸 후에는 AI가 응답할 차례

    // AI가 응답하도록 설정 (딜레이를 줄 수도 있음)
    setTimeout(aiRespond, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 음성인식 부분
  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR'; // Korean language
      recognition.continuous = true; // Continuous recognition
      recognition.interimResults = true; // Get interim results

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
      };

      recognition.onspeechend = () => {
        console.log('Speech recognition stopped');
      };

      recognition.onresult = (event: any) => {
        const interimTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        if (event.results[0].isFinal) {
          insertAtCursor(interimTranscript); // 최종 결과를 커서 위치에 삽입
        } else {
          // Interim result handling can be added if needed
          console.log('Interim result:', interimTranscript);
        }
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // Automatically restart recognition if still listening
        }
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    setCursorPosition(e.target.selectionStart);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    setCursorPosition((e.target as HTMLTextAreaElement).selectionStart);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = cursorPosition;
      const end = textarea.selectionEnd;
      const newText =
        newMessage.substring(0, start) + text + newMessage.substring(end);
      setNewMessage(newText);
      setCursorPosition(start + text.length);
      textarea.setSelectionRange(start + text.length, start + text.length);
    }
  };

  // 컴포넌트가 화면에 렌더링하는 부분입니다.
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      // 배경 이미지를 설정합니다.
      style={{ backgroundImage: `url(${Background})` }}
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
                      <UserMessageBlack message={msg.message} />
                    ) : (
                      <AiMessageBlack message={msg.message} />
                    )}
                    {/* AI 메시지 후 버튼을 표시해야 하는 경우 */}
                    {msg.showButtons && (
                      <div className="flex flex-col items-end">
                        <ChatButton
                          text="바로 결과보기"
                          onClick={handleButtonClick}
                        />
                        <ChatButton
                          text="재판 참여하기"
                          onClick={handleButtonClick2}
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
          <div className="flex items-center bg-black bg-opacity-70 text-white rounded-3xl py-4 px-3 w-[100%] ">
            <button onClick={isListening ? stopListening : handleMicClick}>
              <img src={Mic} alt="Mic" className="h-[2.5vh] ml-2" />{' '}
              {/* 마이크 아이콘 버튼 */}
            </button>
            <textarea
              ref={textareaRef}
              placeholder="이곳에 내용을 적어주세요" // 안내 문구입니다.
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none ml-[2%] resize-none overflow-y-auto"
              value={newMessage} // 입력 필드의 값을 상태와 연결합니다.
              onChange={handleInputChange} // 입력 필드의 값이 바뀔 때 상태를 업데이트합니다.
              onClick={handleTextareaClick}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }} // 엔터 키를 누르면 메시지를 보냅니다.
              style={{ maxHeight: '25px' }} // 최대 높이 설정
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
export default JudgePageCopy;
