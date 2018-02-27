const User = require('./user')
const Place = require('./place')
const Order = require('./order')
const List = require('./list')



User.belongsTo(Place, { as: 'place' })
User.hasMany(Order, { as: 'order' })
Order.belongsTo(User, { as: 'user' })
Order.hasMany(List, { as: 'list' })



/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Place,
  Order,
  List
}
