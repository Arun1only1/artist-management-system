import ResponseMessage from '@/constant/response.message';
import { CustomError } from '@/interface/error.interface';

export const getMessageFromError = (error: CustomError) => {
  return error?.response?.data?.message || ResponseMessage.SOMETHING_WENT_WRONG;
};
