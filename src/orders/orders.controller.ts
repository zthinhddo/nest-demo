import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { IUser, USER_SERVICE } from 'src/user/interfaces/user.interface';
import { OrderUserDto } from './orders.dto';
import { User } from 'src/user/entities/user.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(@Inject(USER_SERVICE) private readonly _userService: IUser, @Inject(OrdersService) private orderService: OrdersService) {}

    @Post("buy")
    orderSomething(@Body() orderUser: OrderUserDto): Promise<User | null> {
        return this._userService.insertNewOrders(orderUser.orders, orderUser.userId);
    }  
    
    @Delete('remove/:userId')
    removeUserAndOrderHistory(@Param("userId") userId: string) : Promise<boolean> {
        return this.orderService.deleteUserAndOrders(userId);
    }
}
