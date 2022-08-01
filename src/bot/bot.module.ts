import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';

@Module({
  providers: [BotUpdate],
  controllers: [],
})
export class BotModule {}
