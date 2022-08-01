import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Yes', 'yes'),
    Markup.button.callback('No', 'no'),
  ]);
}

export function menuButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('Service1', 'service1'),
      Markup.button.callback('Service2', 'service2'),
      Markup.button.callback('Service3', 'service3'),
      Markup.button.callback('Service4', 'service1'),
      Markup.button.callback('Service5', 'service2'),
      Markup.button.callback('Service6', 'service6'),
    ],
    {
      columns: 3,
    },
  );
}
