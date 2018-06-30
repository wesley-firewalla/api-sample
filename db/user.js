const config = require('config')
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    email: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT')
    },
    phone: {
      type: DataTypes.STRING(50)
    },
    avatar_url: {
      type: DataTypes.STRING(250)
    },
    google: {
      type: DataTypes.JSON
    },
    facebook: {
      type: DataTypes.JSON
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true
  })

  return model
}
