module.exports = async (ctx, next) => {
  ctx.response.unprocessableEntity = function(errors) {
    const messages = []

    errors.forEach(m => {
      for (const key of Object.keys(m)) {
        messages.push(m[key])
      }
    })

    ctx.throw(422, { message: messages.join(' '), errors: errors })
  }

  ctx.response.ok = function(message) {
    ctx.response.status = 200

    if (message === null || message === undefined) {
      message = 'OK'
    }

    if (typeof message === 'object') {
      ctx.response.body = message
    } else {
      ctx.response.body = {
        message: message
      }
    }
  }

  ctx.response.badRequest = function(message) {
    ctx.throw(400, message)
  }

  ctx.response.notFound = function(message) {
    ctx.throw(404, message || 'Not found')
  }

  ctx.response.noContent = function(message) {
    ctx.response.status = 204
  }

  ctx.response.forbidden = function(message) {
    ctx.throw(403, message || 'Forbidden')
  }

  ctx.response.unauthorized = function(message) {
    ctx.throw(401, message || 'Unauthorized')
  }

  ctx.response.created = function(data) {
    ctx.response.status = 201
    if (data) {
      ctx.response.body = data
    }
  }

  await next()
}
