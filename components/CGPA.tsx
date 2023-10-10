"use client";

import { useEffect, useState } from "react";
import { useCookiesProvider } from "../app/context/cookies-provider";

const CGPA = ({ className }) => {
  const [loading, setLoading] = useState(true);
  const { cookies } = useCookiesProvider();
  const [sessionsList, setSessionsList] = useState({ sessionList: [] });
  const [session, setSession] = useState("");
  // useEffect(() => {
  //   async function getSession() {
  //     const response = await fetch(`api/getCGPA`);

  //     setLoading(false);
  //   }
  //   getSession();
  // }, [cookies]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* <h1>CGPA</h1> */}
      <h1>Coming Soon</h1>
    </div>
  );
};

export default CGPA;
