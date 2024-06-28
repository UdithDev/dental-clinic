import { RiGhostLine } from "react-icons/ri";
import React from "react";
import { expressUrl } from "../constants";
import axios from "axios";
import { PiSealWarningDuotone } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";

const Register = () => {
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [message, setMessage] = React.useState<{
    type: "Error" | "Success";
    message: string;
  }>();

  const handleSignin = async () => {
    const reqUrl = `${expressUrl}/api/user/register`;

    const payload = {
      username,
      password,
      email,
    };

    let response;

    try {
      response = await axios.post(reqUrl, payload);
    } catch (error: any) {
      console.log(error);
      setMessage({
        type: "Error",
        message: error.response.data.message,
      });
    }

    if (response?.status === 200) {
      setMessage({
        type: "Success",
        message: "User has Sign in",
      });
    }
  };
  return (
    <div className="flex  ">
      {message && (
        <div
          className={`flex gap-2 items-center absolute top-4 right-4 ${
            message.type === "Error"
              ? "bg-red-400/20 text-red-400"
              : "bg-green-500/20 text-green-500"
          } p-3 rounded-lg font-medium text-sm`}
        >
          {message?.message}{" "}
          {message.type === "Error" ? (
            <PiSealWarningDuotone className="w-4 h-4 text-red-400" />
          ) : (
            <BsPatchCheck className="w-4 h-4 text-green-500" />
          )}
        </div>
      )}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <form className="max-w-xl  bg-[#265073]/20 rounded-xl p-10 flex flex-col justify-center items-center gap-4 ">
          <h2 className="flex gap-2 items-center font-bold text-2xl text-headbgsm">
            Sign Here !
            <RiGhostLine className="text-xl animate-pulse" />
          </h2>

          <div className="space-y-4">
            <label
              htmlFor="username"
              className="flex items-start justify-start font-semibold"
            >
              Username
            </label>
            <input
              title="username"
              type=" text"
              className="bg-transparent border-2 w-full p-3 m-2  rounded-full !outline-none placeholder:font-semibold px-3 "
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label
              htmlFor="password"
              className="flex items-start justify-start font-semibold"
            >
              Password
            </label>
            <input
              title="password"
              type="password"
              className="bg-transparent border-2 w-full p-3 m-2 rounded-full !outline-none placeholder:font-semibold px-3 "
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="email"
              className="flex items-start justify-start font-semibold"
            >
              Email
            </label>
            <input
              title="email"
              type="email"
              className="bg-transparent border-2 w-full p-3 m-2 rounded-full !outline-none placeholder:font-semibold px-3 "
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full">
            <button
              title="signIn"
              type="button"
              className="bg-[#265073] text-white p-2 rounded-full w-full font-semibold"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

{
  /* // username,
// hashedPassword,
// email,
// role: "INTERN" */
}
