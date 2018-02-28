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
   }
})

module.exports = Order;