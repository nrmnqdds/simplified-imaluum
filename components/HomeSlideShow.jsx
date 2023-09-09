"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import IMAGE1 from "../public/slideshows/1.jpg";
import IMAGE2 from "../public/slideshows/7.jpg";
import IMAGE3 from "../public/slideshows/8.jpg";
import IMAGE4 from "../public/slideshows/9.jpg";

const HomeSlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide === 4) {
        setCurrentSlide(1);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  return (
    <div className="-z-10 absolute">
      <Image
        src={
          currentSlide === 1
            ? IMAGE1
            : currentSlide === 2
            ? IMAGE2
            : currentSlide === 3
            ? IMAGE3
            : IMAGE4
        }
        priority
        alt=""
        className="h-screen w-auto object-cover object-center"
      />
    </div>
  );
};

export default HomeSlideShow;
