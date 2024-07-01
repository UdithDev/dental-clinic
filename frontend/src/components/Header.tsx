import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
import { navigationLinks } from "../data/navigation-links";
import Logo from "./UI/logo";

function Header() {
  const user = useUser();
  const [toggle, setToggle] = useState(false);
  const path = useLocation();

  const handleLogout = () => {
    user?.logOut();
  };

  const MobileNav = () => {
    return (
      <div
        className={`${toggle ? "" : "hidden"}
    relative p-4 gap-2 text-sm font-semibold bg-headbgsm shadow-sm flex flex-col items-center justify-center`}
      >
        {navigationLinks.map((nav) => (
          <Link key={nav.name} to={nav.url}>
            <button
              type="button"
              className="text-white hover:text-black/80 border-b-[2px] border-white/20"
            >
              {nav.name}
            </button>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-whites text-black">
      <div className="flex items-center justify-between py-6 px-5 w-full max-w-7xl mx-auto">
        <div className="w-1/4">
          <Link to="/">
            <Logo className="h-8 w-24" />
          </Link>
        </div>

        <div className="flex w-1/2 space-x-4 max-w-xl items-center justify-center">
          <div className="hidden md:block">
            <div className="flex gap-7">
              {navigationLinks.map((nav) => {
                if (!(user?.user?.role === "ADMIN") && nav.url === "/adduser") {
                  return null;
                }

                return (
                  <Link key={nav.name} to={nav.url}>
                    <button
                      type="button"
                      className={`hover:-translate-y-[1px] hover:translate-x-[1px] transition-all duration-300 ease-in-out ${
                        nav.url === path.pathname
                          ? "font-semibold text-black"
                          : "text-black/50"
                      }`}
                    >
                      {nav.name}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
          <IoMdMenu
            onClick={() => setToggle(!toggle)}
            className="md:hidden w-5 hover:cursor-pointer hover:text-teal-300"
          />
        </div>

        <div className="w-1/4 flex items-center justify-end gap-2">
          <div className="flex items-center gap-2 border-2 px-4 py-2 rounded-full hover:text-accent cursor-pointer hover:border-b-4 hover:border-b-accent">
            <FaRegUser className="w-3 hover:cursor-pointer" />

            <h2 className="font-semibold text-xs">{user?.user?.username}</h2>
          </div>
          <button
            className="text-xs hover:-translate-y-[1px] hover:translate-x-[1px] transition-all duration-300 ease-in-out"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

export default Header;
