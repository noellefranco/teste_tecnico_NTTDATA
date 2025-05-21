import prisma from "../src/prismaClient.js";
import request from "supertest";
import app from "../src/app.js";

describe("Playlist API", () => {
  afterEach(async () => {
    await prisma.playlist.deleteMany();
  });

  describe("GET /playlists", () => {
    it("Deve listar todas as playlists", async () => {
      await prisma.playlist.create({ data: { name: "Playlist 1" } });
      await prisma.playlist.create({ data: { name: "Playlist 2" } });

      const res = await request(app).get("/playlists");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("songs");
    });
  });

  describe("GET /playlists/:id", () => {
    it("Deve retornar uma playlist pelo ID", async () => {
      const playlist = await prisma.playlist.create({
        data: {
          name: "Playlist Especial",
        },
      });

      const res = await request(app).get(`/playlists/${playlist.id}`); // ← aqui também estava como regex

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", playlist.id);
      expect(res.body).toHaveProperty("name", playlist.name);
    });
  });

  describe("POST /playlists", () => {
    it("Deve criar uma nova playlist com nome válido", async () => {
      const res = await request(app)
        .post("/playlists")
        .send({ name: "Nova Playlist" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name", "Nova Playlist");
    });

    it("Deve retornar 400 se o nome estiver vazio", async () => {
      const res = await request(app).post("/playlists").send({ name: "" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Nome da playlist é obrigatório"
      );
    });

    it("Deve retornar 400 se o nome não for enviado", async () => {
      const res = await request(app).post("/playlists").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Nome da playlist é obrigatório"
      );
    });
  });

  describe("PUT /playlists/:id", () => {
    it("Deve atualizar uma playlist existente com nome válido", async () => {
      const playlist = await prisma.playlist.create({
        data: { name: "Playlist Antiga" },
      });

      const res = await request(app)
        .put(`/playlists/${playlist.id}`)
        .send({ name: "Playlist Atualizada" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", playlist.id);
      expect(res.body).toHaveProperty("name", "Playlist Atualizada");
    });

    it("Deve retornar 400 se o nome estiver vazio", async () => {
      const playlist = await prisma.playlist.create({
        data: { name: "Playlist Antiga" },
      });

      const res = await request(app)
        .put(`/playlists/${playlist.id}`)
        .send({ name: "" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Nome da playlist é obrigatório"
      );
    });

    it("Deve retornar 400 se o nome não for enviado", async () => {
      const playlist = await prisma.playlist.create({
        data: { name: "Playlist Antiga" },
      });

      const res = await request(app).put(`/playlists/${playlist.id}`).send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "error",
        "Nome da playlist é obrigatório"
      );
    });

    it("Deve retornar 404 se a playlist não existir", async () => {
      const res = await request(app)
        .put("/playlists/999999")
        .send({ name: "Teste" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error", "Playlist não encontrada");
    });
  });

  describe("DELETE /playlists/:id", () => {
    it("Deve deletar uma playlist existente", async () => {
      const playlist = await prisma.playlist.create({
        data: { name: "Playlist a deletar" },
      });

      const res = await request(app).delete(`/playlists/${playlist.id}`);

      expect(res.statusCode).toBe(204);

      const check = await prisma.playlist.findUnique({
        where: { id: playlist.id },
      });
      expect(check).toBeNull();
    });

    it("Deve retornar 404 se a playlist não existir", async () => {
      const res = await request(app).delete("/playlists/999999");

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error", "Playlist não encontrada");
    });
  });
});
