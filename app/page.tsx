import ScrollUp from "@/components/ScrollUp";
import ScrollProgress from "@/components/ScrollbarProgress";
import Feature from "@/components/sections/FeatureSection";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/HeroSection";
import Testimonial from "@/components/sections/TestimonialSection";
import LenisSmoothScroll from "@/context/LenisProvider";
// import Script from "next/script";

export default function Home() {
  return (
    <LenisSmoothScroll>
      <ScrollProgress />
      <main className="relative isolate overflow-hidden bg-slate-100 dark:bg-zinc-900">
        <ScrollUp />
        <Hero />
        <Feature />
        <Testimonial />
      </main>
      {/* <Script src="https://webkeyz.github.io/stand-with-palestine/dist/stand-with-palestine-widget.js" /> */}
      <Footer />
    </LenisSmoothScroll>
  );
}
