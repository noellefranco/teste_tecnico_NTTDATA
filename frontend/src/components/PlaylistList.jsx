import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPlaylists, deletePlaylist } from "../services/playlistService";
import "../style/PlaylistList.css";

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await getPlaylists();
        setPlaylists(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar playlists");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta playlist?"))
      return;
    try {
      await deletePlaylist(id);
      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir playlist");
    }
  }

  if (loading) return <p>Carregando playlists...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="playlist-list-container">
      <h2>Suas Playlists</h2>
      <ul className="playlist-list">
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <span>{playlist.name}</span>
            <div className="playlist-actions">
              <button
                onClick={() => navigate(`/playlists/${playlist.id}/edit`)}
              >
                Editar
              </button>
              <Link to={`/playlists/${playlist.id}/musics`}>🎵</Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(playlist.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
