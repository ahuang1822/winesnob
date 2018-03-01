const User = require('./user')
const Place = require('./place')
const Order = require('./order')
const List = require('./list')
const Wine = require('./wine')
const Review = require('./review')
const db = require('../db')


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
List.belongsTo(Wine)
List.belongsTo(Order)


module.exports = {
  db,
  User,
  Place,
  Order,
  List,
  Wine,
  Review
}
