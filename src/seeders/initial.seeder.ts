import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Food } from 'src/entities/food.entity';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable() export class InitialSeeder implements Seeder {
    constructor(
      @InjectRepository(Food) private readonly foodRepository: Repository<Food >,
      @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant > 
      ) {}

    async seed():Promise<any > {
        let dbFoods = await this.foodRepository.find();
        if(dbFoods.length == 0) {
            const foods = [
              new Food('soup', 123),
              new Food('apple', 3),
              new Food('watermelon', 356), 
            ];

            await this.foodRepository.insert(foods);

            dbFoods = await this.foodRepository.find();
            const restaurant = new Restaurant('testRestaurant');
            restaurant.menu = dbFoods;

            return this.restaurantRepository.save(restaurant);
       }
    }

    async drop():Promise<any > {
        return this.foodRepository.delete({});
    }
}
