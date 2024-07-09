// 카테고리 페이지
import React, { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

const categories: Category[] = [
    { id: 1, name: '저작권' },
    { id: 2, name: '교통사고' },
    { id: 3, name: '사기' },
    { id: 4, name: '이혼' },
    { id: 5, name: '성범죄' },
    { id: 6, name: '디지털 프라이버시' },
    { id: 7, name: '의료 과실' },
    { id: 8, name: '학교 폭력' },
    { id: 9, name: '폭행' },
    { id: 10, name: '환경오염' },
];

const CategoryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Category</h1>
            <p>Skip</p>
            <ul className="list-disc list-inside mb-4">
                {categories.map(category => (
                    <li key={category.id} className="mb-2">
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 rounded ${
                                selectedCategory?.id === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                            }`}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedCategory && (
                <div>
                    <h2 className="text-xl font-semibold">선택된 카테고리: {selectedCategory.name}</h2>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;