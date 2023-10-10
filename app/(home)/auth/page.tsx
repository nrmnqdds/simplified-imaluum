"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Login succesful!");
  }, []);

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return <Toaster position="top-center" reverseOrder={false} />;
}
