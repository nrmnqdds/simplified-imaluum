"use client";

import LottiePlayer from "@/components/LottiePlayer";
import React from "react";

const NotFound = () => {
  return (
    <main className="bg-zinc-900 w-full h-screen flex flex-col items-center justify-center p-24">
      <LottiePlayer
        animationData={require("../assets/lottie/Animation - 1703013994707.lottie")}
      />
    </main>
  );
};

export default NotFound;
