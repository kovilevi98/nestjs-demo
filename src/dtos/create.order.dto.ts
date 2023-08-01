import { ApiProperty } from '@nestjs/swagger';

export class ItemDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    message: string;
}

export class CreateOrderDto {
    @ApiProperty()
    customerId: string;

    @ApiProperty()
    restaurantId: string;

    @ApiProperty({
        type: [ItemDto]
    })
    items: ItemDto[];
  }
