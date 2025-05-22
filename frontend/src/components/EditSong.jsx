import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSongById, updateSong } from "../services/songService";

export default function EditMusic() {
  const { playlistId, musicId } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await getSongById(musicId);
        setTitle(response.data.title);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar música");
      }
    }
    fetchSong();
  }, [musicId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSong(musicId, { title, playlistId: Number(playlistId) });
      navigate(`/playlists/${playlistId}/musics`);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar música");
    }
  };

  return (
    <div>
      <h2>Editar Música</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da música"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
