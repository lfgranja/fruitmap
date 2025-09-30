// src/config/database.ts
import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import * as path from 'path';
import pg from 'pg';

dotenv.config();

// Determine the database type based on the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL;

let sequelize: Sequelize;

if (databaseUrl && databaseUrl.startsWith('sqlite:')) {
  // Use SQLite
  const sqlitePath = databaseUrl.replace('sqlite:', '');
  // Check if the path is absolute before resolving against current working directory
  const storagePath = path.isAbsolute(sqlitePath) 
    ? sqlitePath 
    : path.resolve(process.cwd(), sqlitePath);
    
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
} else {
  // Use PostgreSQL (default)
  const databaseConfig = {
    database: process.env.DB_NAME || 'fruit_map_dev',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres' as Dialect,
    dialectModule: pg,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  };

  sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
      host: databaseConfig.host,
      port: databaseConfig.port,
      dialect: databaseConfig.dialect,
      dialectModule: databaseConfig.dialectModule,
      dialectOptions: databaseConfig.dialectOptions,
      logging: databaseConfig.logging,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

export default sequelize;