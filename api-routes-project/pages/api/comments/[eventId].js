import { MongoClient } from "mongodb";

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (er) {
    res.status(500).json({ message: "Failed to connect to a database" });
    return;
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;
    const inputIsInvalid =
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === "";
    if (inputIsInvalid) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "Failed to add comment" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  }

  client.close();
}

export default handler;
