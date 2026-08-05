import { Outlet } from "react-router-dom";
import NavbarTwo from "../reuseAble/NavbarTwo";

const LandingLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#03070A] overflow-hidden">
      {/* Landing page background texture */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/texture.png')" }}
      />

      {/* Content above background */}
      <div className="relative z-10 flex flex-col flex-1">
        <NavbarTwo />
        <main className="flex-1">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default LandingLayout;
