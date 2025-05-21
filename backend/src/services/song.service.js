import prisma from "../prismaClient.js";

export const getAllSongs = () =>
  prisma.song.findMany({ include: { playlist: true } });

export const getSongById = async (id) => {
  const song = await prisma.song.findUnique({
    where: { id: Number(id) },
    include: { playlist: true },
  });
  if (!song) {
    const error = new Error("Música não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return song;
};

export const createSong = async ({ title, artist, duration, playlistId }) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: Number(playlistId) },
  });
  if (!playlist) {
    const error = new Error("Playlist não encontrada");
    error.statusCode = 400;
    throw error;
  }

  return prisma.song.create({
    data: {
      title,
      artist,
      duration,
      playlist: { connect: { id: Number(playlistId) } },
    },
  });
};

export const updateSong = async (id, data) => {
  const songExists = await prisma.song.findUnique({
    where: { id: Number(id) },
  });
  if (!songExists) {
    const error = new Error("Música não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return prisma.song.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteSong = async (id) => {
  const songExists = await prisma.song.findUnique({
    where: { id: Number(id) },
  });
  if (!songExists) {
    const error = new Error("Música não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return prisma.song.delete({ where: { id: Number(id) } });
};
