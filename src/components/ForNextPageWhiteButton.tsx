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
            className="bg-opacity-80 bg-GainsboroColor text-DarkLiverColor font-sans font-bold py-7 px-9  text-4xl rounded-full flex items-center transition-colors duration-300 hover:bg-White hover:bg-opacity-100 hover:text-black"
            onClick={onClick}
        >
            {text}
            <span className="bg-arrowRight-image w-10 h-10 bg-no-repeat bg-contain ml-1"></span>
        </button>
    );
};

export default ForNextPageWhiteButton;
