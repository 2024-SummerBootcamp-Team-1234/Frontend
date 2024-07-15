import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Post {
    title: string,
    categories: string,
    judgement: string,
    judgementTitle: string,
    judgementDescription: string,
}

const posts: Post[] = [
    { title: '00님의 재판 결과', categories: '카테고리 1', judgement: '판결', judgementTitle: '자세한 상황 필요 1', judgementDescription: '판결 설명 1' },
    { title: '00님의 재판 결과', categories: '카테고리 2', judgement: '판결', judgementTitle: '자세한 상황 필요 2', judgementDescription: '판결 설명 2' },
    { title: '00님의 재판 결과', categories: '카테고리 3', judgement: '판결', judgementTitle: '자세한 상황 필요 3', judgementDescription: '판결 설명 3' },
    { title: '00님의 재판 결과', categories: '카테고리 4', judgement: '판결', judgementTitle: '자세한 상황 필요 4', judgementDescription: '판결 설명 4' },
    { title: '00님의 재판 결과', categories: '카테고리 5', judgement: '판결', judgementTitle: '자세한 상황 필요 5', judgementDescription: '판결 설명 5' },
    { title: '00님의 재판 결과', categories: '카테고리 6', judgement: '판결', judgementTitle: '자세한 상황 필요 6', judgementDescription: '판결 설명 6' },
    { title: '00님의 재판 결과', categories: '카테고리 7', judgement: '판결', judgementTitle: '자세한 상황 필요 7', judgementDescription: '판결 설명 7' },
    { title: '00님의 재판 결과', categories: '카테고리 8', judgement: '판결', judgementTitle: '자세한 상황 필요 8', judgementDescription: '판결 설명 8' },
    { title: '00님의 재판 결과', categories: '카테고리 9', judgement: '판결', judgementTitle: '자세한 상황 필요 9', judgementDescription: '판결 설명 9' },
];

const LatestPostPageT: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        beforeChange: (current: number, next: number) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    centerMode: false
                }
            }
        ]
    };

    return (
        <div className="container max-w-[90rem] mx-auto px-4 py-8">
            <Slider {...settings}>
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className={`p-4 transition-transform duration-300 ${activeSlide === index ? 'transform scale-105' : 'transform scale-90'}`}
                    >
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                <p className="text-gray-700">{post.categories}</p>
                                <p className="text-gray-700">{post.judgement}</p>
                                <h3 className="text-lg font-semibold mt-4">{post.judgementTitle}</h3>
                                <p className="text-gray-700 mt-2">{post.judgementDescription}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default LatestPostPageT;