import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSong } from "../services/songService";
import "../style/CreateSong.css";

export default function CreateSong() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSong({
        title,
        artist,
        duration: Number(duration),
        playlistId: Number(playlistId),
      });
      navigate(`/playlists/${playlistId}/music`);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar música");
    }
  };

  return (
    <div className="create-song-container">
      <h2>Adicionar Música</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="create-song-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Duração"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
