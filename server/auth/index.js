const router = require('express').Router()
const { User, Place, Order, List, Payment } = require('../db/models')
module.exports = router


router.post('/login', (req, res, next) => {
  req.session.guestOrder = req.session.order;
  req.session.order = null;
  User.findOne({
    where: { email: req.body.email },
    include: [{
      model: Place,
      as: 'place'
    }, {
      model: Payment,
      as: 'payment'
    }]
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})


router.post('/signup', (req, res, next) => {
  Place.create({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phone: req.body.phone
  })
    .then(place => {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        placeId: place.id,
      })
        .then(user => {
          req.login(user, err => (err ? next(err) : res.json(user)))
          req.session.passport = user;
        })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
          } else {
            next(err)
          }
        })
    })
<<<<<<< HEAD
    .then(result => {
      User.findById(result.id, {
        include: [{
          model: Place,
          as: 'place'
        }, {
          model: Payment, as: 'payment'
        }]
      })
      .then(user => {
        req.login(user, err => (err ? next(err) : res.json(user)))
        req.session.passport = user;
      })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
  })
=======
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
})


router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})


router.get('/me', (req, res) => {
  res.send(req.user)
})

<<<<<<< HEAD

router.use('/google', require('./google'))
=======
router.use('/google', require('./google'))
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
