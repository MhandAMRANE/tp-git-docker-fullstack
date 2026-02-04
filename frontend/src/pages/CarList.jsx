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
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <p>Chargement…</p>;
    if (error) return <p style={{ color: "crimson" }}>{error}</p>;

    return (
        <div>
            <h2>Voitures</h2>
            {cars.length === 0 ? (
                <p>Aucune voiture.</p>
            ) : (
                <ul>
                    {cars.map((c) => (
                        <li key={c.id}>
                            {c.brand} {c.model} — {c.price_per_day}€/jour —{" "}
                            {c.available ? "Disponible" : "Indisponible"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
