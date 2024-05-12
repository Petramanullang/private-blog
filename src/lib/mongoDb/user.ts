import clientPromise from ".";
import { MongoClient } from "mongodb";

let client: MongoClient;
let db: any;
let user: any;

async function init() {
  if (db) return;
  try {
    client = (await clientPromise) as MongoClient;
    db = client.db();
    user = await db.collection("user");
  } catch (error) {
    throw new Error("Gagal terhubung ke basis data");
  }
}

(async () => {
  await init();
})();

export async function getUser() {
  try {
    if (!user) await init();
    const result = await user
      .find({})
      .limit(1)
      .map((users: any) => ({ ...users, _id: users._id.toString() }))
      .toArray();

    return { user: result };
  } catch (error) {
    return { error: "Gagal mendapatkan data pengguna" };
  }
}
