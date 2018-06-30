module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.response.status = e.status || 500
    const body = {
      message: e.message || 'Server error'
    }

    if (e.errors) {
      body.errors = e.errors
    }

    ctx.response.body = body
    ctx.logger.error(e)
  }
}
