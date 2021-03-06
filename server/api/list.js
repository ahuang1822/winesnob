const router = require('express').Router()
const { List, Order, Wine } = require('../db/models')
module.exports = router


async function withCart(req, res, next) {
  if (req.session.order && req.session.order !== null) {
    next()
    return
  }
  const order = await Order
    .findOrCreate({
      where: {
        userId: req.session.passport ? req.session.passport.user : null,
        status: 'cart'
      }
    })
  req.session.order = order[0].dataValues;
  next()
}


async function getCart(req, res, next) {
  const order = await Order
    .findOne({
      where: {
        userId: req.session.passport ? req.session.passport.user : null,
        status: 'cart'
      }
    })
  if (order) {
    req.session.order = order.dataValues;
  }
  next()
}


router.post('/cart', withCart, (req, res, next) => {
  List.findOne({
    where: {
    wineId: req.body.id,
    orderId: req.session.order.id,
    price: req.body.price
    }
  })
    .then((foundList) => {
      if (foundList) {
        foundList.update({
          quantity: ++foundList.quantity
        }, { returning: true })
          .then(updatedList => res.send(updatedList))
      } else {
        List.create({
          wineId: req.body.id,
          quantity: 1,
          orderId: req.session.order.id,
          price: req.body.price
        })
          .then(list => res.send(list))
      }
    })
    .catch(next)
})


router.get('/cart', getCart, (req, res, next) => {
  if (req.session.order) {
    List.findAll({
      where: {
        orderId: req.session.order.id
      },
      include: [{
        model: Wine
      }]
    })
      .then(cart => {
        res.json(cart).status(200)
      })
      .catch(next)
  } else {
    res.json([])
  }
})


router.put(`/cart/:id`, (req, res, next) => {
  List.update(
    { quantity: req.body.quantity },
    { where: { id: req.params.id }, returning: true }
  ).then(list => {
    res.json(list)
  })
    .catch(next)
})

router.delete('/cart/:id', (req, res, next) => {
  List.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.sendStatus(204))
    .catch(next)
})


router.put('/guestCart', (req, res, next) => {
  if (req.body.merging) {
    List.update(
      { orderId: req.session.order.id },
      { where: { orderId: req.session.guestOrder.id } })
      .then(() => {
        Order.destroy({ where: { id: req.session.guestOrder.id } })
        req.session.guestOrder = null;
      }).then(() => res.sendStatus(200))
      .catch(next)
  }
})
