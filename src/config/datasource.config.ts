import { DataSourceOptions } from "typeorm";

const databaseSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "123",
  database: "herowarudo",
  port: 5432,
  // entities: ['./src/user/entities/user.entity.ts', './src/identity/identity.entity.ts', './src/usr_role/entities/user_role.entity.ts', './src/role/entities/role.entity.ts', './src/orders/orders.entity.ts'], // defined Entities for migration autogen
  entities: ['./src/**/entities/*.entity{.ts,.js}', './src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migration/*{.ts,.js}'], // created migration files
  synchronize: false,
}

export default databaseSourceOptions;