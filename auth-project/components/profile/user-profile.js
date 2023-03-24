import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className={classes.profile}>Loading</p>;
  }
  // Redirect away if NOT auth
  if (status === "unauthenticated") {
    window.location.href = "/auth";
  }

  if (status === "authenticated") {
    return (
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    );
  }
}

export default UserProfile;
