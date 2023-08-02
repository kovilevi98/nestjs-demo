import { ApiProperty } from '@nestjs/swagger';

export class ItemDto{
    @ApiProperty()
    id: string;

    @ApiProperty({
        type: Number,
        required: true,
        default: 1,
        maximum: 99,
        minimum: 0
    })
    quantity: number;

    @ApiProperty({
        type: String,
        required: true
    })
    message: string;
}

export class CreateOrderDto {
    @ApiProperty({
        type: String,
        required: true
    })
    customerId: string;

    @ApiProperty({
        type: String,
        required: true
    })
    restaurantId: string;

    @ApiProperty({
        type: [ItemDto]
    })
    items: ItemDto[];
  }
