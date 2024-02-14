"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  rememberMe: z.boolean().default(false).optional(),
});

const LoginForm = () => {
  const { profile, setProfile } = useProfile();
  const { result } = useResult();
  const { schedule } = useSchedule();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { username, password, rememberMe } = values; // Destructure the values object
    toast.promise(
      loginMutation.mutateAsync({ username, password, rememberMe }),
      {
        // Pass the required properties to mutateAsync
        loading: "Logging in...",
        success: "Logged in successfully.",
        error: "Invalid credentials.",
      }
    );
  };

  return profile && result?.length > 0 && schedule?.length > 0 ? (
    <Link href="/dashboard">
      <Button className="mt-10">Go to dashboard</Button>
    </Link>
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
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />
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
