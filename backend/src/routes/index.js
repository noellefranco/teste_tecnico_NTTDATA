import express from "express";
import playlistRoutes from "./playlist.routes.js";
import songRoutes from "./song.routes.js";

export default function routes(app) {
  const router = express.Router();

  router.use("/playlists", playlistRoutes);
  router.use("/songs", songRoutes);

  app.use(router);
}
