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
    if (req.session.cartId) {
      req.cart = await Order.findById(req.session.cartId)
      next()
      return
    }
  
    const order = await Order
      .findOrCreate({
        where: {
          userId: req.user ? req.user.id : null,
          status: 'cart',
        }
      })
      req.cart = order[0];
      req.session.cartId = req.cart.id
    next()  
  }
  
  // Approach (a): Create anon users
  //
  // If there's nobody signed in, create an anon user and sign them in.
  // async function signInAnonymously(req, res, next) {
  //   if (!req.user) {
  //     // Look up what it is in the passport docs.
  //     req.logIn(await User.create({ type: 'anonymous' }))
  //     next()
  //   }
  // }
  
  router.post('/cart', /* signInAnonymously, */ withCart, (req, res, next) => {
     //console.log('test ---------------------', req.cart)
    List.create({
      wineId: req.body.wineId,
      quantity: req.body.quantity,
      orderId: req.cart.id,
      price: req.body.price

    })
      .then(cart => {
        res.json(cart)
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




  router.get('/cart', (req, res, next) => {
     List.findAll({
       where: {
        orderId: req.session.cartId
       }
     })
     .then(cart => {
       console.log('CART', cart)
       res.json(cart)
      })
     .catch(next)
    })
    




