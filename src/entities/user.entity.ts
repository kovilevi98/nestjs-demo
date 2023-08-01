import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {
  constructor(username: string){
    this.username = username;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}