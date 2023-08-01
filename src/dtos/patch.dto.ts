import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StateType } from 'src/entities/order.entity';

export class PatchDto {
    @IsEnum(StateType)
    @ApiProperty({
      enum: StateType
    })
    state: StateType;
}