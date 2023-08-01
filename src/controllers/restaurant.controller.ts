import { Body, Controller, HttpStatus, Post, Res, UseGuards, Get, Req, Param, Query, Patch } from '@nestjs/common';
import { ApiBearerAuth,ApiBody, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenDto } from 'src/dtos/token.dto';
import { Response, Request } from 'express';
import { RestaurantService } from 'src/services/restaurant.service';
import { AuthGuard } from 'src/services/utils/auth.gard';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Food } from '../entities/food.entity';
import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service.';
import { CreateOrderDto } from 'src/dtos/create.order.dto';
import { FoodService } from 'src/services/food.servoce';
import { UserService } from 'src/services/user.service';
import { PatchDto } from 'src/dtos/patch.dto';


@ApiTags('Restaurant')
@Controller('restaurants')
export class RestaurantController {
    constructor(
        private readonly service: RestaurantService,
        private readonly orderService: OrderService,
        private readonly foodService: FoodService,
        private readonly userService: UserService,
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
    @ApiUnauthorizedResponse()
    async findOne(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.findById(id);
        return res.status(HttpStatus.OK).json(restaurant);
    }

    @Get(':id/menu')
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiBearerAuth()
    @ApiOkResponse({ type: [Food] })
    @ApiUnauthorizedResponse()
    async getMenusForRestaurant(@Req() req, @Query('id') id, @Res() res : Response) {
        const restaurant = await this.service.getMenusForRestaurant(id);
        return res.status(HttpStatus.OK).json(restaurant);
    }

    @Get('/orders')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: [Order] })
    @ApiUnauthorizedResponse()
    async getAllOrders(@Req() req, @Query('id') id, @Res() res : Response) {
        const orders = await this.orderService.getAll();
        return res.status(HttpStatus.OK).json(orders);
    }

    @Get('/orders/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiOkResponse({ type: [Order] })
    @ApiUnauthorizedResponse()
    async getById(@Req() req, @Query('id') id, @Res() res : Response) {
        const orders = await this.orderService.findById(id);
        return res.status(HttpStatus.OK).json(orders);
    }

    @Post('/orders')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateOrderDto})
    @ApiOkResponse({ type: [Order] })
    @ApiUnauthorizedResponse()
    async createOrder(@Req() req, @Body() body: CreateOrderDto, @Res() res : Response) {
        const restaurant = await this.service.findById(body.restaurantId);
        const user = await this.userService.findOneById(body.customerId);
        const order = new Order();
        const items = [];
        for(const item of body.items){
            const found = await this.foodService.findOne(item.id);
            items.push(found);
        }

        order.items = items;
        order.restaurant = restaurant;
        order.user = user;

        const result = await this.orderService.create(order);
        return res.status(HttpStatus.OK).json(result);
    }

    @Patch('/orders/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiQuery({ name: 'id', required: true, type: String})
    @ApiOkResponse({ type: [Order] })
    @ApiUnauthorizedResponse()
    async patchOrder(@Body() body: PatchDto, @Query('id') id, @Res() res : Response) {
       const order = await this.orderService.findById(id);
        order.status = body.state;

        const result = await this.orderService.update(order);
        return res.status(HttpStatus.OK).json(result);
    }
}
