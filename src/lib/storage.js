// Persistence layer for cart + order history.
//
// This uses localStorage, so data only lives in the customer's own browser —
// fine for a working prototype, but a real store needs orders to reach YOU.
// When you add a backend, replace loadJSON/saveJSON with fetch() calls to
// your API (e.g. POST /api/orders) and keep the rest of the app unchanged.

export async function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("storage error", e);
  }
}
