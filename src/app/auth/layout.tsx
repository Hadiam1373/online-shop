import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-foreground h-screen flex justify-center">
      <div className="container mx-auto flex items-center justify-center md:justify-between">
        <div className="flex-1">{children}</div>
        <div className="hidden md:flex flex-1  justify-end">
          <Image
            width={"600"}
            height={"400"}
            src="/auth-image-page.png"
            alt="Logo"
            className="h-dvh-50 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
