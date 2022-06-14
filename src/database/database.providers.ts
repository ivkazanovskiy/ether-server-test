import { Sequelize } from 'sequelize-typescript';
import { EtherTransaction } from './etherTransaction.entity';
import * as sequelizeConfig from '../../config/database.json';
import { SequelizeConfig } from './types';

const config = (
  process.env.NODE_ENV === 'production'
    ? sequelizeConfig.production
    : process.env.NODE_ENV === 'test'
    ? sequelizeConfig.test
    : sequelizeConfig.development
) as SequelizeConfig;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels([EtherTransaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
