import { Sequelize } from 'sequelize-typescript';
import { EtherTransaction } from './etherTransaction.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: '127.0.0.1',
        username: 'postgres',
        password: 'postgres',
        database: 'ether',
      });
      sequelize.addModels([EtherTransaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
