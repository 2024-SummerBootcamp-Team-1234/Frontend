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
            className="bg-opacity-80 bg-GainsboroColor text-DarkLiverColor font-sans font-bold py-5 px-7  text-2xl rounded-full flex items-center transition-colors duration-300 hover:bg-White hover:bg-opacity-100 hover:text-black"
            onClick={onClick}
        >
            {text}
            <span className="bg-arrowRight-image w-9 h-9 bg-no-repeat bg-contain ml-1"></span>
        </button>
    );
};

export default ForNextPageWhiteButton;
