const db = require('../db')

class NutrSetController {
    async createNutrSet(req, res) {
        const {bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, userId} = req.body
        const newNutrSet = await db.query('INSERT INTO nutritionSettings (bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, user_id) values ($1, $2, $3, $4, $5, $6) RETURNING *', 
            [bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, userId])
        res.json(newNutrSet.rows[0])
    }
    async getNutrSet(req, res) {
        const id = req.query.id
        const userNutrSet = await db.query('SELECT * FROM nutritionSettings WHERE user_id = $1', [id])
        res.json(userNutrSet.rows)
    }
    async updateNutrSet(req, res) {
        const {bmr, dailyCalories, pfcGoal, userId} = req.body
        const NutrSet = await db.query('UPDATE nutritionSettings SET bmr = $1, dailyCalories = $2, pfcGoal = $3, userId = $4 RETURNING *', 
            [bmr, dailyCalories, pfcGoal, userId])
        res.json(NutrSet.rows[0])
    }
}

module.exports = new NutrSetController()