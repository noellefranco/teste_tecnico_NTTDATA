import React, { useEffect, useState } from "react";
import { getPlaylists } from "../services/playlistService";

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Carregando playlists...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}
