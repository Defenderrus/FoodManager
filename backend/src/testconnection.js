const sequelize = require('./db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
})();