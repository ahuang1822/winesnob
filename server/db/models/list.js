const Sequelize = require('sequelize')
const db = require('../db')


const List = db.define('list', {
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})


module.exports = List;
