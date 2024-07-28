interface SubmitButtonProps {
  onClick: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
}) => {
  return (
    <button 
      className="w-[440px] h-[82px] bg-black bg-opacity-85 rounded-3xl border transition-colors duration-300 hover:bg-gray hover:bg-opacity-90 font-sans font-light text-3xl flex items-center text-white justify-center"
      onClick={onClick}
      >
        제 출 하 기
    </button>
  );
};

export default SubmitButton;