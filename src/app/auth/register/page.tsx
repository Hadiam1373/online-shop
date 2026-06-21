"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

const registerFormSchema = object({
  email: string().required("Email is required").email("Invalid email format"),
  password: string().required("Password is required"),
  phone: string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  address: string().required("Address is required"),
});

const RegisterPage = () => {
  const methods = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<any> = (data) =>
    console.log(data, methods.formState.errors.form?.message);
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-linear-to-bl from-primary/10 via-background to-background" />
      <Card className="w-full max-w-md px-6 py-8">
        <h1 className="text-2xl text-center font-bold text-foreground">ثبت‌نام در فروشگاه</h1>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
          <Input
            {...methods.register("email")}
            type="email"
            placeholder="ایمیل"
            error={methods.formState.errors.email?.message}
            autoComplete="email"
          />
          <Input
            {...methods.register("phone")}
            type="text"
            placeholder="شماره تلفن"
            error={methods.formState.errors.phone?.message}
            autoComplete="tel"
          />
          <Input
            {...methods.register("address")}
            type="text"
            placeholder="آدرس"
            error={methods.formState.errors.address?.message}
            autoComplete="street-address"
          />

          <Input
            {...methods.register("password")}
            type="password"
            placeholder="رمز عبور"
            error={methods.formState.errors.password?.message}
            autoComplete="current-password"
          />

          <Button variant="default" type="submit" className="w-full mt-2">
            ثبت‌نام
          </Button>
          <Link href="/auth/login" className="text-center">
            <Button variant="link" type="button">
              قبلاً ثبت‌نام کرده‌اید؟ ورود
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
};
export default RegisterPage;
