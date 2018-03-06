const router = require('express').Router()
const { User, Place, Order, List, Payment } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})


router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})


router.param('userId', (req, res, next, id) => {
  User
    .findById(id, {
      include: [{
        model: Place,
        as: 'place'
      }]
    })
    .then(user => {
      if (!user) {
        const err = Error('user not found!');
        err.status = 404;
        throw err;
      }
      req.user = user;
      next();
      return null;
    })
    .catch(next);
});


router.get('/:userId', (req, res) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(
<<<<<<< HEAD
    orders => {
      res.json({
        user: req.user,
        orders
      })
    });
=======
      orders => {
        res.json({
          user: req.user,
          orders
        })
      });
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
})


router.put('/:userId', (req, res, next) => {
  req.user
    .update(req.body, { returning: true })
    .then(user => res.status(200).json(user))
    .catch(next);
});


router.delete('/:userId', (req, res, next) => {
  req.user
    .destroy({ force: true })
    .then(() => res.status(204).end())
    .catch(next);
});


router.post('/:userId/cart', (req, res, next) => {
  Order.create({
    total: req.body.total,
    userId: req.params.userId
  })
    .then(order => {
      console.log('order ', order)
      console.log('items ', req.body.items)
      return req.body.items.forEach(item => {
        List.create({
          price: item.price,
          quantity: item.quantity,
          orderId: order.id,
          wineId: item.id
        })
      })
    })
    .then(lists => res.json(lists))
    .catch(next)
})


router.put('/:userId/checkout', (req, res, next) => {
  Order.update({
    status: 'Ordered',
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.sendStatus(200)
  })
})


router.post('/payment/:id', (req, res, next) => {
  Payment.create(req.body)
    .then(payment => {
      User.update({ paymentId: payment.dataValues.id }, { where: { id: req.params.id }, returning: true })
        .then(() => {
          User.findById(req.params.id, {
            include: [{
              model: Place,
              as: 'place'
            }, {
              model: Payment, as: 'payment'
            }]
          })
            .then(user => {
              res.json(user)
            })
        })
    })
    .catch(next)
})


router.put('/payment/:userId/:paymentId', (req, res, next) => {
  Payment.update(req.body, { where: { id: req.params.paymentId } })
  .then(() => {
    User.findById(req.params.userId, {
      include: [{
        model: Place,
        as: 'place'
      }, {
        model: Payment, as: 'payment'
      }]
    })
      .then(user => res.json(user))
  })
  .catch(next)
})


router.put('/place/:userId/:placeId', (req, res, next) => {
  Place.update(req.body, { where: { id: req.params.placeId } })
    .then(() => {
      User.findById(req.params.userId, {
        include: [{
          model: Place,
          as: 'place'
        }, {
          model: Payment, as: 'payment'
        }]
      })
        .then(user => res.json(user))
    })
    .catch(next)
})
