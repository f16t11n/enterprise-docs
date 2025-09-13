// ================================
// JSONBin Helper (jsonbin.js)
// ================================

// --- Config (শুধু ৩টা variable) ---
const MASTER_KEY = "$2a$10$l.rIZ9zXT3NfDY3nS7DstOt4pcI5w.XeMi18nJ5J2RrIi3/e.FGOy";
const DATA_BIN_ID = "68c553c3ae596e708fed5bca";
const KEY_BIN_ID = "$2a$10$0x/LAY7GgVRpIZ29vdWauuaGiyT7ArxEiDr.lECT103Hf112p4Wgu";

// --- Build URL ---
const KEY_BIN_URL = `https://api.jsonbin.io/v3/b/${KEY_BIN_ID}/latest`;
const DATA_BIN_URL = `https://api.jsonbin.io/v3/b/${DATA_BIN_ID}`;

// --- Read Data from Data Bin ---
async function jsonbinRead () {
  try {
    const res = await fetch(DATA_BIN_URL + "/latest", {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const data = await res.json();
    return data.record.services;
  } catch (err) {
    console.error("❌ JSONBin Read Error:", err);
    throw err;
  }
}

// --- Write Data to Data Bin ---
async function jsonbinWrite (newData) {
  try {
    const res = await fetch(DATA_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify({ services: newData })
    });
    return await res.json();
  } catch (err) {
    console.error("❌ JSONBin Write Error:", err);
    throw err;
  }
}

// --- Optionally Read from Key Bin (যদি দরকার হয়) ---
async function loadFromKeyBin () {
  try {
    const res = await fetch(KEY_BIN_URL, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const data = await res.json();
    return data.record; // { API_KEY: "...", BIN_ID: "..." }
  } catch (err) {
    console.error("❌ JSONBin KeyBin Error:", err);
    throw err;
  }
}

// --- Export for browser usage ---
if (typeof window !== "undefined") {
  window.jsonbin = { jsonbinRead, jsonbinWrite, loadFromKeyBin };
}

