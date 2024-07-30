import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollableBox from '../components/ScrollableBox';
import audioData from '../SitAudio.json';

interface LocationState {
  combinedMessages: string[];
  channelId: string;
  categoryIds: string[];
}

interface AudioData {
  summary_audio: string; // 추가된 속성
}

function SummaryPage() {
  const [chars, setChars] = useState<string[]>([]);
  const navigate = useNavigate();

  const location = useLocation();
  const { combinedMessages, channelId, categoryIds } = (location.state ||
    {}) as LocationState;

  const handleButtonClick = () => {
    navigate('/', {
      state: {
        combinedMessages,
        channelId,
        categoryIds,
      },
    });
  };

  useEffect(() => {
    console.log('Component mounted or channel_id changed:', channelId);
    if (!channelId) {
      console.error('Channel ID is required');
      return;
    }

    const channelIdNumber = parseInt(channelId, 10); // channel_id를 숫자로 변환합니다.
    if (isNaN(channelIdNumber)) {
      console.error('Invalid Channel ID');
      return;
    }

    // 첫 세 개의 combinedMessages만 사용하도록 수정
    const relevantMessages = combinedMessages.slice(0, 3);
    const taggedMessages = relevantMessages.map((message, index) => {
      let tag = '';
      switch (index) {
        case 0:
          tag = '상황: ';
          break;
        case 1:
          tag = '원고 주장: ';
          break;
        case 2:
          tag = '피고 주장: ';
          break;
        default:
          tag = '';
      }
      return `${tag}${message}`;
    });

    // 페이지 로드 시 POST 요청 보내기
    const aiRespond = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/channels/messages/${channelId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: taggedMessages }),
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
          if (!done) {
            partialChunk = lines.pop() || '';
          } else {
            partialChunk = '';
          }

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonPart = line.substring(6).trim();
              if (jsonPart.length > 0) {
                try {
                  const data = JSON.parse(jsonPart);
                  if (data.content) {
                    setChars((prevChars) => [...prevChars, data.content]);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', error, jsonPart);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error posting message:', error);
      }
    };

    aiRespond();
  }, [channelId, combinedMessages]);

  const playAudio = (base64Audio: string) => {
    const audioBlob = base64ToBlob(base64Audio, 'audio/wav');
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    setTimeout(() => {
      audio.play();
    }, 2000); // 2초 딜레이
  };

  const base64ToBlob = (base64: string, mime: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  };

  useEffect(() => {
    const audio = audioData as unknown as AudioData; // JSON 파일에서 AudioData 타입으로 가져오기
    const base64Audio = audio.summary_audio; // JSON 파일에서 base64 문자열 가져오기
    playAudio(base64Audio);
  }, []);

  return (
    <>
      <div className="flex w-screen h-screen bg-cover bg-center bg-summary-image">
        {/* 왼쪽 가로 45% 박스 */}
        <div className="flex-col w-[45%] h-[100%] p-4 pb-16">
          <div className="w-[100%] h-[20%]"></div>
          <div className="flex w-[100%] h-[80%] items-end bg-contain bg-no-repeat bg-center-bottom bg-judge-image">
            <div className="flex flex-col w-[100%] h-[30%] bg-contain bg-no-repeat bg-center-bottom bg-judgeChat-image justify-center items-center">
              <div className="text-white text-2xl mt-4">
                안녕하세요. 현재까지 적은 내용을 정리해드리겠습니다.
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 가로 55% 박스 */}
        <div className="flex-col w-[55%] h-[100%] justify-end p-12 pb-[66px] pr-16">
          {/* 위에 15% 박스 */}
          <div className="w-[100%] h-[12%]"></div>

          {/* 중간 75% 박스 */}
          <div className="w-[100%] h-[75%] bg-black rounded-2xl opacity-90 border-solid border-white border">
            <div className="flex w-[100%] h-[100%]">
              <ScrollableBox content={chars} className="h-[100%] w-[100%]" />
            </div>
          </div>

          {/* 하단 10% 박스 */}
          <div className="flex-col w-[100%] h-[13%] content-end">
            <button
              className="w-[100%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white hover:bg-zinc-900 border font-sans text-white text-[20px]"
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

export default SummaryPage;
