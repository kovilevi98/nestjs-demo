import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmConfigService } from './services/typeormconfigservice/typeormconfig.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Restaurant } from './entities/restaurant.entity';
import { Food } from './entities/food.entity';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { InitialSeeder } from './seeders/initial.seeder';
import { OrderService } from './services/order.service.';
import { Order } from './entities/order.entity';
import { FoodService } from './services/food.servoce';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User, Restaurant, Food, Order]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: ['config/.env'],
      isGlobal: true,
    }),
  ],
  
  controllers: [UserController, RestaurantController],
  providers: [UserService, RestaurantService, InitialSeeder, OrderService, FoodService],
})

export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly seedingService: InitialSeeder,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}