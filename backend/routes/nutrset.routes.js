const Router = require('express')
const router = new Router()
const nutrSetController = require('../controller/nutrset.controller')

router.post('/nutrset', nutrSetController.createNutrSet)
router.get('/nutrset/:id', nutrSetController.getNutrSet)
router.put('/nutrset', nutrSetController.updateNutrSet)

module.exports = router