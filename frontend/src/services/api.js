export async function getCars() {
    const res = await fetch("/api/cars");
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

export async function createCar(payload) {
    const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

export async function updateCar(id, payload) {
    const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

export async function deleteCar(id) {
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return true;
}
