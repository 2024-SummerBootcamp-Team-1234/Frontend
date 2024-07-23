import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import axiosInstance from '../components/axiosInstance';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CategoryMap = {
  [key: number]: string;
};

const categoryMap: CategoryMap = {
  0: '저작권',
  1: '교통사고',
  2: '사기',
  3: '이혼',
  4: '성범죄',
  5: '마약',
  6: '의료 과실',
  7: '학교 폭력',
  8: '폭행',
  9: '환경오염',
};

interface Post {
  id: number;
  name: string;
  categories: number[];
  title: string;
  content: string;
  created_at: string; // 게시물 작성 날짜를 나타내는 필드
}

const CarouselItems: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClickToBack = () => {
    navigate('/LatestPostPage');
  };
  const handleButtonClickToHome = () => {
    navigate('/');
  };
  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

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
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.
    console.log('로컬 스토리지에서 가져온 토큰:', token);
    const fetchPosts = async () => {
      try {
        console.log('토큰');
        const response = await axiosInstance.get(
          'http://localhost:8000/api/v1/posts/users',
          {
            headers: {
              accept: 'application/json',
              'X-CSRFToken': token, // 가져온 토큰을 X-CSRFToken 헤더에 설정합니다.
              Authorization: `Bearer ${token}`, // 필요한 경우 추가적인 인증 헤더를 설정합니다.
            },
          },
        );
        console.log('토큰');
        const postsData = response.data.map((post: Post) => ({
          ...post,
          created_at:
            new Date(post.created_at).toString() !== 'Invalid Date'
              ? new Date(post.created_at).toISOString()
              : '', // 유효한 날짜인지 확인
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('게시물을 가져오는 중 에러 발생:', error);
      }
    };
    fetchPosts();
  }, []);

  const renderPost = (post: Post, index: number) => {
    const date = new Date(post.created_at);
    const formattedDate =
      date.toString() !== 'Invalid Date'
        ? date
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\//g, '.')
        : '유효하지 않은 날짜';

    return (
      <div
        key={post.id}
        className={`h-[57vh] my-[80px] rounded-6xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                        ${
                          activeSlide === index
                            ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-110'
                            : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-85'
                        }`}
      >
        <div className="p-14">
          <div className="text-gray-600 text-xs mb-1 text-left">
            {formattedDate}
          </div>
          <div className="text-left mb-3 font-sans font-bold text-4xl">
            {post.name}의 재판 결과
          </div>

          <div className="overflow-x-auto whitespace-nowrap custom-scrollbar ">
            {post.categories.map((cat, i) => (
              <div
                key={i}
                className="bg-ConcordColor text-white font-sans font-bold text-xl inline-block px-3 py-1 rounded-lg m-1"
              >
                {categoryMap[cat]}
              </div>
            ))}
          </div>

          <div className="text-start my-3 text-black font-sans font-normal text-2xl">
            판결 : {post.title}
          </div>

          <div className="bg-VeryLightGrayColor w-[100%] h-[32vh] rounded-4xl py-7 pl-7 pr-4 relative">
            <div className="overflow-y-auto scrollbar-slider h-full">
              <div className="font-sans font-normal text-xl mx-2">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    </div>
  );
};

export default CarouselItems;
