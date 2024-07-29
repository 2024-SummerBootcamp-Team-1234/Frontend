import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

interface ScrollableBoxProps {
  className?: string;
  initialContent?: string;
}

export interface ScrollableBoxRef {
  getValue: () => string;
  setValue: (newValue: string) => void;
}

const ScrollableBox2 = forwardRef<ScrollableBoxRef, ScrollableBoxProps>(
  ({ className = '', initialContent = '' }, ref) => {
    const PREFIX = '상황: ';
    const [content, setContent] = useState(`${PREFIX}${initialContent || ''}`);
    const scrollRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => scrollRef.current?.value ?? '',
      setValue: (newValue: string) => {
        if (scrollRef.current) {
          setContent(newValue);
        }
      },
    }));

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [content]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (!value.startsWith(PREFIX)) {
        setContent(PREFIX);
      } else {
        setContent(value);
      }
    };

    return (
      <div
        className={`pt-10 pb-10 pr-10 pl-10 rounded-[20px] text-white ${className}`}
        style={{ overflow: 'hidden' }}
      >
        <textarea
          ref={scrollRef}
          className="w-full h-full bg-transparent text-white text-2xl border-none focus:outline-none resize-none p-4 rounded-[20px] overflow-y-auto"
          value={content}
          onChange={handleChange}
          style={{ boxSizing: 'border-box' }}
        />
      </div>
    );
  },
);

export default ScrollableBox2;
