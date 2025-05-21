import playlistRoutes from "./playlist.routes.js";
import songRoutes from "./song.routes.js";

export default function routes(app) {
  app.use("/playlists", playlistRoutes);
  app.use("/songs", songRoutes);
}
