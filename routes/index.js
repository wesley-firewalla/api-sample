module.exports = router => {
  router
    .get('/', (ctx, next) => {
      if (process.env.NODE_ENV === 'production') {
        ctx.response.ok('API is running.')
      } else {
        ctx.redirect('/docs/')
      }
    })
}
