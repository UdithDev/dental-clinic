import React from "react";

import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer className="bg-footerbg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/">
            <img src={logo} alt="Flowbite Logo" className="mr-3 w-28" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-xl font-medium text-white sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>

            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-accent grayscale sm:mx-auto lg:my-8" />
        <span className="block test-sm text-black/70 sm:text-center hover:text-white">
          © 2023{" "}
          <a href="" className="hover:underline">
            Dental Clinic™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
