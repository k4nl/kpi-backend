import { Table, Column, Model, PrimaryKey, BelongsTo, HasOne, ForeignKey } from 'sequelize-typescript';
import RolesModel from './roles.model';
import UsersManager from './userManager.model';

@Table({ timestamps: false, tableName: 'users' })
export default class User extends Model {

  @PrimaryKey
  @Column
  id: number;

  @Column
  matricula: number;

  @Column
  status: boolean;

  @Column
  nome: string;

  @Column
  email: string;

  @Column
  data_de_admissao: Date;

  @Column
  data_de_rescisao?: Date | null ;

  @BelongsTo(() => RolesModel, { foreignKey: 'cargo', as: 'cargo_info', targetKey: 'cargo' })
  cargo_info: RolesModel;

  @HasOne(() => UsersManager, { foreignKey: 'user_id', as: 'manager_info', sourceKey: 'id' })
  manager_info: UsersManager;

}
