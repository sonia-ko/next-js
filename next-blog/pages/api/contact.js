import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    const emailValid = email
      ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
      : false;
    if (
      !emailValid ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    // store data in DB

    const newMessage = {
      email,
      name,
      message,
    };

    const connectionString = `mongodb+srv://${process.env.mongodb_un}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gi30vbe.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      const client = await MongoClient.connect(connectionString);

      const db = client.db();

      try {
        const result = await db.collection("messages").insertOne(newMessage);
        newMessage.id = result.insertedId;
      } catch (e) {
        client.close();
        res
          .status(500)
          .json({ message: e.message || "Storing message failed" });
        return;
      }

      res.status(201).json({ message: "Successfully stored a message" });
      client.close();
    } catch (e) {
      res
        .status(500)
        .json({ message: e.message || "Could not connect to database" });
      return;
    }
  }
}

export default handler;
