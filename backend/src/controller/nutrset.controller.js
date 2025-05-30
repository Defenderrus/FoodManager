const NutrSet = require('../models/nutrset');

class NutrSetController {
  async createNutrSet(req, res) {
    try {
      const {
        bmr, dailyCalories,
        proteinGoal, fatsGoal, carbohydratesGoal,
        userId
      } = req.body;

      const newSet = await NutrSet.create({
        bmr,
        dailyCalories,
        proteinGoal,
        fatsGoal,
        carbohydratesGoal,
        user_id: userId
      });

      res.json(newSet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании настроек питания' });
    }
  }

  async getNutrSet(req, res) {
    try {
      const id = req.params.id;

      const set = await NutrSet.findAll({
        where: { user_id: id }
      });

      res.json(set);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении настроек питания' });
    }
  }

  async updateNutrSet(req, res) {
    try {
      const {
        bmr,
        dailyCalories,
        proteinGoal,
        fatsGoal,
        carbohydratesGoal,
        userId
      } = req.body;

      const set = await NutrSet.findOne({ where: { user_id: userId } });
      if (!set) return res.status(404).json({ message: 'Настройки не найдены' });

      set.bmr = bmr;
      set.dailyCalories = dailyCalories;
      set.proteinGoal = proteinGoal;
      set.fatsGoal = fatsGoal;
      set.carbohydratesGoal = carbohydratesGoal;

      await set.save();
      res.json(set);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении настроек питания' });
    }
  }
}

module.exports = new NutrSetController();

// const db = require('../db')

// class NutrSetController {
//     async createNutrSet(req, res) {
//         const {bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, userId} = req.body
//         const newNutrSet = await db.query('INSERT INTO nutritionSettings (bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, user_id) values ($1, $2, $3, $4, $5, $6) RETURNING *', 
//             [bmr, dailyCalories, proteinGoal, fatsGoal, carbohydratesGoal, userId])
//         res.json(newNutrSet.rows[0])
//     }
//     async getNutrSet(req, res) {
//         const id = req.query.id
//         const userNutrSet = await db.query('SELECT * FROM nutritionSettings WHERE user_id = $1', [id])
//         res.json(userNutrSet.rows)
//     }
//     async updateNutrSet(req, res) {
//         const {bmr, dailyCalories, pfcGoal, userId} = req.body
//         const NutrSet = await db.query('UPDATE nutritionSettings SET bmr = $1, dailyCalories = $2, pfcGoal = $3, userId = $4 RETURNING *', 
//             [bmr, dailyCalories, pfcGoal, userId])
//         res.json(NutrSet.rows[0])
//     }
// }

// module.exports = new NutrSetController()