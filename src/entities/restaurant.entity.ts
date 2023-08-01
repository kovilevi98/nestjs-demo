import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Food } from './food.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';


@Entity('restaurants')
export class Restaurant {
  constructor(name: string){
    this.name = name;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({
    isArray: true,
    type: Food,
    nullable: true
  })

  @ApiProperty({
    type: [Order]
  })
  @OneToMany(() => Order, (order) => order.restaurant, {nullable: true, eager: true, onDelete: 'CASCADE'})
  orders?: Order[]
  
  @ManyToMany(() => Food)
  @JoinTable()
  menu?: Food[];

}