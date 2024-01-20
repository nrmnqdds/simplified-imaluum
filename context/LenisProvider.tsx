"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisSmoothScroll({
  children,
}: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 2.0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
