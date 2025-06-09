const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'strategicX',
};
const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: false,
  port: 3308,
}
);
db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync({ alter: true });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

module.exports = db;
    