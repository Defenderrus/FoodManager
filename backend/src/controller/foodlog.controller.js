const FoodLog = require('../models/foodlog');

class FoodLogController {
  async createFoodLog(req, res) {
    try {
      const { currentDate, eatenMeals, dailyPFC, user_id } = req.body;

      const newFoodLog = await FoodLog.create({
        currentDate,
        eatenMeals,
        dailyPFC,
        user_id
      });

      res.json(newFoodLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании food log' });
    }
  }

  async getFoodLog(req, res) {
    try {
      const userId = req.params.id;

      const foodLogs = await FoodLog.findAll({
        where: { user_id: userId }
      });

      res.json(foodLogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении food log' });
    }
  }

  async updateFoodLog(req, res) {
    try {
      const { id, currentDate, eatenMeals, dailyPFC, user_id } = req.body;

      const foodLog = await FoodLog.findByPk(id);

      if (!foodLog) return res.status(404).json({ message: 'Запись не найдена' });

      if (foodLog.user_id !== user_id) return res.status(403).json({ message: 'Нет доступа для обновления' });

      foodLog.currentDate = currentDate || foodLog.currentDate;
      foodLog.eatenMeals = eatenMeals || foodLog.eatenMeals;
      foodLog.dailyPFC = dailyPFC || foodLog.dailyPFC;

      await foodLog.save();

      res.json(foodLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении food log' });
    }
  }
}

module.exports = new FoodLogController();

// const db = require('../db')
// class FoodLogController {
//     async createFoodLog(req, res) {
//         const {currentDate, eatenMeals, dailyPFC, user_id} = req.body
//         const newFoodLog = await db.query('INSERT INTO foodLog (currentDate, eatenMeals, dailyPFC, user_id) values ($1, $2, $3, $4) RETURNING *', 
//             [currentDate, eatenMeals, dailyPFC, user_id])
//         res.json(newFoodLog.rows[0])
//     }
//     // async getFoodLog(req, res) {
//     //     const fl = await db.query('SELECT * FROM foodLog')
//     //     res.json(fl.rows[0])
//     // }
//     async getFoodLog(req, res) {
//         const userId = req.params.id
//         const fl = await db.query('SELECT * FROM foodLog WHERE user_id = $1', [userId])
//         res.json(fl.rows[0])
//     }
//     async updateFoodLog(req, res) {
//         const {currentDate, eatenMeals, dailyPFC, user_id} = req.body
//         const updFL = await db.query('UPDATE foodLog SET currentDate = $1, eatenMeals = $2, dailyPFC = $3 WHERE id = $4 RETURNING *', 
//             [currentDate, eatenMeals, dailyPFC, user_id])
//         res.json(updFL.rows[0])
//     }
// }

// module.exports = new FoodLogController()