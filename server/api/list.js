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
    if (req.session.order) {
      //req.session.order = await Order.findById(req.session.cartId)
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
      req.session.order = order[0];
      console.log(req.session)
      //req.session.cartId = req.cart.id
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



  router.get('/cart', (req, res, next) => {
    console.log('hit get', req.session)
    if(req.session.order){
     List.findAll({
       where: {
        orderId: req.session.order.id
       },
       include: [{
           model: Wine
       }]
     })
     .then(cart => {
       res.json(cart)
      })
     .catch(next)
    }
    })

