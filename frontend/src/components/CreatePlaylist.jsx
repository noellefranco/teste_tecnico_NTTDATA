import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlaylist } from "../services/playlistService";
import "../style/CreatePlaylist.css";

export default function CreatePlaylist() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome da playlist é obrigatório.");
      return;
    }

    try {
      await createPlaylist({ name });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar playlist.");
    }
  };

  return (
    <div className="create-playlist-container">
      <h2>Nova Playlist</h2>
      <form className="create-playlist-form" onSubmit={handleSubmit}>
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
        <button type="submit">Salvar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
