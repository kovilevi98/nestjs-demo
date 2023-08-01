import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Food } from 'src/entities/food.entity';

@Injectable() export class RestaurantService {
    public constructor(
        @InjectRepository(Restaurant) 
        private repository: Repository<Restaurant > ,
        @InjectRepository(Food) 
        private foodRepository: Repository<Food > ,
        ) {}

    public getAll():Promise<Restaurant[] > {
        return this.repository.find({
            select: ['name', 'id']
        });
    }

    public getAllWithRelations():Promise<Restaurant[] > {
        return this.repository.find({
            relations: ['menu']
        });
    }

    public findById(id: string):Promise<Restaurant> {
        return this.repository.findOne({
            relations: ['menu'],
            where: {
                id: id
            }
        });
    }

    public async getMenusForRestaurant(id: string):Promise<Food[]> {
        const restaurant = await this.repository.findOne({
            where: {
                id: id
            }
        });

        return this.foodRepository.find({
            select: ['id', 'name', 'price'],
            relations: ['restaurant'],
            where: {
                restaurant: restaurant
            }
        });
    }
}
