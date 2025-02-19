"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottiePlayer({
  animationData,
  ...props
}: { animationData: any }) {
  return <DotLottieReact src={animationData} {...props} autoplay loop />;
}
