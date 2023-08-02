import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Restaurant } from 'src/entities/restaurant.entity';
import { OrderItem } from 'src/entities/order.item.entity';

@Injectable()export class OrderService {
    public constructor(@InjectRepository(Order)private repository : Repository < Order >, @InjectRepository(OrderItem)private orderItemRepository : Repository < OrderItem >, @InjectRepository(Restaurant)private restaurantRepository : Repository < Restaurant >) {}

    public async getAll(): Promise < Order[] > {
        return this.repository.find(
            {
                relations: ['items', 'user', 'restaurant']
            }
        );
    }

    public async getAllForRestaurant(id : string): Promise < Order[] > {
        const res = await this.restaurantRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );

        return this.repository.find(
            {
                relations: [
                    'items', 'user'
                ],
                where: {
                    restaurant: res
                }
            }
        );
    }

    public async create(item : Order) {
        return this.repository.save(item);
    }

    public async createOrderItem(item : OrderItem) {
        return this.orderItemRepository.save(item);
    }

    public async findById(id : string) {
        return this.repository.findOne({
            relations: ['items'],
            where: {
                id: id
            }
        });
    }

    public async update(order : Order) {
        return this.repository.save(order);
    }


}
