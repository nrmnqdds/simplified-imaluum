import ScrollUp from "@/components/ScrollUp";
import Feature from "@/components/sections/FeatureSection";
import Hero from "@/components/sections/HeroSection";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/TestimonialSection";

export default function Home() {
  return (
    <>
      <main className="relative isolate overflow-hidden bg-slate-100 dark:bg-zinc-900">
        <ScrollUp />
        <Hero />
        <Feature />
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
