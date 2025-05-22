import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSongById, updateSong } from "../services/songService";
import "../style/EditSong.css";

export default function EditMusic() {
  const { playlistId, musicId } = useParams();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await getSongById(musicId);
        setTitle(response.data.title);
        setArtist(response.data.artist);
        setDuration(response.data.duration);
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
      await updateSong(musicId, {
        title,
        artist,
        duration,
        playlistId: Number(playlistId),
      });
      navigate(`/playlists/${playlistId}/musics`);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar música");
    }
  };

  return (
    <div className="edit-music-container">
      <h2>Editar Música</h2>
      <form className="edit-music-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da música"
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
