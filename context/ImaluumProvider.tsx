"use client";

import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { GetUserProfile } from "@/lib/server/profile-scraper";
import { GetResult } from "@/lib/server/result-scraper";
import { GetSchedule } from "@/lib/server/schedule-scraper";
import LOGO from "@/public/logo-landing-page.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ImaluumProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, setProfile } = useProfile();
  const { result, setResult } = useResult();
  const { schedule, setSchedule } = useSchedule();

  const profileData = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await GetUserProfile(profile.matricNo as string);
      if (data.success) {
        const password = profile.password;
        setProfile({ ...data.data, password });
        return data.data;
      }
    },
    retry: 3,
    enabled: !profile.imageURL,
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
    enabled: !result,
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
    enabled: !schedule,
  });

  return profile && result && schedule ? (
    <>{children}</>
  ) : (
    <div className="w-full h-screen bg-background flex items-center justify-center">
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
