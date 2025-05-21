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
  const song = await getSongById(req.params.id);
  song
    ? res.json(song)
    : res.status(404).json({ error: "Música não encontrada." });
});

router.post("/", async (req, res) => {
  try {
    const newSong = await createSong(req.body);
    res.status(201).json(newSong);
  } catch {
    res.status(400).json({ error: "Erro ao criar música." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await updateSong(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Erro ao atualizar a música." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteSong(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Erro ao deletar a música." });
  }
});

export default router;
