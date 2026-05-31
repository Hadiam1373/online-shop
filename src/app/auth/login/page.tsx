"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "@/lib/api/auth/auth.query";
import { ILoginParams } from "@/lib/api/auth";

const loginFormSchema = object({
  email: string().required("Email is required").email("Invalid email format"),
  password: string().required("Password is required"),
});

const LoginPage = () => {
  const { mutate: login } = useLogin();
  const methods = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<ILoginParams> = (data) => login(data);
  return (
    <Card className="px-6 mx-4">
      <h1 className="text-2xl text-center font-bold">Welcome to Online Shop</h1>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <Input
        {...methods.register("email")}
          type="email"
          placeholder="Email"
          error={methods.formState.errors.email?.message}
          autoComplete="email"
        />
        <Input
          {...methods.register("password")}
          type="password"
          placeholder="Password"
          error={methods.formState.errors.password?.message}
          autoComplete="current-password"
        />

        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
          <Button variant="default" type="submit">
            Login
          </Button>
          <Link href="/auth/register">
            <Button variant="link" type="submit">
              Don't have an account? Register.
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};
export default LoginPage;
