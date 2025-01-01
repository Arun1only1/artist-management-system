import { IsUUID } from 'class-validator';

import MSG from 'src/constants/validation.message';

export class IdFromParamsInput {
  /**
   * UUID v4 validation for the 'id' parameter
   * @example 'a3bb189e-8bf9-3888-9912-ace4e6543002'
   */
  @IsUUID('4', { message: MSG.PROPERTY_MUST_BE_UUID })
  id: string;
}
