interface ScrollableBoxProps {
  content: string;
}

// ScrollableBox라는 함수형 컴포넌트를 만듦. content를 속성으로 받음
const ScrollableBox: React.FC<ScrollableBoxProps> = ({ content }) => {
  return (
    // 네모난 상자 스타일을 적용하고, 내용이 넘칠 때 스크롤 가능하게 설정
    <div className="w-64 h-64 p-4 border border-gray-300 overflow-auto">
      {content}
    </div>
  );
};

// ScrollableBox 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
export default ScrollableBox;
