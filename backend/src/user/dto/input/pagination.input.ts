// pagination.dto.ts
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/constants/general.constants';

export class PaginationInput {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = DEFAULT_LIMIT;
}
