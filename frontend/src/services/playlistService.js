import api from "./api";

export const getPlaylists = () => api.get("/playlists");

export const getPlaylistById = (id) => api.get(`/playlists/${id}`);

export const createPlaylist = (data) => api.post("/playlists", data);

export const updatePlaylist = (id, data) => api.put(`/playlists/${id}`, data);

export const deletePlaylist = (id) => api.delete(`/playlists/${id}`);
