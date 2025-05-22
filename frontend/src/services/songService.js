import api from "./api";

export const getSongs = () => api.get("/songs");

export const getSongById = (id) => api.get(`/songs/${id}`);

export const createSong = (data) => api.post("/songs", data);

export const updateSong = (id, data) => api.put(`/songs/${id}`, data);

export const deleteSong = (id) => api.delete(`/songs/${id}`);
