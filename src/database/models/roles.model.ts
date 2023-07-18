import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'roles' })
export default class Roles extends Model {

  @PrimaryKey
  @Column
  id: number;

  @Column
  cargo: string;

}

