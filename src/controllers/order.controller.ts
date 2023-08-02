import { Body, Controller, HttpStatus, Post, Res, UseGuards, Get, Req, Query, Patch } from '@nestjs/common';
import { ApiBearerAuth,ApiBody, ApiOkResponse, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RestaurantService } from 'src/services/restaurant.service';
import { AuthGuard } from 'src/services/utils/auth.gard';
import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service.';
import { CreateOrderDto } from 'src/dtos/create.order.dto';
import { FoodService } from 'src/services/food.servoce';
import { UserService } from 'src/services/user.service';
import { PatchDto } from 'src/dtos/patch.dto';
import { ErrorDto } from 'src/dtos/error.dto';
import { OrderItem } from 'src/entities/order.item.entity';


@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(
        private readonly service: RestaurantService,
        private readonly orderService: OrderService,
        private readonly foodService: FoodService,
        private readonly userService: UserService,
        ) {}

    
        @Get('/')
        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOkResponse({ type: [Order] })
        @ApiUnauthorizedResponse()
        async getAllOrders(@Req() req, @Query('id') id, @Res() res : Response) {
            const orders = await this.orderService.getAll();
            return res.status(HttpStatus.OK).json(orders);
        }
    
        @Get('/:id')
        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiQuery({ name: 'id', required: true, type: String})
        @ApiOkResponse({ type: [Order] })
        @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
        @ApiUnauthorizedResponse()
        async getById(@Req() req, @Query('id') id, @Res() res : Response) {
            const order = await this.orderService.findById(id);
            if(!order){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Order not found'
                });
            }
            return res.status(HttpStatus.OK).json(order);
        }
    
        @Post('/')
        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiBody({ type: CreateOrderDto})
        @ApiOkResponse({ type: [Order] })
        @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
        @ApiUnauthorizedResponse()
        async createOrder(@Req() req, @Body() body: CreateOrderDto, @Res() res : Response) {
            const restaurant = await this.service.findById(body.restaurantId);
            if(!restaurant){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Restaurant not found'
                });
            }
    
            const user = await this.userService.findOneById(body.customerId);
            if(!user){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'User not found'
                });
            }
    
            const order = new Order();
            const items = [];
            for(const item of body.items){
                const found = await this.foodService.findOne(item.id);
                if(!found){
                    return res.status(HttpStatus.NOT_FOUND).json({
                        message: 'Item not found'
                    });
                }
                const orderItem = new OrderItem(item.message, item.quantity);
                const dbItem = await this.orderService.createOrderItem(orderItem);
                items.push(dbItem);
            }
    
            order.items = items;
            order.restaurant = restaurant;
            order.user = user;
    
            const result = await this.orderService.create(order);
            return res.status(HttpStatus.OK).json(result);
        }
    
        @Patch('/:id')
        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiQuery({ name: 'id', required: true, type: String})
        @ApiOkResponse({ type: [Order] })
        @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto})
        @ApiUnauthorizedResponse()
        async patchOrder(@Body() body: PatchDto, @Query('id') id, @Res() res : Response) {
           const order = await this.orderService.findById(id);
           if(!order){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Order not found'
                });
            }
            order.status = body.state;
    
            const result = await this.orderService.update(order);
            return res.status(HttpStatus.OK).json(result);
        }
   
}
