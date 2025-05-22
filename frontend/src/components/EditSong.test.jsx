import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EditSong from "./EditSong";
import * as songService from "../services/songService";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.spyOn(songService, "getSongById").mockResolvedValue({
  data: { title: "Minha Música", artist: "Noelle", duration: "3" },
});

jest.spyOn(songService, "updateSong").mockResolvedValue({});

describe("EditSong", () => {
  test("carrega e exibe dados da música", async () => {
    render(
      <MemoryRouter initialEntries={["/playlists/1/musics/123/edit"]}>
        <Routes>
          <Route
            path="/playlists/:playlistId/musics/:musicId/edit"
            element={<EditSong />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título da música/i)).toHaveValue(
        "Minha Música"
      );
      expect(screen.getByPlaceholderText(/Artista/i)).toHaveValue("Noelle");
      expect(screen.getByPlaceholderText(/Duração/i)).toHaveValue("3");
    });

    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  test("permite editar e submeter o formulário", async () => {
    render(
      <MemoryRouter initialEntries={["/playlists/1/musics/123/edit"]}>
        <Routes>
          <Route
            path="/playlists/:playlistId/musics/:musicId/edit"
            element={<EditSong />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByPlaceholderText(/Título da música/i)).toHaveValue(
        "Minha Música"
      )
    );

    fireEvent.change(screen.getByPlaceholderText(/Título da música/i), {
      target: { value: "Nova Música" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Artista/i), {
      target: { value: "Outro Artista" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Duração/i), {
      target: { value: "4" },
    });

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(songService.updateSong).toHaveBeenCalledWith("123", {
        title: "Nova Música",
        artist: "Outro Artista",
        duration: "4",
        playlistId: 1,
      });
    });
  });
});
