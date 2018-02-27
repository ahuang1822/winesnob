const User = require('./user')
const Place = require('./place')
const Order = require('./order')
const List = require('./list')
const Wine = require('./wine')
const Review = require('./review')



User.belongsTo(Place, { as: 'place' })
User.hasMany(Order, { as: 'orders' })
User.hasMany(Review, { as: 'reviews'})
Order.belongsTo(User, { as: 'user' })
Order.hasMany(List, { as: 'lists' })
Wine.belongsTo(Place, { as: 'place' })
Wine.hasMany(List, { as: 'lists' })
Wine.hasMany(Review, { as: 'reviews'})
Review.belongsTo(Wine, { as: 'wine' })
Review.belongsTo(User, { as: 'user' })





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
  List,
  Wine, 
  Review
}
