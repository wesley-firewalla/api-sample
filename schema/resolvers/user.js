const UserService = require('../../services/user')
const utils = require('../utils')
const config = require('config')
const auth = require('../auth')

module.exports = {
  Query: {
    userMe: async (_, args, context) => {
      auth(context)
      return context.user
    },
    userById: async (_, args, context) => {
      auth(context)

      const userService = new UserService(context.db)
      return await userService.findById(args.id)
    },
    usersAndCount: async (_, { filter, limit, offset }, context) => {
      auth(context, true)

      const userService = new UserService(context.db)

      return await userService.findAndCountAll({ filter, offset, limit })
    }
  },
  Mutation: {
    updateProfile: async (_, { input }, context) => {
      auth(context)

      const userService = new UserService(context.db)
      return await userService.update(context.user.id, input)
    }
  },
  User: {
    location: (source, args, context) => {
      return utils.convertLocation(source.location)
    }
  }
}
