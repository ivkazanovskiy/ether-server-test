import { EtherTransaction } from './etherTransaction.entity';
import { ERepo } from './types';

export const etherTransactionProviders = [
  {
    provide: ERepo.ETHER_TRANSACTION,
    useValue: EtherTransaction,
  },
];
