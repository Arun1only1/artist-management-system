import * as Yup from 'yup';

import MSG from '../../constant/validation.messages';

export const loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email(MSG.EMAIL_MUST_BE_VALID)
    .required(MSG.EMAIL_REQUIRED)
    .trim()
    .lowercase(),

  password: Yup.string().required(MSG.PASSWORD_REQUIRED),
});
