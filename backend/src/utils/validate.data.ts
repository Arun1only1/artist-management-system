import { InternalServerErrorException } from '@nestjs/common';

export const validateData = async (validationSchema, data) => {
  try {
    await validationSchema.validate(data);
  } catch (error) {
    throw new InternalServerErrorException(
      'CSV processing failed',
      error.message,
    );
  }
};
