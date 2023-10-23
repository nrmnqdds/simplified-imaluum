"use client";

import { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PiTelevisionBold } from "react-icons/pi";
import { AiOutlineLink } from "react-icons/ai";

const ScrollCarousel = dynamic(() => import("./ScrollCarouselComponent"), {
  ssr: false,
});

const Advertisement = ({ className }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAds() {
      const response = await fetch("api/ads");
      const data = await response.json();
      setAds(data);
      // console.log("ads from client", data);
      setLoading(false);
    }
    getAds();
  }, []);

  return (
    <section className={className}>
      <div className="m-3 flex justify-between w-full items-center">
        <h2 className="lg:text-2xl font-bold text-zinc-900 dark:text-slate-100 flex items-center gap-5">
          <PiTelevisionBold />
          SOUQ Advertisement
        </h2>
        <Link
          href="https://souq.iium.edu.my/list"
          target="_blank"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1 mr-5"
        >
          See More
          <span>
            <AiOutlineLink />
          </span>
        </Link>
      </div>

      <div className="flex flex-row gap-2 w-full h-full">
        {loading ? (
          // <p>Loading...</p>
          <div className="flex flex-row gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="w-40 h-40 rounded-xl bg-gray-200 dark:bg-zinc-600 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <Fragment>
            <ScrollCarousel ads={ads} />
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Advertisement;
