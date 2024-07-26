import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import lottiloading from '../lottie/animation.json';

const LoadingPage: React.FC = () => {
  // 로딩 상태를 state로 관리
  const [isLoading, setIsLoading] = useState(true);

  // useEffect를 사용하여 2초 후에 로딩 상태를 false로 변경하여 로딩 페이지를 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timer);
    }; // 컴포넌트가 unmount될 때 타이머를 정리
  }, []);

  // isLoading이 true일 때만 로딩 페이지를 보여줌
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 flex-col">
        {/* 로티 애니메이션 플레이어 */}
        <Lottie
          loop={false}
          animationData={lottiloading}
          play
          speed={1.8}
          style={{ width: '400px', height: '400px' }}
        />

        {/* 로그인 중에 보여줄 컨텐츠 (로딩 메시지 등) */}
        <h2 className="text-[#ECB973] text-[1.5rem] font-light tracking-tight font-YUniverse-B">
          Loading...
        </h2>
      </div>
    );
  }

  // isLoading이 false일 때는 null을 반환하여 아무것도 렌더링하지 않음
  return null;
};

export default LoadingPage;
