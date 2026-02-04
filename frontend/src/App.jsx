import CarList from "./pages/CarList";

export default function App() {
  return (
    <div className="container" style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>Location de voitures</h1>
      <div className="card">
        <CarList />
      </div>
    </div>
  );
}
