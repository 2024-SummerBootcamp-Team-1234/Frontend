import React, { useEffect, useRef } from 'react';

interface ScrollableBoxProps {
  content: string;
  className?: string;
}

const ScrollableBox: React.FC<ScrollableBoxProps> = ({
  content,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <div
      ref={scrollRef}
      className={`pt-10 pb-10 pr-10 pl-10 rounded-[20px] text-white overflow-y-auto ${className}`}
    >
      {content}
    </div>
  );
};

export default ScrollableBox;
