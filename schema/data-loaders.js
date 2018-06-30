const DataLoader = require('dataloader')
const _ = require('lodash')

module.exports = (db, user) => {
  const idsMap = (ids, list, key) => {
    return ids.map(id => {
      return list.find(it => it[key] === id)
    })
  }

  return {
    users: new DataLoader(async ids => {
      const list = await db.users.findAll({
        where: {
          id: ids
        }
      })

      return idsMap(ids, list, 'id')
    })
  }
}
