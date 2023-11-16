import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { IUser, USER_SERVICE } from 'src/user/interfaces/user.interface';
import { DataSource, Repository } from 'typeorm';
import { Orders } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @Inject(USER_SERVICE) private readonly _userService: IUser,
    // @InjectDataSource() private readonly datasource: DataSource,
  ) {}

  // async insertOrders(orderList: Orders[], userId: string) {
  //   const queryRunner = this.datasource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     // TODO: Add all necessary SQLs here
  //     this._userService.insertNewOrders(orderList, userId);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }

  async deleteUserAndOrders(userId: string): Promise<boolean> {
    const user = await this._userService.getUserById(userId);
    console.log("user: ", user);
    if (user) {
      this.orderRepository.delete({ user: user });
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'User is not existed!',
        data: { userId: userId },
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
