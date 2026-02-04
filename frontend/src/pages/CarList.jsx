import { useEffect, useMemo, useState } from "react";
import { createCar, deleteCar, getCars, updateCar } from "../services/api";

const emptyForm = { brand: "", model: "", year: "", price_per_day: "", available: true };

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(emptyForm);
    const [workingId, setWorkingId] = useState(null);

    async function refresh() {
        setLoading(true);
        setError("");
        try {
            const data = await getCars();
            setCars(data);
        } catch (e) {
            setError(e.message || "Erreur API");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { refresh(); }, []);

    const stats = useMemo(() => {
        const total = cars.length;
        const dispo = cars.filter((c) => !!c.available).length;
        const indispo = total - dispo;
        const avg = total ? (cars.reduce((s, c) => s + Number(c.price_per_day || 0), 0) / total) : 0;
        return { total, dispo, indispo, avg: avg.toFixed(2) };
    }, [cars]);

    async function onCreate(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const payload = {
                brand: form.brand.trim(),
                model: form.model.trim(),
                year: Number(form.year),
                price_per_day: Number(form.price_per_day),
                available: Boolean(form.available),
            };
            await createCar(payload);
            setForm(emptyForm);
            setShowForm(false);
            await refresh();
        } catch (e2) {
            setError(e2.message || "Erreur création");
        } finally {
            setSaving(false);
        }
    }

    function startEdit(car) {
        setEditingId(car.id);
        setEditForm({
            brand: car.brand ?? "",
            model: car.model ?? "",
            year: String(car.year ?? ""),
            price_per_day: String(car.price_per_day ?? ""),
            available: Boolean(car.available),
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(emptyForm);
    }

    async function saveEdit(id) {
        setWorkingId(id);
        setError("");
        try {
            const payload = {
                brand: editForm.brand.trim(),
                model: editForm.model.trim(),
                year: Number(editForm.year),
                price_per_day: Number(editForm.price_per_day),
                available: Boolean(editForm.available),
            };
            await updateCar(id, payload);
            cancelEdit();
            await refresh();
        } catch (e) {
            setError(e.message || "Erreur modification");
        } finally {
            setWorkingId(null);
        }
    }

    async function removeCar(id) {
        if (!confirm("Supprimer cette voiture ?")) return;
        setWorkingId(id);
        setError("");
        try {
            await deleteCar(id);
            await refresh();
        } catch (e) {
            setError(e.message || "Erreur suppression");
        } finally {
            setWorkingId(null);
        }
    }

    if (loading) return <p className="fade-in">Chargement…</p>;
    if (error) return <p className="fade-in" style={{ color: "#ff6b6b" }}>{error}</p>;

    return (
        <div className="fade-in">
            <div className="spread">
                <div>
                    <h1 style={{ margin: 0, fontSize: 30, letterSpacing: -0.4 }}>Dashboard</h1>
                    <p style={{ margin: "6px 0 0 0", color: "rgba(255,255,255,0.65)" }}>
                        Gestion des voitures (CRUD) — API via Docker Compose.
                    </p>
                </div>

                <div className="row">
                    <button className="btn primary" onClick={() => setShowForm((v) => !v)}>
                        {showForm ? "Fermer" : "+ Ajouter une voiture"}
                    </button>
                </div>
            </div>

            <div className="grid-3">
                <div className="stat">
                    <div className="k">Total voitures</div>
                    <div className="v">{stats.total}</div>
                </div>
                <div className="stat">
                    <div className="k">Disponibles</div>
                    <div className="v">{stats.dispo}</div>
                </div>
                <div className="stat">
                    <div className="k">Prix moyen / jour</div>
                    <div className="v">{stats.avg} €</div>
                </div>
            </div>

            {showForm && (
                <form onSubmit={onCreate} className="card fade-in" style={{ marginTop: 14 }}>
                    <div className="spread">
                        <h2 style={{ margin: 0 }}>Ajouter une voiture</h2>
                        <span className="badge">
                            <span className="dot" /> Nouveau véhicule
                        </span>
                    </div>

                    <div className="grid-3" style={{ marginTop: 12 }}>
                        <div>
                            <label className="label">Marque</label>
                            <input className="input" value={form.brand}
                                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} required />
                        </div>

                        <div>
                            <label className="label">Modèle</label>
                            <input className="input" value={form.model}
                                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))} required />
                        </div>

                        <div>
                            <label className="label">Année</label>
                            <input className="input" type="number" value={form.year}
                                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} required />
                        </div>

                        <div>
                            <label className="label">Prix / jour (€)</label>
                            <input className="input" type="number" step="0.01" value={form.price_per_day}
                                onChange={(e) => setForm((f) => ({ ...f, price_per_day: e.target.value }))} required />
                        </div>

                        <div>
                            <label className="label">Disponible</label>
                            <select className="input" value={form.available ? "true" : "false"}
                                onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "true" }))}>
                                <option value="true">Oui</option>
                                <option value="false">Non</option>
                            </select>
                        </div>

                        <div className="row" style={{ alignItems: "end", justifyContent: "flex-end" }}>
                            <button className="btn" type="button" onClick={() => setShowForm(false)} disabled={saving}>
                                Annuler
                            </button>
                            <button className="btn primary" type="submit" disabled={saving}>
                                {saving ? "Enregistrement…" : "Créer"}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="card" style={{ marginTop: 14 }}>
                <div className="spread">
                    <h2 style={{ margin: 0 }}>Voitures</h2>
                    <span className="badge">
                        <span className={"dot" + (stats.dispo ? "" : " off")} /> {stats.dispo} disponibles
                    </span>
                </div>

                {cars.length === 0 ? (
                    <p style={{ marginTop: 12, color: "rgba(255,255,255,0.7)" }}>Aucune voiture.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Année</th>
                                <th>Prix/jour</th>
                                <th>Statut</th>
                                <th style={{ width: 220 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((c) => {
                                const isEditing = editingId === c.id;
                                const isWorking = workingId === c.id;

                                return (
                                    <tr key={c.id}>
                                        <td>
                                            {isEditing ? (
                                                <input className="input" value={editForm.brand}
                                                    onChange={(e) => setEditForm((f) => ({ ...f, brand: e.target.value }))} />
                                            ) : c.brand}
                                        </td>

                                        <td>
                                            {isEditing ? (
                                                <input className="input" value={editForm.model}
                                                    onChange={(e) => setEditForm((f) => ({ ...f, model: e.target.value }))} />
                                            ) : c.model}
                                        </td>

                                        <td>
                                            {isEditing ? (
                                                <input className="input" type="number" value={editForm.year}
                                                    onChange={(e) => setEditForm((f) => ({ ...f, year: e.target.value }))} />
                                            ) : c.year}
                                        </td>

                                        <td>
                                            {isEditing ? (
                                                <input className="input" type="number" step="0.01" value={editForm.price_per_day}
                                                    onChange={(e) => setEditForm((f) => ({ ...f, price_per_day: e.target.value }))} />
                                            ) : `${c.price_per_day} €`}
                                        </td>

                                        <td>
                                            {isEditing ? (
                                                <select className="input"
                                                    value={editForm.available ? "true" : "false"}
                                                    onChange={(e) => setEditForm((f) => ({ ...f, available: e.target.value === "true" }))}>
                                                    <option value="true">Oui</option>
                                                    <option value="false">Non</option>
                                                </select>
                                            ) : (
                                                <span className="badge">
                                                    <span className={"dot" + (c.available ? "" : " off")} />
                                                    {c.available ? "Disponible" : "Indisponible"}
                                                </span>
                                            )}
                                        </td>

                                        <td className="row" style={{ gap: 8 }}>
                                            {isEditing ? (
                                                <>
                                                    <button className="btn" onClick={cancelEdit} disabled={isWorking}>Annuler</button>
                                                    <button className="btn primary" onClick={() => saveEdit(c.id)} disabled={isWorking}>
                                                        {isWorking ? "..." : "Sauver"}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn" onClick={() => startEdit(c)} disabled={isWorking}>Modifier</button>
                                                    <button className="btn danger" onClick={() => removeCar(c.id)} disabled={isWorking}>
                                                        Supprimer
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
