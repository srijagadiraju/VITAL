// import { MongoClient } from "mongodb";
// import "dotenv/config";

// function MyMongoDB() {
//   const myDB = {};

//   const uri = process.env.MONGODB_URI;

//   function connect() {
//     const client = new MongoClient(uri);
//     const db = client.db("appointmentSharing");
//     return { client, db };
//   }

//   myDB.getAppointments = async function (query = {}) {
//     const { client, db } = connect();

//     try {
//       const appointments = await db
//         .collection("appointments")
//         .find(query)
//         .toArray();
//       return appointments;
//     } finally {
//       await client.close();
//     }
//   };

//   return myDB;
// }

// const myDB = MyMongoDB();

// export default myDB;

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI;

  function connect() {
    const client = new MongoClient(uri);
    const appointmentsDB = client.db("appointmentSharing");
    const usersDB = client.db("usersSharing");

    return { client, appointmentsDB, usersDB };
  }

  myDB.getAppointments = async function (query = {}) {
    const { client, appointmentsDB } = connect();

    try {
      const appointments = await appointmentsDB
        .collection("appointments")
        .find(query)
        .toArray();
      return appointments;
    } finally {
      await client.close();
    }
  };

  myDB.createUser = async function (userData) {
    const { client, usersDB } = connect();

    try {
      await usersDB.collection("users").insertOne(userData);
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    } finally {
      await client.close();
    }
  };

  //   myDB.createUser = async function (email, username, password) {
  //     const { client, usersDB } = connect();
  //     const userData = {
  //       email: email,
  //       username: username,
  //       password: password,
  //     };

  //     try {
  //       await usersDB.collection("users").insertOne(userData);
  //       return true;
  //     } catch (error) {
  //       console.error("Error creating user:", error);
  //       return false;
  //     } finally {
  //       await client.close();
  //     }
  //   };

  myDB.getUserByEmail = async function (email) {
    const { client, usersDB } = connect();

    try {
      const user = await usersDB.collection("users").findOne({ email });
      return user;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return null;
    } finally {
      await client.close();
    }
  };

  myDB.updateUserByEmail = async function (email, updatedUserData) {
    const { client, usersDB } = connect();

    try {
      await usersDB
        .collection("users")
        .updateOne({ email }, { $set: updatedUserData });
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    } finally {
      await client.close();
    }
  };

  myDB.deleteUserByEmail = async function (email) {
    const { client, usersDB } = connect();

    try {
      await usersDB.collection("users").deleteOne({ email });
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    } finally {
      await client.close();
    }
  };

  myDB.getAllUsers = async function () {
    const { client, usersDB } = connect();

    try {
      const users = await usersDB.collection("users").find({}).toArray();
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      return [];
    } finally {
      await client.close();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
