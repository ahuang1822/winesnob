const User = require('./user')
const Place = require('./place')
const Order = require('./order')
const List = require('./list')
const Wine = require('./wine')
const Review = require('./review')
const Payment = require('./payment')
const db = require('../db')

User.belongsTo(Place)
User.belongsTo(Payment)
User.hasMany(Order)
User.hasMany(Review)
Order.belongsTo(User)
Order.hasMany(List)
Wine.belongsTo(Place)
Wine.hasMany(List)
Wine.hasMany(Review)
Review.belongsTo(Wine)
Review.belongsTo(User)
List.belongsTo(Wine)
List.belongsTo(Order)
List.belongsTo(Wine)
List.belongsTo(Order)

module.exports = {
  db,
  User,
  Place,
  Order,
  List,
  Wine,
  Review,
  Payment
}
