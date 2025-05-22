import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSongs, deleteSong } from "../services/songService";

function Lyrics({ artist, title }) {
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

export default function MusicList() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await getSongs();
        const filtered = response.data.filter(
          (song) => song.playlistId === Number(playlistId)
        );
        setSongs(filtered);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar músicas");
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, [playlistId]);

  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      setSongs((prev) => prev.filter((song) => song.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar música");
    }
  };

  if (loading) return <p>Carregando músicas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Músicas da Playlist {playlistId}</h2>
      <Link to={`/playlists/${playlistId}/musics/new`}>
        ➕ Adicionar música
      </Link>
      <ul>
        {songs.map((song) => (
          <li key={song.id} style={{ marginBottom: "1rem" }}>
            <strong>{song.title}</strong> — {song.artist}{" "}
            <Link to={`/playlists/${playlistId}/musics/${song.id}/edit`}>
              ✏️ Editar
            </Link>{" "}
            <button onClick={() => handleDelete(song.id)}>🗑️ Excluir</button>
            <Lyrics artist={song.artist} title={song.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
