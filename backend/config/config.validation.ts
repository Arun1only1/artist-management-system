import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('stage', 'local', 'prod', 'dev', 'uat')
    .default('local'),

  API_PORT: Joi.number().default(8080),

  SYSTEM_LANGUAGE: Joi.string().required().trim(),

  DB_TYPE: Joi.string().required().trim(),
  DB_HOST: Joi.string().required().trim(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required().trim(),
  DB_PASSWORD: Joi.string().required().trim(),
  DB_DATABASE: Joi.string().required().trim(),

  // tokens
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('10m'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
});
