// ChatButton.tsx
import React from 'react';

interface ChatButtonProps {
  text: string;
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ text, onClick }) => {
  return (
    <div className="flex justify-end items-center my-3">
      <button
        className="bg-gray-700 text-white py-2 px-4 rounded-3xl w-[200px]"
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    </div>
  );
};

export default ChatButton;
