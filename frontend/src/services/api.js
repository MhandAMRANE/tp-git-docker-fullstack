const API_URL = import.meta.env.VITE_API_URL;

export async function getCars() {
    const res = await fetch(`${API_URL}/api/cars`);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
    }
    return res.json();
}
