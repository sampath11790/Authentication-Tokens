import { createContext } from "react";

const UserContext = createContext({
  loginToken: "",
  loginState: false,
  storeLoginToken: () => {},
  logOut: () => {},
});

export default UserContext;
