import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Slider from 'react-slick';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';
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
  likes: number;
  likedByUser: boolean;
}

const CarouselItems: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClickToBack = () => {
    navigate('/JudgePageCopy');
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
  const handleButtonClickToMyPost = () => {
    navigate('/MyPostPage');
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
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/posts/all',
        );
        const postsData = response.data.map((post: Post) => ({
          ...post,
          likes: post.likes ?? 0, // 서버에서 likes 값을 제공하지 않으면 기본값 0 설정
          likedByUser: post.likedByUser ?? false, // 서버에서 likedByUser 값을 제공하지 않으면 기본값 false 설정
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('게시물 가져오기 중 에러 발생:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    const token = localStorage.getItem('token'); // 토큰을 로컬 저장소에서 가져오기
    console.log('Sending like request for post ID:', postId);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posts/votes/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // 요청 헤더에 토큰 추가
        },
      );
      console.log('Response data:', response.data);
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: response.data.votes ?? post.likes, // 서버 응답 데이터에 likes 대신 votes가 있을 경우 사용
                likedByUser: !post.likedByUser,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error('좋아요 요청 중 에러 발생:', error);
    }
  };

  const renderPost = (post: Post, index: number) => (
    <div
      key={index}
      className={`h-[57vh] my-[80px] rounded-6xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                    ${
                      activeSlide === index
                        ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-110'
                        : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-85'
                    }`}
    >
      <div className="p-14">
        <div className="text-center mb-3 font-sans font-bold text-4xl">
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

        <div className="mt-[0.7pt] flex items-center">
          {' '}
          {/* 간격을 줄이고 상단 여백을 줄였습니다 */}
          <div className="text-xs mr-1 text-base">{post.likes} likes</div>
          <button
            onClick={() => handleLike(post.id)}
            className={`px-2 py-1 text-xs rounded ${
              post.likedByUser
                ? 'bg-ConcordColor text-white'
                : 'bg-gray-300 text-black'
            }`}
          >
            {post.likedByUser ? 'Unlike' : 'Like'}
          </button>
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
