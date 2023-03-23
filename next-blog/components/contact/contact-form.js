import classes from "./contact-form.module.css";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessagel] = useState("");
  // pending, success, error
  const [requestStatus, setRequestStatus] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);
  async function submitHandler(e) {
    e.preventDefault();
    // there could also be client-side validation

    setRequestStatus("pending");

    try {
      await sendContactData({
        name: enteredName,
        email: enteredEmail,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessagel("");
    } catch (e) {
      setError(e.message || "Something went wrong");
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Your message is sent",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: error,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="email"
              type="email"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your email</label>
            <input
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              id="name"
              type="text"
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            value={enteredMessage}
            onChange={(e) => setEnteredMessagel(e.target.value)}
            name="message"
            id="message"
            rows="5"
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Nessage</button>
        </div>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
    </section>
  );
}

export default ContactForm;
