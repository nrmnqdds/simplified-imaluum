"use client";

import { useEffect, useState } from "react";

const CGPA = ({ className = "" }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getSession() {
      const response = await fetch(`api/getCGPA`);

      setLoading(false);
    }
    getSession();
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* <h1>CGPA</h1> */}
      <h1>Coming Soon</h1>
    </div>
  );
};

export default CGPA;
