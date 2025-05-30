const User = require('../models/user');

class UserController {
  async createUser(req, res) {
    try {
      const {
        username, email, birthdate, sex, height, userweight,
        activity, goal, mealpreference
      } = req.body;

      const newUser = await User.create({
        username, email, birthdate, sex, height, userweight,
        activity, goal, mealpreference
      });

      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при создании пользователя' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении пользователей' });
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении пользователя' });
    }
  }

  async updateUser(req, res) {
    try {
      const {
        id, username, email, birthdate, sex, height, userweight,
        activity, goal, mealpreference, weightHistory,
        nutritionHistory, lastupdate
      } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

      user.username = username;
      user.email = email;
      user.birthdate = birthdate;
      user.sex = sex;
      user.height = height;
      user.userweight = userweight;
      user.activity = activity;
      user.goal = goal;
      user.mealpreference = mealpreference;
      user.weighthistory = weightHistory;
      user.nutritionhirtory = nutritionHistory;
      user.lastupdate = lastupdate;

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

      await user.destroy();
      res.json({ message: 'Пользователь удалён' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при удалении пользователя' });
    }
  }
}

module.exports = new UserController();


// const db = require('../db')
// class UserController {
//     async createUser(req, res) {
//         const {username, email, birthdate, sex, height, userweight, activity, goal, mealpreference} = req.body
//         const newUser = await db.query('INSERT INTO person (username, email, birthdate, sex, height, userweight, activity, goal, mealpreference) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
//             [username, email, birthdate, sex, height, userweight, activity, goal, mealpreference])
//         res.json(newUser.rows[0])
//     }
//     async getUsers(req, res) {
//         const allUsers = await db.query('SELECT * FROM person')
//         res.json(allUsers.rows)
//     }
//     async getOneUser(req, res) {
//         const id = req.params.id
//         const user = await db.query('SELECT * FROM person WHERE id = $1', [id])
//         res.json(user.rows[0])
//     }
//     async updateUser(req, res) {
//         const {id, username, email, birthdate, sex, height, userweight, activity, goal, mealpreference, weightHistory, nutritionHistory, lastupdate} = req.body
//         const user = await db.query('UPDATE person SET username = $1, email = $2, birthdate = $3, sex = $4, height = $5, userweight = $6, activity = $7, goal = $8, mealpreference = $9, weighthistory = $10, nutritionhirtory = $11, lastupdate = $12 WHERE id = $13 RETURNING *', 
//             [username, email, birthdate, sex, height, userweight, activity, goal, mealpreference, weightHistory, nutritionHistory, lastupdate, id])
//         res.json(user.rows[0])
//     }
//     async deleteUser(req, res) {
//         const id = req.params.id
//         const user = await db.query('DELETE FROM person WHERE id = $1', [id])
//         res.json(user.rows[0])
//     }
// }

// module.exports = new UserController()