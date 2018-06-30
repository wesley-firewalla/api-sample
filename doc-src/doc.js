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

/**
 * @api {post} /graphql GraphQL
 * @apiName GraphQL
 * @apiGroup GRAPHQL
 * @apiDescription The main endpoint of all Queries and Mutations
 * @apiHeaderExample {json} Header Example:
 * {
 *    "Authorization": "Bearer <token>"
 * }
 */

/**
 * @api {get} /graphiql GraphiQL
 * @apiName GraphiQL
 * @apiGroup GRAPHQL
 * @apiDescription In Dev env check all Types, Queries and Mutations
 */

/**
 * @api {get} /schema Schema
 * @apiName Schema
 * @apiGroup GRAPHQL
 * @apiDescription Download GraphQL Schema
 *
 * Download schema for Apollo iOS/Android: <https://www.apollographql.com/docs/ios/downloading-schema.html>
 *
 */


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


/**
 * @api {post} /graphql 3. UsersAndCount
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
