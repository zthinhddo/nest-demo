import { IsNotEmpty } from 'class-validator';
import { Orders } from './orders.entity';

export class OrderUserDto {
  @IsNotEmpty()
  userId: string;

  orders: Orders[];
}
