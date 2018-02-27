const Sequelize = require('sequelize')
const db = require('../db')


const List = db.define('list', {
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    }, 
    total: {
        type: Sequelize.VIRTUAL,
        get: function () {
            return this.price * this.quantity;
        }

    }
})





module.exports = List;