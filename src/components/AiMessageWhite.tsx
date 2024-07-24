// AiMessage.tsx
import React from 'react';
import Profile from '../assets/Profile.png';
import { marked } from 'marked';

interface AiMessageWhiteProps {
  message: string;
}

const AiMessageWhite: React.FC<AiMessageWhiteProps> = ({ message }) => {
  const createMarkup = () => {
    return { __html: marked(message) };
  };

  return (
    <div className="flex items-center my-3">
      <img
        src={Profile}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-4 mb-7"
      />
      <div className="min-w-1/4 max-w-[60%] mb-3 flex-wrap bg-white p-1 rounded-2xl flex items-center">
        <div className="w-full h-full p-4 border-4 border-black rounded-xl">
          <p
            className="text-black"
            dangerouslySetInnerHTML={createMarkup()}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default AiMessageWhite;
