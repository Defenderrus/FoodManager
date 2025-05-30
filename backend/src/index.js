const express = require('express');
const sequelize = require('./db'); // подключаем Sequelize
const userRouter = require('./routes/user.routes');
const nurtSetRouter = require('./routes/nutrset.routes');
const mealPlanRouter = require('./routes/mealplan.routes');
const foodLogRouter = require('./routes/foodlog.routes');
// const progressRouter = require('./routes/progress.routes');

const PORT = process.env.PORT || 8888;

const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', nurtSetRouter);
app.use('/api', mealPlanRouter);
app.use('/api', foodLogRouter);
// app.use('/api', progressRouter);

// Подключаемся к базе и запускаем сервер
const start = async () => {
  try {
    await sequelize.authenticate(); // Проверка соединения
    await sequelize.sync(); // Синхронизация моделей (можно добавить { force: true } для сброса таблиц)
    console.log('Sequelize подключён и синхронизирован');

    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (err) {
    console.error('Ошибка при запуске сервера:', err);
  }
};


// const express = require('express')
// const userRouter = require('./routes/user.routes')
// const nurtSetRouter = require('./routes/nutrset.routes')
// const mealPlanRouter = require('./routes/mealplan.routes')
// const foodLogRouter = require('./routes/foodlog.routes')

// // const progressRouter = require('./routes/progress.routes')

// const PORT = process.env.PORT || 8888

// const app = express()

// app.use(express.json())
// app.use('/api', userRouter)
// app.use('/api', nurtSetRouter)
// app.use('/api', mealPlanRouter)
// app.use('/api', foodLogRouter)

// // app.use('/api', progressRouter)

// app.listen(PORT, () => console.log('server started on port ${port}'))