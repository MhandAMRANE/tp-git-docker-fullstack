export default function Landing({ onGo }) {
    return (
        <div className="hero fade-in">
            <div style={{ position: "relative" }}>
                <h1 className="h-title">CarRental</h1>
                <p className="h-sub">
                    Louez une voiture en quelques secondes. Gestion simple des véhicules (CRUD),
                    interface moderne et application conteneurisée avec Docker.
                </p>

                <div className="row" style={{ marginTop: 16 }}>
                    <button className="btn primary" onClick={onGo}>
                        Accéder au dashboard
                    </button>
                    <span className="badge">
                        <span className="dot" /> API connectée via Docker
                    </span>
                </div>

                <div className="grid-3">
                    <div className="stat">
                        <div className="k">Rapide</div>
                        <div className="v">⚡</div>
                        <div className="k">UI React + Nginx</div>
                    </div>
                    <div className="stat">
                        <div className="k">Fiable</div>
                        <div className="v">🛡️</div>
                        <div className="k">MySQL + Backend Node</div>
                    </div>
                    <div className="stat">
                        <div className="k">Pro</div>
                        <div className="v">🐳</div>
                        <div className="k">Docker Compose</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
