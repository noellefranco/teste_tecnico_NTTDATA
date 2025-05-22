import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSong } from "../services/songService";

export default function CreateSong() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    console.log({
      title,
      artist,
      duration,
      playlistId: Number(playlistId),
    });
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
    <div>
      <h2>Adicionar Música</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
