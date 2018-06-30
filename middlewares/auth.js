const config = require('config')
const jwt = require('jsonwebtoken')
const UserService = require('../services/user')

module.exports = ({ required }) => {
  return async (ctx, next) => {
    const authHeader = ctx.request.headers['authorization']
    if (!authHeader) {
      if (required) {
        ctx.response.unauthorized()
      } else {
        await next()
      }
      return
    }
    const parsed = authHeader.split(' ')
    if (parsed.length !== 2 || parsed[0] !== 'Bearer') {
      ctx.response.unauthorized()
      return
    }

    const token = parsed[1]
    try {
      const tokenUser = jwt.verify(token, config.get('jwt_secret_key'))
      if (tokenUser.env !== process.env.NODE_ENV) {
        ctx.response.unauthorized()
        return
      }

      const service = new UserService(ctx.db)
      const user = await service.findById(tokenUser.id)
      if (!user) {
        ctx.response.unauthorized()
        return
      }

      if (tokenUser.from !== 'graphiql') {
        if (user[`${tokenUser.social_type}`].id !== tokenUser.social_id) {
          ctx.response.unauthorized()
          return
        }
      }

      ctx.state.user = user
    } catch (ex) {
      ctx.response.unauthorized()
      return
    }

    await next()
  }
}
