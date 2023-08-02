import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Food } from './food.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { OrderItem } from './order.item.entity';

export enum StateType {
  RECEIVED = 'received',
  PREPARING = 'preparing',
  READY = 'ready'
}

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @ApiProperty()
  @Column({
    type: 'simple-enum',
    enum: StateType,
    default: StateType.RECEIVED
  })
  status: string;

  @ManyToOne(() => Restaurant, {nullable: true, cascade: false})
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id'})
  restaurant: Restaurant;

  @ApiProperty({
    type: User
  })
  @ManyToOne(() => User, {nullable: true, cascade: false})
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

  @ApiProperty({
    type: [OrderItem]
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {nullable: true, eager: true, onDelete: 'CASCADE'})
  items?: OrderItem[]


}