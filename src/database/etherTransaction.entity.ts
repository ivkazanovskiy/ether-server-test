import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class EtherTransaction extends Model {
  @Column
  block: number;

  @Column
  sender: string;

  @Column
  recipient: string;

  @Column
  value: string;
}
