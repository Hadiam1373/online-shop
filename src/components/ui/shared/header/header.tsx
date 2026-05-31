import {DesktopHeader, MobileHeader} from "./components";

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


