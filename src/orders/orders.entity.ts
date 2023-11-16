import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "orders" })
export class Orders {
    @PrimaryGeneratedColumn({ name: "order_id" })
    orderId: number

    @Column({ name: "prd_nm "})
    productName: string

    // One to Many example
    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usr_id" })
    user: User
}