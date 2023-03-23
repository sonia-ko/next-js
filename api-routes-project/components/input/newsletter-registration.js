import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";

import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const ctx = useContext(NotificationContext);

  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;

    ctx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    const reqBody = {
      email: enteredEmail,
    };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        ctx.showNotification({
          title: "Success",
          message: "Successfully subscribed ",
          status: "success",
        });
      })
      .catch((error) => {
        ctx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
