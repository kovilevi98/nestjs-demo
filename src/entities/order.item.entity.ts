import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';


@Entity('orderitems')
export class OrderItem {
  constructor(message: string, quantity: number){
    this.message = message;
    this.quantity = quantity
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, {nullable: true, cascade: false})
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id'})
  order: Order;
  
  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  message: string;
}