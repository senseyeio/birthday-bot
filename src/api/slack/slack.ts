import { IncomingWebhook } from '@slack/client';

export class SlackMessageService {
  private webhook: IncomingWebhook;

  constructor(webhookUrl: string) {
    this.webhook = new IncomingWebhook(webhookUrl);
  }

  public sendBirthdayMessage(name: string): void {
    this.webhook.send(`It's ${name}'s birthday today! Happy birthday :tada:`)
    .then((res) => {
      console.log('Message received: ', res);
    })
    .catch((err) => {
      throw err;
    });
  }
}
