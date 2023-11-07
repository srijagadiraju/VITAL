// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import "./notes.css";

// const Notes = () => {
//   const [entry, setEntry] = useState("");
//   const [entries, setEntries] = useState([]);
//   const [pendingEntries, setPendingEntries] = useState([]);
//   const [editing, setEditing] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const storedEntries = localStorage.getItem("notesEntries");
//     if (storedEntries) {
//       setEntries(JSON.parse(storedEntries));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("notesEntries", JSON.stringify(entries));
//   }, [entries]);

//   const handleInputChange = (e) => {
//     setEntry(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editing) {
//       const response = await fetch(`/api/notes/${editIndex}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: entry }),
//       });

//       if (response.ok) {
//         const updatedEntries = [...entries];
//         updatedEntries[editIndex] = entry;
//         setEntries(updatedEntries);
//         setPendingEntries([]); // Clear pending entries after update
//         setEditing(false);
//         setEditIndex(null);
//       }
//     } else {
//       const response = await fetch("/api/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: entry }),
//       });

//       if (response.ok) {
//         const newNote = await response.json();
//         setPendingEntries([...pendingEntries, entry]);
//         setEntries([...entries, newNote.content]);
//         setEntry(""); // Clear the input after submission
//       }
//     }
//   };

//   const handleEdit = (index) => {
//     setEntry(entries[index]);
//     setEditing(true);
//     setEditIndex(index);
//   };

//   const handleDelete = async (index) => {
//     const response = await fetch(`/api/notes/${index}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       const newEntries = [...entries];
//       newEntries.splice(index, 1);
//       setEntries(newEntries);
//     }
//   };

//   return (
//     <div className="notes-container">
//       <h2>Appointment Notes</h2>
//       <div className="notes-box">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={entry}
//             onChange={handleInputChange}
//             placeholder="Enter text here"
//           />
//           <button type="submit">{editing ? "Update" : "Enter"}</button>
//         </form>
//         <div className="entries">
//           {pendingEntries.length > 0 && pendingEntries.map((pendingItem, index) => (
//             <div key={`pending-${index}`} className="note-item">
//               <p>{pendingItem}</p>
//               <div className="buttons">
//                 <button onClick={() => handleEdit(index)}>Edit</button>
//                 <button onClick={() => handleDelete(index)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notes;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
        const updatedEntries = [...entries];
        updatedEntries[editIndex] = entry;
        setEntries(updatedEntries);
        setPendingEntries([]); // Clear pending entries after update
        setEditing(false);
        setEditIndex(null);
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
        console.log(newNote); // result is getting insertedId and we want to use this id to edit and delete
        console.log(newNote.content); // returning undefined
        console.log(newNote.result.insertedId);

        const newEntry = {};
        newEntry.content = entry;
        newEntry.id = newNote.result.insertedId;
        console.log(newEntry);

        setPendingEntries([...pendingEntries, newEntry]); // one with text and other with object id -- because no way of knowing what the object id is

        console.log(entry);
        setEntries([...entries, newNote.result.insertedId]);
        setEntry(""); // Clear the input after submission
      }
    }
  };

  const handleEdit = (index) => {
    const selectedEntry = entries[index] || "";
    setEntry(selectedEntry);
    setEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async (noteId) => {
    console.log("Attempting to delete note with ID:", noteId);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Your appointment has been deleted.");
        // Fixing the filter condition to match the correct property
        const newEntries = entries.filter((entry) => entry.id !== noteId);
        setEntries(newEntries);

        // Also update the pendingEntries if necessary
        const newPendingEntries = pendingEntries.filter(
          (entry) => entry.id !== noteId
        );
        setPendingEntries(newPendingEntries);
      } else {
        console.error("Failed to delete the note.");
      }
    } catch (error) {
      console.error("There was an error deleting the note:", error);
    }
  };

  // need it to get the document from database rather than pending Item
  // whatever is types is becoming a new object - want it to collect the specific element from the database
  // buttons -- pendingItem.id
  // .map takes in pendingItem.content
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
