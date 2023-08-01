import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Food } from './food.entity';
import { ApiProperty } from '@nestjs/swagger';


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
  @ManyToMany(
    () => Food,
    food => food.restaurant,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  menu?: Food[];

  @Column()
  orders: string;
}