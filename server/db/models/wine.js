const Sequelize = require('sequelize')
const db = require('../db')

const Wine = db.define('wine', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vintage: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    varietal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Wine
