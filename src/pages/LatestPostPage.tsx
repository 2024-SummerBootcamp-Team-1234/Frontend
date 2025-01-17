import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Slider from 'react-slick';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';
import { marked } from 'marked';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingPage from '../components/LoadingPage';

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
  vote: number; // 좋아요 개수를 나타내는 필드
  likedByUser: boolean; // 사용자가 좋아요를 눌렀는지 여부를 나타내는 필드
  created_at: string; // 게시물 작성 날짜를 나타내는 필드
}

const CarouselItems: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClickToBack = () => {
    navigate('/MainPage2');
  };
  const handleButtonClickToHome = () => {
    navigate('/MainPage2');
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
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/posts/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log('Fetched posts data:', response.data);
        const postsData = response.data
          .map((post: Post) => ({
            ...post,
            vote: post.vote !== undefined ? post.vote : 0,
            likedByUser:
              post.likedByUser !== undefined ? post.likedByUser : false,
          }))
          .sort(
            (a: Post, b: Post) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
        // .sort ~ : 게시물 최신순으로 정렬
        console.log('Processed posts data:', postsData);
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
      const response = await axiosInstance.patch(
        `${import.meta.env.VITE_API_URL}/posts/votes/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // 요청 헤더에 토큰 추가
        },
      );
      console.log('Response data:', response.data); // 응답 데이터를 콘솔에 출력
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                vote: post.likedByUser ? post.vote - 1 : post.vote + 1, // likedByUser 상태에 따라 vote 값을 증가 또는 감소
                likedByUser: !post.likedByUser,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error('좋아요 요청 중 에러 발생:', error);
    }
  };

  const renderPost = (post: Post, index: number) => {
    const formattedDate = new Date(post.created_at).toLocaleDateString(
      'ko-KR',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
    );

    // 카테고리가 없는지 확인하는 변수
    const hasCategories = post.categories && post.categories.length > 0;

    const renderMarkdown = (content: string) => {
      return { __html: marked(content) };
    };

    return (
      <div
        key={index}
        className={`h-[60vh] my-[80px] rounded-6xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                      ${
                        activeSlide === index
                          ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-110'
                          : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-85'
                      }`}
      >
        <div className="px-14 pt-10 py-14">
          <div className="text-gray-600 text-xs mb-1">{formattedDate}</div>
          <div className="flex justify-between items-start mb-2">
            <div className="font-sans font-bold text-4xl">
              {post.name}의 재판 결과
            </div>
            <button
              onClick={() => handleLike(post.id)}
              className="flex flex-col items-center bg-like-image w-6 h-6 bg-no-repeat bg-contain"
              style={{ marginTop: '1rem' }}
            >
              <span className="text-xs mt-8">{post.vote}</span>
            </button>
          </div>

          {hasCategories && (
            <div className="overflow-x-auto whitespace-nowrap custom-scrollbar">
              {post.categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-ConcordColor text-white font-sans font-bold text-xl inline-block px-3 py-1 rounded-lg m-1"
                >
                  {categoryMap[cat]}
                </div>
              ))}
            </div>
          )}

          <div className="text-start my-3 text-black font-sans font-normal text-2xl">
            판결 : {post.title}
          </div>

          <div
            className={`bg-VeryLightGrayColor w-[100%] ${
              hasCategories ? 'h-[33vh]' : 'h-[39vh]'
            } rounded-4xl py-7 pl-7 pr-4 relative overflow-y-auto scrollbar-slider`}
          >
            <div
              className="font-sans font-normal text-xl mx-2"
              dangerouslySetInnerHTML={renderMarkdown(post.content)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingPage></LoadingPage>
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

        <div className="relative flex flex-col justify-center ">
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
    </>
  );
};

export default CarouselItems;
