import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
const ContextProvider = (props) => {
  const [login, setlogin] = useState("");
  const [loginState, setloginState] = useState(false);

  const storeLoginTokenHandler = (token) => {
    localStorage.setItem("token", true);
    setlogin(token);
    setloginState(true);
  };
  const logOutHandler = () => {
    console.log("token id deleted");
    localStorage.removeItem("token");
    setlogin("");
    setloginState(false);
  };
  let token = localStorage.getItem("token");
  useEffect(() => {
    token ? setloginState(true) : console.log("please login to contiue ");
  }, [token]);
  //console.log("yes i have your token ", localStorage.getItem("token"));

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
