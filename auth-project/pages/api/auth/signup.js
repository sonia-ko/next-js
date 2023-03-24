import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    const emailValid = email
      ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      : false;

    if (!emailValid || !password || password.trim().length < 6) {
      res.status(422).json({
        message: "Invalid input. Password must be at least 6 characters long",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(202).json("Such a user already exists");
      client.close();
      return;
    }

    const hashedPwd = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPwd,
    });

    res.status(201).json({ message: "User created" });
    client.close();
  }
}

export default handler;
