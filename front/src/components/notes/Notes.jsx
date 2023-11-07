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
        setPendingEntries([...pendingEntries, entry]);
        setEntries([...entries, newNote.content]);
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

  //   const handleDelete = async (usersId) => {
  //     const response = await fetch(`/api/notes/${usersId}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       const newEntries = [...entries];
  //       newEntries.splice(usersId, 1);
  //       setEntries(newEntries);
  //     }
  //   };
  //   const handleDelete = async (usersId) => {
  //     console.log("Attempting to delete appointment with ID:", usersId);
  //     try {
  //       const response = await fetch(`/api/notes/${usersId}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         const newEntries = entries.filter((entry) => entry._id !== usersId);
  //         setEntries(newEntries);
  //       } else {
  //         console.error("Failed to delete the appointment.");
  //       }
  //     } catch (error) {
  //       console.error("There was an error deleting the appointment:", error);
  //     }
  //   };

  // const handleDelete = async (noteId) => {
  //     console.log("Attempting to delete note with ID:", noteId);
  //     try {
  //         const response = await fetch(`/api/notes/${noteId}`, {
  //             method: "DELETE",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         if (response.ok) {
  //             const newEntries = entries.filter((entry) => entry._id.toString() !== noteId.toString());
  //             setEntries(newEntries);
  //         } else {
  //             console.error("Failed to delete the note.");
  //         }
  //     } catch (error) {
  //         console.error("There was an error deleting the note:", error);
  //     }
  // };

  // const handleDelete = async (noteId) => {
  //     console.log("Attempting to delete note with ID:", noteId);

  //     try {
  //         const response = await fetch(`/api/notes/${String(noteId)}`, {
  //             method: "DELETE",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         if (response.ok) {
  //             const newEntries = entries.filter((entry) => entry._id !== noteId);
  //             setEntries(newEntries);
  //         } else {
  //             console.error("Failed to delete the note.");
  //         }
  //     } catch (error) {
  //         console.error("There was an error deleting the note:", error);
  //     }
  // };

  // const handleDelete = async (noteId) => {
  //     console.log("Attempting to delete note with ID:", noteId);
  //     try {
  //       const response = await fetch(`/api/notes/${noteId}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         const newEntries = entries.filter((entry) => entry._id !== noteId);
  //         setEntries(newEntries);
  //       } else {
  //         console.error("Failed to delete the note.");
  //       }
  //     } catch (error) {
  //       console.error("There was an error deleting the note:", error);
  //     }
  //   };

  const handleDelete = async (noteId) => {
    console.log("Attempting to delete note with ID:", noteId);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newEntries = entries.filter(
          (entry) => entry._id.toString() !== noteId.toString()
        );
        setEntries(newEntries);
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
                <p>{pendingItem}</p>
                <div className="buttons">
                  {/* <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button> */}
                  <button onClick={() => handleEdit(pendingItem._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(pendingItem._id)}>
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
