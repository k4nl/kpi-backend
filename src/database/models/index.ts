import { Sequelize } from 'sequelize-typescript';
import config from '../config/config.js';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
  models: [__dirname + '/*.model.ts']
});

export default sequelize;
