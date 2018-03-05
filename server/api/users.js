const router = require('express').Router()
const { User, Place, Order, List } = require('../db/models')
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
    orders => {
      res.json({
        user: req.user,
        orders
    })
  });
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
  console.log('body ', req.body.total)
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
  })
})

router.put('/place/:placeId', (req, res, next) => {
  Place.update(req.body,  { where: { id: req.params.placeId }, returning: true })
  .then(result => res.json(result[1][0]))
  .catch(next)
})
