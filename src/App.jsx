import { useState } from "react";

// The attributes we pull from each cat. Keeping this list in one place keeps
// the displayed attributes CONSISTENT across every API call.
const ATTRIBUTES = [
  { key: "name", label: "Breed" },
  { key: "origin", label: "Origin" },
  { key: "life_span", label: "Life span" },
  { key: "temperament", label: "Temperament" },
];

// The Cat API's has_breeds filter only works with an API key attached.
const CAT_API_KEY = "live_AsdmdpU9bLrrTvXVBTwVMks5sIxdZ0VaDasT0RMm3acEZaincnKlfAu0JQZT48q7";

// Ask The Cat API for one random cat that has breed info.
async function fetchCat() {
  const url = "https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1";
  const response = await fetch(url, {
    headers: { "x-api-key": CAT_API_KEY },
  });
  const data = await response.json();
  const cat = data[0];

  // Only usable if it actually came back with breed data.
  if (!cat || !cat.breeds || cat.breeds.length === 0) return null;

  const breed = cat.breeds[0];
  return {
    image: cat.url,
    name: breed.name,
    origin: breed.origin,
    life_span: breed.life_span + " years",
    temperament: breed.temperament,
  };
}

function App() {
  const [cat, setCat] = useState(null); // the current cat on screen
  const [banList, setBanList] = useState([]); // banned attribute values
  const [history, setHistory] = useState([]); // previously viewed cats
  const [status, setStatus] = useState(""); // status/loading message
  const [loading, setLoading] = useState(false);

  // Is any of this cat's attribute values on the ban list?
  function isBanned(candidate) {
    return ATTRIBUTES.some((attr) => banList.includes(candidate[attr.key]));
  }

  // Main "Discover" handler: keep fetching until we get a valid, non-banned cat.
  async function discover() {
    setLoading(true);
    setStatus("Fetching a new cat...");

    let found = null;
    // Try a handful of times so a banned/empty result doesn't stop us.
    for (let i = 0; i < 15; i++) {
      const result = await fetchCat();
      if (result && !isBanned(result)) {
        found = result;
        break;
      }
    }

    if (!found) {
      setStatus("Couldn't find a cat that isn't banned. Try removing some bans!");
      setLoading(false);
      return;
    }

    setStatus("");
    setCat(found);
    setHistory((prev) => [found, ...prev]);
    setLoading(false);
  }

  // Clicking an attribute toggles it on/off the ban list.
  function toggleBan(value) {
    setBanList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <>
      <header>
        <h1>🐱 Veni Vici!</h1>
        <p>Discover a random cat. Click an attribute to ban it from future results.</p>
      </header>

      <main>
        {/* Ban list */}
        <section className="ban-list">
          <h2>🚫 Ban List</h2>
          <p className="hint">
            Click an attribute below to add it here. Click it here to remove it.
          </p>
          <div className="chips">
            {banList.length === 0 ? (
              <p className="hint">Nothing banned yet.</p>
            ) : (
              banList.map((value) => (
                <button
                  key={value}
                  className="chip"
                  onClick={() => toggleBan(value)}
                >
                  {value}
                </button>
              ))
            )}
          </div>
        </section>

        {/* Current result */}
        <section className="card">
          {cat ? (
            <>
              <img src={cat.image} alt={cat.name} />
              <div className="chips">
                {ATTRIBUTES.map((attr) => (
                  <button
                    key={attr.key}
                    className="chip"
                    onClick={() => toggleBan(cat[attr.key])}
                  >
                    <span className="label">{attr.label}:</span> {cat[attr.key]}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="placeholder">Click Discover to meet your first cat!</p>
          )}
          <p className="status">{status}</p>
          <button id="discoverBtn" onClick={discover} disabled={loading}>
            Discover! ✨
          </button>
        </section>

        {/* History (stretch feature) */}
        <section className="history">
          <h2>🕘 History</h2>
          <div className="history-grid">
            {history.map((c, i) => (
              <figure key={i}>
                <img src={c.image} alt={c.name} />
                <figcaption>{c.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
