import { Hears, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { menuButtons } from './bot.buttons';

type User = {
  chatId?: number;
  fullName?: string;
  phoneNumber?: string;
  location?: { longitude: number; latitude: number };
};

@Update()
export class BotUpdate {
  user: User = {};

  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async Start(ctx: Context) {
    await ctx.reply('Hello there');
    await ctx.reply('What is your name?');
    if (!('chatId' in this.user)) {
      this.user.chatId = ctx.message.chat.id;
    }

    console.log(this.user);
  }

  @Hears('Service1')
  async service1(ctx) {
    await ctx.reply('you chose service 1');
  }

  @On('text')
  async register(ctx: any) {
    if (!('fullName' in this.user)) {
      this.user.fullName = ctx.message.text;
    }

    if ('fullName' in this.user && !('phoneNumber' in this.user)) {
      await ctx.reply('What is your phone number?', {
        reply_markup: {
          one_time_keyboard: true,
          force_reply: true,
          keyboard: [
            [
              {
                text: 'My phone number',
                request_contact: true,
              },
            ],
          ],
        },
      });
    }

    this.user;
  }

  @On('contact')
  async requestLocation(ctx) {
    this.user.phoneNumber = ctx.message.contact.phone_number;
    console.log(this.user);

    if ('phoneNumber' in this.user && !('location' in this.user)) {
      await ctx.reply('What is your location?', {
        reply_markup: {
          one_time_keyboard: true,
          force_reply: true,
          keyboard: [
            [
              {
                text: 'My location',
                request_location: true,
              },
            ],
          ],
        },
      });
    }
  }

  @On('location')
  async saveLocation(ctx) {
    console.log(ctx.message.location);
    if (!('location' in this.user)) {
      this.user.location = ctx.message.location;
    }
    console.log(this.user);

    if ('location' in this.user) {
      await ctx.reply('Choose Service', menuButtons());
    }
  }
}
