"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Login succesful!");
  }, []);

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return <Toaster position="top-center" reverseOrder={false} />;
}
