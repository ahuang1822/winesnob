const router = require('express').Router()
const { Wine, Review, Place } = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


router.get('/search/:varietal/:size', (req, res, next) => {
  console.log('got here tho')
    var params = {
      varietal: req.params.varietal,
      size: req.params.size
    }  
    var keys = Object.keys(params)

    for (var i = 0; i < keys.length; i++) {
      if (params[keys[i]] === 'default') {
        params[keys[i]] = {$like: '%%'}
      }
    }

  Wine.findAll({
      where: ({
        varietal: params.varietal,
        size: params.size
        })
    })
    .then(wines => {
      res.json(wines)
    })
    .catch(next)
  })

router.get('/', (req, res, next) => {
  Wine.findAll({
    include: [{
      model: Place,
      as: 'place'
    }]
  })
  .then(wines => {
    res.json(wines)
  })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Wine.create(req.body)
    .then(wine => res.json(wine))
    .catch(next) 
})

router.get('/varietal', (req, res, next) => {
  // Wine.aggregate(
  //   'varietal', 'DISTINCT', { plain: false }
  // )
  Wine.findAll({
    attributes: ['varietal'],
    group: ['varietal']
  })
  .then(wines => {
    res.json(wines)
  })
    .catch(next)
})

router.get('/size', (req, res, next) => {
  // Wine.aggregate(
  //   'varietal', 'DISTINCT', { plain: false }
  // )

  Wine.findAll({
    attributes: ['size'],
    group: ['size']
  })
  .then(wines => {
    res.json(wines)
  }) 
    .catch(next)
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
