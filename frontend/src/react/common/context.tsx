import React from "react";

export type User = {
  id?: number;
  username: string;
};

interface SetUser {
  (user: User | null): void;
}

type ContextType = [User | null, SetUser];

export const UserContext = React.createContext<ContextType>([
  null,
  () => {
    return;
  },
]);

type PropTypes = {
  children: React.ReactChildren | React.ReactChild;
};

export const UserProvider = ({ children }: PropTypes) => {
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "null");
  const [user, setUser] = React.useState<User | null>(localStorageUser);

  function setUserInStorage(u: User | null) {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u || null));
  }

  React.useEffect(() => {
    const resetUser = () => {
      console.log("User changed in external screen");
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };
    window.addEventListener("storage", resetUser);
    return () => window.removeEventListener("storage", resetUser);
  }, [user]);

  return <UserContext.Provider value={[user, setUserInStorage]}>{children}</UserContext.Provider>;
};
