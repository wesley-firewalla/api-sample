const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')
const { printSchema } = require('graphql/utilities/schemaPrinter')

const auth = require('../middlewares/auth')
const schema = require('../schema')
const config = require('config')
const jwt = require('jsonwebtoken')
const UserService = require('../services/user')
const DataLoaders = require('../schema/data-loaders')

module.exports = router => {
  router.post('/graphql', auth({ required: false }), (ctx, next) => {
    return graphqlKoa({
      schema: schema(ctx.db),
      context: {
        db: ctx.db,
        user: ctx.state.user,
        loaders: DataLoaders(ctx.db, ctx.state.user)
      }
    })(ctx, next)
  })

  if (process.env.NODE_ENV !== 'production') {
    router
      .get('/graphiql', async (ctx, next) => {
        const userService = new UserService(ctx.db)
        const firstUser = await userService.findFirst()
        const token = jwt.sign(
          {
            id: firstUser.id,
            from: 'graphiql',
            env: process.env.NODE_ENV
          },
          config.get('jwt_secret_key')
        )
        return graphiqlKoa({
          endpointURL: '/graphql',
          passHeader: `'Authorization': 'Bearer ${token}'`
        })(ctx, next)
      })
      .get('/schema', (ctx, next) => {
        ctx.body = printSchema(schema(ctx.db))
      })
  }
}
