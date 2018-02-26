const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            min: 10,
            msg: 'Please insert at least 10 characters.'
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validation: {
            min: 1,
            max: 5
        }
    }
}) 

module.exports = Review