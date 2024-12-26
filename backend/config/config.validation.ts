import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('stage', 'local', 'prod', 'dev', 'uat')
    .default('local'),

  API_PORT: Joi.number().default(8080),

  SYSTEM_LANGUAGE: Joi.string().required(),

  //   MONGO_DB_LOCAL: Joi.string(),

  //   MONGO_DB_DEV: Joi.alternatives().conditional('NODE_ENV', {
  //     is: 'dev',
  //     then: Joi.string().required(),
  //     otherwise: Joi.string().optional(),
  //   }),

  //   MONGO_DB_PROD: Joi.alternatives().conditional('NODE_ENV', {
  //     is: 'prod',
  //     then: Joi.string().required(),
  //     otherwise: Joi.string().optional(),
  //   }),

  // tokens
  //   JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  //   JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('10m'),
  //   JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  //   JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
});
