import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import UserContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const newpaswordRef = useRef();
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBfgANxrAz4GiGlY8rVOTnzXdsyhltW2vA";
  const passwordChangeHandler = async (event) => {
    event.preventDefault();
    try {
      const userobj = {
        idToken: ctx.loginToken,
        password: newpaswordRef.current.value,
        returnSecureToken: true,
      };
      console.log(userobj);
      const rseponse = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBfgANxrAz4GiGlY8rVOTnzXdsyhltW2vA",
        {
          method: "POST",
          body: JSON.stringify(userobj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await rseponse.json();
      if (data.error) {
        // console.log(data.error.message);
        throw new Error(data.error.message);
      } else {
        console.group(data);

        ctx.storeLoginToken(data.idToken);
        history.replace("/");
        alert("successfully updated");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newpaswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
