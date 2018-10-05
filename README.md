# Slack/Timetastic Birthday Bot

Reads a list of users using timetastic's API, then uses a slack webhook to send a message if it's
their birthday.

You'll need two environment variables in order for the script to work:
* TIMETASTIC_TOKEN - An access token with admin privileges, for querying the timetastic API.
* SLACK_WEBHOOK_URL - The slack webhook URL to be used when pushing messages.