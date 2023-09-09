"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const UserID = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("api/user");

        if (response.ok) {
          const { userImageText, hiddenText } = await response.json();
          // const decodedUserImage = atob(userImageText);
          // setUserImage(decodedUserImage);
          // console.log("User Image:", decodedUserImage);
          setUserImage(userImageText);
          setUserName(hiddenText);
          setLoading(false);
        } else {
          console.error("Error fetching user data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Render loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="absolute top-5 right-10 flex gap-2 items-center">
      <div className="text-right">
        <p className="dark:text-white text-zinc-900 font-bold text-[12px]">
          {userName}
        </p>
        <p className="text-zinc-700 dark:text-zinc-600 font-semibold text-[10px]">
          Student
        </p>
      </div>
      {userImage && (
        <Image
          src={userImage}
          alt="User"
          width={0}
          height={0}
          className="rounded-xl"
          style={{ width: "40px", height: "auto", objectFit: "contain" }}
        />
      )}
    </div>
  );
};

export default UserID;
