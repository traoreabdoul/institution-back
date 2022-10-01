import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from "dotenv";
import {join} from "path";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {
  DEFAULT_POSTGRES_DB,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_USER,
  Environment,
} from "./common/constants/constants";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || DEFAULT_POSTGRES_PORT),
  username: process.env.POSTGRES_USER || DEFAULT_POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || DEFAULT_POSTGRES_DB,
  logging: true,
  synchronize: false,
  entities: [join(__dirname, "**/*.entity.{ts,js}")],
  migrations: [join(__dirname, "database/migrations/**/*.{ts,js}")],
  namingStrategy: new SnakeNamingStrategy(),
};

const workingDir = process.env.NODE_ENV === Environment.Production ? "dist" : "src";
const cliConfigOptions = {
  cli: {
    migrationsDir: `${workingDir}/database/migrations`,
  },
};

export const typeormOptions = {
  ...dataSourceOptions,
  ...cliConfigOptions,
};

export const AppDataSource = new DataSource(dataSourceOptions);
