import { Body, Controller, HttpStatus, Post, Res, UseGuards, Get, Req, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenDto } from 'src/dtos/token.dto';
import { Response, Request } from 'express';
import { RestaurantService } from 'src/services/restaurant.service';
import { AuthGuard } from 'src/services/utils/auth.gard';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Food } from '../entities/food.entity';


@ApiTags('Restaurant')
@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}

    @Get('/')
    //@UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: [Restaurant] })
    @ApiUnauthorizedResponse()
    async getAll(@Req() req, @Res() res : Response) {
        const restaurants = await this.service.getAll();
        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Get(':id')
    //@UseGuards(AuthGuard)
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiBearerAuth()
    @ApiOkResponse({ type: Restaurant })
    @ApiUnauthorizedResponse()
    async findOne(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.findById(id);
        return res.status(HttpStatus.OK).json(restaurant);
    }

    @Get(':id/menu')
    //@UseGuards(AuthGuard)
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiBearerAuth()
    @ApiOkResponse({ type: [Food] })
    @ApiUnauthorizedResponse()
    async getMenusForRestaurant(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.getMenusForRestaurant(id);
        return res.status(HttpStatus.OK).json(restaurant);
    }
}
