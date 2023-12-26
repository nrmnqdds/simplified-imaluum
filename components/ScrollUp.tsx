"use client";

import { useState, useEffect } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollUp = () => {
  const [show, handleShow] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    show && (
      <div
        className="fixed bottom-10 right-10 z-20 text-zinc-900 dark:text-slate-100 cursor-pointer opacity-30 hover:opacity-80"
        onClick={scrollUp}
      >
        <BsFillArrowUpCircleFill size={50} />
      </div>
    )
  );
};

export default ScrollUp;
