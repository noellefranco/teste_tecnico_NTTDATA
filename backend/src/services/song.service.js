import prisma from "../prismaClient.js";

export const getAllSongs = () =>
  prisma.song.findMany({ include: { playlist: true } });

export const getSongById = (id) =>
  prisma.song.findUnique({
    where: { id: Number(id) },
    include: { playlist: true },
  });

export const createSong = ({ title, artist, duration, playlistId }) =>
  prisma.song.create({
    data: {
      title,
      artist,
      duration,
      playlist: { connect: { id: Number(playlistId) } },
    },
  });

export const updateSong = (id, data) =>
  prisma.song.update({
    where: { id: Number(id) },
    data,
  });

export const deleteSong = (id) =>
  prisma.song.delete({ where: { id: Number(id) } });
