import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

@Table({ timestamps: false, tableName: 'users_manager' })
export default class UsersManager extends Model {

  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => User)
  @Column
  manager_id: number;
  
  @BelongsTo(() => User, { foreignKey: 'manager_id', as: 'manager' })
  manager: User;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;
}
