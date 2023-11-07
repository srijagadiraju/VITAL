// import { MongoClient } from "mongodb";
// import "dotenv/config";

// function MyMongoDB() {
//   const myDB = {};

//   const uri = process.env.MONGODB_URI;

//   function connect() {
//     const client = new MongoClient(uri);
//     const db = client.db("usersSharing");
//     return { client, db };
//   }

//   myDB.getAppointments = async function (query = {}) {
//     const { client, db } = connect();

//     try {
//       const appointments = await db.collection("users").find(query).toArray();
//       return appointments;
//     } finally {
//       await client.close();
//     }
//   };

//   return myDB;
// }

// const myDB = MyMongoDB();

// export default myDB;

import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

async function connect() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  return client.connect();
}

async function addNote(newNote) {
  const client = await connect();

  try {
    const db = client.db("usersSharing");
    const result = await db.collection("users").insertOne(newNote);
    return result;
  } finally {
    client.close();
  }
}

async function getNotes(query = {}) {
  const client = await connect();

  try {
    const db = client.db("usersSharing");
    const notes = await db.collection("users").find(query).toArray();
    return notes;
  } finally {
    client.close();
  }
}

// async function getNoteById(noteId) {
//   const client = await connect();

//   try {
//     const db = client.db("usersSharing");
//     const note = await db
//       .collection("users")
//       .findOne({ _id: ObjectId(noteId) });
//     return note;
//   } finally {
//     client.close();
//   }
// }

async function getNoteById(noteId) {
  let client;
  try {
    client = await connect();
    const db = client.db("usersSharing");
    const note = await db
      .collection("users")
      .findOne({ _id: ObjectId(noteId) });
    return note;
  } finally {
    if (client) {
      client.close();
    }
  }
}

async function updateNote(noteId, updatedNote) {
  const client = await connect();

  try {
    const db = client.db("usersSharing");
    const result = await db
      .collection("users")
      .updateOne({ _id: ObjectId(noteId) }, { $set: updatedNote });
    return result;
  } finally {
    client.close();
  }
}

async function deleteNote(noteId) {
  const client = await connect();

  try {
    const db = client.db("usersSharing");
    const result = await db
      .collection("users")
      .deleteOne({ _id: ObjectId(noteId) });
    return result;
  } finally {
    client.close();
  }
}

export default {
  addNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
