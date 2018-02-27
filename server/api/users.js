const router = require('express').Router()
const { User, Place } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Place,
      as: 'place'
    }
  })
    .then(user => res.json(user))
    .catch(next)
    //for displaying user information in the order history page
})

