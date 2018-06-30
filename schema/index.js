const _ = require('lodash')
const { makeExecutableSchema } = require('graphql-tools')
const path = require('path')
const fs = require('fs')
const typeDefs = require('./type-defs')

module.exports = db => {
  let resolvers = {}

  fs.readdirSync(path.join(__dirname, 'resolvers')).forEach(it => {
    resolvers = _.merge(resolvers, require(`./resolvers/${it}`))
  })

  return makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  })
}
