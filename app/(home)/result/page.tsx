"use client";

import { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    (async function () {
      const res = await fetch("api/result");

      const data = await res.json();
      console.log(data);
    })();
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity flex items-center justify-center">
      <p className="text-zinc-800">resultspage</p>
    </div>
  );
};

export default Page;
