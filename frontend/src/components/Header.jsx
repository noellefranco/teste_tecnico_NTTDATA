import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>NTTUnes</h1>
      <nav>
        <Link to="/">Playlists</Link> |{" "}
        <Link to="/playlists/new">Criar Nova Playlist</Link>
      </nav>
      <hr />
    </header>
  );
}
