const MealPlan = require('../models/mealplan');

class MealPlanController {
  async createMealPlan(req, res) {
    try {
      const { creationDate, currentDate, meals, userId } = req.body;

      const newMealPlan = await MealPlan.create({
        creationDate,
        currentDate,
        meals,
        user_id: userId
      });

      res.json(newMealPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании плана питания' });
    }
  }

  async getMealPlan(req, res) {
    try {
      const userId = req.query.id;

      const mealPlans = await MealPlan.findAll({
        where: { user_id: userId }
      });

      res.json(mealPlans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении плана питания' });
    }
  }

  async updateMealPlan(req, res) {
    try {
      const { id, creationDate, currentDate, meals, userId } = req.body;

      const mealPlan = await MealPlan.findByPk(id);

      if (!mealPlan) return res.status(404).json({ message: 'План питания не найден' });

      if (mealPlan.user_id !== userId) return res.status(403).json({ message: 'Нет доступа для обновления этого плана' });

      // Обновляем поля
      mealPlan.creationDate = creationDate || mealPlan.creationDate;
      mealPlan.currentDate = currentDate || mealPlan.currentDate;
      mealPlan.meals = meals || mealPlan.meals;

      await mealPlan.save();

      res.json(mealPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении плана питания' });
    }
  }
}

module.exports = new MealPlanController();


// const db = require('../db')

// class MealPlanController {
//     async createMealPlan(req, res) {
//         const {creationDate, currentDate, meals, userId} = req.body
//         const newMealPlan = await db.query('INSERT INTO mealPlan (creationDate, currentDate, meals, user_id) values ($1, $2, $3, $4) RETURNING *', 
//             [creationDate, currentDate, meals, userId])
//         res.json(newMealPlan.rows[0])
//     }
//     async getMealPlan(req, res) {
//         const id = req.query.id
//         const userMealPlan = await db.query('SELECT * FROM MealPlan WHERE user_id = $1', [id])
//         res.json(userMealPlan.rows)
//     }
//     async updateMealPlan(req, res) {
//         const {creationDate, currentDate, meals, userId} = req.body
//         const mp = await db.query('UPDATE mealPlan SET currentDate = $1, meals = $2 WHERE id = $3 RETURNING *', [currentDate, meals, userId])
//         res.json(mp.rows[0])
//     }
// }

// module.exports = new MealPlanController()