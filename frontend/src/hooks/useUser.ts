import React from "react";

type UserSession = {
  username: string;
  email: string;
  role: "INTERN" | "MANAGER" | "ADMIN";
  token: string;
};

interface IUseUser {
  user: UserSession | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserSession | undefined>>;
  logOut: () => void;
}

const useUser = (): IUseUser | undefined => {
  const [user, setUser] = React.useState<UserSession>();

  React.useEffect(() => {
    const userAsString = localStorage.getItem("userSession");
    const user = userAsString ? JSON.parse(userAsString) : undefined;

    setUser(user);
  }, []);

  const logOut = () => {
    localStorage.removeItem("userSession");
    window.location.href = "/";
  };

  return {
    user,
    setUser,
    logOut,
  };
};

export default useUser;
