import AppRoutes from "./AppRoutes";

export default function App() {
  async function testBack() {
    console.log("testing backend");
    const response = await fetch("./api/data");
    const data = await response.json();
    console.log(data);
  }

  testBack();

  return <AppRoutes />;
}
