"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProfile from "@/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function ProfileDropdown() {
  const { profile } = useProfile();

  const queryClient = useQueryClient();

  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!profile ? (
          <>
            <div className="h-8 w-8 rounded-full bg-secondary animate-pulse" />
            <div className="hidden md:block h-5 w-48 rounded-sm bg-secondary animate-pulse ml-4" />
          </>
        ) : (
          <Button className="bg-tranparent hover:bg-transparent focus:outline-none space-x-2 ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            <Avatar>
              <AvatarImage src={profile?.imageURL} alt="avatar" />
              <AvatarFallback>GG</AvatarFallback>
            </Avatar>
            <span className="hidden md:flex lg:items-center">
              <span
                className="text-sm font-semibold leading-6 text-foreground"
                aria-hidden="true"
              >
                {profile?.name}
              </span>
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer focus:bg-red-600/50"
          onClick={async () => {
            await fetch("/api/logout", {
              method: "DELETE",
            });

            queryClient.clear();

            toast.success("Logged out successfully");

            router.replace("/");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
