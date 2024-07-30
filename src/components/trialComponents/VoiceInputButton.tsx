import React, { useState, useRef } from 'react';

// SpeechRecognition 타입 정의
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: () => void;
  onspeechend: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

interface VoiceInputButtonProps {
  onClick: (transcript: string) => void;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onClick }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const handleVoiceInputClick = () => {
    console.log('Voice input button clicked--------------------------------');

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech SpeechRecognition.');
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
        setIsListening(false);
        console.log('Speech recognition stopped');
      };

      recognition.onresult = (event: any) => {
        const interimTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        if (event.results[0].isFinal) {
          insertAtCursor(interimTranscript); // 최종 결과를 커서 위치에 삽입
          onClick(interimTranscript);
        } else {
          // Interim result handling can be added if needed
          console.log('Interim result:', interimTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current?.stop(); // 음성 인식 종료
    } else {
      recognitionRef.current?.start(); // 음성 인식 시작
    }
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

  return (
    <button
      className={`w-[440px] h-[82px] flex justify-around items-center border rounded-3xl font-sans font-light text-3xl transition-colors duration-300 
        ${isListening ? 'bg-DimGrayColor text-black font-medium' : 'bg-black text-white bg-opacity-85 hover:bg-DimGrayColor hover:bg-opacity-85 hover:text-black hover:font-medium'}`}
      onClick={handleVoiceInputClick}
    >
      <span className="ml-3 bg-microphone-image w-[30px] h-[36.65px]" />
      <span className="mr-20">
        {isListening ? '음성인식 중지하기' : '음성으로 입력하기'}
      </span>
    </button>
  );
};

export default VoiceInputButton;
