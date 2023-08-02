import { Controller, HttpStatus, Res, UseGuards, Get, Req, Query } from '@nestjs/common';
import { ApiBearerAuth,ApiOkResponse, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RestaurantService } from 'src/services/restaurant.service';
import { AuthGuard } from 'src/services/utils/auth.gard';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Food } from '../entities/food.entity';
import { ErrorDto } from 'src/dtos/error.dto';


@ApiTags('Restaurant')
@Controller('restaurants')
export class RestaurantController {
    constructor(
        private readonly service: RestaurantService,
        ) {}

    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: [Restaurant] })
    @ApiUnauthorizedResponse()
    async getAll(@Req() req, @Res() res : Response) {
        const restaurants = await this.service.getAll();
        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiBearerAuth()
    @ApiOkResponse({ type: Restaurant })
    @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
    @ApiUnauthorizedResponse()
    async findOne(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.findById(id);
        if(!restaurant){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Restaurant not found'
            });
        }
        return res.status(HttpStatus.OK).json(restaurant);
    }

    @Get(':id/menu')
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiBearerAuth()
    @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
    @ApiOkResponse({ type: [Food] })
    @ApiUnauthorizedResponse()
    async getMenusForRestaurant(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.getMenusForRestaurant(id);
        if(!restaurant){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Restaurant not found'
            });
        }
        return res.status(HttpStatus.OK).json(restaurant);
    }

   
}
