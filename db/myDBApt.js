import "dotenv/config"; // to load .env file
import { MongoClient, ObjectId } from "mongodb";

function MyDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("appointmentSharing");

    return { client, db };
  };

  myDB.createAppointment = async (newAppointment) => {
    const { client, db } = connect();
    const appointmentsCollection = db.collection("confirmedAppointments");

    try {
      const result = await appointmentsCollection.insertOne(newAppointment);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getAppointmentById = async (appointmentId) => {
    const { client, db } = connect();
    const appointmentsCollection = db.collection("confirmedAppointments");

    try {
      const filter = { _id: new ObjectId(appointmentId) };
      const appointment = await appointmentsCollection.findOne(filter);
      return appointment;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateAppointmentMessage = async (appointmentId, newMessage) => {
    const { client, db } = connect();
    const appointmentsCollection = db.collection("confirmedAppointments");

    try {
      const filter = { _id: new ObjectId(appointmentId) };
      const update = { $set: { message: newMessage } };
      const result = await appointmentsCollection.updateOne(filter, update);

      if (result.matchedCount > 0) {
        // Return the updated document
        return await appointmentsCollection.findOne(filter);
      }
      return null;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteAppointment = async (appointmentId) => {
    const { client, db } = connect();
    const appointmentsCollection = db.collection("confirmedAppointments");

    try {
      const filter = { _id: new ObjectId(appointmentId) };
      const result = await appointmentsCollection.deleteOne(filter);
      return { deletedCount: result.deletedCount };
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
