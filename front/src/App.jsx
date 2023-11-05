import AppRoutes from "./AppRoutes";
import { Footer } from "./containers";
import "./App.css";

export default function App() {
  async function testBack() {
    console.log("testing backend");
    const response = await fetch("./api/appointments");
    const data = await response.json();
    console.log("Got Appointments!", data);
  }

  testBack();

  return (
    <>
      <AppRoutes />
      <Footer />
    </>
  );
}
