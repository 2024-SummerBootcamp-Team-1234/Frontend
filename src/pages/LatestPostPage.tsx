import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Slider from 'react-slick';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Post {
    id: number;
    name: string;
    categories: string[];
    title: string;
    content: string;
}

const CarouselItems: React.FC = () => {
    const navigate = useNavigate();
    const handleButtonClickToBack = () => { navigate('/JudgePageCopy'); };
    const handleButtonClickToHome = () => { navigate('/'); };
    const handlePrevious = () => { sliderRef.current?.slickPrev(); };
    const handleNext = () => { sliderRef.current?.slickNext(); };
    const handleButtonClickToMyPost = () => { navigate('/MyPostPage'); };

    const [posts, setPosts] = useState<Post[]>([]);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: true,
        infinite: true,

        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,

        centerMode: true,

        beforeChange: (_: number, next: number) => setActiveSlide(next),
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/posts/all'); // 실제 API 엔드포인트로 변경
                setPosts(response.data);
            } catch (error) {
                console.error('게시물을 가져오는 중 에러 발생:', error);
            }
        };
        fetchPosts();
    }, []);

    const renderPost = (post: Post, index: number) => (
        <div key={index} className={`h-[57vh] my-[80px] rounded-6xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                    ${activeSlide === index
                ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-110'
                : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-85'
            }`}>
            <div className="p-14">
                <div className="text-center mb-3 font-sans font-bold text-4xl">{post.name}의 재판 결과</div>

                <div className="bg-ConcordColor text-white font-sans font-bold text-xl inline-block px-3 py-1 rounded-lg">{post.categories.join(', ')}</div>

                <div className="text-start my-3 text-black font-sans font-normal text-2xl">판결 : {post.title}</div>

                <div className="bg-VeryLightGrayColor w-[100%] h-[32vh] rounded-4xl py-7 pl-7 pr-4 relative">

                    <div className="overflow-y-auto scrollbar-slider h-full">
                        <div className="font-sans font-normal text-xl mx-2">{post.content}</div>
                    </div>

                </div>

            </div>

        </div>
    );

    return (
        <div className="bg-postPageBg-image bg-cover bg-center w-screen h-screen flex flex-col">
            <div className="w-[8rem] h-[4rem] flex flex-row justify-between ml-6 mt-8">
                <button
                    className="bg-arrow-image bg-no-repeat bg-contain w-[3.5rem] h-[3.5rem]"
                    onClick={handleButtonClickToBack}
                ></button>
                <button
                    className="bg-homeButton-image bg-no-repeat bg-contain w-[3.5rem] h-[3.5rem]"
                    onClick={handleButtonClickToHome}
                ></button>
            </div>

            <div className="relative flex flex-col justify-center pt-12">
                <button
                    onClick={handlePrevious}
                    className="absolute left-[29.5%] px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full z-10 border-2 border-solid border-white"
                >
                    {'<'}
                </button>

                <Slider ref={sliderRef} {...settings}>
                    {posts.map(renderPost)}
                </Slider>
                
                <button
                    onClick={handleNext}
                    className="absolute right-[29.5%] px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full z-10 border-2 border-solid border-white"
                >
                    {'>'}
                </button>
            </div>

            <div className="absolute bottom-16 right-20">
                <ForNextPageWhiteButton
                    text="내 게시물 보러가기"
                    onClick={handleButtonClickToMyPost}
                />
            </div>

        </div>
    );


};

export default CarouselItems;