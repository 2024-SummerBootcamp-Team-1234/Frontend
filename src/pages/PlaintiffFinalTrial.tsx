import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 컴포넌트 불러오는 import 문
import InputScrollableBox from '../components/trialComponents/InputScrollableBox';
import VoiceInputButton from '../components/trialComponents/VoiceInputButton';
import SubmitButton from '../components/trialComponents/SubmitButton';
import LawyerInfo from '../components/trialComponents/LawyerInfo';

// image를 URL로 받아오고 있음
import PlaintiffLawyer from '../public/PlaintiffLawyer.png';

// AI Voice 받아오기 위한 import문
import audioData from '../TrialAudio.json'

const PlaintiffTrial: React.FC = () => {
  const [inputPlaintiffFinalText, setInputPlaintiffFinalText] = useState('상황 입력 : ')
  const [isMounted, setIsMounted] = useState(false); // 애니매이션 넣기

  const navigate = useNavigate();
  const location = useLocation();

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
    const base64Audio = audioData.PlaintiffFinalAudioData; // JSON 파일에서 base64 문자열 가져오기
    setTimeout(() => {
      playAudio(base64Audio);
    }, 1000);
  }, []);
  // 오디오 받아오는 함수 끝

  // 애니매이션
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (newValue: string) => {
    setInputPlaintiffFinalText(newValue);
  };

  const handleVoiceInputClick = (newTranscript: string) => {
    console.log('Voice input button clicked');
    setInputPlaintiffFinalText(newTranscript);
  };

  // 데이터 보내는 함수 시작
  const handleSubmitClick = () => {
    const { categoryIds } = location.state || { categoryIds: [] };
    const { inputPlaintiffText } = location.state || { inputPlaintiffText: '' };
    const { inputDefendantText } = location.state || { inputDefendantText: '' };

    console.log('Submit Category Ids : ', categoryIds);
    console.log('Submit Plaintiff Text : ', inputPlaintiffText);
    console.log('Submit Defendant Text : ', inputDefendantText);
    console.log('Submit Plaintiff Final Text : ', inputPlaintiffFinalText);

    navigate('/DefendantFinalTrial', { state: { categoryIds, inputPlaintiffText, inputDefendantText, inputPlaintiffFinalText } });
  };
  // 데이터 보내는 함수 끝


  return (
    <div className="scroll-hidden bg-trialBg-image bg-cover bg-center w-screen h-screen flex justify-center">

      <div className={`h-full bottom-1/9 inline-flex flex-col justify-center mr-9 ${isMounted ? 'fade-in' : ''}`}>
        <div className="">
          <InputScrollableBox
            initialValue={inputPlaintiffFinalText}
            placeholder="육하원칙을 따라 자세하게 입력하시면 더 상세한 결과를 기대하실 수 있습니다."
            onChange={handleInputChange}
          />
          <div className="w-[910px] flex justify-between mt-9">
            <VoiceInputButton onClick={handleVoiceInputClick} />
            <SubmitButton onClick={handleSubmitClick} />
          </div>
        </div>
      </div>

      <div className={`flex items-center h-full ${isMounted ? 'fade-in' : ''}`}>
        <LawyerInfo
          imageUrl={PlaintiffLawyer}
          title="원고측 변호사"
          description="원고의 최종변론을 입력해봅시다."
        />
      </div>
    </div>
  );
};

export default PlaintiffTrial;