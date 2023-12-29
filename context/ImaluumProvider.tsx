"use client";

import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "@/lib/server/profile-scraper";
import { GetResult } from "@/lib/server/result-scraper";
import { GetSchedule } from "@/lib/server/schedule-scraper";
import Image from "next/image";
import LOGO from "@/public/logo-landing-page.png";

const ImaluumProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, setProfile } = useProfile();
  const { setResult } = useResult();
  const { setSchedule } = useSchedule();

  const profileData = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await GetUserProfile(profile.matricNo as string);
      if (data.success) {
        setProfile(data.data);
        return data.data;
      }
    },
    retry: 3,
  });

  const resultData = useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      const data = await GetResult();
      if (data.success) {
        setResult(data.data);
        return data.data;
      }
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
    },
    retry: 3,
  });

  return profileData.isSuccess &&
    resultData.isSuccess &&
    scheduleData.isSuccess ? (
    <>{children}</>
  ) : (
    <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-4">
        <Image
          src={LOGO}
          alt="logo"
          width={200}
          height={200}
          className="object-contain animate-spin"
        />
        <div className="text-2xl font-semibold text-zinc-50">
          Loading your data...
        </div>
      </div>
    </div>
  );
};

export default ImaluumProvider;
