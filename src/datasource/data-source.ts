import { DataSource } from "typeorm";
import databaseSourceOptions from "../config/datasource.config";

const dataSourceModule = new DataSource(databaseSourceOptions);

export default dataSourceModule;
