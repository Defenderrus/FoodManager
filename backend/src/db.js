const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false, // Убери или поставь true, если хочешь видеть SQL-запросы в консоли
});

module.exports = sequelize;


// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "node_postgres"
// })

// module.exports = pool