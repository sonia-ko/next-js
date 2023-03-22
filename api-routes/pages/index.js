import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      // .then((data) => setFeedbackItems(data.feedback))
      .then((data) => setFeedbackItems(data.feedback));

    console.log(feedbackItems);
  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email</label>
          <input ref={emailInputRef} id="email" type="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea
            ref={feedbackInputRef}
            rows={5}
            id="feedback"
            type="text"
          ></textarea>
        </div>

        <button>Submit form</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load all feedbacks</button>
      <ul>
        {feedbackItems.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </div>
  );
}

export default HomePage;
