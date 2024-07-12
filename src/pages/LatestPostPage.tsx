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

const posts: Post[] = [
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
    { title: '00님의 재판 결과', categories: '이혼 폭행 사기', judgement: '판결', judgementTitle: '자세한 상황 필요', judgementDescription: '상대방은 본인의 기여도가 더 크다고 주장하며 재산분할 비율을 높게 설정하려 할 수 있습니다. 예를 들어, 경제 활동을 통해 가게에 더 많은 기여를 했다는 주장을 펼칠 수 있습니다.' },
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
        centerPadding:'30px',
        beforeChange: (current: number, next: number) => setActiveSlide(next),
    };

    const handlePrevious = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    return (
        <div className="bg-postPageBg-image bg-cover bg-center min-h-screen flex flex-col justify-center p-8 relative">
            <div className="w-full mx-auto" style={{ maxWidth: '80rem' }}>
                <Slider ref={sliderRef} {...settings}>
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className={`w-[80%] h-[40vh] mx-4 p-4 rounded-lg shadow-md transition-all duration-300 ${activeSlide === index
                                ? 'bg-white bg-opacity-100 text-black transform scale-110'
                                : 'bg-gray-200 bg-opacity-80 text-gray-800'
                                }`}
                        >
                            <div className="flex flex-col text-center">
                                <div className="mt-6 mb-4 font-sans font-bold text-3xl">{post.title}</div>
                            </div>
                            <div className="mx-12 font-sans font-bold text-xl">{post.categories}</div>
                            <div className="my-4 mx-12 font-sans font-normal text-xl">{post.judgement}</div>
                            <div className="my-4 mx-12 font-sans font-normal text-xl">{post.judgementDescription}</div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-between mt-4">
                    <button onClick={handlePrevious} className="px-4 py-2 bg-gray-300 rounded-lg">Previous</button>
                    <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded-lg">Next</button>
                </div>
            </div>
        </div>
    );
};

export default MultipleItems;