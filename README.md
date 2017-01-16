Custom bunyan logger form our Node.js project.

## Install

1. npm install: `$ npm i --save git+https://github.com/inlineapps/logger.git`
2. Add the add the following settings to `.env`
  ```bash
  LOG_LEVEL=info
  SLACK_WEBHOOK_URL=<webhook url>
  SLACK_CHANNEL=<channel name>
  SLACK_USERNAME=<user name>
  ```
