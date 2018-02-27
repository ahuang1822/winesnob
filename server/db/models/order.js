const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
   date: {
     type: Sequelize.STRING,
     defaultValue: new Date()
   },
   status: {
     type: Sequelize.STRING,
     defaultValue: 'pending'
   },
   total: {
     type: Sequelize.DECIMAL,
     defaultValue: 0.0
   }
})

module.exports = Order;