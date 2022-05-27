require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

console.log(process.env.DB_PG_HOST_DOCKER);

export const pgDatasource = new DataSource({
  type: "postgres",
  url: process.env.DB_PG_HOST_DOCKER,
  entities: ["dist/src/entities/**.js"],
  logging: true,
  synchronize: false,
});
