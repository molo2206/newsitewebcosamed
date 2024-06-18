import {useState} from 'react';
import Img1 from "../../assets/blogs/img1.jpeg";
import Img2 from "../../assets/blogs/img2.jpg";
import Img3 from "../../assets/blogs/img3.jpeg";
import Img4 from "../../assets/blogs/img4.jpeg";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";


const Carousel = () => {
  const slides = [
    {
      url: Img1,
    },
    {
      url: Img2,
    },
    {
      url: Img3,
    },
    {
      url: Img4,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  return (
    <div className=" max-w-[1400px] h-[700px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className=" w-full h-full rounded-2xl bg-center bg-cover duration-500 "
      ></div>
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 left-5 text-2xl rounded-full
     p-2 bg-black/20 text-white cursor-pointer"
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 right-5 text-2xl rounded-full
     p-2 bg-black/20 text-white cursor-pointer"
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className=" flex top-4  justify-center py-2">
        {/* {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className=" text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Carousel;
