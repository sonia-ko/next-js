import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm({ onChangePass }) {
  const oldPassRef = useRef();
  const newPassRef = useRef();

  async function onChangePasswordHandler(e) {
    e.preventDefault();
    const oldPassEntered = oldPassRef.current.value;
    const newPassEntered = newPassRef.current.value;

    //optional: add validation

    const res = await onChangePass({
      oldPass: oldPassEntered,
      newPass: newPassEntered,
    });
  }

  return (
    <form onSubmit={onChangePasswordHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPassRef} type="password" id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input ref={oldPassRef} type="password" id="old-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
