import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 컴포넌트 불러오는 import 문
import InputScrollableBox from '../components/trialComponents/InputScrollableBox';
import VoiceInputButton from '../components/trialComponents/VoiceInputButton';
import SubmitButton from '../components/trialComponents/SubmitButton';
import LawyerInfo from '../components/trialComponents/LawyerInfo';

// image를 URL로 받아오고 있음
import DefendantLawyer from '../public/DefendantLawyer.png';

// AI Voice 받아오기 위한 import문
import audioData from '../TrialAudio.json';

interface LocationState {
  combinedMessages: string[];
  categoryIds: string[];
  channelId: string;
}

const PlaintiffTrial: React.FC = () => {
  const [inputDefendantText, setInputDefendantText] = useState('피고 입장 : ');
  const [isMounted, setIsMounted] = useState(false); // 애니매이션 넣기

  const navigate = useNavigate();
  const location = useLocation();
  const { combinedMessages, categoryIds, channelId } =
    (location.state as LocationState) || {
      combinedMessages: [],
      categoryIds: [],
      channelId: '',
    };

  // 오디오 받아오는 함수 시작
  const playAudio = (base64Audio: string) => {
    const audioBlob = base64ToBlob(base64Audio, 'audio/wav');
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
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
    const base64Audio = audioData.DefendantAudioData; // JSON 파일에서 base64 문자열 가져오기
    setTimeout(() => {
      playAudio(base64Audio);
    }, 1000);
  }, []);
  // 오디오 받아오는 함수 끝

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (newValue: string) => {
    setInputDefendantText(newValue);
  };

  const handleVoiceInputClick = (newTranscript: string) => {
    console.log('Voice input button clicked');
    setInputDefendantText(newTranscript);
  };

  // 데이터 보내는 함수 시작
  const handleSubmitClick = () => {
    //const { categoryIds } = location.state || { categoryIds: [] };
    //const { inputPlaintiffText } = location.state || { inputPlaintiffText: '' };

    console.log('Submit Category Ids : ', categoryIds);
    console.log('Submit Channel Id : ', channelId);
    //console.log('Submit Plaintiff Text : ', inputPlaintiffText);
    console.log('Submit Defendant Text : ', inputDefendantText);

    const updatedCombinedMessages = [...combinedMessages];
    updatedCombinedMessages[2] = inputDefendantText;

    // combinedMessages 콘솔로 인덱스 순서대로 출력
    updatedCombinedMessages.forEach((message, index) => {
      console.log(`combinedMessages[${index}] : ${message}`);
    });

    navigate('/SummaryPage', {
      state: {
        categoryIds,
        combinedMessages: updatedCombinedMessages,
        channelId,
      },
    });
  };
  // 데이터 보내는 함수 끝

  return (
    <div className="scroll-hidden bg-trialBg-image bg-cover bg-center w-screen h-screen flex justify-center">
      <div className={`flex items-center h-full ${isMounted ? 'fade-in' : ''}`}>
        <LawyerInfo
          imageUrl={DefendantLawyer}
          title="피고측 변호사"
          description="피고의 입장과 요구를 입력해봅시다."
        />
      </div>

      <div
        className={`h-full bottom-1/9 inline-flex flex-col justify-center ml-9 ${isMounted ? 'fade-in' : ''}`}
      >
        <InputScrollableBox
          initialValue={inputDefendantText}
          placeholder="육하원칙을 따라 자세하게 입력하시현 더 상세한 결과를 기대하실 수 있습니다."
          onChange={handleInputChange}
        />

        <div className="w-[910px] flex justify-between mt-9">
          <VoiceInputButton onClick={handleVoiceInputClick} />
          <SubmitButton onClick={handleSubmitClick} />
        </div>
      </div>
    </div>
  );
};

export default PlaintiffTrial;
