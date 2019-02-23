const bunyan = require('bunyan');
const BunyanSlack = require('bunyan-slack');
const createSerializers = require('./serializers');
const formatter = require('./formatter');

const level = process.env.LOG_LEVEL || 'info';
const src = process.env.LOG_SRC || false;
const webhook_url = process.env.SLACK_WEBHOOK_URL;
const channel = process.env.SLACK_CHANNEL;
const username = process.env.SLACK_USERNAME;

function getTestStreams() {
  return process.env.NODE_ENV === 'test' ? [] : null;
}

function getDevelopmentStreams() {
  return process.env.NODE_ENV === 'development'
    ? [
      {
        level,
        stream: process.stdout
      },
      {
        level: 'error',
        stream: process.stderr
      }
    ]
    : null;
}

function getDefaultStreams() {
  const streams = [
    {
      level,
      stream: process.stdout
    },
    {
      level: 'error',
      stream: process.stderr
    }
  ];
  if (webhook_url) {
    streams.push({
      level: 'error',
      stream: new BunyanSlack({
        webhook_url,
        channel,
        username,
        customFormatter: formatter
      })
    });
  }
  return streams;
}

module.exports = (pkg, serializers, streams) => bunyan.createLogger({
  name: pkg.name,
  version: pkg.version,
  src,
  serializers: createSerializers(serializers),
  streams: (getTestStreams()
    || getDevelopmentStreams()
    || getDefaultStreams()).concat(streams || [])
});
