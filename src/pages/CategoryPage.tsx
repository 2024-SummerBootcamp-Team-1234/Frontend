import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';

interface Category {
  id: number;
  name: string;
  description: string;
}

const categories: Category[] = [
  { id: 0, name: '저작권', description: '창작자가 자신의 창작물을 법적으로 보호받아 무단 복제나 사용을 금할 수 있는 권리', },
  { id: 1, name: '교통사고', description: '탈 것이 운행 중에 사람이나 다른 것과 충돌하는 교통 상의 사고', },
  { id: 2, name: '사기', description: '고의로 다른 사람을 속여 재산상의 이익을 취하는 행위', },
  { id: 3, name: '이혼', description: '부부가 합의 또는 재판에 의하여 혼인 관계를 인위적으로 소멸시키는 행위', },
  { id: 4, name: '성범죄', description: '성적 행위를 강요하거나 성적 자기결정권을 침해하는 행위', },
  { id: 5, name: '마약', description: '법률에 의해 통제되며, 불법적인 소지, 사용, 제조, 판매가 엄격히 금지되거나 제한되는 약물', },
  { id: 6, name: '의료 과실', description: '의료 제공자의 과실 또는 의료 행위로 인한 환자의 손해에 대한 법적 쟁점', },
  { id: 7, name: '학교 폭력', description: '학생 간의 신체적, 정신적 폭력 행위에 대해 학교와 관련 법률에 다라 처벌과 예방 조치를 요구하는 법적 문제', },
  { id: 8, name: '폭행', description: '다른 사람의 신체를 고의로 공격하거나 위협하여 상해를 입히는 행위', },
  { id: 9, name: '환경오염', description: '인간의 활동으로 인해 대기, 토양, 수질 등을 요염시켜 생태계와 인간 건강에 해를 끼치는 행위', },
];

const CategoryPage: React.FC = () => {

  // useState를 사용해서 Category 페이지를 빈 배열로 초기화한 값을 selectedCategories 변수에 저장
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategories((prevCategories) => {
      // 만약 선택된 카테고리 목록에 이미 클릭한 카테고리가 있다면
      if (prevCategories.some((c) => c.id === category.id)) {
        // 그 카테고리를 목록에서 제거
        return prevCategories.filter((c) => c.id !== category.id);
      } else {
        // 그렇지 않으면 배열 확장 => 기존 카테고리에서 새 카테고리 추가
        return [...prevCategories, category];
      }
    });
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const selectedCategoryIds = selectedCategories.map(category => category.id);
    console.log('Selected Category IDs:', selectedCategoryIds);
  
    // 상태를 사용하여 카테고리 ID들을 JudgePage로 전달합니다.
    navigate('/JudgePageCopy', { state: { categoryIds: selectedCategoryIds } });
  };
// http://localhost:5173/ResultPage?categoryIds=0&categoryIds=1&categoryIds=2


  const categoryGrid = () => {
    return (
      <div className="w-full mx-auto" style={{ maxWidth: '85rem' }}>
        {/* 카테고리 선택 그리드 시작 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 place-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`w-full h-[28vh] rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 transition-colors duration-300 hover:bg-White hover:bg-opacity-100 hover:text-black ${selectedCategories.some((c) => c.id === category.id)
                ? 'bg-white bg-opacity-100 text-Black'
                : 'bg-GainsboroColor bg-opacity-80 text-DarkLiverColor'
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="text-center">
                <h2 className="mt-5 mb-3 font-sans font-bold text-3xl">
                  {category.name}
                </h2>
                <div className="mx-10 h-0.5 bg-DarkLiverColor"></div>
                <p className="my-4 mx-12 font-sans font-normal text-xl">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 카테고리 선택 그리드 끝 */}
      </div>
    );
  };

  return (
    <div className="bg-black bg-category-image bg-cover bg-center min-h-screen flex flex-col items-start p-4 relative">
      <button
        className="bg-arrow-image bg-no-repeat bg-contain w-full h-[5vh] flex flex-col items-center mt-7 ml-5"
        style={{ maxWidth: '3rem' }}
        onClick={handleButtonClick}
      ></button>

      {/* 이미지 + Category + Skip > */}
      <div
        className="flex justify-start text-white items-center ml-[7rem]"
      >
        {/* <div className="w-10 h-10 bg-categoryIcon-image bg-no-repeat bg-contain mb-4 mr-4" /> */}
        <span className="text-6xl font-sans font-bold mb-6">Category</span>
        <button className="pt-4 pl-10 text-2xl font-sans font-normal"> Skip {'>'} </button>
      </div>

      <p className="flex justify-start mb-8 text-white text-2xl font-sans font-normal  ml-[7rem]" >
        재판하고 싶은 분야를 선택해주세요. (다중 선택 가능)
      </p>

      {categoryGrid()}

      <div className="absolute bottom-12 right-16">
        <ForNextPageWhiteButton
          text="재판 참여 시작하기"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
