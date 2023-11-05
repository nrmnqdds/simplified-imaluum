"use client";

import { useState, useEffect, Fragment } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Feature from "./(sections)/FeatureSection";
import Hero from "./(sections)/HeroSection";
import Footer from "./(sections)/Footer";
import Testimonial from "./(sections)/TestimonialSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const [show, handleShow] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetch("api/auth/verify", {
      method: "GET",
    }).then(async (res) => {
      const response = await res.json();
      if (response.message === "yes cookie") {
        router.replace("/dashboard");
      }
    });
  }, [router]);

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
    <Fragment>
      <main className="relative isolate overflow-hidden bg-slate-100 dark:bg-zinc-900">
        {show && (
          <div
            className="fixed bottom-10 right-10 z-20 text-zinc-900 dark:text-slate-100 cursor-pointer opacity-30 hover:opacity-80"
            onClick={scrollUp}
          >
            <BsFillArrowUpCircleFill size={50} />
          </div>
        )}
        <Hero />
        <Feature />
        <Testimonial />
      </main>
      <Footer />
    </Fragment>
  );
}
