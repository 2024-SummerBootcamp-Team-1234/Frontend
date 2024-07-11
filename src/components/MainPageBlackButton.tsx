// MainPageButtonProps 인터페이스는 이 컴포넌트가 받을 props를 정의합니다.
interface MainPageBlackButtonProps {
  text: string; // 버튼에 표시될 텍스트
  onClick: () => void; // 버튼이 클릭되었을 때 실행될 함수
}

// MainPageButton 컴포넌트는 React.FC (Functional Component) 타입으로 정의되었습니다.
const MainPageBlackButton: React.FC<MainPageBlackButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      className="bg-black text-white border border-white font-sans font-extrabold py-4 px-12 text-2xl rounded-full"
      onClick={onClick} // onClick prop이 버튼이 클릭될 때 실행됩니다.
    >
      {text} {/* 버튼의 텍스트로 text prop을 표시합니다. */}
    </button>
  );
};

// 이 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default MainPageBlackButton;
