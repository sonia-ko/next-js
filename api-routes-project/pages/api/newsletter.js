import { MongoClient } from "mongodb";

import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  const emailValid = req.body.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
    : false;

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!emailValid) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Failed to connect to a database" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Failed to insert data" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
