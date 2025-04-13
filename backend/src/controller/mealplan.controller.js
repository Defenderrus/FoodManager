const db = require('../db')

class MealPlanController {
    async createMealPlan(req, res) {
        const {creationDate, currentDate, meals, userId} = req.body
        const newMealPlan = await db.query('INSERT INTO mealPlan (creationDate, currentDate, meals, user_id) values ($1, $2, $3, $4) RETURNING *', 
            [creationDate, currentDate, meals, userId])
        res.json(newMealPlan.rows[0])
    }
    async getMealPlan(req, res) {
        const id = req.query.id
        const userMealPlan = await db.query('SELECT * FROM MealPlan WHERE user_id = $1', [id])
        res.json(userMealPlan.rows)
    }
    async updateMealPlan(req, res) {
        const {creationDate, currentDate, meals, userId} = req.body
        const mp = await db.query('UPDATE mealPlan SET currentDate = $1, meals = $2 WHERE id = $3 RETURNING *', [currentDate, meals, userId])
        res.json(mp.rows[0])
    }
}

module.exports = new MealPlanController()