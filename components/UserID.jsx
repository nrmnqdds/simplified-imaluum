"use client";

import { useEffect, useState } from "react";

const UserID = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("api/user");

        if (response.ok) {
          const { userImageText, hiddenText } = await response.json();
          setUserName(hiddenText); // Store the data in state
          setLoading(false); // Update loading state
        } else {
          console.error("Error fetching user data");
          setLoading(false); // Update loading state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Update loading state
      }
    }

    fetchData();
  }, []);

  // Render loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="absolute top-5 right-10">
      <h1>User ID</h1>
      <p className="text-white">User Name: {userName}</p>
      {/* Display user data */}
      {/* <div>
        User Image: <Image src={userData.userImageText} alt="User" />
      </div> */}
      {/* <p className="text-white">Hidden Text: {userData.hiddenText}</p> */}
    </div>
  );
};

export default UserID;
