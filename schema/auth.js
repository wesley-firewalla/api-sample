module.exports = (ctx, admin = false) => {
  if (!ctx.user) {
    throw new Error('Unauthorized')
  }

  if (admin && !ctx.user.is_admin) {
    throw new Error('Lack of admin permission')
  }
}
