import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://soniakozitskaya:Y2kcR5rlFwnIqVRd@cluster0.gi30vbe.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
  return client;
}
