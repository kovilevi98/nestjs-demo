import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('foods')
export class Food {
  constructor(name: string, price: number){
    this.name = name;
    this.price = price
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty()
  @Column()
  price: number;

  @ManyToMany(
    () => Restaurant, 
    restaurant => restaurant.menu, //optional
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
      name: 'restaurant_food',
      joinColumn: {
        name: 'restaurant_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'food_id',
        referencedColumnName: 'id',
      },
    })
    restaurant?: Restaurant[];
}