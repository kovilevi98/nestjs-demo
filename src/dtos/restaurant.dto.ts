import { ApiProperty } from '@nestjs/swagger';
import { FoodDto } from './food.dto';

export class RestaurantDto {
    @ApiProperty()
    name: string;

    @ApiProperty({
        isArray: true,
        type: FoodDto
    })
    menu: FoodDto[];
  }