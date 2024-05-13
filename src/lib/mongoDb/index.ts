import { MongoClient, Db } from "mongodb";

interface Config {
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;
}

const DB_CONFIG: Config = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "",
};

const client = new MongoClient(DB_CONFIG.MONGODB_URI, { retryWrites: true });

const db = async (func: (error: Error | null, db: Db) => Promise<any>) => {
  try {
    await client.connect();
    await func(null, client.db());
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};

export { db };
