import { useEffect, useState } from "react";
import { getCars } from "../services/api";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getCars();
                if (mounted) setCars(data);
            } catch (e) {
                if (mounted) setError(e.message || "Erreur API");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => (mounted = false);
    }, []);

    if (loading) return <p>Chargement…</p>;
    if (error) return <p style={{ color: "crimson" }}>{error}</p>;

    return (
        <div>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>Voitures</h2>
                <button className="btn primary" disabled>
                    + Ajouter
                </button>
            </div>

            {cars.length === 0 ? (
                <p>Aucune voiture.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Année</th>
                            <th>Prix/jour</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((c) => (
                            <tr key={c.id}>
                                <td>{c.brand}</td>
                                <td>{c.model}</td>
                                <td>{c.year}</td>
                                <td>{c.price_per_day} €</td>
                                <td>
                                    <span className="badge">
                                        {c.available ? "Disponible" : "Indisponible"}
                                    </span>
                                </td>
                                <td className="row" style={{ gap: 8 }}>
                                    <button className="btn" disabled>Modifier</button>
                                    <button className="btn danger" disabled>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
