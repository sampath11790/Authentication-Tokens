import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";

const UserProfile = () => {
  const ctx = useContext(UserContext);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      {/* <h1>{ctx.loginToken}</h1> */}
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
