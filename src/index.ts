import { config } from 'dotenv';
import { SlackMessageService } from './api/slack/slack';
import { UserService } from './api/timetastic/users';

config();

const { TIMETASTIC_TOKEN, SLACK_WEBHOOK_URL } = process.env;

if (!TIMETASTIC_TOKEN) {
  console.error('No timetastic API token provided in ENV, cannot run script');
  process.exit(1);
}

if (!SLACK_WEBHOOK_URL) {
  console.error('No slack webhook URL provided in ENV, cannot run script');
  process.exit(1);
}

console.log('Starting birthday checker task');
main()
  .then(() => {
    console.log('Finished successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed with error', err);
    process.exit(1);
  });

async function main() {
  try {
    console.log('Querying users');
    const users = await new UserService(TIMETASTIC_TOKEN).getUsersWithBirthdayToday();

    if (users.length === 0) {
      console.log('No birthdays today ;(');
    } else {
      console.log('Sending messages to slack');
      const slackService = new SlackMessageService(SLACK_WEBHOOK_URL);
      users.forEach((user) => {
        slackService.sendBirthdayMessage(`${user.firstname} ${user.surname}`);
      });
    }
  } catch (error) {
    throw error;
  }
}
