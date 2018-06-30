const _ = require('lodash')

module.exports = {
  convertLocation: location => {
    if (location) {
      if (_.isArray(location)) {
        return {
          latitude: location[1],
          longitude: location[0]
        }
      } else if (location.coordinates) {
        return {
          latitude: location.coordinates[1],
          longitude: location.coordinates[0]
        }
      }
    }

    return location
  }
}
