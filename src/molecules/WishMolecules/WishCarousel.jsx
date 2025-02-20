import { useState, useRef } from "react";
import ad1 from "../../assets/ad/ad1.jpg";
import ad2 from "../../assets/ad/ad2.jpg";
import ad3 from "../../assets/ad/ad3.jpg";
import ad4 from "../../assets/ad/ad4.jpg";

const images = [ad1, ad2, ad3, ad4];

const WishCarousel = () => {
  // 양쪽 끝에 복제 슬라이드를 추가합니다.
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  // 실제 슬라이드는 extendedImages의 인덱스 1부터 images.length까지이므로 초기 인덱스는 1입니다.
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === extendedImages.length - 1) {
      if (containerRef.current) {
        // transition을 끄고
        containerRef.current.style.transition = "none";
      }
      // 실제 첫 슬라이드(인덱스 1)로 재설정
      setCurrentIndex(1);
      // requestAnimationFrame을 두 번 사용하여 브라우저가 스타일 변경을 즉시 반영하게 합니다.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "transform 0.7s ease";
          }
        });
      });
    } else if (currentIndex === 0) {
      if (containerRef.current) {
        containerRef.current.style.transition = "none";
      }
      // 실제 마지막 슬라이드(extendedImages.length - 2)로 재설정
      setCurrentIndex(extendedImages.length - 2);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "transform 0.7s ease";
          }
        });
      });
    }
  };

  return (
    <div className="relative w-full mb-4 overflow-hidden rounded-xl">
      <div
        ref={containerRef}
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={src}
              className="w-full object-cover"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>

      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 bg-white/30 dark:bg-gray-800/30 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70"
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-700 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 bg-white/30 dark:bg-gray-800/30 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70"
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-700 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default WishCarousel;
