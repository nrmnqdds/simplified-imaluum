"use client";

import LoadingScreen from "@/components/loading-screen";
import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { useQuery } from "@tanstack/react-query";

const ImaluumProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, setProfile } = useProfile();
  const { setResult } = useResult();
  const { setSchedule } = useSchedule();

  const profileData = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`/api/profile?username=${profile?.matricNo}`);

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();

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
      const res = await fetch("/api/result");

      if (!res.ok) {
        throw new Error("Failed to fetch result");
      }

      const data = await res.json();

      if (data.success) {
        setResult(data.data);
        return data.data;
      }
    },
    retry: 5,
  });

  const scheduleData = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      // const data = await GetSchedule();
      const res = await fetch("/api/schedule");

      if (!res.ok) {
        throw new Error("Failed to fetch schedule");
      }

      const data = await res.json();

      if (data.success) {
        setSchedule(data.data);
        return data.data;
      }
    },
    retry: 5,
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
