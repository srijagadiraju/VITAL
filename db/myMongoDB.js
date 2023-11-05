import { MongoClient } from "mongodb";
import "dotenv/config";

function MyMongoDB() {
  const myDB = {};

  const uri = process.env.MONGODB_URI;

  function connect() {
    const client = new MongoClient(uri);
    const db = client.db("appointmentSharing");
    return { client, db };
  }

  myDB.getAppointments = async function (query = {}) {
    const { client, db } = connect();

    try {
      const appointments = await db
        .collection("appointments")
        .find(query)
        .toArray();
      return appointments;
    } finally {
      await client.close();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;

// hello
