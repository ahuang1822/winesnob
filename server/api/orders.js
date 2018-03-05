const router = require('express').Router()
const { List, Order, Wine } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
})




router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

router.param('orderId', (req, res, next, id) => {
  Order
    .findById(req.params.orderId, {
      include: [{
        model: List,
        as: 'lists', include: [{
          model: Wine, as: 'wine'
        }]
      }]
    })
    .then(order => {
      if (!order) {
        const err = Error('order not found!');
        err.status = 404;
        throw err;
      }
      req.order = order;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  res.json(req.order);
})


router.put('/:orderId', (req, res, next) => {
  req.order
    .update(req.body, { returning: true })
    .then(wine => res.status(200).json(wine))
    .catch(next);
});





// router.delete('/:wineId', (req, res, next) => {
//   req.wine
//     .destroy({ force: true })
//     .then(() => res.status(204).end())
//     .catch(next);
// });
