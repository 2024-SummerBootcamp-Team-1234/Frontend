import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageButton from '../components/MainPageWhiteButton';

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
    { id: 8, name: '학교 폭력', description: '학교 폭력 설명' },
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
        <div className="bg-black bg-categoryPage-image bg-cover bg-center min-h-screen flex flex-col items-start p-4 relative">
            <button className="text-2xl text-white items-center my-4 ml-4">
                Back
            </button>

            {/* 이미지 + Category + Skip > */}
            <div className="text-white flex justify-start items-center mb-4 ml-8 pl-12">
                <div className="w-12 h-12 bg-categoryIcon-image bg-no-repeat bg-contain mb-4 mr-4"></div>
                <span className="text-6xl font-bold mb-4">Category</span>
                <button className="pl-4 text-2xl"> Skip {'>'} </button>
            </div>

            <p className="text-2xl text-white text-start mb-8 ml-8 pl-12">
                재판하고 싶은 분야를 선택해주세요. (다중 선택 가능)
            </p>

            <div className="p-4 w-full mx-auto" style={{ maxWidth:'100rem'}}>

                {/* 카테고리 선택 그리드 시작 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-8 place-items-center">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            // 너비40 /높이40 /패딩4 /테두리둥글게 /그림자중간 /커서포인터변경 /호버를 사용하기 위한 함수 / 호버했을때 1.05배 커짐
                            className={`w-60 h-60 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${selectedCategories.some(c => c.id === category.id)
                                ? 'bg-white bg-opacity-100 text-black'
                                : 'bg-white bg-opacity-80 text-black'
                                }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                                <div className="m-2 h-0.5 bg-gray-400"></div>
                                <p className="text-sm">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 카테고리 선택 그리드 끝 */}
            </div>  
            <div className="absolute bottom-16 right-16">
                <MainPageButton text='재판 참여 시작하기' onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default CategoryPage;