"use client"; // Error components must be Client Components

import { useEffect } from "react";
import LottiePlayer from "@/components/LottiePlayer";
import Link from "next/link";

export default function CustomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen bg-zinc-900 flex flex-col items-center justify-center p-24">
      <div className="px-24">
        <LottiePlayer
          animationData={require("../public/lottie/somethingwentwrong.lottie")}
        />
      </div>
      <h1 className="text-white text-3xl font-bold">
        Looks like something went wrong!
      </h1>
      <h1 className="text-white text-3xl font-bold">
        Please report this to{" "}
        <Link
          className="text-purple-600 hover:text-purple-900"
          href="mailto:qagura@protonmail.com"
          target="_blank"
        >
          qagura@protonmail.com
        </Link>
      </h1>
    </div>
  );
}
