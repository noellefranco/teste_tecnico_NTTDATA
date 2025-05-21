import prisma from "../prismaClient.js";

export const getAllPlaylists = () =>
  prisma.playlist.findMany({ include: { songs: true } });

export const getPlaylistById = (id) =>
  prisma.playlist.findUnique({
    where: { id: Number(id) },
    include: { songs: true },
  });

export const createPlaylist = (name) => {
  if (!name || name.trim() === "") {
    throw new Error("Nome inválido para playlist");
  }
  return prisma.playlist.create({ data: { name: name.trim() } });
};

export const updatePlaylist = (id, name) => {
  if (!name || name.trim() === "") {
    throw new Error("Nome inválido para playlist");
  }
  return prisma.playlist.update({
    where: { id: Number(id) },
    data: { name: name.trim() },
  });
};

export const deletePlaylist = (id) =>
  prisma.playlist.delete({ where: { id: Number(id) } });
