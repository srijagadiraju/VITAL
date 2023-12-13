import "dotenv/config"; // to load .env file
import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    const client = new MongoClient(uri);
    const db = client.db("auth");
    return { client, db };
  }

  myDB.insertUser = async function ({ email, username, hashedPassword, salt }) {
    const { client, db } = connect();

    console.log("insert User", username);
    try {
      const response = await db.collection("userAuth").insertOne({
        email,
        username,
        hashedPassword,
        salt,
      });

      return response;
    } finally {
      await client.close();
    }
  };

  myDB.getUserByUsername = async function (username) {
    const { client, db } = connect();

    console.log("get User", username);
    try {
      return await db.collection("userAuth").findOne({ username });
    } finally {
      await client.close();
    }
  };

  myDB.getUserByEmail = async function (email) {
    const { client, db } = connect();

    try {
      return await db.collection("userAuth").findOne({ email });
    } finally {
      await client.close();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
