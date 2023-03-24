import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();

  async function changePasswordHandler(pwdData) {
    const result = await fetch("/api/user/change-pass", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        oldPass: pwdData.oldPass,
        newPass: pwdData.newPass,
      }),
    });

    const data = await result.json();
    console.log(data);
  }
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
        <ProfileForm onChangePass={changePasswordHandler} />
      </section>
    );
  }
}

export default UserProfile;
