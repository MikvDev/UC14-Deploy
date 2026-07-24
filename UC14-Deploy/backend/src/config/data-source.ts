import "reflect-metadata";
import { DataSource } from "typeorm";
import * as  dotenv from "dotenv";

import { Task } from "../models/Task";
import { User } from "../models/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "task_manager",
  synchronize: true, 
  logging: false,
  entities: [User, Task],
  
});