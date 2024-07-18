import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeButtonProps {
  text: string;
  onClick: () => void;
}

const navigate = useNavigate();

const handleButtonClick = () => {
  navigate('/JudgePageCopy');
};



const HomeButton: React.FC<HomeButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="bg-arrow-image bg-no-repeat bg-contain w-full h-[5vh] flex flex-col items-center mt-7 ml-5"
      style={{ maxWidth: '3rem' }}
      onClick={handleButtonClick}
    ></button>
  );
};

export default HomeButton;
