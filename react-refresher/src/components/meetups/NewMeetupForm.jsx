import classes from "./NewMeetupForm.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

function NewMeetupForm({ onAddMeetup }) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      desctiption: enteredDescription,
    };

    onAddMeetup(meetupData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input ref={titleInputRef} type="text" reguired id="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input ref={imageInputRef} type="url" reguired id="image" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup Address</label>
          <input ref={addressInputRef} type="text" reguired id="address" />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Meetup Description</label>
          <textarea
            ref={descriptionInputRef}
            rows={5}
            reguired
            id="description"
          />
        </div>
        <div className={classes.actions}>
          <button>Add meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
