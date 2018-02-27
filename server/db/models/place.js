
const Sequelize = require('sequelize')
const db = require('../db')



const Place = db.define('place', {
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING
    }
})


module.exports = Place;