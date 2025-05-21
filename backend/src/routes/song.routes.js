import express from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} from "../services/song.service.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const songs = await getAllSongs();
  res.json(songs);
});

router.get("/:id", async (req, res) => {
  try {
    const song = await getSongById(req.params.id);
    res.json(song);
  } catch (error) {
    const status = error.statusCode || 500;
    res
      .status(status)
      .json({ error: error.message || "Erro ao buscar música." });
  }
});

router.post("/", async (req, res) => {
  const { title, artist, duration, playlistId } = req.body;

  if (!title || title.trim() === "")
    return res.status(400).json({ error: "Título é obrigatório." });
  if (!artist || artist.trim() === "")
    return res.status(400).json({ error: "Artista é obrigatório." });
  if (duration == null)
    return res.status(400).json({ error: "Duração é obrigatória." });
  if (typeof duration !== "number" || duration <= 0)
    return res.status(400).json({ error: "Duração deve ser maior que zero." });
  if (!playlistId)
    return res.status(400).json({ error: "PlaylistId é obrigatório." });

  try {
    const newSong = await createSong({ title, artist, duration, playlistId });
    res.status(201).json(newSong);
  } catch (error) {
    const status = error.statusCode || 400;
    res
      .status(status)
      .json({ error: error.message || "Erro ao criar música." });
  }
});

router.put("/:id", async (req, res) => {
  const { title, artist, duration } = req.body;

  if (title !== undefined && title.trim() === "")
    return res.status(400).json({ error: "Título é obrigatório." });
  if (artist !== undefined && artist.trim() === "")
    return res.status(400).json({ error: "Artista é obrigatório." });
  if (duration !== undefined && (typeof duration !== "number" || duration <= 0))
    return res.status(400).json({ error: "Duração deve ser maior que zero." });

  try {
    const updated = await updateSong(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    const status = error.statusCode || 500;
    res
      .status(status)
      .json({ error: error.message || "Erro ao atualizar música." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteSong(req.params.id);
    res.status(204).end();
  } catch (error) {
    const status = error.statusCode || 500;
    res
      .status(status)
      .json({ error: error.message || "Erro ao deletar música." });
  }
});

export default router;
