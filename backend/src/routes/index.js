import playlistRoutes from "./playlist.routes.js";

export default function routes(app) {
  app.use("/playlists", playlistRoutes);
}
