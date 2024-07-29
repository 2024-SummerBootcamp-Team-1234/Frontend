import React, { useState, useEffect } from 'react';

interface LawyerInfoProps {
  imageUrl: string;
  title: string;
  description: string;
}

const LawyerInfo: React.FC<LawyerInfoProps> = ({imageUrl, title, description}) => {

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // description이 변경될 때마다 상태 초기화

    const desc = description || '입력된 설명이 없습니다.';
    console.log('Description received:', desc);
    console.log(desc.length);

    const updateText = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 페이지가 열릴 때 1초 딜레이 추가
      for (let index = 0; index < desc.length; index++) {
        setDisplayedText((prev) => {
          const newText = prev + desc[index];
          console.log('desc index : ', index, desc[index]);
          console.log('New text:', newText); // 로그로 새로운 텍스트 출력
          return newText;
        });
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 대기
      }
    };

    updateText();
  }, [description]);

// 현재 한글자씩 글자가 나오는것 맞지만 재렌더링이 되기 때문에 쓸데없는 작업을 많이 하게됌

  return (
    <div
      className="flex flex-col justify-center w-full h-full bg-bottom bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="w-[700px] h-[590px] mb-9"></div>
      <div className="relative bg-black bg-opacity-85 border text-white rounded-3xl w-[700px] h-[180px] flex flex-col">
        <div className="absolute top-[-40px] left-8 bg-black bg-opacity-90 border text-white px-6 rounded-3xl">
          <h2 className="text-3xl font-light">{title}</h2>
        </div>
        <div className="h-full flex justify-center items-center text-3xl font-light">
          <p>{displayedText}</p>
        </div>
      </div>

    </div>
  );
};

export default LawyerInfo;