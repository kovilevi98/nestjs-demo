import { ApiProperty } from '@nestjs/swagger';

export class FoodDto {
    @ApiProperty({
        example: 'username',
    })
    username: string;

    @ApiProperty()
    access_token: string;
  }