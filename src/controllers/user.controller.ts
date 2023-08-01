import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorDto } from 'src/dtos/error.dto';
import { UserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    @ApiResponse({ status: 409, description: 'Already exist', type: ErrorDto})
    @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto})
    @ApiOkResponse({ type: UserDto })
    async register(@Body() userDto: UserDto, @Res() res: Response): Promise<any> {
        if(await this.userService.doesUserExists(userDto)){
            return res.status(HttpStatus.CONFLICT).json({
                message: 'User already exists'
            })
        }

      //const user = await this.userService.register(userDto);
      return res.status(HttpStatus.OK).json(userDto);
    }  

    @Post('/login')
    @ApiResponse({ status: 406, description: 'Not acceptable', type: ErrorDto})
    @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
    @ApiOkResponse({ type: UserDto })
    async login(@Body() userDto : UserDto, @Res() res : Response): Promise <any> {
        const response = await this.userService.login(userDto);

        if(response.status == 406){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: 'Wrong password'
            })
        }

        if(response.status == 404){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'User not found'
            })
        }
        //const dbUser = await this.userService.findOne(user.username);
        return res.status(HttpStatus.OK).json(response.access_token);
    }

    @Post('/who-am-i')
    @ApiBearerAuth()
    @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
    @ApiOkResponse({ type: UserDto })
    async whoAmI(@Res() res : Response): Promise <any> {
        const response = await this.userService.findOne('test');

        if(!response){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'User not found'
            })
        }
        //const dbUser = await this.userService.findOne(user.username);
        return res.status(HttpStatus.OK).json(response);
    }

}
