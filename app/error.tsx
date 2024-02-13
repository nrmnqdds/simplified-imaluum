"use client"; // Error components must be Client Components

import { useEffect } from "react";
import LottiePlayer from "@/components/LottiePlayer";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function CustomError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
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
