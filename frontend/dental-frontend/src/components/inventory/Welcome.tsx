import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

function welcome() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`max-w-6xl ${!toggle ? "" : "hidden"}`}>
      <h1 className="font-semibold text-2xl py-4 text-accent">Welcome!</h1>
      <div className="flex flex-col gap-4">
        <p>Welcome to our dental clinic's inventory page!</p>
        <p>
          Here you'll find everything you need to know about the dental products
          and equipment we use to ensure the highest level of care for our
          patients. We take great pride in maintaining a comprehensive and
          up-to-date inventory of dental supplies, from state-of-the-art dental
          chairs to the latest in sterilization technology.
        </p>
        <p>
          Our team is dedicated to providing you with the best possible dental
          experience, and we believe that starts with using the best tools and
          equipment available. We hope you find our inventory page informative
          and helpful, and we look forward to serving your dental needs soon.
        </p>
        <div className="flex-1 cursor-pointer items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="flex text-accent font-semibold text-sm hover: scale-110 transition duration-200 ease-out "
          >
            Collaspe this.
            <FaArrowAltCircleUp className="w-5 transition duration-200 ease-out" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default welcome;
