import { Link } from "react-router-dom";
import "../style/Header.css";

export default function Header() {
  return (
    <header>
      <h1>NTTUnes</h1>
      <nav>
        <Link to="/">Suas Playlists</Link> |{" "}
        <Link to="/playlists/new">Criar Nova Playlist</Link>
      </nav>
    </header>
  );
}
