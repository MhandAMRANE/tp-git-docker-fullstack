export default function Landing({ onGo }) {
    return (
        <div className="page">
            <div className="hero-wide fade-in">
                <div className="spread">
                    <div>
                        <h1 style={{ margin: 0, fontSize: 44, letterSpacing: -0.8 }}>CarRental</h1>
                        <p style={{ margin: "8px 0 0 0", color: "rgba(255,255,255,0.7)", maxWidth: 720 }}>
                            Louez une voiture en quelques secondes. Gestion des véhicules (CRUD),
                            interface moderne et application conteneurisée avec Docker.
                        </p>
                    </div>

                    <div className="row">
                        <button className="btn primary" onClick={onGo}>Accéder au dashboard</button>
                        <span className="badge"><span className="dot" /> API via Docker</span>
                    </div>
                </div>

                <div className="cards" style={{ marginTop: 14 }}>
                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Rapide</div>
                                <div className="v">React</div>
                                <div className="k">UI + Nginx</div>
                            </div>
                            <div className="icon">⚡</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Fiable</div>
                                <div className="v">MySQL</div>
                                <div className="k">CRUD + API</div>
                            </div>
                            <div className="icon">🛡️</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Pro</div>
                                <div className="v">Docker</div>
                                <div className="k">Compose</div>
                            </div>
                            <div className="icon">🐳</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
