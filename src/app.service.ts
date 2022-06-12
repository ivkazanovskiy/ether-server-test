import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { EtherTransaction } from './database/etherTransaction.entity';
import { ERepo } from './database/types';

@Injectable()
export class AppService {
  constructor(
    @Inject(ERepo.ETHER_TRANSACTION)
    private etherTransactionRepository: typeof EtherTransaction,
  ) {}

  async getMaxChangedAccount(): Promise<any> {
    const maxBlock: number = await this.etherTransactionRepository.max('block');

    if (!maxBlock) {
      throw new NotFoundException();
    }

    const senderRecords = (await this.etherTransactionRepository.findAll({
      where: { block: { [Op.gt]: maxBlock - 100 } },
      attributes: [
        'sender',
        [sequelize.fn('sum', sequelize.col('value')), 'total'],
      ],
      group: ['sender'],
      raw: true,
    })) as unknown as { sender: string; total: number }[];

    const recipientRecords = (await this.etherTransactionRepository.findAll({
      where: { block: { [Op.gt]: maxBlock - 100 } },
      attributes: [
        'recipient',
        [sequelize.fn('sum', sequelize.col('value')), 'total'],
      ],
      group: ['recipient'],
      raw: true,
    })) as unknown as { recipient: string; total: number }[];

    const results = {};

    recipientRecords.forEach(
      (record) => (results[record.recipient] = record.total),
    );

    senderRecords.forEach((record) => {
      if (results[record.sender]) {
        results[record.sender] -= record.total;
      } else {
        results[record.sender] = -record.total;
      }
    });

    const maxChangedAccount = {
      client: '',
      value: 0,
    };

    for (const client in results) {
      const value = Math.abs(results[client]);
      if (value > maxChangedAccount.value) {
        maxChangedAccount.value = value;
        maxChangedAccount.client = client;
      }
    }

    return maxChangedAccount.client;
  }
}
