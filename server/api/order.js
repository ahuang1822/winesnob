const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Order.create({
    status: 'Pending'
  })
    .then(users => res.json(users))
    .catch(next)
})