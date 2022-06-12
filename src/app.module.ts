import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { etherTransactionProviders } from './database/etherTransaction.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...etherTransactionProviders],
})
export class AppModule {}
