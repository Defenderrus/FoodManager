// const db = require('../db')
// class ProgressController {
//     async createProgress(req, res) {
//         const {progressDate, currentWeight, bodyComposition, consumedCalories, userId} = req.body
//         const newProgress = await db.query('INSERT INTO progress (progressDate, currentWeight, bodyComposition, consumedCalories, userId) values ($1, $2, $3, $4, $5) RETURNING *', 
//             [progressDate, currentWeight, bodyComposition, consumedCalories, userId])
//         res.json(newProgress.rows[0])
//     }
//     async getProgress(req, res) {
//         const id = req.params.id
//         const getUsersProgress = await db.query('SELECT * FROM progress WHERE id = $1', id)
//         res.json(getUsersProgress.rows[0])
//     }
//     async updateProgress(req, res) {
//         const {progressDate, currentWeight, bodyComposition, consumedCalories, userId} = req.body
//         const user = await db.query('UPDATE progress SET progressDate = $1, currentWeight = $2, bodyComposition = $3, consumedCalories = $4, userId = $5 WHERE id = $3 RETURNING *', 
//             [progressDate, currentWeight, bodyComposition, consumedCalories, userId])
//         res.json(user.rows[0])
//     }
// }

// module.exports = new ProgressController()