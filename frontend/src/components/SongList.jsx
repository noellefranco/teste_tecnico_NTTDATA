import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSongs, deleteSong } from "../services/songService";
import { getPlaylistById } from "../services/playlistService";
import "../style/SongList.css";

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
    <div className="lyrics-container">
      <button
        onClick={fetchLyrics}
        className="lyrics-button"
        disabled={loading}
      >
        {loading ? "Buscando..." : "Mostrar Letra"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {lyrics && <pre className="lyrics-box">{lyrics}</pre>}
    </div>
  );
}

export default function MusicList() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const songsResponse = await getSongs();
        const filteredSongs = songsResponse.data.filter(
          (song) => song.playlistId === Number(playlistId)
        );
        setSongs(filteredSongs);

        const playlistResponse = await getPlaylistById(playlistId);
        setPlaylistName(playlistResponse.data.name);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar músicas ou playlist");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
    <div className="music-list-container">
      <h2>{playlistName || playlistId}</h2>
      <Link
        className="add-song-link"
        to={`/playlists/${playlistId}/musics/new`}
      >
        ➕ Adicionar música
      </Link>
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="song-item">
            <span className="song-title">
              {song.title} — {song.artist}
            </span>
            <div className="song-actions">
              <Link to={`/playlists/${playlistId}/musics/${song.id}/edit`}>
                ✏️ Editar
              </Link>
              <button onClick={() => handleDelete(song.id)}>🗑️ Excluir</button>
            </div>
            <Lyrics artist={song.artist} title={song.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
