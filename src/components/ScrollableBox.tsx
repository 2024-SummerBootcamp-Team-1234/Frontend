import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface ScrollableBoxProps {
  content: string[];
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

  const decodeUnicode = (str: string) => {
    return str.replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    );
  };

  const createMarkup = (markdown: string[]) => {
    const decodedMarkdown = markdown.map(decodeUnicode).join('');
    const html = marked(decodedMarkdown, { breaks: true, gfm: true });
    return { __html: html };
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
