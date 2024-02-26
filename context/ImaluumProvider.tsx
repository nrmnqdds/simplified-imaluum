"use client";

import LoadingScreen from "@/components/loading-screen";
import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { GetUserProfile } from "@/lib/server/profile-scraper";
import { GetResult } from "@/lib/server/result-scraper";
import { GetSchedule } from "@/lib/server/schedule-scraper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ImaluumProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, setProfile } = useProfile();
  const { setResult } = useResult();
  const { setSchedule } = useSchedule();

  const profileData = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await GetUserProfile(profile?.matricNo as string);
      if (data.success && data.data) {
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

  return scheduleData.isSuccess &&
    profileData.isSuccess &&
    resultData.isSuccess ? (
    <>{children}</>
  ) : (
    <LoadingScreen />
  );
};

export default ImaluumProvider;
