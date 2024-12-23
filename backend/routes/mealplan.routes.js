const Router = require('express')
const router = new Router()
const mealPlanController = require('../controller/mealplan.controller')

router.post('/mealplan', mealPlanController.createMealPlan)
router.get('/mealplan', mealPlanController.getMealPlan)
router.put('/mealplan', mealPlanController.updateMealPlan)

module.exports = router