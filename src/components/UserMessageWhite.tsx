// UserMessage.tsx
import React from 'react';

interface UserMessageWhiteProps {
  message: string;
}

const UserMessageWhite: React.FC<UserMessageWhiteProps> = ({ message }) => {
  return (
    <div className="flex justify-end items-center my-3">
      <div className="min-w-1/4 max-w-[60%] mb-3 flex-wrap bg-white p-1 rounded-2xl flex items-center">
        <div className="w-full h-full p-4 border-4 border-black rounded-xl">
          <p className="text-black">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMessageWhite;
