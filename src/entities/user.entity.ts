import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {
  constructor(username: string){
    this.username = username;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  password: string;
}