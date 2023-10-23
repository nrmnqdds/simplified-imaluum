"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Logging out...");
    (async function () {
      await fetch("/api/logout", {
        method: "DELETE",
      });
    })();
  }, []);

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <Toaster position="top-center" reverseOrder={false} />;
}
