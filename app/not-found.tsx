"use client";

import React from "react";
import LottiePlayer from "@/components/LottiePlayer";

const NotFound = () => {
  return (
    <main className="bg-zinc-900 w-full h-screen flex flex-col items-center justify-center p-24">
      <div className="px-24">
        <LottiePlayer
          animationData={require("../public/lottie/notfound.lottie")}
        />
      </div>
      <h1 className="text-white text-3xl font-bold">
        Error: <span className="text-red-500">404</span>
      </h1>
      <h1 className="text-white text-3xl font-bold">Not found</h1>
    </main>
  );
};

export default NotFound;
