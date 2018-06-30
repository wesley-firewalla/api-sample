const path = require('path')
const config = require('config')
const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-body')
const responseHandler = require('./middlewares/response-handler')
const errorHandler = require('./middlewares/error-handler')
const logger = require('./logger')
const koaLogger = require('koa-logger')
const koaValidate = require('koa-validate')
const cors = require('kcors')
const serve = require('koa-static')
const json = require('koa-json')
const db = require('./db')

const app = new Koa()

app.context.db = db
app.context.logger = logger

koaValidate(app)

const router = new Router()

const normalizedPath = path.join(__dirname, 'routes')
require('fs')
  .readdirSync(normalizedPath)
  .forEach(file => {
    require('./routes/' + file)(router)
  })

const koaPort = config.get('api_port')

app
  .use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
  })
  .use(json())
  .use(body())
  .use(cors())
  .use(responseHandler)
  .use(errorHandler)
  .use(koaLogger())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('.'))
  .on('error', error => {
    logger.error(error)
  })
  .listen(koaPort, () => {
    logger.info(`Api is running. Url: http://localhost:${koaPort}.`)
    logger.info(`GraphQL Server is now running on http://localhost:${koaPort}/graphql`)
  })

process
  .on('uncaughtException', error => {
    logger.error(`Caught global exception: ${error}`)
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection: ${reason}`)
  })
