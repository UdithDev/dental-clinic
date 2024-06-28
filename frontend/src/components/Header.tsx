import { useState } from "react";
import logo from "../assets/images/logo.png";
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

function Header() {
  const user = useUser();
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-headbg text-white">
      <div className="flex items-center justify-between shadow-sm py-7 px-5 w-full max-w-7xl mx-auto">
        <div className="w-28">
          <a href="/">
            <img className="grayscale hover:grayscale-0" src={logo} alt="" />
          </a>
        </div>

        <div className="flex w-full space-x-4 max-w-xl items-center justify-end">
          <div className="hidden md:block font-semibold">
            <div className=" flex gap-7">
              <Link to="/">
                <button type="button" className="hover:text-teal-300">
                  HOME
                </button>
              </Link>

              <Link to="/inventory">
                <button type="button" className="hover:text-teal-300">
                  INVENTORY
                </button>
              </Link>
            </div>
          </div>
          <IoMdMenu
            onClick={() => setToggle(!toggle)}
            className="md:hidden w-5 hover:cursor-pointer hover:text-teal-300"
          />

          <div className="flex items-center gap-2">
            <Link to="/register">
              <FaRegUser className="w-5 hover:cursor-pointer hover:text-teal-300 " />
            </Link>

            <h2 className="font-semibold">{user?.user?.username}</h2>
          </div>
        </div>
      </div>
      <div
        className={`${toggle ? "" : "hidden"}
      relative p-4 gap-2 text-sm font-semibold bg-headbgsm shadow-sm flex flex-col items-center justify-center`}
      >
        <Link to="/">
          <button
            type="button"
            className="text-white hover:text-black/80 border-b-[2px] border-white/20 "
          >
            HOME
          </button>
        </Link>
        <Link to="/inventory">
          <button
            type="button"
            className="text-white hover:text-black/80 border-b-[2px] border-white/20 "
          >
            INVENTORY
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
