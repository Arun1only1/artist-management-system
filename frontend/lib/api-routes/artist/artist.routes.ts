import $axios from '@/lib/axios/axios.instance';

import { PaginationProps } from '@/lib/api-routes/user/user.routes';
import { EditArtistFormValuesType } from '@/components/EditArtistForm';
import { AddArtistFormValuesType } from '@/components/AddArtistForm';
import { Role } from '@/constant/enums/role.enum';

// list artist
export const getArtistList = async (values: PaginationProps) => {
  return await $axios.post('/artist/list', values);
};

// delete artist
export const deleteArtist = async (artistId: string) => {
  return await $axios.delete(`/artist/delete/${artistId}`);
};

// get artist details
export const getArtistDetails = async (artistId: string) => {
  return await $axios.get(`/artist/detail/${artistId}`);
};

// update artist
export const updateArtist = async (
  artistId: string,
  values: EditArtistFormValuesType
) => {
  return await $axios.put(`/artist/update/${artistId}`, values);
};

// add artist
export const addArtist = async (values: AddArtistFormValuesType) => {
  return await $axios.post('/artist/add', values);
};
