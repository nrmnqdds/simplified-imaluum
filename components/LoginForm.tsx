"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { ImaluumLogin } from "@/lib/server/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import toast from "react-hot-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const LoginForm = () => {
  const { profile, setProfile } = useProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: ImaluumLogin,
    onSuccess: (data) => {
      if (data.success) {
        setProfile({ ...profile, matricNo: data.matricNo });
        sessionStorage.setItem("matricNo", data.matricNo);
        router.replace("/dashboard");
      } else {
        console.log("error");
      }
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    toast.promise(loginMutation.mutateAsync(data), {
      loading: "Logging in...",
      success: "Logged in successfully.",
      error: "Invalid credentials.",
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col items-center gap-y-6"
    >
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="sm:col-span-4 flex-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
          >
            Username
          </label>
          <div className="mt-0">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Matric Number"
                {...register("username")}
              />
            </div>
          </div>
          {errors.username?.message && <p>{errors.username?.message}</p>}
        </div>
        <div className="sm:col-span-4 flex-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
          >
            Password
          </label>
          <div className="mt-0">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="password"
                name="pasword"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="****"
                {...register("password")}
              />
            </div>
            {errors.password?.message && <p>{errors.password?.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center justify-center md:justify-start w-full">
        <button
          type="submit"
          disabled={loginMutation.isPending || loginMutation.isSuccess}
          className={`rounded-md ${
            loginMutation.isPending || loginMutation.isSuccess
              ? "bg-cyan-900 cursor-not-allowed hover:bg-cyan-900 dark:hover:bg-cyan-900"
              : "dark:bg-cyan-500 bg-cyan-600"
          } px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 dark:hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 dark:focus-visible:outline-cyan-300`}
        >
          {loginMutation.isPending || loginMutation.isSuccess
            ? "Loading..."
            : "Log In"}
        </button>
        <Link
          href="#feature"
          className="text-sm font-semibold leading-6 text-white"
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector("#feature");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
