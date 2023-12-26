"use client";

import Link from "next/link";
import { GetAds } from "@/lib/server/ads-scraper";
import { AiOutlineLink } from "react-icons/ai";
import { PiTelevisionBold } from "react-icons/pi";
import AdsCarousel from "./AdsCarousel";
import { useQuery } from "@tanstack/react-query";

const Advertisement = ({ className }: { className: string }) => {
  const { data: ads, isLoading: loading } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const data = await GetAds();
      if (data.success) {
        return data.data;
      }
      console.log("error: ", data.error);
    },
    retry: 3,
  });

  return (
    <section className={className}>
      <div className="my-3 flex justify-between w-full items-center">
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
              />
            ))}
          </div>
        ) : (
          //@ts-ignore
          <AdsCarousel ads={ads} />
        )}
      </div>
    </section>
  );
};

export default Advertisement;
