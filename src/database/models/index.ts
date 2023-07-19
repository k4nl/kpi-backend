import { Sequelize } from 'sequelize-typescript';
import config from '../config/config.js';
import User from './user.model';
import Roles from './roles.model';
import UsersManager from './userManager.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
  models: [User, Roles, UsersManager]
});

export default sequelize;
