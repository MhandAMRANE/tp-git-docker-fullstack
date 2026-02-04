import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import CarList from "./pages/CarList";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ fontFamily: "system-ui, Arial" }}>
      <Routes>
        <Route path="/" element={<Landing onGo={() => navigate("/dashboard")} />} />
        <Route path="/dashboard" element={<CarList />} />
      </Routes>
    </div>
  );
}
