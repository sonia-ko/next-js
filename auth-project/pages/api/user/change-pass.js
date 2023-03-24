import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (!req.method === "PATCH") {
    return;
  }
  //check if the user is authenticated
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "Please log in to change your password" });
    return;
  }

  const userEmail = session.user.email;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(422).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPass = user.password;

  const oldPassIsValid = await verifyPassword(oldPass, currentPass);

  if (!oldPassIsValid) {
    res.status(403).json({ message: "Old password does not match" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPass);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;
