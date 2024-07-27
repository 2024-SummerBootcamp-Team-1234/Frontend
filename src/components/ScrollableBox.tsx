import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';

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
  // [content] : useEffect 훅의 두 번째 인자로 전달되는 배열, 의존성 배열 (Dependency Array)

  const createMarkup = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
    <div
      ref={scrollRef}
      className={`pt-10 pb-10 pr-10 pl-10 rounded-[20px] text-white overflow-y-auto ${className}`}
    >
      <div dangerouslySetInnerHTML={createMarkup(content)} />
    </div>
  );
};

export default ScrollableBox;
