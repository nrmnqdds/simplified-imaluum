"use client"; // For Next JS 13 app router

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollCarousel from "scroll-carousel-react";
import adsList from "../app/api/adsList.json";

const ScrollCarouselComponent = () => {
  return (
    <ScrollCarousel
      autoplay
      autoplaySpeed={2}
      speed={4}
      margin={30}
      onReady={() => console.log("I am ready")}
    >
      {adsList.map((item, index) => (
        <Link key={index} href={item.adsLink} target="_blank" passHref={true}>
          <Image
            src={item.adsImg}
            alt=""
            width={144}
            height={144}
            className="rounded-lg object-contain"
          />
        </Link>
      ))}
    </ScrollCarousel>
  );
};

export default ScrollCarouselComponent;
