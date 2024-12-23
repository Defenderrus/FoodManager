const db = require('../db')
class UserController {
    async createUser(req, res) {
        const {username, email, birthdate, sex, height, userweight, activity, goal, mealpreference} = req.body
        const newUser = await db.query('INSERT INTO person (username, email, birthdate, sex, height, userweight, activity, goal, mealpreference) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
            [username, email, birthdate, sex, height, userweight, activity, goal, mealpreference])
        res.json(newUser.rows[0])
    }
    async getUsers(req, res) {
        const allUsers = await db.query('SELECT * FROM person')
        res.json(allUsers.rows)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM person WHERE id = $1', [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res) {
        const {id, username, email, birthdate, sex, height, userweight, activity, goal, mealpreference, weightHistory, nutritionHistory, lastupdate} = req.body
        const user = await db.query('UPDATE person SET username = $1, email = $2, birthdate = $3, sex = $4, height = $5, userweight = $6, activity = $7, goal = $8, mealpreference = $9, weightHistory = $10, nutritionHistory = $11, lastupdate = $12 WHERE id = $13 RETURNING *', 
            [username, email, birthdate, sex, height, userweight, activity, goal, mealpreference, weightHistory, nutritionHistory, lastupdate, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person WHERE id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()