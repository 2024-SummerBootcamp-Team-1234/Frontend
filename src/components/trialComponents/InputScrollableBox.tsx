import React, { useState, useEffect } from 'react';

interface InputScrollBoxProps {
  placeholder?: string; // 입력 상자에 보일 안내 문구
  onChange? : (newValue : string) => void; // 함수, 문자열을 파라미터로 받고 반환 값은 없음.
  initialValue?: string; // 입력 상자의 초기 값을 나타내는 속성
  className?:string;
}

const InputScrollableBox: React.FC<InputScrollBoxProps> = ({ 
  placeholder,
  onChange,
  initialValue,
  }) => {
  const [inputValue, setInputValue] = useState(initialValue || '');
  // 처음 값은 initialValue이고 없으면 빈 문자열이다.

    useEffect(()=>{
      setInputValue(initialValue||'');
    }, [initialValue]);

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    // ChangeEvent는 입력 상자의 내용이 바뀔 때 발생하는 신호
    // HTMLTextAreaElement는 웹 페이지에서 사용하는 큰 입력 상자
    setInputValue(e.target.value);
    // 입력 상자의 현재 값 -> 사용자가 입력한 텍스트가 이 값으로 저장됨.

    if (onChange){
      onChange(e.target.value);
      // e.tartget.value : 사용자가 입력한 값 -> onChange 함수의 인자로 전달
      // 이 컴포넌트를 사용하는 부모 컴포넌트에게도 이 글자를 알려줌
    }
  };

  return (
    <div 
      className ="border rounded-3xl box-border overflow-hidden shadow-lg w-[910px] h-[690px] ">
      {/* 
        max-w-md => md : 28rem
        =>최대 너비를 설정하면 반응형 디자인에 유리하다. 
          화면 크기에 따라 변하지 않게는 max를 빼자
      */}
      <textarea 
        className="bg-black bg-opacity-85 bg-cover w-full h-full p-6 box-border border-none focus:outline-none resize-none font-sans font-bold text-2xl text-white"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {/* 
        box-border : 전체 크기 내에서 padding과 border가 포함됨. 
        padding과 border을 추가하면 내부 영역이 작아짐
        border-none : 입력 상자의 기본 테두리를 없앰
        focus:outline-none : 입력 상자를 클릭할 때 나오는파란색 테두리를 없앰
        resize-none : 입력 상자의 크기를 항상 같은 크기로 유지
      */}
    </div>
  );
}

export default InputScrollableBox;