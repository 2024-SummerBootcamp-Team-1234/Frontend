import React, { useState, useEffect, useRef } from 'react';
import Background2 from '../assets/Background2.png';
import Chatting from '../assets/Chatting.png';
import Mic from '../assets/Mic.png';
import Send from '../assets/Send.png';
import UserMessage from '../components/UserMessage';
import AiMessage from '../components/AiMessage';
import ChatButton from '../components/ChatButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface ChatMessage {
  message: string;
  sender: 'user' | 'ai';
  showButtons?: boolean; // 버튼을 표시할지 여부를 나타내는 속성 추가
}

const JudgePageCopy2: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  //const [isAiTurn, setIsAiTurn] = useState(true); // AI가 메시지를 보낼 차례인지 여부를 나타내는 상태
  const [isListening, setIsListening] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [aiResponseIndex, setAiResponseIndex] = useState(0); // AI 응답의 현재 인덱스
  const [combinedMessages, setCombinedMessages] = useState<string[]>([]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [, setCurrentAiMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useLocation 훅을 사용하여 현재 페이지로 전달된 데이터를 가져옴.
  const location = useLocation();
  // location.state를 통해 이전 페이지에서 넘겨받은 userInput과 channelId를 추출
  // 만약 state가 없을 경우를 대비해 기본값을 설정
  const { combinedMessages: initialMessages, channelId } = location.state || {
    combinedMessages: [],
    channelId: '',
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ResultPage', {
      state: {
        combinedMessages,
        channelId,
      },
    });
  };

  // AI의 첫 번째 메시지 설정 및 SSE 설정
  useEffect(() => {
    if (channelId) {
      const initialAiMessage = '원고(소송을 제기한 사람)의 입장을 적어주세요.';
      setMessages([{ message: initialAiMessage, sender: 'ai' }]);
      setCombinedMessages(initialMessages);
      setAiResponseIndex(1); // 첫 번째 응답 이후로 인덱스 설정
    }
  }, [channelId]);

  // AI가 응답하는 함수

  const aiResponses = [
    '원고(소송을 제기한 사람)의 입장을 적어주세요.',
    '피고(소송을 당한 사람)의 입장을 적어주세요. 피고의 입장 입력 후에 솔로몬이 입장을 확인할 예정입니다. 틀린 내용이 있다면 최후 변론시간에 고쳐주세요.',
    ' ',
    '원고의 최후 변론을 적어주세요',
    '피고의 최후 변론을 적어주세요',
    '주어진 주장들을 바탕으로 최종 판결을 내리겠습니다. 버튼을 클릭하여 최종 판결문으로 이동해주세요.',
  ];

  const aiRespond = async () => {
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
      if (response === ' ') {
        await getAiResponse();
      } else {
        setIsAiResponding(false);
        setAiResponseIndex(aiResponseIndex + 1);
      }
    }
  };

  const getAiResponse = async () => {
    setIsAiResponding(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/channels/virtual_messages/${channelId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: combinedMessages }),
        },
      );

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let partialChunk = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        partialChunk += chunk;

        const lines = partialChunk.split('\n');

        for (let line of lines) {
          if (line.trim()) {
            // 'data: ' 부분을 제거하고 JSON 파싱 시도
            const cleanedLine = line.replace(/^data: /, '');
            try {
              const parsedLine = JSON.parse(cleanedLine);
              if (parsedLine.content) {
                setCurrentAiMessage((prev) => prev + parsedLine.content + ' ');
                setMessages((prevMessages) => {
                  const lastMessage = prevMessages[prevMessages.length - 1];
                  const updatedMessage =
                    lastMessage && lastMessage.sender === 'ai'
                      ? {
                          ...lastMessage,
                          message:
                            lastMessage.message + parsedLine.content + ' ',
                          sender: 'ai' as 'ai',
                        }
                      : {
                          message: parsedLine.content + ' ',
                          sender: 'ai' as 'ai',
                        };
                  return [...prevMessages.slice(0, -1), updatedMessage];
                });
              }
            } catch (error) {
              console.error(
                'Error parsing JSON:',
                error,
                'at line:',
                cleanedLine,
              );
            }
          }
        }

        if (!done) {
          partialChunk = lines.pop() || '';
        } else {
          partialChunk = '';
        }
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setIsAiResponding(false); // AI 응답이 완료된 후 사용자가 입력할 수 있도록 설정
    }
  };

  // 메시지를 전송하고 AI 응답을 처리하는 함수
  const sendMessage = () => {
    if (!newMessage.trim() || isAiResponding) return; // 빈 메시지 방지

    // 사용자 메시지를 화면에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, sender: 'user' },
    ]);

    // combinedMessages에 새로운 메시지 추가
    setCombinedMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log({ combinedMessages });

    // 메시지를 보낸 후 입력 필드를 비웁니다.
    setNewMessage('');
    //setIsAiTurn(true); // 사용자가 메시지를 보낸 후에는 AI가 응답할 차례

    // AI가 응답하도록 설정 (딜레이를 줄 수도 있음)
    setTimeout(aiRespond, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
export default JudgePageCopy2;
