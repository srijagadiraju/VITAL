export default function App() {
  async function testBack() {
    console.log("testing backend");
    const response = await fetch("./api/data");
    const data = await response.json();
    console.log(data);
  }

  testBack();

  return (
    <div>
      <h1>Hello!</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
        inventore voluptates molestiae! Rem vitae dolores, quis laboriosam
        sapiente rerum, maxime provident hic alias veritatis ipsam ipsa, impedit
        recusandae explicabo quibusdam?
      </p>
    </div>
  );
}
