import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';


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

  @ManyToMany(() => Restaurant)
  @JoinTable()
  restaurant: Restaurant[]

  @ManyToMany(() => Order)
  @JoinTable()
  orders: Order[]
}