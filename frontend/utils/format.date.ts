import dayjs from 'dayjs';

import { DEFAULT_DATE_FORMAT } from '@/constant/general.constant';

export const formatDate = (date: string) => {
  return dayjs(date).format(DEFAULT_DATE_FORMAT);
};
