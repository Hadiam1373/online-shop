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
          {...methods.register("phone")}
          type="text"
          placeholder="Phone Number"
          error={methods.formState.errors.phone?.message}
          autoComplete="tel"
        />
        <Input
          {...methods.register("address")}
          type="text"
          placeholder="Address"
          error={methods.formState.errors.address?.message}
          autoComplete="street-address"
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
            Register
          </Button>
          <Link href="/auth/login">
            <Button variant="link" type="submit">
              Already have an account? Login.
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};
export default RegisterPage;
