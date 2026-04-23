import Image from "next/image";
import { Button } from "../../button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </div>
  );
};

export default Header;

const DesktopHeader = () => {
  return (
    <header className="w-full h-16 bg-background grid grid-cols-2 items-center px-12 shadow">
      <div>
        <Image
          width={100}
          height={20}
          src="/logo-s.png"
          alt="Logo"
          className="h-16"
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link href="/">
          <Button variant="link" size="sm">
            Home
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="link" size="sm">
            Products
          </Button>
        </Link>
        <ShoppingCart />
        <Link href="/auth/login">
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
};
const MobileHeader = () => {
  return (
    <header className="w-full h-16 bg-primary-foreground  shadow flex items-center justify-center">
      <h1 className="text-xl font-bold">My App</h1>
    </header>
  );
};
