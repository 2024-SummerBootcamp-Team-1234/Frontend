import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 컴포넌트 불러오는 import 문
import InputScrollableBox from '../components/trialComponents/InputScrollableBox';
import VoiceInputButton from '../components/trialComponents/VoiceInputButton';
import SubmitButton from '../components/trialComponents/SubmitButton';
import LawyerInfo from '../components/trialComponents/LawyerInfo';

// image를 URL로 받아오고 있음
import DefendantLawyer from '../public/DefendantLawyer.png';

const PlaintiffTrial: React.FC = () => {
  const [inputDefendantText, setInputDefendantText] = useState('상황 입력 : ')
  const [isMounted, setIsMounted] = useState(false); // 애니매이션 넣기

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (newValue: string) => {
    setInputDefendantText(newValue);
  };

  const handleVoiceInputClick = (newTranscript: string) => {
    console.log('Voice input button clicked');
    setInputDefendantText((prevText) => prevText + newTranscript);
  };

  const handleSubmitClick = () => {
    const { categoryIds } = location.state || { categoryIds: [] };
    const { inputPlaintiffText } = location.state || { inputPlaintiffText: '' };

    console.log('Submit Category Ids : ', categoryIds);
    console.log('Submit Plaintiff Text : ', inputPlaintiffText);
    console.log('Submit Defendant Text : ', inputDefendantText);

    navigate('/ ', { state: { categoryIds, inputPlaintiffText, inputDefendantText } })
  };

  return (
    <div className="bg-trialBg-image bg-cover bg-center w-screen h-screen flex justify-center">
      <div className={`flex items-center h-full ${isMounted ? 'fade-in' : ''}`}>
        <LawyerInfo
          imageUrl={DefendantLawyer}
          title="피고측 변호사"
          description="피고의 입장과 요구를 입력해봅시다."
        />
      </div>

      <div className={`h-full bottom-1/9 inline-flex flex-col justify-center ml-9 ${isMounted ? 'fade-in' : ''}`}>
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