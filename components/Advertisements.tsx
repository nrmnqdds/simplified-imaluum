"use client";

import { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Skeleton } from "@mui/material";

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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-slate-100">
          <span className="mr-2">
            <NewspaperIcon />
          </span>
          SOUQ Advertisement
        </h2>
        <Link
          href="https://souq.iium.edu.my/list"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          See More
          <span>
            <KeyboardDoubleArrowRightIcon />
          </span>
        </Link>
      </div>

      <div className="flex flex-row gap-2 w-full h-full">
        {loading ? (
          // <p>Loading...</p>
          <div className="flex flex-row gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Skeleton
                key={item}
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={144}
                height={144}
              />
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
