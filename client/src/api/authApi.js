import axios from "axios";

export const Discover = async () => {
  const token = localStorage.getItem("token");
  const Discover = "http://localhost:3999/discover";
  const { data } = await axios.get(Discover, {
    headers: { "x-auth-token": token },
  });
  return data;
};

export const Artists = async () => {
  const token = localStorage.getItem("token");
  const Artists = "http://localhost:3999/artists";
  const { data } = await axios.get(Artists, {
    headers: { "x-auth-token": token },
  });
  return data;
};

export const PlaylistOfWeek = async () => {
  const token = localStorage.getItem("token");
  const PlaylistOfWeek = "http://localhost:3999/playlist";
  const { data } = await axios.get(PlaylistOfWeek, {
    headers: { "x-auth-token": token },
  });
  return data;
};

export const NavBarData = async () => {
  const token = localStorage.getItem("token");
  const navbar = "http://localhost:3999/navbar";
  const { data } = await axios.get(navbar, {
    headers: { "x-auth-token": token },
  });
  return data;
};

export const GetCurrentSong = async (id) => {
  const token = localStorage.getItem("token");
  const song = `http://localhost:3999/song/${id}`;
  const { data } = await axios.get(song, {
    headers: { "x-auth-token": token },
  });
  return data;
};