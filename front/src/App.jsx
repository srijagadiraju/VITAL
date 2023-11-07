// import AppRoutes from "./AppRoutes";
// import { Footer } from "./containers";
// import "./App.css";
// import { useState, useEffect } from "react";

// export default function App() {
//   // async function testBack() {
//   //   console.log("testing backend");
//   //   const response = await fetch("./api/appointments");
//   //   const data = await response.json();
//   //   console.log("Got Appointments!", data);
//   // }

//   useEffect(() => {
//     // called when page is loaded for first time -- fetch appts and setState to change appts
//     async function fetch_data() {
//       try {
//         console.log("testing backend");
//         const response = await fetch("/api/appointments");
//         const data = await response.json();
//         console.log("Got Appointments!", data);
//       } catch (e) {
//         console.log("error", e);
//       }
//     }
//     fetch_data();
//   }, []);

//   // In App.jsx, fetch notes data
// useEffect(() => {
//   async function fetchNotes() {
//     try {
//       const response = await fetch("/api/notes");
//       const data = await response.json();
//       console.log("Got Notes!", data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   }
//   fetchNotes();
// }, []);


//   // testBack();

//   return (
//     <>
//       <AppRoutes />
//       <Footer />
//     </>
//   );
// }

import AppRoutes from "./AppRoutes";
import { Footer } from "./containers";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        console.log("Got Appointments!", data);
        setAppointments(data);
      } catch (e) {
        console.log("Error fetching appointments:", e);
      }
    }

    fetchAppointments();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes");
        const data = await response.json();
        console.log("Got Notes!", data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, []); // This dependency array ensures this useEffect runs only once

  return (
    <>
      <AppRoutes notes={notes} appointments={appointments} />
      <Footer />
    </>
  );
}