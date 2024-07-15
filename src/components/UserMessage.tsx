// UserMessage.tsx
import React from 'react';

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end items-center my-3">
      <div className="min-w-1/4 max-w-[60%] mb-3 flex-wrap bg-black p-4 rounded-2xl flex items-center border-2 border-white">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;