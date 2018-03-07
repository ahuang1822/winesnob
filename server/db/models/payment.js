
const Sequelize = require('sequelize')
const db = require('../db')


const Payment = db.define('payment', {
    cardCompany: {
     type: Sequelize.STRING
    },
    cardNumber: {
        type: Sequelize.BIGINT
    },
    expiration: {
        type: Sequelize.STRING
    },
    security: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
       type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    zipcode: {
        type: Sequelize.INTEGER
    }
})


module.exports = Payment;
