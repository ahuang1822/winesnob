const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('hey')
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})

router.param('reviewId', (req, res, next, id) => {
  Review
    .findById(id)
    .then(review => {
      if (!review) {
        const err = Error('review not found!');
        err.status = 404;
        throw err;
      }
      req.review = review;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:reviewId', (req, res) => {
  res.json(req.review);
});

router.put('/:reviewId', (req, res, next) => {
  req.review
    .update(req.body, { returning: true })
    .then(review => res.status(200).json(review))
    .catch(next);
});

router.delete('/:reviewId', (req, res, next) => {
  req.review
  .destroy({ force: true })
  .then(() => res.status(204).end())
  .catch(next);
});

