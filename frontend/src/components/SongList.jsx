import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSongs, deleteSong } from "../services/songService";

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
          <li key={song.id}>
            {song.title}{" "}
            <Link to={`/playlists/${playlistId}/musics/${song.id}/edit`}>
              ✏️ Editar
            </Link>{" "}
            <button onClick={() => handleDelete(song.id)}>🗑️ Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
