const router = require('express').Router()
const { list } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  List.create({
  })
    .then(users => res.json(users))
    .catch(next)
})