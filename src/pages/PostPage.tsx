import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MultipleItems: React.FC = () => {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const handlePrevious = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
            <button
                className="bg-blue-500 text-white w-10 h-10 rounded-full mr-4"
                onClick={handlePrevious}
            >
                {'<'}
            </button>
            <div className="w-full mx-auto" style={{ maxWidth: '30rem' }}>
                <Slider ref={sliderRef} {...settings}>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">1</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">2</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">3</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">4</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">5</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">6</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">7</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">8</h3>
                    </div>
                    <div className="p-4">
                        <h3 className="text-center bg-gray-300 p-4 rounded">9</h3>
                    </div>
                </Slider>
            </div>
            <button
                className="bg-blue-500 text-white w-10 h-10 rounded-full ml-4"
                onClick={handleNext}
            >
                {'>'}
            </button>
        </div>
    );
}

export default MultipleItems;