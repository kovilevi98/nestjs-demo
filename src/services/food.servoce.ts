import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Food } from 'src/entities/food.entity';

@Injectable() export class FoodService {
    public constructor(
        @InjectRepository(Food) 
        private repository: Repository<Food > ,
        @InjectRepository(Restaurant) 
        private restaurantRepository: Repository<Restaurant >
        ) {}

    public async create(item: Food){
       return this.repository.create(item);
    }

    public findOne(id: string){
        return this.repository.findOne({
            where: {
                id: id
            }
        })
    }
    

   
}
