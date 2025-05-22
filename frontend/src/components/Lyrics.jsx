import { useState } from "react";

export default function Lyrics({ artist, title }) {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLyrics = async () => {
    setLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const res = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(
          artist
        )}/${encodeURIComponent(title)}`
      );
      const data = await res.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setError("Letra não encontrada");
      }
    } catch {
      setError("Erro ao buscar letra");
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <button onClick={fetchLyrics} disabled={loading}>
        {loading ? "Buscando..." : "Mostrar Letra"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {lyrics && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#f7f7f7",
            padding: "0.5rem",
            marginTop: "0.5rem",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {lyrics}
        </pre>
      )}
    </div>
  );
}
