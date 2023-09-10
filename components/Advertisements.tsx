"use client";

import { useState, useEffect, Fragment } from "react";
import adsList from "../app/api/adsList.json";
import dynamic from "next/dynamic";
import Link from "next/link";

const ScrollCarousel = dynamic(() => import("./ScrollCarouselComponent"), {
  ssr: false,
});

const Advertisement = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("api/ads");
    setLoading(false);
  }, []);

  return (
    <section className="relative self-end w-full h-[35%] flex flex-col">
      <div className="m-3 flex justify-between w-full items-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-slate-100">
          SOUQ Advertisement
        </h2>
        <Link
          href="https://souq.iium.edu.my/list"
          target="_blank"
          className="text-blue-500 underline"
        >
          See More{" >"}
        </Link>
      </div>

      <div className="flex flex-row gap-2 w-full h-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <ScrollCarousel />
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Advertisement;