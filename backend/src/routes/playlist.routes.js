import express from "express";
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "../services/playlist.service.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const playlists = await getAllPlaylists();
  res.json(playlists);
});

router.get("/:id", async (req, res) => {
  const playlist = await getPlaylistById(req.params.id);
  if (!playlist) {
    return res.status(404).json({ error: "Playlist não encontrada" });
  }
  res.json(playlist);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Nome da playlist é obrigatório" });
  }

  try {
    const playlist = await createPlaylist(name.trim());
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a playlist" });
  }
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Nome da playlist é obrigatório" });
  }

  try {
    const updated = await updatePlaylist(req.params.id, name.trim());
    res.json(updated);
  } catch (error) {
    // Tratamento de erro do Prisma quando id não existe
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist não encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a playlist" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deletePlaylist(req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Playlist não encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar a playlist" });
  }
});

export default router;
