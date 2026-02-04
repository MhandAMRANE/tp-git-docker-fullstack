export default function Landing({ onGo }) {
    return (
        <div className="page fade-in">
            <div className="hero-wide">
                <div className="spread">
                    <div>
                        <h1 style={{ margin: 0, fontSize: 44, letterSpacing: -0.8 }}>
                            Location de voitures
                        </h1>
                        <p style={{ margin: "8px 0 0 0", color: "rgba(255,255,255,0.7)", maxWidth: 720 }}>
                            Trouvez la voiture idéale au meilleur prix — réservation rapide, annulation simple.
                        </p>
                    </div>

                    <div className="row">
                        <button className="btn primary" onClick={onGo}>Voir les voitures</button>
                        <span className="badge"><span className="dot" /> Réservation instantanée</span>
                    </div>
                </div>

                {/* Barre de recherche (UI seulement) */}
                <div className="cardx" style={{ marginTop: 14 }}>
                    <div className="cards">
                        <div className="col-4">
                            <label className="label">Ville</label>
                            <input className="input" placeholder="Ex: Paris" />
                        </div>

                        <div className="col-4">
                            <label className="label">Date de départ</label>
                            <input className="input" type="date" />
                        </div>

                        <div className="col-4">
                            <label className="label">Date de retour</label>
                            <input className="input" type="date" />
                        </div>

                        <div className="col-12 row" style={{ justifyContent: "flex-end" }}>
                            <button className="btn primary" onClick={onGo}>Rechercher</button>
                        </div>
                    </div>
                </div>

                {/* Avantages */}
                <div className="cards" style={{ marginTop: 14 }}>
                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Choix</div>
                                <div className="v">+50</div>
                                <div className="k">véhicules disponibles</div>
                            </div>
                            <div className="icon">🚗</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Prix</div>
                                <div className="v">Top</div>
                                <div className="k">offres / jour</div>
                            </div>
                            <div className="icon">💶</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Support</div>
                                <div className="v">24/7</div>
                                <div className="k">assistance</div>
                            </div>
                            <div className="icon">🛟</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section bas de page */}
            <div className="cards" style={{ marginTop: 14 }}>
                <div className="cardx col-12">
                    <div className="spread">
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 18 }}>Prêt à réserver ?</div>
                            <div style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
                                Accédez à la liste des voitures et gérez vos véhicules.
                            </div>
                        </div>
                        <button className="btn primary" onClick={onGo}>Accéder</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
