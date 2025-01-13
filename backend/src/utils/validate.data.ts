import { BadRequestException } from '@nestjs/common';

export const validateData = async (validationSchema, data) => {
  try {
    await validationSchema.validate(data);
  } catch (error) {
    throw new BadRequestException('CSV processing failed.');
  }
};
