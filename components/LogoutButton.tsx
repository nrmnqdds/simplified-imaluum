"use client";

import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { ImaluumLogout } from "@/lib/server/auth";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const queryClient = useQueryClient();

  const { reset: ProfileReset } = useProfile();
  const { reset: ResultReset } = useResult();
  const { reset: ScheduleReset } = useSchedule();

  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: ImaluumLogout,
    onSuccess: () => {
      ProfileReset(); // Reset profile
      ResultReset(); // Reset result
      ScheduleReset(); // Reset schedule
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      router.refresh();
      toast.success("Logged out successfully");
    },
  });

  return (
    <Button
      onClick={() => logoutMutation.mutate()}
      className="bg-red-500 hover:bg-red-600"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
