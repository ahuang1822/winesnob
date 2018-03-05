const router = require('express').Router()
const { Wine, Review, Place } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Wine.findAll({
    include: [{
      model: Place,
      as: 'place'
    }]
  })
    .then(wines => {
      // console.log('wines ---------------', wines)
      res.json(wines)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  let { city, state, country, name, vintage, varietal, price, size, img, description, quantity, type } = req.body
  Place.create({ city, state, country, type })
    .then(place => {
      Wine.create({ name, vintage, varietal, price, size, img, description, quantity, placeId: place.id })
        .then(wine => res.json(wine))
        .catch(next)
    })
})


router.param('wineId', (req, res, next, id) => {
  Wine
    .findById(id, {
      include: [{
        model: Place,
        as: 'place'
      }]
    })
    .then(wine => {
      if (!wine) {
        const err = Error('wine not found!');
        err.status = 404;
        throw err;
      }
      req.wine = wine;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:wineId', (req, res) => {
  Review.findAll({
    where: {
      wineId: req.params.wineId
    }
  })
    .then(
      reviews => {
        res.json({
          wine: req.wine,
          reviews: reviews
        })
      });
})

router.put('/:wineId', (req, res, next) => {
  req.wine
    .update(req.body, { returning: true })
    .then(wine => res.status(200).json(wine))
    .catch(next);
});

router.delete('/:wineId', (req, res, next) => {
  req.wine
    .destroy({ force: true })
    .then(() => res.status(204).end())
    .catch(next);
});
