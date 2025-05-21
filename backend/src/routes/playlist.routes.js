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
  playlist
    ? res.json(playlist)
    : res.status(404).json({ error: "Playlist não encontrada." });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const playlist = await createPlaylist(name);
  res.status(201).json(playlist);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await updatePlaylist(req.params.id, req.body.name);
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Erro ao atualizar a playlist." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deletePlaylist(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Erro ao deletar a playlist." });
  }
});

export default router;
