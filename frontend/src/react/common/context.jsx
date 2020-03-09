// @flow
import * as React from "react";

type User = {
  id: number,
  username: string
};

type ContextType = [?User, (user: ?User) => void];

export const UserContext = React.createContext<ContextType>([null, () => {}]);

type PropTypes = {
  children: React.ChildrenArray<any>
};

export const UserProvider = ({ children }: PropTypes) => {
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "null");
  const [user, setUser] = React.useState<?User>(localStorageUser);

  const setUserInStorage = (u: ?User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u || null));
  };

  React.useEffect(() => {
    const resetUser = () => {
      console.log("User changed in external screen");
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };
    window.addEventListener("storage", resetUser);
    return () => window.removeEventListener("storage", resetUser);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUserInStorage]}>
      {children}
    </UserContext.Provider>
  );
};
