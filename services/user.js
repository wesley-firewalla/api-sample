const _ = require('lodash')
const config = require('config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = class UserService {
  constructor(db) {
    this._db = db
  }

  async findFirst() {
    return await this._db.users.findOne({})
  }

  async findById(id) {
    return await this._db.users.findById(id)
  }

  async findAndCountAll({ filter, offset, limit }) {
    const { q } = filter || {}
    let where = {}

    if (!_.isUndefined(q)) {
      where = {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), {
            like: `%${q}%`
          }),
          {
            email: {
              [Op.like]: `%${q}%`
            }
          }
        ]
      }
    }

    return await this._db.users.findAndCountAll({
      limit,
      offset,
      where,
      order: [['id', 'DESC']]
    })
  }

  async findByEmail(email) {
    return await this._db.users.findOne({
      where: {
        email
      }
    })
  }

  async findBySocialId(type, id) {
    const where = {}
    where[`${type}`] = {
      id
    }

    return await this._db.users.findOne({
      where
    })
  }

  async create(data) {
    return await this._db.users.create(data)
  }

  async update(userId, data) {
    const user = await this.findById(userId)
    if (data.location) {
      const sequelize = this._db.sequelize
      data.location = sequelize.literal(`POINT(${data.location.longitude}, ${data.location.latitude})`)
    }

    await this._db.users.update(data, {
      where: {
        id: userId
      }
    })

    return await this.findById(userId)
  }
}
