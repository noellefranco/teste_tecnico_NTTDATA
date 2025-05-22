import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaylistById, updatePlaylist } from "../services/playlistService";

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
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Editar Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
          />
        </label>
        <button type="submit">Atualizar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
