"use client";

import React from "react";
import LottiePlayer from "@/components/LottiePlayer";

const NotFound = () => {
  return (
    <main className="bg-zinc-900 w-full h-screen flex items-center justify-center">
      <LottiePlayer
        animationData={require("../public/lottie/Animation - 1703013994707.lottie")}
      />
    </main>
  );
};

export default NotFound;
