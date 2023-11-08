import express from "express";
import myDB from "../db/notesDB.js";

const router = express.Router();

// route to get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await myDB.getNotes();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// route to add a new note
router.post("/", async (req, res) => {
  const { content } = req.body;

  try {
    const newNote = { content };
    const result = await myDB.addNote(newNote);
    res.status(201).json({ message: "Note added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Error adding a note" });
  }
});

// route to update a note by ID
router.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const { content } = req.body;

  console.log("ID received for editing:", noteId);

  try {
    const updatedNote = { content };
    const result = await myDB.updateNote(noteId, updatedNote);

    if (result) {
      res.status(200).json({ message: "Note updated successfully", result });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating the note" });
  }
});

// route to delete a note by ID
router.delete("/:id", async (req, res) => {
  const { id: noteId } = req.params;
  console.log("ID received for deletion:", noteId);

  try {
    const result = await myDB.deleteNote(noteId);

    if (result) {
      res.status(200).json({ message: "Note deleted successfully", result });
    } else {
      res.status(404).json({ error: "Note not found" });
      console.log(req.params.id);
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting the note" });
  }
});

export default router;
