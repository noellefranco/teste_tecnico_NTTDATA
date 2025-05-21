import prisma from "../src/prismaClient.js";
import request from "supertest";
import app from "../src/app.js";

describe("Song API", () => {
  let playlist;

  beforeEach(async () => {
    playlist = await prisma.playlist.create({
      data: { name: "Playlist para músicas" },
    });
  });

  afterEach(async () => {
    await prisma.song.deleteMany();
    await prisma.playlist.deleteMany();
  });

  describe("POST /songs", () => {
    it("Deve criar uma nova música válida", async () => {
      const newPlaylist = await request(app)
        .post("/playlists")
        .send({ name: "Minha Playlist" });

      const newSong = {
        title: "Minha Música Teste",
        artist: "Artista Teste",
        duration: 240,
        playlistId: Number(newPlaylist.body.id),
      };

      const res = await request(app).post("/songs").send(newSong);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.title).toBe(newSong.title);
    });

    it("Deve retornar 400 se faltar título", async () => {
      const res = await request(app).post("/songs").send({
        artist: "Artista Teste",
        duration: 240,
        playlistId: playlist.id,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Título é obrigatório.");
    });

    it("Deve retornar 400 se faltar artista", async () => {
      const res = await request(app).post("/songs").send({
        title: "Título",
        duration: 240,
        playlistId: playlist.id,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Artista é obrigatório.");
    });

    it("Deve retornar 400 se faltar duração", async () => {
      const res = await request(app).post("/songs").send({
        title: "Título",
        artist: "Artista",
        playlistId: playlist.id,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Duração é obrigatória.");
    });

    it("Deve retornar 400 se duração for negativa ou zero", async () => {
      const res = await request(app).post("/songs").send({
        title: "Título",
        artist: "Artista",
        duration: 0,
        playlistId: playlist.id,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Duração deve ser maior que zero."
      );
    });

    it("Deve retornar 400 se faltar playlistId", async () => {
      const res = await request(app).post("/songs").send({
        title: "Título",
        artist: "Artista",
        duration: 240,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "PlaylistId é obrigatório.");
    });

    it("Deve retornar 400 se playlistId não existir", async () => {
      const res = await request(app).post("/songs").send({
        title: "Título",
        artist: "Artista",
        duration: 240,
        playlistId: 999999,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Playlist não encontrada");
    });
  });

  describe("GET /songs", () => {
    it("Deve listar todas as músicas", async () => {
      await prisma.song.create({
        data: {
          title: "Música 1",
          artist: "Artista 1",
          duration: 200,
          playlistId: playlist.id,
        },
      });

      const res = await request(app).get("/songs");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /songs/:id", () => {
    it("Deve buscar uma música pelo id", async () => {
      const song = await prisma.song.create({
        data: {
          title: "Música para buscar",
          artist: "Artista busca",
          duration: 180,
          playlistId: playlist.id,
        },
      });

      const res = await request(app).get(`/songs/${song.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", song.id);
      expect(res.body.title).toBe(song.title);
    });

    it("Deve retornar 404 se música não existir", async () => {
      const res = await request(app).get("/songs/999999");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error", "Música não encontrada");
    });
  });

  describe("PUT /songs/:id", () => {
    it("Deve atualizar uma música existente", async () => {
      const song = await prisma.song.create({
        data: {
          title: "Música para atualizar",
          artist: "Artista antigo",
          duration: 210,
          playlistId: playlist.id,
        },
      });

      const updatedData = {
        title: "Música Atualizada",
        artist: "Artista novo",
        duration: 220,
      };

      const res = await request(app).put(`/songs/${song.id}`).send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updatedData.title);
      expect(res.body.artist).toBe(updatedData.artist);
      expect(res.body.duration).toBe(updatedData.duration);
    });

    it("Deve retornar 400 se o título for vazio", async () => {
      const song = await prisma.song.create({
        data: {
          title: "Música antiga",
          artist: "Artista antigo",
          duration: 210,
          playlistId: playlist.id,
        },
      });

      const res = await request(app)
        .put(`/songs/${song.id}`)
        .send({ title: "" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Título é obrigatório.");
    });

    it("Deve retornar 400 se o artista for vazio", async () => {
      const song = await prisma.song.create({
        data: {
          title: "Música antiga",
          artist: "Artista antigo",
          duration: 210,
          playlistId: playlist.id,
        },
      });

      const res = await request(app)
        .put(`/songs/${song.id}`)
        .send({ artist: "" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Artista é obrigatório.");
    });

    it("Deve retornar 400 se duração for negativa ou zero", async () => {
      const song = await prisma.song.create({
        data: {
          title: "Música antiga",
          artist: "Artista antigo",
          duration: 210,
          playlistId: playlist.id,
        },
      });

      const res = await request(app)
        .put(`/songs/${song.id}`)
        .send({ duration: 0 });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Duração deve ser maior que zero."
      );
    });

    it("Deve retornar 404 se música não existir", async () => {
      const res = await request(app).put("/songs/999999").send({
        title: "Teste",
        artist: "Teste",
        duration: 180,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error", "Música não encontrada");
    });
  });

  describe("DELETE /songs/:id", () => {
    it("Deve deletar uma música existente", async () => {
      const playlist = await prisma.playlist.create({
        data: { name: "Playlist Teste" },
      });
      const song = await prisma.song.create({
        data: {
          title: "Música Teste",
          artist: "Artista Teste",
          duration: 200,
          playlistId: playlist.id,
        },
      });

      const res = await request(app).delete(`/songs/${song.id}`);

      expect(res.statusCode).toBe(204);

      const check = await prisma.song.findUnique({ where: { id: song.id } });
      expect(check).toBeNull();
    });
  });
});
