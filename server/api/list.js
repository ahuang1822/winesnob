const router = require('express').Router()

const { List, Order, Wine } = require('../db/models')
module.exports = router

/**
 * NOTES. This probably doesn't work as written.
 *
 * The cart:
 *   1. If I'm signed in, you can find (or create) Order where
 *        user_id = req.user.id
 *          and
 *        status = CART
 *   2. If I'm not signed in,
 *      Approach (a). Create a Guest user account, and do (1)
 *      Approach (b). Allow Orders not to be owned by a user (userId is NULL),
 *         and save the order's id on the session as cartId.
 */
async function withCart(req, res, next) {
  // If we've already associated an order with this session

  if (req.session.order && req.session.order !== null) {
    //req.session.order = await Order.findById(req.session.cartId)
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

  //req.session.cartId = req.cart.id
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
  List.create({
    wineId: req.body.id,
    quantity: 1,
    orderId: req.session.order.id,
    price: req.body.price
  })
    .then((list) => res.send(list))
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

router.delete(`/cart/:id`, (req, res, next) => {
  List.destroy({ where: { id: req.params.id } })
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
      })
      .catch(next)
  }
})
