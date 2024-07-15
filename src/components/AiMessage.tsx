// AiMessage.tsx
import React from 'react';
import Profile from '../assets/Profile.png';

interface AiMessageProps {
  message: string;
}

const AiMessage: React.FC<AiMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center my-3">
      <img
        src={Profile}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-4 mb-7"
      />
      <div className="min-w-1/4 max-w-[60%] mb-3 flex-wrap bg-black p-4 rounded-2xl flex items-center border-2 border-white">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AiMessage;
