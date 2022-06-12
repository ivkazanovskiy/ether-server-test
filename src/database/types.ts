import { Dialect } from 'sequelize/types';

export enum ERepo {
  ETHER_TRANSACTION = 'ETHER_TRANSACTION',
}
export type SequelizeConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
};
