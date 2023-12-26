"use client";

import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { GetUserProfile } from "@/lib/server/profile-scraper";
import { GetResult } from "@/lib/server/result-scraper";
import { GetSchedule } from "@/lib/server/schedule-scraper";
import LottiePlayer from "@/components/LottiePlayer";

const ImaluumProvider = ({ children }: { children: React.ReactNode }) => {
  const [matricNo, setMatricNo] = useState<string | null>(null);
  const { setProfile } = useProfile();
  const { setResult } = useResult();
  const { setSchedule } = useSchedule();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("matricNo") === null) {
      router.push("/");
    }

    setMatricNo(sessionStorage.getItem("matricNo"));
  }, [router]);

  const profileData = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await GetUserProfile(matricNo as string);
      if (data.success) {
        setProfile(data.data);
        return data.data;
      }
      console.log("error: ", data.error);
    },
    retry: 3,
  });

  const resultData = useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      const data = await GetResult();
      if (data.success) {
        // @ts-ignore
        setResult(data.data);
        return data.data;
      }
      console.log("error: ", data.error);
    },
    retry: 3,
  });

  const scheduleData = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const data = await GetSchedule();
      if (data.success) {
        setSchedule(data.data);
        return data.data;
      }
      console.log("error: ", data.error);
    },
    retry: 3,
  });

  return profileData.isSuccess &&
    resultData.isSuccess &&
    scheduleData.isSuccess ? (
    <>{children}</>
  ) : (
    <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
      <LottiePlayer
        animationData={require("../public/lottie/loading.lottie")}
      />
    </div>
  );
};

export default ImaluumProvider;
