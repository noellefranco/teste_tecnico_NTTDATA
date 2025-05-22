import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaylistById, updatePlaylist } from "../services/playlistService";
import "../style/EditPlaylist.css";

export default function EditPlaylist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await getPlaylistById(id);
        setName(response.data.name);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar playlist.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome da playlist não pode estar vazio.");
      return;
    }

    try {
      await updatePlaylist(id, { name });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar playlist.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-playlist-container">
      <h2>Editar Playlist</h2>
      <form className="edit-playlist-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />
        <button type="submit">Atualizar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
