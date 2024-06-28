import { Link } from "react-router-dom";
import { RiGhostLine } from "react-icons/ri";
import { expressUrl } from "../constants";
import axios from "axios";
import React from "react";
import { PiSealWarningDuotone } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import useUser from "../hooks/useUser";
import { CgSpinner } from "react-icons/cg";
import "./login.css";

const Login = () => {
  const user = useUser();
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [message, setMessage] = React.useState<{
    type: "Error" | "Success";
    message: string;
  }>();

  const handleLogin = async () => {
    const reqUrl = `${expressUrl}/api/user/login`;

    const payload = {
      username,
      password,
    };

    let response;
    try {
      response = await axios.post(reqUrl, payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        message: "User has logged in!",
      });

      // Caching the user in local storage
      const data = response.data.data;
      localStorage.setItem("userSession", JSON.stringify(data));

      window.location.href = "/";
    }
  };

  if (!(user?.user === undefined)) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <CgSpinner className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex">
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

      <div className="w-1/2 " id="loginPage"></div>

      <div className=" w-1/2 flex flex-col items-center justify-center" id="">
        <form className="max-w-sm w-full h-96 bg-[#265073]/5 rounded-xl p-10 flex flex-col justify-center items-center gap-4">
          <h2 className="flex gap-2 items-center font-semibold ">
            Welcome
            <RiGhostLine className="text-xl animate-pulse" />
          </h2>

          <div className="space-y-2">
            <input
              title="username"
              type="text"
              className="bg-transparent border-2 w-full p-2 rounded-full !outline-none placeholder:font-semibold px-3"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              title="username"
              type="password"
              className="bg-transparent border-2 w-full p-2 rounded-full !outline-none placeholder:font-semibold px-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <button
              title="login"
              type="button"
              className="bg-[#265073] text-white p-2 rounded-full w-full font-semibold"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/forgotPassword" className="underline opacity-80 text-sm">
              forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
