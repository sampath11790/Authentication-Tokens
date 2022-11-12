import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const ctx = useContext(UserContext);
  const logoutbuttonHandler = () => {
    ctx.logOut();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.loginState && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {ctx.loginState && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {ctx.loginState && (
            <li>
              <button onClick={logoutbuttonHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
