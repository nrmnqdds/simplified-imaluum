"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProfile from "@/hooks/useProfile";
import useResult from "@/hooks/useResult";
import useSchedule from "@/hooks/useSchedule";
import { ImaluumLogin } from "@/lib/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { CSSProperties, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Please enter matric number.",
  }),
  password: z.string().min(2, {
    message: "Please enter password.",
  }),
});

type Props = {} & HTMLAttributes<HTMLFormElement> & CSSProperties;

const LoginForm = () => {
  const { reset: ProfileReset, setProfile } = useProfile();
  const { reset: ScheduleReset } = useSchedule();
  const { reset: ResultReset } = useResult();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials.");
      }

      const json = await res.json();

      return json;
    },
    // await ImaluumLogin(values),
    onSuccess: (data: {
      username: string;
    }) => {
      setProfile({
        matricNo: data.username,
        name: "",
        imageURL: "",
      });
      router.replace("/dashboard");
      console.log("reroute");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Invalid credentials.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    ProfileReset();
    ScheduleReset();
    ResultReset();
    toast.promise(loginMutation.mutateAsync(values), {
      // Pass the required properties to mutateAsync
      loading: "Logging in...",
      success: "Logged in successfully.",
      error: "Invalid credentials.",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mt-10 w-fit"
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Matric Number" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={loginMutation.isPending || loginMutation.isSuccess}
        >
          {loginMutation.isPending || loginMutation.isSuccess
            ? "Loading..."
            : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
