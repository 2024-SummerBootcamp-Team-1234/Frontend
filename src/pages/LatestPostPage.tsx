import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Post {
    title: string;
    categories: string;
    judgement: string;
    judgementTitle: string;
    judgementDescription: string;
}

const posts: Post[] = [
    {
        title: '00님의 재판 결과',
        categories: '카테고리 1',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 1',
        judgementDescription: '판결 설명 1',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 2',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 2',
        judgementDescription: '판결 설명 2',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 3',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 3',
        judgementDescription: '판결 설명 3',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 4',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 4',
        judgementDescription: '판결 설명 4',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 5',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 5',
        judgementDescription: '판결 설명 5',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 6',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 6',
        judgementDescription: '판결 설명 6',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 7',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 7',
        judgementDescription: '판결 설명 7',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 8',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 8',
        judgementDescription: '판결 설명 8',
    },
    {
        title: '00님의 재판 결과',
        categories: '카테고리 9',
        judgement: '판결',
        judgementTitle: '자세한 상황 필요 9',
        judgementDescription: '판결 설명 9',
    },
];

const MultipleItems: React.FC = () => {
    const sliderRef = useRef<Slider>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '150px',
        beforeChange: (current: number, next: number) => setActiveSlide(next),
    };

    const handlePrevious = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    const renderPost = (post: Post, index: number) => (
        <div key={index}>
            <div className="flex justify-center">
                <div
                    className={`min-w-[630px] h-[700px] my-40 rounded-3xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                    ${activeSlide === index
                            ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-125'
                            : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-90'
                        }`}
                >
                    <div className="p-16">
                        <div className="text-center">
                            <div className="mb-4 font-sans font-bold text-3xl">{post.title}</div>
                        </div>
                        <div className="font-sans font-bold text-xl">{post.categories}</div>
                        <div className="text-end my-4 font-sans font-normal text-md">
                            <span>{post.judgement} : </span>
                            <span>{post.judgementTitle}</span>
                        </div>
                        <div className="bg-gray-200 w-full h-[32vh] rounded-2xl">
                            <div className="my-4 font-sans font-normal text-xl">{post.judgementDescription}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-postPageBg-image bg-cover bg-center min-h-screen flex flex-col justify-center relative ">
            <div className="w-full h-screen flex flex-col justify-center">

                <div className="overflow-hidden w-full max-w-[calc(100vw - 300px)] mx-auto relative">
                    <Slider ref={sliderRef} {...settings} className={'w-full'}>
                        {posts.map(renderPost)}
                    </Slider>
                </div>


                <div className="absolute inset-0 flex justify-center items-center">
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full"
                    >
                        {'<'}
                    </button>
                    <div className="w-[800px]"></div>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full"
                    >
                        {'>'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MultipleItems;