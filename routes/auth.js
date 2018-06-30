const config = require('config')
const jwt = require('jsonwebtoken')
const UserService = require('../services/user')
const r2 = require('r2')

module.exports = router => {
  router
    /**
     * @api {post} /login Login
     * @apiName Login
     * @apiGroup AUTH
     * @apiDescription Login with facebook or google access token, return JWT.
     *
     * **Google:**
     *
     * > <https://developers.google.com/+/web/api/rest/oauth>
     * >
     * > Get `access_token` from <https://developers.google.com/oauthplayground>, choose Google OAuth2 API v2 > <https://www.googleapis.com/auth/userinfo.email>
     *
     * **Facebook:**
     *
     * > Get `access_token` from <https://developers.facebook.com/tools/accesstoken>
     *
     * Later you can put the header `Authorization: Bearer <token>` in the `/graphql` api request.
     *
     * @apiParam {string="google","facebook"} type
     * @apiParam {string} access_token Google/Facebook access token
     *
     * @apiParamExample {json} Request Example
     * {
     *   "type": "facebook",
     *   "access_token": "123456"
     * }
     *
     * @apiSuccessExample {json} Success Response
     * {
     *   "token": "the-token-string"
     * }
     */
    .post('/login', async (ctx, next) => {
      const type = ctx
        .checkBody('type')
        .notBlank()
        .isIn(['facebook', 'google']).value
      const access_token = ctx.checkBody('access_token').notBlank().value

      if (ctx.errors) {
        ctx.response.unprocessableEntity(ctx.errors)
        return
      }

      const userService = new UserService(ctx.db)
      let user, social_id
      if (type === 'facebook') {
        const url = `https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,about,gender,picture.type(large)&access_token=${access_token}`
        const r = await r2(url).json
        if (r.error) {
          ctx.response.badRequest(r.error.message)
          return
        }

        social_id = r.id
        user = await userService.findBySocialId(type, social_id)
        if (!user) {
          user = await userService.findByEmail(r.email)
        }

        if (!user) {
          let avatarUrl = ''
          if (r.picture && r.picture.data) {
            avatarUrl = r.picture.data.url
          }
          const new_user = await userService.create({
            first_name: r.first_name,
            last_name: r.last_name,
            email: r.email,
            avatar_url: avatarUrl,
            facebook: r
          })
          user = new_user
        } else {
          await userService.update(user.id, {
            facebook: r
          })
        }
      } else if (type === 'google') {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
        const r = await r2(url).json
        if (r.error) {
          ctx.response.badRequest(r.error.message)
          return
        }

        social_id = r.id
        user = await userService.findBySocialId(type, social_id)
        if (!user) {
          user = await userService.findByEmail(r.email)
        }

        if (!user) {
          const new_user = await userService.create({
            first_name: r.given_name,
            last_name: r.family_name,
            email: r.email,
            avatar_url: r.picture,
            google: r
          })
          user = new_user
        } else {
          await userService.update(user.id, {
            google: r
          })
        }
      }

      const token = jwt.sign({
        id: user.id,
        social_type: type,
        social_id,
        env: process.env.NODE_ENV
      }, config.get('jwt_secret_key'))
      ctx.response.ok({ token })
    })
}
