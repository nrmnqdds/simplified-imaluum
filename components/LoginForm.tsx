"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [checked, setChecked] = useState(false);
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
      setProfile({
        ...profile,
        matricNo: data.matricNo,
        password: form.getValues("password"),
      });
      router.replace("/dashboard");
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    // console.log(data, checked);
    toast.promise(loginMutation.mutateAsync(data), {
      loading: "Logging in...",
      success: "Logged in successfully.",
      error: "Invalid credentials.",
    });
  };

  return profile ? (
    <Button onClick={() => router.push("/dashboard")}>Next</Button>
  ) : (
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember Me
          </label>
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
