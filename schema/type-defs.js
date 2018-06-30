module.exports = `
  scalar Date

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String
    phone: String
    avatar_url: String
    location: Location
    is_admin: Boolean!
    updated_at: Date!
    created_at: Date!
  }

  type Location {
    latitude: Float!
    longitude: Float!
  }

  input UserFilter {
    q: String
  }

  input LocationInput {
    latitude: Float!
    longitude: Float!
  }

  input UpdateProfileInput {
    first_name: String
    last_name: String
    avatar_url: String
    email: String
    phone: String
    location: LocationInput
  }

  type UsersAndCount {
    rows: [User!]!
    count: Int!
  }

  type Query {
    userMe: User,
    usersAndCount(filter: UserFilter, limit: Int = 20, offset: Int = 0): UsersAndCount!
    userById(id: ID!): User
  }

  type Mutation {
    updateProfile(input: UpdateProfileInput!): User
  }
`
