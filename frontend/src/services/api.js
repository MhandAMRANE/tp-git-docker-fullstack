const API_URL = import.meta.env.VITE_API_URL;

export async function getCars() {
    const res = await fetch(`${API_URL}/api/cars`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json();
}

export async function createCar(payload) {
    const res = await fetch(`${API_URL}/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json();
}
