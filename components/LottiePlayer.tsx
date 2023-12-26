"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function LottiePlayer({
  animationData,
  ...props
}: { animationData: any }) {
  return <DotLottiePlayer src={animationData} {...props} autoplay loop />;
}
