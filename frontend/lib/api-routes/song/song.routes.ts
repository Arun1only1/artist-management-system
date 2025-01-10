import { AddSongProps } from "@/components/AddSongForm";
import $axios from "../../axios/axios.instance";
import { SongDataProps } from "@/components/EditSongForm";

interface GetSongListProps {
  page: number;
  limit: number;
  artistId?: string;
}

// add song
export const addSong = async (values: AddSongProps) => {
  return await $axios.post("/song/add", values);
};

// get song list
export const getSongList = async ({
  page,
  limit,
  artistId,
}: GetSongListProps) => {
  return await $axios.post("/song/list", {
    page,
    limit,
    artistId: artistId || undefined,
  });
};

// delete song
export const deleteSong = async (songId: string) => {
  return await $axios.delete(`/song/delete/${songId}`);
};

// update song
export const updateSong = async (songId: string, values: SongDataProps) => {
  return await $axios.put(`/song/edit/${songId}`, values);
};

// get song details
export const getSongDetails = async (songId: string) => {
  return await $axios.get(`/song/details/${songId}`);
};
