"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { useCookiesProvider } from "../app/context/cookies-provider";
import { useRouter } from "next/navigation";
import { Button, Menu, MenuItem, Skeleton } from "@mui/material";

const UserID = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const { cookies } = useCookiesProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
  }, [cookies]);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    router.replace("/");
  };

  return loading ? (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rectangular"
      width={300}
      height={70}
      style={{
        borderRadius: "20px",
        position: "absolute",
        top: "5px",
        right: "10px",
      }}
    />
  ) : (
    <Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "5px",
          right: "10px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
        // className="absolute top-5 right-10 flex gap-2 items-center"
      >
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
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserID;
