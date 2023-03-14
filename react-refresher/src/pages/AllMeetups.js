import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://meetups-ab3c3-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const newMeetup = {
            id: key,
            ...data[key],
          };
          meetups.push(newMeetup);
        }
        setIsLoading(false);
        setMeetups(meetups);
        console.log(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList items={meetups} />
    </section>
  );
}

export default AllMeetupsPage;
