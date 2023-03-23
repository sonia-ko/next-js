import { buildFeedbackPaths, extractFeedback } from "./feedback";

function handler(req, res) {
  // if(req.method === 'DELETE') {
  //     do something here
  // }
  const feedbackId = req.query.fId;
  const filePath = buildFeedbackPaths();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedbackId === feedback.id
  );
  res.status(200).json({
    feedback: selectedFeedback,
  });
}

export default handler;
