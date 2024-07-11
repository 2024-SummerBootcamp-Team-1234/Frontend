interface ForNextPageWhiteButtonProps {
    text: string;
    onClick: () => void;
}

const ForNextPageWhiteButton: React.FC<ForNextPageWhiteButtonProps> = ({
    text,
    onClick,
}) => {
    return (
        <button
      className= "bg-white text-black font-sans font-bold py-4 px-6 text-2xl rounded-full flex items-center"
    onClick = { onClick }
        >
        { text }
        <span className="bg-arrowRight-image w-8 h-8 bg-no-repeat bg-contain ml-1"></span>
        </button>
  ); 
};

export default ForNextPageWhiteButton;
