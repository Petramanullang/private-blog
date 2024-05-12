declare module "clientPromise-module" {
  import { MongoClient } from "mongodb";

  const clientPromise: Promise<MongoClient>;
  export default clientPromise;
}
