import { useState, useEffect } from "react";
import "./notes.css";

const Notes = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [pendingEntries, setPendingEntries] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedEntries = localStorage.getItem("notesEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notesEntries", JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const response = await fetch(`/api/notes/${editIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: entry }),
      });

      if (response.ok) {
        const updatedEntries = entries.map((item) =>
          item.id === editIndex ? { ...item, content: entry } : item
        );

        setEntries(updatedEntries);

        const updatedEntry = { id: editIndex, content: entry };
        setPendingEntries([...pendingEntries, updatedEntry]);

        setEditing(false);
        setEditIndex(null);
        setEntry("");
      }
    } else {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: entry }),
      });

      if (response.ok) {
        const newNote = await response.json();
        const newEntry = {};
        newEntry.content = entry;
        newEntry.id = newNote.result.insertedId;
        console.log(newEntry);

        setPendingEntries([...pendingEntries, newEntry]); // one with text and other with object id -- because no way of knowing what the object id is

        console.log(entry);
        setEntries([...entries, newNote.result.insertedId]);
        setEntry("");
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditing(true);
    setEntry(entries.find((entry) => entry.id === index)?.content || "");

    const newPendingEntries = pendingEntries.filter((entry) => entry.id !== index);
    setPendingEntries(newPendingEntries);
  };

  // const handleDelete = async (noteId) => {
  //   console.log("Attempting to delete note with ID:", noteId);
  //   try {
  //     const response = await fetch(`/api/notes/${noteId}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       alert("Your appointment has been deleted.");
  //       const newEntries = entries.filter((entry) => entry.id !== noteId);
  //       setEntries(newEntries);

  //       const newEntries = entries.filter((entry) => entry.id !== noteId);
  //       setEntries(newEntries);

  //       const newPendingEntries = pendingEntries.filter(
  //         (entry) => entry.id !== noteId
  //       );
  //       setPendingEntries(newPendingEntries);
  //     } else {
  //       console.error("Failed to delete the note.");
  //     }
  //   } catch (error) {
  //     console.error("There was an error deleting the note:", error);
  //   }
  // };

  const handleDelete = async (noteId) => {
    console.log("Attempting to delete note with ID:", noteId);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Your appointment has been deleted.");
        const updatedEntries = entries.filter((entry) => entry.id !== noteId);
        setEntries(updatedEntries);
  
        // Also update the pendingEntries if necessary
        const updatedPendingEntries = pendingEntries.filter(
          (entry) => entry.id !== noteId
        );
        setPendingEntries(updatedPendingEntries);
      } else {
        console.error("Failed to delete the note.");
      }
    } catch (error) {
      console.error("There was an error deleting the note:", error);
    }
  };
  
  return (
    <div className="notes-container">
      <h2>Appointment Notes</h2>
      <div className="notes-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={entry}
            onChange={handleInputChange}
            placeholder="Enter text here"
          />
          <button type="submit">{editing ? "Update" : "Enter"}</button>
        </form>
        <div className="entries">
          {pendingEntries.length > 0 &&
            pendingEntries.map((pendingItem, index) => (
              <div key={`pending-${index}`} className="note-item">
                <p>{pendingItem.content}</p>
                <div className="buttons">
                  <button onClick={() => handleEdit(pendingItem.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(pendingItem.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;