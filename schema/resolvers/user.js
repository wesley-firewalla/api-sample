const UserService = require('../../services/user')
const utils = require('../utils')
const config = require('config')
const auth = require('../auth')

module.exports = {
  Query: {
    /**
     * @api {post} /graphql 1. UserMe
     * @apiName UserMe
     * @apiGroup USERS
     * @apiDescription Get own (authed user) profile
     *
     * @apiParamExample {text} Request Example
        {
          userMe {
            first_name
            last_name
            email
            phone
            avatar_url
            location {
              longitude
              latitude
            }
            created_at
            updated_at
          }
        }
     *
     * @apiSuccessExample {json} Success Response
        {
          "data": {
            "userMe": {
              "first_name": "Hello",
              "last_name": "World",
              "email": "hello@test.com",
              "phone": null,
              "avatar_url": "",
              "location": null,
              "created_at": "2018-03-17T20:32:54.000Z",
              "updated_at": "2018-03-17T21:08:25.000Z"
            }
          }
        }
     */
    userMe: async (_, args, context) => {
      auth(context)
      return context.user
    },
    /**
     * @api {post} /graphql 2. UserById
     * @apiName UserById
     * @apiGroup USERS
     * @apiDescription Get a user profile
     *
     * @apiParamExample {text} Request Example
        {
          userById(id: 1) {
            first_name
            last_name
            email
            phone
            avatar_url
            created_at
            updated_at
          }
        }
     *
     * @apiSuccessExample {json} Success Response
      {
        "data": {
          "userById": {
            "first_name": "AA",
            "last_name": "BB",
            "email": "test@test.com",
            "phone": null,
            "avatar_url": "",
            "created_at": "2018-03-17T20:32:54.000Z",
            "updated_at": "2018-03-17T21:08:25.000Z"
          }
        }
      }
     */
    userById: async (_, args, context) => {
      auth(context)

      const userService = new UserService(context.db)
      return await userService.findById(args.id)
    },
    /**
     * @api {post} /graphql 3. usersAndCount
     * @apiName UsersAndCount
     * @apiGroup USERS
     * @apiDescription Get User List
     *
     * @apiParamExample {text} Request Example
       {
          usersAndCount(filter: { q: "a"}) {
            rows {
              first_name
              last_name
              email
              phone
              avatar_url
              created_at
              updated_at
            }
            count
          }
        }
     *
     * @apiSuccessExample {json} Success Response
        {
          "data": {
            "usersAndCount": {
              "rows": [
                {
                  "first_name": "Jim",
                  "last_name": "Green",
                  "email": "test@test.com",
                  "phone": null,
                  "avatar_url": "http://...",
                  "created_at": "2018-06-30T06:16:12.000Z",
                  "updated_at": "2018-06-30T06:28:45.000Z"
                }
              ],
              "count": 1
            }
          }
        }
     */
    usersAndCount: async (_, { filter, limit, offset }, context) => {
      auth(context, true)

      const userService = new UserService(context.db)

      return await userService.findAndCountAll({ filter, offset, limit })
    }
  },
  Mutation: {
    /**
     * @api {post} /graphql 4. UpdateProfile
     * @apiName UpdateProfile
     * @apiGroup USERS
     * @apiDescription Update own (authed user) profile
     *
     * @apiParamExample {text} Request Example
        mutation {
          updateProfile (input: {
            first_name: "Jim",
            last_name: "Green",
            location: {
              latitude: 39.0396771,
              longitude: -120.2604007
            }
          }) {
            first_name
            last_name
            location {
              longitude
              latitude
            }
          }
        }
     *
     * @apiSuccessExample {json} Success Response
        {
          "data": {
            "updateProfile": {
              "first_name": "Jim",
              "last_name": "Green",
              "location": {
                "longitude": -120.2604007,
                "latitude": 39.0396771
              }
            }
          }
        }
     */
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
