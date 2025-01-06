import $axios from '@/lib/axios/axios.instance';
import { PaginationProps } from '@/lib/api-routes/user/user.routes';

// list artist
export const getArtistList = async (values: PaginationProps) => {
  return await $axios.post('/artist/list', values);
};

// delete artist
export const deleteArtist = () => {};
