import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Food } from './food.entity';

@Entity('restaurant_food')

export class StudentCourse {
  @PrimaryColumn({ name: 'restaurant_id' })
  restaurant_id: number;

  @PrimaryColumn({ name: 'food_id' })
  food_id: number;

  @ManyToOne(
    () => Restaurant,
    restaurant => restaurant.menu,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'food_id', referencedColumnName: 'id' }])
  foods: Food[];

  @ManyToOne(
    () => Food,
    food => food.restaurant,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  restaurants: Restaurant[];
}