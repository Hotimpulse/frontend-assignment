import "./App.css";

function App() {
  fetch('http://localhost:8000/orders?_start=0&_limit=10').then((data => {
    console.log(data)
  }))
  return (
    <>
      <div>Hello!</div>
    </>
  );
}

export default App;
