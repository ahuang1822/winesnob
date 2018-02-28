const router = require('express').Router()
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
  req.session.cartId = order.id
  next()  
}

// Approach (a): Create anon users
//
// If there's nobody signed in, create an anon user and sign them in.
async function signInAnonymously(req, res, next) {
  if (!req.user) {
    // Look up what it is in the passport docs.
    req.logIn(await User.create({ type: 'anonymous' }))
    next()
  }
}

router.post('/cart/add', /* maybe: signInAnonymously,*/ withCart, (req, res, next) => {
  req.cart.addList({
    wineId: req.body.wineId,
    qty: req.body.qty,
    //...
  }).then(() => res.send(cart))
    .catch(next)
})
/**********/



router.use('/users', require('./users'))
router.use('/wines', require('./wines'))
router.use('/reviews', require('./reviews'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
