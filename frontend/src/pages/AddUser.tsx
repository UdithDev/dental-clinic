/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { expressUrl } from "../constants";
import axios from "axios";
import { PiSealWarningDuotone } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import { RiGhostLine } from "react-icons/ri";
import { FaUserTimes } from "react-icons/fa";
import { useTokenAsBearer } from "../utils/useToken";
import useUser from "../hooks/useUser";
import Swal from "sweetalert2";

const AddUser = () => {
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [role, setRole] = React.useState<string>();
  const [message, setMessage] = React.useState<{
    type: "Error" | "Success";
    message: string;
  }>();
  const [userList, setUserList] = React.useState<
    Array<{
      username: string;
      role: string;
      createdAt: string;
    }>
  >();
  const [deleteToggle, setDeleteToggle] = React.useState<boolean>(false);
  const _user = useUser();

  const getUsers = async () => {
    const reqUrl = `${expressUrl}/api/user/all`;

    let response;
    try {
      response = await axios.get(reqUrl);

      return response.status === 200 ? response.data : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async () => {
    if (!role) {
      setMessage({
        type: "Error",
        message: "Select a role!",
      });

      return;
    }

    const reqUrl = `${expressUrl}/api/user/register`;

    const payload = {
      username,
      password,
      email,
      role,
    };

    let response;
    try {
      response = await axios.post(reqUrl, payload);
    } catch (error: any) {
      console.log(error);
      try {
        setMessage({
          type: "Error",
          message: error.response.data.message,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (response?.status === 200) {
      setMessage({
        type: "Success",
        message: "User added",
      });

      window.location.href = "/";
    }
  };

  React.useEffect(() => {
    getUsers()
      .then((res) => setUserList(res))
      .catch((err) => console.log(err));
  }, [deleteToggle]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {message && (
        <div
          className={`flex gap-2 items-center absolute top-0 right-4 ${
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
        <form className="max-w-md w-full bg-[#265073]/20 rounded-xl p-10 flex flex-col justify-center items-center gap-4 ">
          <h2 className="flex gap-2 font-bold text-2xl text-headbgsm w-full justify-center items-center">
            Add new user!
            <RiGhostLine className="text-xl animate-pulse" />
          </h2>

          <div className="space-y-4 flex flex-col w-full px-5">
            <label
              htmlFor="username"
              className="flex items-start justify-start font-semibold"
            >
              Username
            </label>
            <input
              title="username"
              type=" text"
              className="bg-transparent border-2 w-full p-3 rounded-full !outline-none placeholder:font-semibold px-3"
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
              className="bg-transparent border-2 w-full p-3 rounded-full !outline-none placeholder:font-semibold px-3 "
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
              className="bg-transparent border-2 w-full p-3 rounded-full !outline-none placeholder:font-semibold px-3 "
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="role"
              className="flex items-start justify-start font-semibold"
            >
              Role
            </label>
            <select
              required
              defaultValue={role ? role : "#"}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 rounded-full"
              name="role"
              id="role"
            >
              <option value="#" disabled>
                Select a role
              </option>
              <option value="INTERN">Intern</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="w-full">
            <button
              title="signIn"
              type="button"
              className="bg-[#265073] text-white p-2 rounded-full w-full font-semibold mt-5"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 max-w-md w-full border-2 rounded-2xl flex flex-col gap-4 p-4">
        <h2 className="font-semibold text-center text-xl text-accent">
          Recently Added Users
        </h2>

        <div className="flex flex-col gap-2">
          {userList?.map((user) => (
            <div
              className="flex items-start p-6 bg-black/5 rounded-xl"
              key={user.username}
            >
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Username: {user.username}</h2>
                <h2>Role: {user.role}</h2>
              </div>
              <div className="w-1/2 flex items-center justify-between">
                <p className="w-1/2 text-right">
                  {user.createdAt.split("T")[0]}
                </p>
                <FaUserTimes
                  className="cursor-pointer"
                  onClick={async () => {
                    const url = `${expressUrl}/api/user/delete?username=${user.username}`;

                    let response;
                    try {
                      response = await axios.delete(url, {
                        headers: {
                          Authorization: useTokenAsBearer(_user.user.token!),
                        },
                      });
                    } catch (error) {
                      console.log(error);
                    }

                    if (response?.status === 200) {
                      setDeleteToggle(!deleteToggle);
                      // alert("Deleted")
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: " User successfully saved!",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
