const Router = require('express')
const router = new Router()
const foodLogController = require('../controller/foodlog.controller')

router.post('/foodlog', foodLogController.createFoodLog)
router.get('/foodlog:id', foodLogController.getFoodLog)
router.put('/foodlog', foodLogController.updateFoodLog)

module.exports = router