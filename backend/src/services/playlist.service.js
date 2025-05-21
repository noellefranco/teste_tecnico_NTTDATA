import prisma from "../prismaClient.js";

export const getAllPlaylists = () =>
  prisma.playlist.findMany({ include: { songs: true } });

export const getPlaylistById = (id) =>
  prisma.playlist.findUnique({
    where: { id: Number(id) },
    include: { songs: true },
  });

export const createPlaylist = (name) =>
  prisma.playlist.create({ data: { name } });

export const updatePlaylist = (id, name) =>
  prisma.playlist.update({ where: { id: Number(id) }, data: { name } });

export const deletePlaylist = (id) =>
  prisma.playlist.delete({ where: { id: Number(id) } });
