import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PlaylistList from "./components/PlaylistList";
import CreatePlaylist from "./components/CreatePlaylist";
import EditPlaylist from "./components/EditPlaylist";
import SongList from "./components/SongList";
import CreateSong from "./components/CreateSong";
import EditSong from "./components/EditSong";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/playlists" element={<PlaylistList />} />
        <Route path="/playlists/new" element={<CreatePlaylist />} />
        <Route path="/playlists/:id/edit" element={<EditPlaylist />} />
        <Route path="/playlists/:playlistId/musics" element={<SongList />} />
        <Route
          path="/playlists/:playlistId/musics/new"
          element={<CreateSong />}
        />
        <Route
          path="/playlists/:playlistId/musics/:musicId/edit"
          element={<EditSong />}
        />
        <Route path="*" element={<PlaylistList />} />
        <Route path="/playlists/:playlistId/musics" element={<SongList />} />
        <Route
          path="/playlists/:playlistId/musics/new"
          element={<CreateSong />}
        />
        <Route
          path="/playlists/:playlistId/musics/:musicId/edit"
          element={<EditSong />}
        />
      </Routes>
    </Router>
  );
}
