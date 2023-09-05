"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const UserID = () => {
  const [userData, setUserData] = useState({}); // State to store user data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          //   setUserData(data); // Store the data in state
          console.log("data", data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="absolute top-5 right-10">
      <h1>User ID</h1>
      {/* Display user data */}
      {/* <div>
        User Image: <Image src={userData.userImageText} alt="User" />
      </div> */}
      {/* <p className="text-white">Hidden Text: {userData.hiddenText}</p> */}
    </div>
  );
};

export default UserID;
