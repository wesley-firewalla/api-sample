const config = require('config')
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'app',
  level: config.get('log.level') || bunyan.INFO
})

module.exports = logger
