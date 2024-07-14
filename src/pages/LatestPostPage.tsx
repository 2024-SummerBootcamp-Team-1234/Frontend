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
    centerPadding: '90px',
    beforeChange: (current: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="bg-postPageBg-image bg-cover bg-center min-h-screen flex flex-col justify-center relative">
      <div className="w-full mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {posts.map((post, index) => (
            <div
              key={index}
              className={`max-w-[26rem] h-[30rem] my-40 rounded-3xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                                ${
                                  activeSlide === index
                                    ? 'mx-7 bg-white bg-opacity-100 text-black transform scale-125'
                                    : 'mx-7 bg-gray-200 bg-opacity-80 text-gray-800'
                                }`}
            >
              <div className="px-12">
                <div className="text-center">
                  <div className="mt-6 mb-4 font-sans font-bold text-3xl">
                    {post.title}
                  </div>
                </div>

                <div className="font-sans font-bold text-xl">
                  {post.categories}
                </div>
                <div className="text-end">
                  <span className="my-4 font-sans font-normal text-md">
                    {post.judgement} :{' '}
                  </span>
                  <span className="my-4 font-sans font-normal text-md">
                    {post.judgementTitle}
                  </span>
                </div>
                <div className="bg-gray-200 w-12 h-12"></div>
                <div className="my-4 font-sans font-normal text-xl">
                  {post.judgementDescription}
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex justify-between mt-4 px-12">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleItems;
