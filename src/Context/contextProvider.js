import React, { useState } from "react";
import UserContext from "./UserContext";
const ContextProvider = (props) => {
  const [login, setlogin] = useState("");
  const [loginState, setloginState] = useState(false);

  const storeLoginTokenHandler = (token) => {
    setlogin(token);
    setloginState(true);
  };
  const logOutHandler = () => {
    console.log("token id deleted");
    setlogin("");
    setloginState(false);
  };
  return (
    <UserContext.Provider
      value={{
        loginToken: login,
        loginState: loginState,
        storeLoginToken: storeLoginTokenHandler,
        logOut: logOutHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
