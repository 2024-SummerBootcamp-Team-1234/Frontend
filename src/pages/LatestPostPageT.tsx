import React, { useRef, useState } from "react";
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

// 임시로 불러올 데이터 배열
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

const MultipleItems: React.FC = () => {
    // 슬라이드를 참조하기 위한 변수, null값으로 비워둠
    const sliderRef = useRef<Slider>(null);
    // 선택된 슬라이드, 슬라이드 상태변경 = index가 0인 번호로 상태를 관리하겠다
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const settings = {
        // 슬라이드 수를 표현해주는 시각적 요소, 점
        dots: true,
        // 슬라이드가 계속 넘어갈 수 있게 한 설정
        infinite: true,
        // 화면에 3개의 슬라이드를 보여줌
        slidesToShow: 3,
        // 스크롤 당 넘어가는 슬라이드 수
        slidesToScroll: 1,
        // 슬라이드 넘어가게 해주는 보조 버튼 비활성화
        arrows: false,
        
        // 내가 선택한 슬라이드가 가운데로 오게하기 위한 설정
        centerMode: true, 

        // 양끝에 슬라이드가 있음을 보여주기 위한 패딩
        centerPadding: '150px',
        
        // 클릭한 슬라이드로 바로 넘어가게 한 설정
        focusOnSelect: true,

        beforeChange: (current: number, next: number) => setActiveSlide(next),
    };

    const handlePrevious = () => {
        // 이전 슬라이드로
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        // 다음 슬라이드로
        sliderRef.current?.slickNext();
    };

    return (
        // 배경화면과 요소 정렬 속성
        <div className="bg-postPageBg-image bg-cover bg-center min-h-screen flex flex-col justify-center relative">
            {/* 여기서부터 슬라이드 시작! */}
            {/* 슬라이더를 내가 설정한 세팅값으로 참조하겠다. Width는 100% */}
            <Slider ref={sliderRef} {...settings} className={'w-full'}>
                {/* 임시 데이터 배열 mapping, 포스트 값과 인덱스 값 사용 */}
                {posts.map((post, index) => (
                    // 여기서부터 각각의 슬라이드 속성
                    // 내가 선택한 슬라이드의 index면 패딩을 왼쪽의 0rem, 아니면 패딩을 오른쪽의 0rem
                    <div key={index} className={activeSlide === index ? 'px-0' : 'px-0'}>
                        {/* 슬라이드를 중앙정렬 ( width를 100% 이하 ( ex. w-[90%] ) 로 했을 때 왼쪽으로 몰림 ) */}
                        <div className="flex justify-center">
                            {/* 마진을 줘서 Scale이 커져도 잘리지 않게, Carousel 애니매이션 0.5초 */}
                            <div
                                className={`w-[100%] h-[48vh] my-40 rounded-3xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                                ${activeSlide === index
                                        ? 'bg-white bg-opacity-100 text-black transform scale-125'
                                        : 'bg-gray-200 bg-opacity-80 text-gray-800 scale-90'
                                    }`
                                }
                                // 내가 선택한 슬라이드의 index 면 ? 세팅, 아니면 : 세팅
                            >
                                {/* 슬라이더 안의 요소들 */}
                                {/* 제목, 카테고리, 판결, 판결 설명 등등,,, */}
                                <div className="p-12">
                                    <div className="text-center">
                                        <div className="mb-4 font-sans font-bold text-3xl">{post.title}</div>
                                    </div>

                                    <div className="font-sans font-bold text-xl">{post.categories}</div>

                                    <div className="text-end my-4 font-sans font-normal text-md">
                                        <span>{post.judgement} : </span>
                                        <span>{post.judgementTitle}</span>
                                    </div>

                                    <div className="bg-gray-200 w-full h-full">
                                        <div className="my-4 font-sans font-normal text-xl">{post.judgementDescription}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            {/* 이전 & 다음 버튼 */}
            <div className="flex justify-between mt-4 px-12">
                <button onClick={handlePrevious} className="px-4 py-2 bg-gray-300 rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded-lg">Next</button>
            </div>
        </div>
    );
};

export default MultipleItems;