import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import CarList from "./pages/CarList";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="spread">
          <div className="row">
            <div className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              CarRental
            </div>
            <span className="badge">
              <span className="dot" /> Docker
            </span>
          </div>

          <div className="row">
            {onDashboard ? (
              <button className="btn" onClick={() => navigate("/")}>Accueil</button>
            ) : (
              <button className="btn primary" onClick={() => navigate("/dashboard")}>Dashboard</button>
            )}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Landing onGo={() => navigate("/dashboard")} />} />
        <Route path="/dashboard" element={<CarList />} />
      </Routes>
    </div>
  );
}
