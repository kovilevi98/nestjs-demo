import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
    constructor(username: string, access_token: string, id: string){
        this.username = username,
        this.access_token = access_token,
        this.id = id
    }

    @ApiProperty({
        example: 'username',
    })
    username: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    access_token: string;
  }