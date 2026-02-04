import { useEffect, useState } from "react";
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

    useEffect(() => {
        refresh();
    }, []);

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

    if (loading) return <p>Chargement…</p>;
    if (error) return <p style={{ color: "crimson" }}>{error}</p>;


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


    return (
        <div>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>Voitures</h2>
                <button className="btn primary" onClick={() => setShowForm((v) => !v)}>
                    {showForm ? "Fermer" : "+ Ajouter"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={onCreate} className="card" style={{ marginTop: 12 }}>
                    <h3 style={{ marginTop: 0 }}>Ajouter une voiture</h3>

                    <div className="grid">
                        <div>
                            <label className="label">Marque</label>
                            <input
                                className="input"
                                value={form.brand}
                                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Modèle</label>
                            <input
                                className="input"
                                value={form.model}
                                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Année</label>
                            <input
                                className="input"
                                type="number"
                                value={form.year}
                                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Prix / jour (€)</label>
                            <input
                                className="input"
                                type="number"
                                step="0.01"
                                value={form.price_per_day}
                                onChange={(e) => setForm((f) => ({ ...f, price_per_day: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Disponible</label>
                            <select
                                className="input"
                                value={form.available ? "true" : "false"}
                                onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "true" }))}
                            >
                                <option value="true">Oui</option>
                                <option value="false">Non</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
                        <button className="btn" type="button" onClick={() => setShowForm(false)} disabled={saving}>
                            Annuler
                        </button>
                        <button className="btn primary" type="submit" disabled={saving}>
                            {saving ? "Enregistrement…" : "Créer"}
                        </button>
                    </div>
                </form>
            )}

            {cars.length === 0 ? (
                <p style={{ marginTop: 12 }}>Aucune voiture.</p>
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
                                            <span className="badge">{c.available ? "Disponible" : "Indisponible"}</span>
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
    );
}
