import { AddSongProps } from '@/app/(home)/song/add/page';
import $axios from '../../axios/axios.instance';

interface GetSongListProps {
  page: number;
  limit: number;
  artistId?: string;
}

// add song
export const addSong = async (values: AddSongProps) => {
  return await $axios.post('/song/add', values);
};

// get song list
export const getSongList = async ({
  page,
  limit,
  artistId,
}: GetSongListProps) => {
  return await $axios.post('/song/list', {
    page,
    limit,
    artistId: artistId || undefined,
  });
};

// delete song
export const deleteSong = async (songId: string) => {
  return await $axios.delete(`/song/delete/${songId}`);
};

// // get user details
// export const getUserDetails = async (userId: string) => {
//   return await $axios.get(`/user/details/${userId}`);
// };

// // update user
// export const updateUser = async (userId: string, values: EditUserProps) => {
//   return await $axios.put(`/user/edit/${userId}`, values);
// };
