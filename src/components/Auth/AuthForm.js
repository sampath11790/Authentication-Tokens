import { useState, useRef, useContext } from "react";
import UserContext from "../../Context/UserContext";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setloading] = useState(false);
  const enteredEmailRef = useRef();
  const enteredPaswordRef = useRef();
  const ctx = useContext(UserContext);
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const loginHandler = async (event) => {
    setloading(true);
    event.preventDefault();
    try {
      let url;

      const userobj = {
        email: enteredEmailRef.current.value,
        password: enteredPaswordRef.current.value,
        returnSecureToken: true,
      };
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfgANxrAz4GiGlY8rVOTnzXdsyhltW2vA";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfgANxrAz4GiGlY8rVOTnzXdsyhltW2vA";
      }
      const rseponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userobj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await rseponse.json();
      if (data.error) {
        // console.log(data.error.message);
        throw new Error(data.error.message);
      } else {
        //console.group(data.idToken);
        ctx.storeLoginToken(data.idToken);
        history.replace("/");
        setloading(false);
      }
    } catch (error) {
      // console.log(error);
      alert(error.message, setloading(false));
      // error ? alert("try again getting error", setloading(false)) : " ";
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={enteredPaswordRef}
          />
        </div>
        <div className={classes.actions}>
          {loading ? (
            <span className={classes.actspan}>Sending request....</span>
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
