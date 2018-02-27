const router = require('express').Router()
const {Wine} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Wine.findAll()
  .then(wines => {
    res.json(wines)
  })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Wine.findById(req.params.id)
    .then(wine => {
      if (!wine) {
        res.json({
          message: 'Wine does not exist'
        })
      } else {
      res.json(wine)
      }
    })
      .catch(next)
});

router.post('/', (req, res, next) => {
  Wine.create(req.body)
    .then(wine => res.json(wine))
    .catch(next)
    
})

router.put('/:id', (req, res, next) => {
  Wine.update(
    (req.body),
    {where: {
      id: req.params.id
    },
      returning: true          
    }
  )
  .then(wine => {
    res.json({
      message: "Updated successfully",
      wine: wine
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Wine.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.json({
      message: 'Wine deleted successfully'
    }))
    .then(res.status(204))
})