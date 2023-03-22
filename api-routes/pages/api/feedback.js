import fs from "fs";
import path from "path";

function buildFeedbackPaths() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    console.log(req);
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      email,
      text,
      id: new Date().toISOString(),
    };

    // store in DB or file
    const filePath = buildFeedbackPaths();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPaths();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
