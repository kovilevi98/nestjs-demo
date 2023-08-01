import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('orders')
export class Order {
  constructor(name: string){
    this.name = name;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  menus: string;

  @Column()
  orders: string;
}