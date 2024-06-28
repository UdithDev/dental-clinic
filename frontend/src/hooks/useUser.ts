import React from "react";

type UserSession = {
  username: string;
  email: string;
  role: string;
  token: string;
};

interface IUseUser {
  user: UserSession | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserSession | undefined>>;
}

const useUser = (): IUseUser | undefined => {
  const [user, setUser] = React.useState<UserSession>();

  React.useEffect(() => {
    const userAsString = localStorage.getItem("userSession");
    const user = userAsString ? JSON.parse(userAsString) : undefined;

    setUser(user);
  }, []);

  return {
    user,
    setUser,
  };
};

export default useUser;
