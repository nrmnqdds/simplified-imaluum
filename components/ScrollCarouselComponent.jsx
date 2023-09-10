"use client"; // For Next JS 13 app router

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import adsList from "../app/api/adsList.json";
import { Rerousel } from "rerousel";

const ScrollCarouselComponent = ({ ads }) => {
  const [adsList, setAdsList] = useState(ads.structuredData);
  const adsImages = useRef(null);
  return (
    <Rerousel itemRef={adsImages} interval={2000}>
      {adsList.map((item, index) => (
        <Link
          key={index}
          href={item.adsLink}
          target="_blank"
          passHref={true}
          ref={adsImages}
          className="w-36 h-36 relative mx-2"
        >
          <Image
            src={item.adsImg}
            alt=""
            blurDataURL={item.adsImg}
            placeholder="blur"
            fill
            sizes="100%"
            className="rounded-lg object-cover"
          />
        </Link>
      ))}
    </Rerousel>
  );
};

export default ScrollCarouselComponent;
