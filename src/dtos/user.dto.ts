import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { UsernameValidation } from 'src/services/utils/username-validation';

export class UserDto {
    @ApiProperty({
        description: 'The username',
        example: 'testUser',
    })
    @IsNotEmpty({
      message: 'The name field is required',
    })
    username: string;

    @ApiProperty({
        description: 'The password',
        example: 'AsdPass123!',
    })
    @Validate(UsernameValidation)
    password: string;
  }