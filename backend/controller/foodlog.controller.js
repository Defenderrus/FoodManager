const db = require('../db')
class FoodLogController {
    async createFoodLog(req, res) {
        const {currentDate, eatenMeals, dailyPFC, user_id} = req.body
        const newFoodLog = await db.query('INSERT INTO foodLog (currentDate, eatenMeals, dailyPFC, user_id) values ($1, $2, $3, $4) RETURNING *', 
            [currentDate, eatenMeals, dailyPFC, user_id])
        res.json(newFoodLog.rows[0])
    }
    // async getFoodLog(req, res) {
    //     const fl = await db.query('SELECT * FROM foodLog')
    //     res.json(fl.rows[0])
    // }
    async getFoodLog(req, res) {
        const userId = req.params.id
        const fl = await db.query('SELECT * FROM foodLog WHERE user_id = $1', [userId])
        res.json(fl.rows[0])
    }
    async updateFoodLog(req, res) {
        const {currentDate, eatenMeals, dailyPFC, user_id} = req.body
        const updFL = await db.query('UPDATE foodLog SET currentDate = $1, eatenMeals = $2, dailyPFC = $3 WHERE id = $4 RETURNING *', 
            [currentDate, eatenMeals, dailyPFC, user_id])
        res.json(updFL.rows[0])
    }
}

module.exports = new FoodLogController()