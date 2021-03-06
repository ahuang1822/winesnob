const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'))
router.use('/wines', require('./wines'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/list', require('./list'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
