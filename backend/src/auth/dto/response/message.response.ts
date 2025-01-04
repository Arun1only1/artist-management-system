import { IsString } from 'class-validator';

export class MessageResponse {
  @IsString()
  message: string;
}
