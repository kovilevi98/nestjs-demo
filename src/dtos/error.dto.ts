import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
    @ApiProperty({
        description: 'message',
    })
    message: string;
  }