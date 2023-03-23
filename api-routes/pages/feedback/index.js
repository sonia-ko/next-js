import { buildFeedbackPaths, extractFeedback } from "../api/feedback";
import { useState } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState({});
  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`).then((response) =>
      response.json().then((data) => {
        setFeedbackData(data.feedback);
      })
    );
  }
  const fItems = props.items;
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {fItems.map((item) => {
          return (
            <li key={item.id}>
              {item.text}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                Show details
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPaths();
  const data = extractFeedback(filePath);
  return {
    props: {
      items: data,
    },
  };
}
export default FeedbackPage;
