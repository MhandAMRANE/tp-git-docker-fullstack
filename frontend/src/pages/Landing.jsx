export default function Landing({ onGo }) {
    return (
        <div className="page fade-in">
            <div className="hero-wide">
                <div className="hero-grid">
                    {/* Gauche: Texte */}
                    <div className="cardx" style={{ background: "rgba(255,255,255,0.55)" }}>
                        <div className="spread">
                            <div>
                                <h1 className="hero-title">
                                    Louez la voiture parfaite,
                                    <span style={{ color: "var(--primary)" }}> en quelques minutes</span>.
                                </h1>
                                <p className="hero-sub">
                                    Des véhicules fiables, des prix transparents, et une réservation simple.
                                    Accédez au dashboard pour gérer la flotte (CRUD).
                                </p>
                            </div>

                            <div className="row">
                                <span className="badge">
                                    <span className="dot" /> Disponible
                                </span>
                                <span className="badge" style={{ borderColor: "rgba(225,29,72,0.25)" }}>
                                    <span className="dot" style={{ background: "var(--primary)" }} /> Paiement sur place
                                </span>
                            </div>
                        </div>

                        <div style={{ marginTop: 14 }}>
                            <div className="section-title">Rechercher une location</div>
                            <p className="section-sub">Formulaire démo (tu peux le connecter plus tard).</p>

                            <div className="hero-form" style={{ marginTop: 10 }}>
                                <div>
                                    <label className="label">Ville de départ</label>
                                    <input className="input" placeholder="Ex: Paris" />
                                </div>
                                <div>
                                    <label className="label">Ville de retour</label>
                                    <input className="input" placeholder="Ex: Paris" />
                                </div>
                                <div>
                                    <label className="label">Date de début</label>
                                    <input className="input" type="date" />
                                </div>
                                <div>
                                    <label className="label">Date de fin</label>
                                    <input className="input" type="date" />
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
                                <button className="btn primary" onClick={onGo}>Voir les voitures</button>
                            </div>
                        </div>
                    </div>

                    {/* Droite: Cartes infos */}
                    <div className="cards" style={{ marginTop: 0 }}>
                        <div className="cardx col-12">
                            <div className="kpi">
                                <div>
                                    <div className="k">Assurance</div>
                                    <div className="v">Incluse</div>
                                    <div className="k">Options flexibles</div>
                                </div>
                                <div className="icon">🛟</div>
                            </div>
                        </div>

                        <div className="cardx col-12">
                            <div className="kpi">
                                <div>
                                    <div className="k">Annulation</div>
                                    <div className="v">Facile</div>
                                    <div className="k">Jusqu’à 24h</div>
                                </div>
                                <div className="icon">🗓️</div>
                            </div>
                        </div>

                        <div className="cardx col-12">
                            <div className="kpi">
                                <div>
                                    <div className="k">Support</div>
                                    <div className="v">7j/7</div>
                                    <div className="k">Réponse rapide</div>
                                </div>
                                <div className="icon">💬</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="cards" style={{ marginTop: 14 }}>
                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Choix</div>
                                <div className="v">Large</div>
                                <div className="k">Citadine, SUV, utilitaire</div>
                            </div>
                            <div className="icon">🚗</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Prix</div>
                                <div className="v">Clairs</div>
                                <div className="k">Sans frais cachés</div>
                            </div>
                            <div className="icon">💶</div>
                        </div>
                    </div>

                    <div className="cardx col-4">
                        <div className="kpi">
                            <div>
                                <div className="k">Réservation</div>
                                <div className="v">Simple</div>
                                <div className="k">En quelques clics</div>
                            </div>
                            <div className="icon">⚡</div>
                        </div>
                    </div>

                    <div className="cardx col-12" style={{ borderColor: "rgba(225,29,72,0.20)" }}>
                        <div className="spread">
                            <div>
                                <div style={{ fontWeight: 900, fontSize: 18 }}>Prêt à gérer tes véhicules ?</div>
                                <div style={{ color: "var(--muted)", marginTop: 6 }}>
                                    Accède au dashboard pour ajouter, modifier et supprimer des voitures.
                                </div>
                            </div>
                            <button className="btn primary" onClick={onGo}>Accéder au dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
