import { MongoClient } from "mongodb";

declare var global: {
  _mongoClientPromise?: Promise<MongoClient>;
};

const URI = process.env.MONGODB_URI || "";
const option = {};

if (!URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let client = new MongoClient(URI, option);
let clientPromise

if (process.env.NODE_ENV !== 'production') {
  if(!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
}else {
  clientPromise = client.connect();
}

export default clientPromise