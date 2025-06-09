const { DataTypes } = require('sequelize');
const sequelize = require('../db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  tableName: 'users',
  timestamps: false,
});

User.sync()
  .then(() => {
    console.log('User table exists or has been created successfully.');
  })
  .catch((error) => {
    console.error('Error creating or syncing User table:', error);
  });


module.exports = User;
