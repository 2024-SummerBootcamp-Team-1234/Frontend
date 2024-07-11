import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';

interface Category {
    id: number;
    name: string;
    description: string;
}

const categories: Category[] = [
    { id: 1, name: '저작권', description: '창작자가 자신의 창작물을 법적으로 보호받아 무단 복제나 사용을 금할 수 있는 권리' },
    { id: 2, name: '교통사고', description: '교통사고 설명' },
    { id: 3, name: '사기', description: '사기 설명' },
    { id: 4, name: '이혼', description: '이혼 설명' },
    { id: 5, name: '성범죄', description: '성범죄 설명' },
    { id: 6, name: '디지털 프라이버시', description: '디지털 프라이버시 설명' },
    { id: 7, name: '의료 과실', description: '의료 과실 설명' },
    { id: 8, name: '학교 폭력', description: '조진우 학교 폭력 해명하세요' },
    { id: 9, name: '폭행', description: '폭행 설명' },
    { id: 10, name: '환경오염', description: '환경오염 설명' },
];

const CategoryPage: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategories(prevCategories => {
            if (prevCategories.some(c => c.id === category.id)) {
                return prevCategories.filter(c => c.id !== category.id);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div className="bg-black bg-category-image bg-cover bg-center min-h-screen flex flex-col items-start p-4 relative">
            <button className="bg-arrow-image w-12 h-12 bg-no-repeat bg-contain my-4 ml-4" onClick={handleButtonClick}></button>

            {/* 이미지 + Category + Skip > */}
            <div className="text-white flex justify-start items-center mb-4 ml-8 pl-12">
                <button className="w-12 h-12 bg-categoryIcon-image bg-no-repeat bg-contain mb-4 mr-4"/>
                <span className="text-6xl font-sans font-bold mb-4">Category</span>
                <button className="pl-4 text-2xl font-sans font-normal"> Skip {'>'} </button>
            </div>

            <p className="text-2xl text-white text-start mb-8 ml-8 pl-12 font-sans font-normal">
                재판하고 싶은 분야를 선택해주세요. (다중 선택 가능)
            </p>

            {/* 카테고리를 담는 컴포넌트,,,불필요한 것일까... */}
            <div className="w-full mx-auto" style={{ maxWidth:'100rem'}}>
                {/* 카테고리 선택 그리드 시작 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            // 너비40 /높이40 /패딩4 /테두리둥글게 /그림자중간 /커서포인터변경 /호버를 사용하기 위한 함수 / 호버했을때 1.05배 커짐
                            className={`w-60 h-60 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 transition-colors duration-300 hover:bg-White hover:bg-opacity-100 hover:text-black ${selectedCategories.some(c => c.id === category.id)
                                ? 'bg-white bg-opacity-100 text-Black'
                                : 'bg-GainsboroColor bg-opacity-80 text-DarkLiverColor'
                                }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <div className="text-center">
                                <h2 className="m-4 font-sans font-bold text-3xl text-DarkLiverColor">{category.name}</h2>
                                <div className="mx-6 h-0.5 bg-DarkLiverColor"></div>
                                <p className="my-5 mx-6 font-sans font-normal text-xl text-DarkLiverColor">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 카테고리 선택 그리드 끝 */}
            </div>  
            <div className="absolute bottom-16 right-16">
                <ForNextPageWhiteButton text='재판 참여 시작하기' onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default CategoryPage;