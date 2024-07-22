interface ScrollableBoxProps {
  content: string;
  className?: string;
}

// ScrollableBox라는 함수형 컴포넌트를 만듦. content를 속성으로 받음
const ScrollableBox: React.FC<ScrollableBoxProps> = ({
  content,
  className,
}) => {
  return (
    <div
      className={`pt-10 pb-10 pr-10 pl-10 rounded-[20px] text-white  overflow-y-auto ${className}`}
    >
      {content}
    </div>
  );
};

// ScrollableBox 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
export default ScrollableBox;
