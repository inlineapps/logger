const { stdSerializers } = require('bunyan');

module.exports = serializers => Object.assign({}, stdSerializers, serializers);
