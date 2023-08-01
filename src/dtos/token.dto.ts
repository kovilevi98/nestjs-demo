import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
    constructor(username: string, access_token: string){
        this.username = username,
        this.access_token = access_token
    }

    @ApiProperty({
        example: 'username',
    })
    username: string;

    @ApiProperty()
    access_token: string;
  }