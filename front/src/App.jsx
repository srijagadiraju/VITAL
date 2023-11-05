import AppRoutes from "./AppRoutes";
import { Footer } from "./containers";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  // async function testBack() {
  //   console.log("testing backend");
  //   const response = await fetch("./api/appointments");
  //   const data = await response.json();
  //   console.log("Got Appointments!", data);
  // }

  useEffect(() => {
    // called when page is loaded for first time -- fetch appts and setState to change appts
    async function fetch_data() {
      try {
        console.log("testing backend");
        const response = await fetch("/api/appointments");
        const data = await response.json();
        console.log("Got Appointments!", data);
      } catch (e) {
        console.log("error", e);
      }
    }
    fetch_data();
  }, []);

  // testBack();

  return (
    <>
      <AppRoutes />
      <Footer />
    </>
  );
}
