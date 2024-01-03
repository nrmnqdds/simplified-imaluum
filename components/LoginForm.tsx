"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProfile from "@/hooks/useProfile";
import { ImaluumLogin } from "@/lib/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: ImaluumLogin,
    onSuccess: (data) => {
      setProfile({ ...profile, matricNo: data.matricNo });
      router.replace("/dashboard");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-10">
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
