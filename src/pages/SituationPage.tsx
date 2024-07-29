import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ScrollableBox2, { ScrollableBoxRef } from '../components/ScrollableBox2';
import api from '../api'; // API 호출을 위한 모듈을 불러옵니다.

function SituationPage() {
  const scrollableBoxRef = useRef<ScrollableBoxRef>(null);
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [channelId, setChannelId] = useState<string | null>(null);

  const insertAtCursor = (text: string) => {
    if (scrollableBoxRef.current) {
      const currentValue = scrollableBoxRef.current.getValue();
      const newText = currentValue + text;
      scrollableBoxRef.current.setValue(newText);
    }
  };

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
      recognition.lang = 'ko-KR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
      };

      recognition.onspeechend = () => {
        console.log('Speech recognition stopped');
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        if (finalTranscript) {
          insertAtCursor(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const createChannel = async () => {
    try {
      const response = await api.post('/channels/');
      setChannelId(response.data.id); // 채널 ID 저장
      console.log('Channel created successfully:', response.data.id);
      return response.data.id;
    } catch (error) {
      console.error('채널 생성 실패:', error);
      return null;
    }
  };

  const handleButtonClick = async () => {
    const { categoryIds } = location.state || { categoryIds: [] };
    const combinedMessages = scrollableBoxRef.current?.getValue() || '';
    const newChannelId = await createChannel(); // 채널 생성 및 ID 가져오기

    if (newChannelId) {
      navigate('/ChoicePage', {
        state: { combinedMessages, channelId: newChannelId, categoryIds },
      });
    } else {
      alert('채널 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="flex w-screen h-screen bg-cover bg-center bg-summary-image">
        <div className="flex-col w-[45%] h-[100%] p-4">
          <div className="w-[100%] h-[10%]"></div>
          <div className="flex w-[100%] h-[80%] items-end bg-contain bg-no-repeat bg-center-bottom bg-judge-image">
            <div className="flex flex-col w-[100%] h-[30%] bg-contain bg-no-repeat bg-center bg-judgeChat-image items-center justify-center ">
              <div className="text-white text-2xl mt-4">
                상황을 기정사실에 근거하여 자세하게 설명해주십시오.
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col w-[60%] h-[100%] items-end p-12">
          <div className="w-[100%] h-[10%] "></div>
          <div className="w-[100%] h-[70%] bg-black rounded-2xl opacity-90 border-solid border-white border-2">
            <div className="flex w-[100%] h-[100%]">
              <ScrollableBox2
                ref={scrollableBoxRef}
                initialContent=""
                className="h-[100%] w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-row w-[100%] h-[15%] content-center items-center space-x-[47px]">
            <button
              className="flex items-center justify-center w-[50%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white border-2 font-sans hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner text-2xl text-white space-x-2"
              onClick={handleMicClick}
            >
              <div className="w-6 h-6 bg-contain bg-no-repeat bg-mic-image mr-4"></div>
              {isListening ? '멈추기' : '음성으로 입력하기'}
            </button>
            <button
              className="flex items-center justify-center w-[50%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white border-2 font-sans hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner text-2xl text-white"
              onClick={handleButtonClick}
            >
              계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SituationPage;
