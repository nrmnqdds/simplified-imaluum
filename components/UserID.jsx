"use client";

import { useEffect, useState, Fragment } from "react";
// import Image from "next/image";
import { useCookiesProvider } from "../app/context/cookies-provider";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@components/ui/menubar";
import { Skeleton } from "@components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

const UserID = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const { cookies } = useCookiesProvider();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("api/user", {
          headers: {
            Cookie: cookies,
          },
        });

        if (response.ok) {
          const { userImageText, hiddenText } = await response.json();
          setUserImage(userImageText);
          setUserName(hiddenText);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [cookies]);

  const router = useRouter();
  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <Fragment>
      {loading ? (
        <Skeleton className="w-24 h-8 rounded-xl" />
      ) : (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="flex flex-col-reverse items-center justify-center gap-2">
              <div className="text-center">
                <p className="dark:text-white text-zinc-900 font-bold text-[12px] hidden md:block">
                  {userName}
                </p>
                <p className="text-zinc-700 dark:text-zinc-600 font-semibold text-[10px] hidden md:block">
                  Student
                </p>
              </div>
              {userImage && (
                <Avatar>
                  <AvatarImage src={userImage} alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                // <Image
                //   src={userImage}
                //   alt="User"
                //   width={0}
                //   height={0}
                //   className="rounded-xl"
                //   style={{ width: "40px", height: "auto", objectFit: "contain" }}
                // />
              )}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleLogout}>Log Out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </Fragment>
  );
};

export default UserID;
